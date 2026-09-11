import fitz
import pytesseract
import os
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pdf_dir = r'frontend/public/pdf/jlpt/n4'

pdf_files = [
    ("n4-2010-2011", "n4-2010-2011.pdf"),
    ("n4-2012-12", "n4-2012-12.pdf"),
    ("n4-2013-07", "n4-2013-07.pdf"),
    ("n4-2014-07", "n4-2014-07.pdf"),
    ("n4-2017-07", "n4-2017-07.pdf"),
    ("n4-2018", "n4-2018.pdf"),
    ("n4-2021-12", "n4-2021-12.pdf")
]

for exam_id, fname in pdf_files:
    path = os.path.join(pdf_dir, fname)
    doc = fitz.open(path)
    print(f"\n==================================================")
    print(f"SEARCHING PDF: {exam_id} ({fname}) - Total {len(doc)} pages")
    print(f"==================================================")
    
    found = []
    for p in range(len(doc)):
        pix = doc[p].get_pixmap(dpi=120)
        img_path = f'temp_search_p{p+1}.png'
        pix.save(img_path)
        img = Image.open(img_path)
        txt = pytesseract.image_to_string(img, lang='chi_sim+eng')
        if os.path.exists(img_path):
            os.remove(img_path)
            
        clean = txt.replace(' ', '').replace('\n', '')
        if '参考答案' in clean or '答案' in clean or '正解' in clean:
            found.append(p+1)
            print(f"  FOUND ON PAGE {p+1}:")
            lines = [l.strip() for l in txt.splitlines() if l.strip()]
            for l in lines[:10]:
                print(f"    > {l}")
    if not found:
        print("  NO '参考答案' text found in OCR!")
