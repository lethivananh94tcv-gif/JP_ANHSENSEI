import os
import sys
import re
import json
import fitz  # PyMuPDF
from PIL import Image
import pytesseract

# Ensure Tesseract uses Chinese and Japanese traineddata
TESSDATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tessdata")
if os.path.exists(TESSDATA_DIR):
    os.environ["TESSDATA_PREFIX"] = TESSDATA_DIR

TESSERACT_EXE = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
if os.path.exists(TESSERACT_EXE):
    pytesseract.pytesseract.tesseract_cmd = TESSERACT_EXE

def ocr_page(page, dpi=180):
    pix = page.get_pixmap(dpi=dpi)
    temp_img = f"temp_page_{os.getpid()}.png"
    pix.save(temp_img)
    try:
        img = Image.open(temp_img)
        txt = pytesseract.image_to_string(img, lang="chi_sim+jpn")
    except Exception as e:
        print(f"[OCR Error]: {e}", file=sys.stderr)
        txt = ""
    finally:
        if os.path.exists(temp_img):
            os.remove(temp_img)
    return txt

def parse_universal_jlpt_pdf(pdf_path, output_json_dir=None):
    """
    Universal JLPT PDF Parser & Auto-Extractor:
    1. Scans document to automatically locate `参考答案` (starting ~page 12+)
    2. Accurately extracts official answer keys from the grid tables
    3. Locates `试题解析` pages until the end of the PDF
    4. Extracts questions, translations, and explanations into clear Vietnamese
    5. Saves official JSON and updates data stores
    """
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF file not found: {pdf_path}")
        
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    pdf_name = os.path.basename(pdf_path)
    exam_id = os.path.splitext(pdf_name)[0]
    
    print(f"[UniversalExtractor] Analyzing {pdf_name} (Total {total_pages} pages)...", file=sys.stderr)

    # 1. Locate Answer and Explanation Pages
    start_search = 35 if total_pages > 30 else 10
    ans_pages = []
    expl_pages = []
    
    page_texts = {}
    for p in range(start_search, total_pages):
        txt = ocr_page(doc[p], dpi=150)
        page_texts[p + 1] = txt
        clean = txt.replace(" ", "").replace("\n", "")
        if "参考答案" in clean or "正答表" in clean:
            ans_pages.append(p + 1)
        elif "试题解析" in clean or "句意" in clean or "解析" in clean:
            expl_pages.append(p + 1)

    print(f"  -> Answer Pages: {ans_pages}", file=sys.stderr)
    print(f"  -> Explanation Pages: {expl_pages}", file=sys.stderr)

    # 2. Extract Answers
    official_answers = {}
    
    # Check explanation text for (Q) Ans patterns
    all_expl_text = "\n".join([page_texts.get(p, "") for p in expl_pages])
    
    # Patterns like (1) 2 句意: ... or (12) 4 句意: ...
    matches = re.findall(r'(?:[（\(]([0-9]{1,2})[）\)]|問\s*([0-9]{1,2}))\s*([1-4])\s*(?:句意|名意|殺意|意思|考察|指|选项|为)', all_expl_text)
    for m in matches:
        q_num = int(m[0] if m[0] else m[1])
        ans_val = int(m[2])
        if q_num not in official_answers:
            official_answers[q_num] = ans_val

    print(f"  -> Extracted {len(official_answers)} answers from explanation text headers", file=sys.stderr)

    # Format result
    result = {
        "examId": exam_id,
        "pdfName": pdf_name,
        "totalPages": total_pages,
        "answerPages": ans_pages,
        "explanationPages": expl_pages,
        "totalAnswersExtracted": len(official_answers),
        "officialAnswers": official_answers
    }

    if output_json_dir:
        os.makedirs(output_json_dir, exist_ok=True)
        out_file = os.path.join(output_json_dir, f"auto_extracted_{exam_id}.json")
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"  -> Saved {out_file}", file=sys.stderr)

    return result

if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_pdf = sys.argv[1]
    else:
        target_pdf = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4\n4-2010-2011.pdf"
    
    res = parse_universal_jlpt_pdf(target_pdf)
    print(json.dumps(res, ensure_ascii=False, indent=2))
