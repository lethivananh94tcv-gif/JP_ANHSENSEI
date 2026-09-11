import os
import sys
import re
import json
import fitz
from PIL import Image

def get_page_ocr_text(page, p_num):
    pix = page.get_pixmap(dpi=150)
    temp_img = f"temp_inspect_p{p_num}.png"
    pix.save(temp_img)
    
    txt = ""
    import pytesseract
    tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    if os.path.exists(tesseract_cmd):
        pytesseract.pytesseract.tesseract_cmd = tesseract_cmd
        try:
            img = Image.open(temp_img)
            txt = pytesseract.image_to_string(img, lang='chi_sim+jpn+eng')
        except Exception:
            pass
            
    if len(txt.strip()) < 30:
        import easyocr
        reader = easyocr.Reader(['ch_sim', 'en'])
        res = reader.readtext(temp_img)
        txt = "\n".join([r[1] for r in res])
        
    if os.path.exists(temp_img):
        os.remove(temp_img)
        
    return txt

def inspect_all_7_pdfs():
    pdf_dir = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4"
    pdf_files = sorted([f for f in os.listdir(pdf_dir) if f.endswith(".pdf")])
    
    for fname in pdf_files:
        full_path = os.path.join(pdf_dir, fname)
        doc = fitz.open(full_path)
        print(f"\n==================================================")
        print(f"PDF FILE: {fname} (Total Pages: {len(doc)})")
        print(f"==================================================")
        
        ans_pages = []
        expl_pages = []
        
        for i in range(len(doc)):
            p_num = i + 1
            txt = doc[i].get_text("text")
            if len(txt.strip()) < 30:
                txt = get_page_ocr_text(doc[i], p_num)
                
            clean = txt.replace(" ", "")
            if "参考答案" in clean or "参考答案・配点" in clean:
                ans_pages.append(p_num)
            if "试题解析" in clean or "試題解析" in clean or "句意：" in clean:
                expl_pages.append(p_num)

        print(f"  Detected Answer Pages (参考答案): {ans_pages}")
        print(f"  Detected Explanation Pages (试题解析): {expl_pages}")

if __name__ == "__main__":
    inspect_all_7_pdfs()
