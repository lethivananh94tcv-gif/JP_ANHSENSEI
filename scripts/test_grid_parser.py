import os
import sys
import re
import json
import fitz
from PIL import Image

def get_page_ocr_text(page, p_num):
    pix = page.get_pixmap(dpi=150)
    temp_img = f"temp_grid_find_p{p_num}.png"
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

def scan_all_pdf_grids():
    pdf_dir = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4"
    for fname in sorted(os.listdir(pdf_dir)):
        if fname.endswith(".pdf"):
            full_path = os.path.join(pdf_dir, fname)
            doc = fitz.open(full_path)
            found_ans = False
            for p_idx in range(len(doc)):
                txt = doc[p_idx].get_text("text")
                if len(txt.strip()) < 30:
                    txt = get_page_ocr_text(doc[p_idx], p_idx+1)
                    
                clean = txt.replace(" ", "")
                if "参考答案" in clean or "参考答案・配点" in clean:
                    found_ans = True
                    print(f"\n==========================================")
                    print(f"PDF: {fname} (Answer Key Page: {p_idx+1})")
                    print(f"==========================================")
                    lines = [l.strip() for l in txt.splitlines() if l.strip()]
                    for l in lines[:25]:
                        print(f"  {l}")

if __name__ == "__main__":
    scan_all_pdf_grids()
