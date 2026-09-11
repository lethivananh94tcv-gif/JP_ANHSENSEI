import os
import sys
import re
import json
import fitz
from PIL import Image

def extract_2010_expl():
    pdf_path = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4\n4-2010-2011.pdf"
    doc = fitz.open(pdf_path)
    
    # Explanations start at page 16 (0-indexed 15) to page 23
    import pytesseract
    tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    if os.path.exists(tesseract_cmd):
        pytesseract.pytesseract.tesseract_cmd = tesseract_cmd

    full_text = []
    for i in range(15, len(doc)):
        page = doc[i]
        pix = page.get_pixmap(dpi=150)
        temp_img = f"temp_expl_p{i+1}.png"
        pix.save(temp_img)
        
        txt = ""
        try:
            img = Image.open(temp_img)
            txt = pytesseract.image_to_string(img, lang='chi_sim+jpn+eng')
        except Exception:
            pass
            
        if not txt.strip():
            import easyocr
            reader = easyocr.Reader(['ja', 'en'])
            res = reader.readtext(temp_img)
            txt = "\n".join([r[1] for r in res])
            
        if os.path.exists(temp_img):
            os.remove(temp_img)
            
        full_text.append(f"=== PAGE {i+1} ===\n" + txt)

    out_path = r"h:\JP_ANHSENSEI\scripts\raw_2010_expl.txt"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(full_text))
    print(f"Saved raw explanations text to {out_path}")

if __name__ == "__main__":
    extract_2010_expl()
