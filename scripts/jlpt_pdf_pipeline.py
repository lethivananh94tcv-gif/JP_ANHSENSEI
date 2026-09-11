import os
import sys
import re
import json
import fitz  # PyMuPDF
from PIL import Image

_ocr_reader_ja = None

def get_page_text(page, page_num):
    """
    Extracts text from PDF page. Uses PyMuPDF text layer if sufficient (>40 chars),
    otherwise falls back to pytesseract / easyocr.
    """
    text = page.get_text("text").strip()
    if len(text) >= 40:
        return text
    
    # Try PyMuPDF block extraction first
    blocks = page.get_text("blocks")
    block_text = "\n".join([b[4] for b in blocks if len(b) > 4 and b[4].strip()])
    if len(block_text.strip()) >= 40:
        return block_text
        
    # OCR Fallback
    try:
        pix = page.get_pixmap(dpi=150)
        temp_img_path = f"temp_ocr_p{page_num}.png"
        pix.save(temp_img_path)
        
        # Pytesseract check
        import pytesseract
        tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        if os.path.exists(tesseract_cmd):
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
            
        try:
            img = Image.open(temp_img_path)
            tess_text = pytesseract.image_to_string(img, lang='chi_sim+jpn+eng')
            if os.path.exists(temp_img_path):
                os.remove(temp_img_path)
            if len(tess_text.strip()) > 15:
                return tess_text
        except Exception:
            pass

        # EasyOCR check
        global _ocr_reader_ja
        if _ocr_reader_ja is None:
            import easyocr
            _ocr_reader_ja = easyocr.Reader(['ja', 'en'])
            
        ocr_results = _ocr_reader_ja.readtext(temp_img_path)
        if os.path.exists(temp_img_path):
            os.remove(temp_img_path)
        ocr_text = "\n".join([r[1] for r in ocr_results])
        return ocr_text
    except Exception as e:
        print(f"  [OCR Fallback Warning p{page_num}]: {e}", file=sys.stderr)
        return text

def parse_jlpt_pdf(pdf_path):
    """
    Dynamic PDF Parser Pipeline:
    - Scans pages dynamically for 「参考答案」 and 「试题解析」 without hardcoded page numbers.
    - Extracts multi-column answer keys and multi-page explanations.
    - Matches Question + Answer + Explanation by [Section + Mondai + QuestionNumber].
    - Flags missing items as NEEDS_REVIEW.
    """
    print(f"[Pipeline] Analyzing PDF: {os.path.basename(pdf_path)}...", file=sys.stderr)
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    
    page_texts = []
    ans_pages = []
    expl_pages = []

    for i in range(total_pages):
        p_num = i + 1
        txt = get_page_text(doc[i], p_num)
        page_texts.append((p_num, txt))
        
        clean = txt.replace(" ", "")
        if "参考答案" in clean or "参考答案・配点" in clean or "答案" in clean or "正解" in clean:
            ans_pages.append(p_num)
        if "试题解析" in clean or "試題解析" in clean or "解析" in clean:
            expl_pages.append(p_num)

    print(f"[Pipeline] Answer Key Pages Detected: {ans_pages}", file=sys.stderr)
    print(f"[Pipeline] Explanation Pages Detected: {expl_pages}", file=sys.stderr)

    # 1. PARSE OFFICIAL ANSWERS
    official_answers = {}  # key: (section, mondai, question_num) -> opt (1..4)
    
    ans_text_combined = "\n".join([page_texts[p-1][1] for p in ans_pages]) if ans_pages else "\n".join([t[1] for t in page_texts])

    current_sec = "VOCAB"
    current_mondai = 1

    lines = ans_text_combined.splitlines()
    for line in lines:
        line_s = line.strip()
        if not line_s:
            continue
        
        if "言語知識" in line_s and ("文字" in line_s or "語彙" in line_s):
            current_sec = "VOCAB"
        elif "文法" in line_s or "読解" in line_s:
            current_sec = "GRAMMAR"
        elif "聴解" in line_s:
            current_sec = "LISTENING"
            
        m_mondai = re.search(r'問題\s*([１２３４５６７8901-9]+)', line_s)
        if m_mondai:
            raw_m = m_mondai.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890'))
            current_mondai = int(raw_m)

        # Match (Q, Ans) pairs:
        # e.g., 問1 3, 問1:3, 1 3, 1: 3, 1-3, 1(3), (1) 3, 1 A
        pairs = re.findall(r'(?:問\s*(\d+)|(?:^|\s)(\d+))\s*[:：\.-]?\s*[\(（]?([1-4A-D])[\)）]?\b', line_s)
        for p in pairs:
            q_str = p[0] if p[0] else p[1]
            opt_str = p[2]
            if q_str and opt_str:
                q_num = int(q_str)
                opt_map = {'A': 1, 'B': 2, 'C': 3, 'D': 4, '1': 1, '2': 2, '3': 3, '4': 4}
                opt = opt_map.get(opt_str.upper(), 1)
                official_answers[(current_sec, current_mondai, q_num)] = opt

    # 2. PARSE EXPLANATIONS
    explanations = {}  # key: (section, mondai, question_num) -> explanation_string
    expl_text_combined = "\n".join([page_texts[p-1][1] for p in expl_pages]) if expl_pages else "\n".join([t[1] for t in page_texts])

    current_sec = "VOCAB"
    current_mondai = 1
    current_q_num = None
    curr_expl_lines = []

    expl_lines = expl_text_combined.splitlines()
    for line in expl_lines:
        line_s = line.strip()
        if not line_s:
            continue
            
        if "言語知識" in line_s and ("文字" in line_s or "語彙" in line_s):
            current_sec = "VOCAB"
        elif "文法" in line_s or "読解" in line_s:
            current_sec = "GRAMMAR"
        elif "聴解" in line_s:
            current_sec = "LISTENING"

        m_mondai = re.search(r'問題\s*([１２３４５６７8901-9]+)', line_s)
        if m_mondai:
            raw_m = m_mondai.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890'))
            current_mondai = int(raw_m)

        # Question block detection in explanation
        m_q = re.search(r'^(?:問\s*(\d+)|(\d+)[\.\s．])', line_s)
        if m_q and len(line_s) < 40:
            if current_q_num and curr_expl_lines:
                explanations[(current_sec, current_mondai, current_q_num)] = "\n".join(curr_expl_lines).strip()
            q_str = m_q.group(1) if m_q.group(1) else m_q.group(2)
            current_q_num = int(q_str)
            curr_expl_lines = [line_s]
        else:
            if current_q_num:
                curr_expl_lines.append(line_s)

    if current_q_num and curr_expl_lines:
        explanations[(current_sec, current_mondai, current_q_num)] = "\n".join(curr_expl_lines).strip()

    # 3. BUILD QUESTION SET & CHECK MATCHING ACCURACY
    parsed_questions = []
    has_missing = False
    
    global_idx = 1
    sections = [
        ("VOCAB", [(1, 9), (2, 9), (3, 10), (4, 5), (5, 2)]),
        ("GRAMMAR", [(1, 15), (2, 5), (3, 5), (4, 4), (5, 3), (6, 2), (7, 1)]),
        ("LISTENING", [(1, 8), (2, 7), (3, 5), (4, 8)])
    ]

    for sec, mondai_list in sections:
        local_q_counter = 1
        for mondai_num, count in mondai_list:
            for _ in range(count):
                # Primary lookup by (Section, Mondai, LocalQ#)
                ans_opt = official_answers.get((sec, mondai_num, local_q_counter))
                if ans_opt is None:
                    # Fallback lookup by (Section, Mondai, GlobalIdx)
                    ans_opt = official_answers.get((sec, mondai_num, global_idx))
                    
                expl_text = explanations.get((sec, mondai_num, local_q_counter))
                if expl_text is None:
                    expl_text = explanations.get((sec, mondai_num, global_idx))

                q_status = "VALID"
                if ans_opt is None or expl_text is None:
                    q_status = "NEEDS_REVIEW"
                    has_missing = True

                parsed_questions.append({
                    "globalIndex": global_idx,
                    "section": sec,
                    "mondai": mondai_num,
                    "localQuestionNumber": local_q_counter,
                    "correctAnswer": ans_opt,
                    "explanation": expl_text,
                    "status": q_status
                })
                
                local_q_counter += 1
                global_idx += 1

    overall_status = "NEEDS_REVIEW" if has_missing else "APPROVED"

    return {
        "pdfName": os.path.basename(pdf_path),
        "totalPages": total_pages,
        "answerPagesDetected": ans_pages,
        "explanationPagesDetected": expl_pages,
        "totalQuestions": len(parsed_questions),
        "answersMatched": len([q for q in parsed_questions if q["correctAnswer"] is not None]),
        "explanationsMatched": len([q for q in parsed_questions if q["explanation"] is not None]),
        "status": overall_status,
        "questions": parsed_questions
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_pdf = sys.argv[1]
    else:
        target_pdf = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4\n4-2014-07.pdf"
    
    res = parse_jlpt_pdf(target_pdf)
    print(json.dumps(res, ensure_ascii=False, indent=2))
