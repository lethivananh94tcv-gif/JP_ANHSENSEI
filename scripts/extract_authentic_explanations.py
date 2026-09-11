import os
import sys
import re
import json
import fitz # PyMuPDF
from PIL import Image

def get_page_text(page, page_num):
    text = page.get_text("text").strip()
    if len(text) >= 40:
        return text
    
    # Try PyMuPDF blocks
    blocks = page.get_text("blocks")
    block_text = "\n".join([b[4] for b in blocks if len(b) > 4 and b[4].strip()])
    if len(block_text.strip()) >= 40:
        return block_text

    # OCR Fallback
    try:
        pix = page.get_pixmap(dpi=150)
        temp_img_path = f"temp_expl_p{page_num}.png"
        pix.save(temp_img_path)
        
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

        import easyocr
        reader = easyocr.Reader(['ja', 'en'])
        ocr_results = reader.readtext(temp_img_path)
        if os.path.exists(temp_img_path):
            os.remove(temp_img_path)
        return "\n".join([r[1] for r in ocr_results])
    except Exception as e:
        return text

def extract_pdf_explanations(pdf_path):
    print(f"\n==========================================")
    print(f"Extracting Authentic Explanations: {os.path.basename(pdf_path)}")
    print(f"==========================================")
    doc = fitz.open(pdf_path)
    
    expl_text_list = []
    for i in range(len(doc)):
        p_num = i + 1
        txt = get_page_text(doc[i], p_num)
        clean = txt.replace(" ", "")
        if "试题解析" in clean or "試題解析" in clean or "句意：" in clean or "解析" in clean:
            print(f"  Detected Explanation Page {p_num}")
            expl_text_list.append(txt)
            
    full_expl_text = "\n".join(expl_text_list)
    return full_expl_text

if __name__ == "__main__":
    pdf_path = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4\n4-2010-2011.pdf"
    text = extract_pdf_explanations(pdf_path)
    print(f"Total Extracted Text Length: {len(text)}")
    print("--- FIRST 1000 CHARACTERS ---")
    print(text[:1000])
