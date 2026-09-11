import fitz
import pytesseract
import os
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pdf_dir = r'frontend/public/pdf/jlpt/n4'

pdf_answer_pages = [
    ("n4-2010-2011", "n4-2010-2011.pdf", [12]),
    ("n4-2012-12", "n4-2012-12.pdf", [14]),
    ("n4-2013-07", "n4-2013-07.pdf", [13]),
    ("n4-2014-07", "n4-2014-07.pdf", [14]),
    ("n4-2017-07", "n4-2017-07.pdf", [42, 43]),
    ("n4-2018", "n4-2018.pdf", [13]),
    ("n4-2021-12", "n4-2021-12.pdf", [13])
]

for exam_id, fname, p_list in pdf_answer_pages:
    path = os.path.join(pdf_dir, fname)
    doc = fitz.open(path)
    print(f"\n==================================================")
    print(f"EXAM: {exam_id} - Checking Pages: {p_list}")
    print(f"==================================================")
    for p in p_list:
        pix = doc[p-1].get_pixmap(dpi=200)
        img_path = f'temp_ans_{exam_id}_p{p}.png'
        pix.save(img_path)
        img = Image.open(img_path)
        txt = pytesseract.image_to_string(img, lang='chi_sim+eng')
        if os.path.exists(img_path):
            os.remove(img_path)
        
        print(f"--- Page {p} OCR Snippet ---")
        lines = [l.strip() for l in txt.splitlines() if l.strip()]
        for l in lines[:25]:
            print(f"  {l}")
