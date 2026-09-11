import os
import sys
import json
import fitz # PyMuPDF
import pytesseract
from PIL import Image

# Point pytesseract to tesseract executable if installed, or test easyocr
# Let's check pytesseract path on Windows
tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
if os.path.exists(tesseract_cmd):
    pytesseract.pytesseract.tesseract_cmd = tesseract_cmd

import easyocr

ocr_reader = None

def get_ocr_text(page, page_num):
    # Render page to image pixmap
    pix = page.get_pixmap(dpi=150)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    
    # Try pytesseract first if tesseract is available, otherwise use easyocr
    try:
        text = pytesseract.image_to_string(img, lang='chi_sim+jpn+eng')
        if len(text.strip()) > 20:
            return text
    except Exception as e:
        pass
        
    global ocr_reader
    if ocr_reader is None:
        print("  [OCR] Initializing EasyOCR model...")
        ocr_reader = easyocr.Reader(['ja', 'ch_sim', 'en'])
        
    temp_path = f"temp_p{page_num}.png"
    img.save(temp_path)
    res = ocr_reader.readtext(temp_path)
    if os.path.exists(temp_path):
        os.remove(temp_path)
    text = "\n".join([r[1] for r in res])
    return text

def inspect_pdf(pdf_path):
    print(f"\n==========================================")
    print(f"Inspecting PDF: {os.path.basename(pdf_path)}")
    print(f"==========================================")
    doc = fitz.open(pdf_path)
    
    for i in range(len(doc)):
        page = doc[i]
        text = page.get_text("text").strip()
        if len(text) < 30:
            text = get_ocr_text(page, i+1)
            
        clean_text = text.replace(" ", "")
        
        has_ans = "参考答案" in clean_text or "答案" in clean_text
        has_expl = "试题解析" in clean_text or "試題解析" in clean_text or "解析" in clean_text
        
        if has_ans or has_expl:
            print(f"Page {i+1}: ANS={has_ans}, EXPL={has_expl}")
            print(f"--- Snippet (Page {i+1}) ---")
            lines = [l for l in text.splitlines() if l.strip()]
            for l in lines[:10]:
                print(f"  {l}")

if __name__ == "__main__":
    pdf_dir = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4"
    for fname in sorted(os.listdir(pdf_dir)):
        if fname.endswith(".pdf"):
            inspect_pdf(os.path.join(pdf_dir, fname))
