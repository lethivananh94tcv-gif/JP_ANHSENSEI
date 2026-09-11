import os
import sys
import re
import json
import fitz  # PyMuPDF
from PIL import Image

_ocr_ch = None
_ocr_ja = None

def get_ocr_ch():
    global _ocr_ch
    if _ocr_ch is None:
        import easyocr
        _ocr_ch = easyocr.Reader(['ch_sim', 'en'])
    return _ocr_ch

def get_ocr_ja():
    global _ocr_ja
    if _ocr_ja is None:
        import easyocr
        _ocr_ja = easyocr.Reader(['ja', 'en'])
    return _ocr_ja

def get_page_text_robust(page, page_num):
    text = page.get_text("text").strip()
    if len(text) >= 40:
        return text

    # Try PyMuPDF block extraction
    blocks = page.get_text("blocks")
    block_text = "\n".join([b[4] for b in blocks if len(b) > 4 and b[4].strip()])
    if len(block_text.strip()) >= 40:
        return block_text

    # OCR Fallback with image temp
    temp_img_path = f"temp_univ_p{page_num}.png"
    try:
        pix = page.get_pixmap(dpi=150)
        pix.save(temp_img_path)
        
        # Pytesseract check
        import pytesseract
        tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        if os.path.exists(tesseract_cmd):
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
            try:
                img = Image.open(temp_img_path)
                tess_text = pytesseract.image_to_string(img, lang='chi_sim+jpn+eng')
                if len(tess_text.strip()) > 15:
                    if os.path.exists(temp_img_path):
                        os.remove(temp_img_path)
                    return tess_text
            except Exception:
                pass

        # EasyOCR Chinese + Japanese
        reader_ch = get_ocr_ch()
        res_ch = reader_ch.readtext(temp_img_path)
        txt_ch = "\n".join([r[1] for r in res_ch])
        
        reader_ja = get_ocr_ja()
        res_ja = reader_ja.readtext(temp_img_path)
        txt_ja = "\n".join([r[1] for r in res_ja])

        if os.path.exists(temp_img_path):
            os.remove(temp_img_path)

        return txt_ch + "\n" + txt_ja
    except Exception as e:
        if os.path.exists(temp_img_path):
            os.remove(temp_img_path)
        return text

def parse_universal_pdf(pdf_path):
    pdf_name = os.path.basename(pdf_path)
    print(f"[UniversalParser] Auto-analyzing: {pdf_name}...", file=sys.stderr)
    
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    
    page_texts = []
    ans_page_nums = []
    expl_page_nums = []

    for i in range(total_pages):
        p_num = i + 1
        txt = get_page_text_robust(doc[i], p_num)
        page_texts.append((p_num, txt))
        
        clean = txt.replace(" ", "")
        if "参考答案" in clean or "参考答案・配点" in clean or "答案" in clean or "正解" in clean:
            ans_page_nums.append(p_num)
        if "试题解析" in clean or "試題解析" in clean or "句意：" in clean or ("解析" in clean and ("問題" in clean or "言語知識" in clean or "文法" in clean)):
            expl_page_nums.append(p_num)

    print(f"[UniversalParser] {pdf_name} -> Answer Pages: {ans_page_nums}", file=sys.stderr)
    print(f"[UniversalParser] {pdf_name} -> Explanation Pages: {expl_page_nums}", file=sys.stderr)

    official_answers = {}
    ans_text_combined = "\n".join([page_texts[p-1][1] for p in ans_page_nums]) if ans_page_nums else "\n".join([t[1] for t in page_texts])

    curr_sec = "VOCAB"
    curr_mondai = 1

    lines = ans_text_combined.splitlines()
    for line in lines:
        line_s = line.strip()
        if not line_s:
            continue
        
        if "言語知識" in line_s and ("文字" in line_s or "語彙" in line_s):
            curr_sec = "VOCAB"
        elif "文法" in line_s or "読解" in line_s:
            curr_sec = "GRAMMAR"
        elif "聴解" in line_s:
            curr_sec = "LISTENING"
            
        m_mondai = re.search(r'問題\s*([１２３４５６７8901-9]+)', line_s)
        if m_mondai:
            raw_m = m_mondai.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890'))
            curr_mondai = int(raw_m)

        pairs = re.findall(r'(?:問\s*(\d+)|(?:\(|\（)?(\d+)(?:\)|\）)?)\s*[:：\.-]?\s*[\(（]?([1-4A-D])[\)）]?\b', line_s)
        for p in pairs:
            q_str = p[0] if p[0] else p[1]
            opt_str = p[2]
            if q_str and opt_str:
                q_num = int(q_str)
                opt_map = {'A': 1, 'B': 2, 'C': 3, 'D': 4, '1': 1, '2': 2, '3': 3, '4': 4}
                opt = opt_map.get(opt_str.upper(), 1)
                official_answers[(curr_sec, curr_mondai, q_num)] = opt

    explanations = {}
    expl_text_combined = "\n".join([page_texts[p-1][1] for p in expl_page_nums]) if expl_page_nums else "\n".join([t[1] for t in page_texts])

    curr_sec = "VOCAB"
    curr_mondai = 1
    curr_q_num = None
    curr_lines = []

    expl_lines = expl_text_combined.splitlines()
    for line in expl_lines:
        line_s = line.strip()
        if not line_s:
            continue
            
        if "言語知識" in line_s and ("文字" in line_s or "語彙" in line_s):
            curr_sec = "VOCAB"
        elif "文法" in line_s or "読解" in line_s:
            curr_sec = "GRAMMAR"
        elif "聴解" in line_s:
            curr_sec = "LISTENING"

        m_mondai = re.search(r'問題\s*([１２３４５６７8901-9]+)', line_s)
        if m_mondai:
            raw_m = m_mondai.group(1).translate(str.maketrans('１２３４５６７８９０', '1234567890'))
            curr_mondai = int(raw_m)

        m_q = re.search(r'^(?:\((\d+)\)|問\s*(\d+)|(\d+)[\.\s．])\s*([1-4])?\b', line_s)
        if m_q and (len(line_s) < 50 or "句意" in line_s or "解析" in line_s):
            if curr_q_num and curr_lines:
                explanations[(curr_sec, curr_mondai, curr_q_num)] = "\n".join(curr_lines).strip()
            
            q_str = m_q.group(1) or m_q.group(2) or m_q.group(3)
            curr_q_num = int(q_str)
            curr_lines = [line_s]
        else:
            if curr_q_num:
                curr_lines.append(line_s)

    if curr_q_num and curr_lines:
        explanations[(curr_sec, curr_mondai, curr_q_num)] = "\n".join(curr_lines).strip()

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
                ans_opt = official_answers.get((sec, mondai_num, local_q_counter))
                if ans_opt is None:
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
        "pdfName": pdf_name,
        "totalPages": total_pages,
        "answerPagesDetected": ans_page_nums,
        "explanationPagesDetected": expl_page_nums,
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
    
    res = parse_universal_pdf(target_pdf)
    print(json.dumps(res, ensure_ascii=False, indent=2))
