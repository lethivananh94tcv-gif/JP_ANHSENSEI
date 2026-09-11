import fitz
import pytesseract
import os
import json
import re
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

results = {}

for exam_id, fname in pdf_files:
    pdf_path = os.path.join(pdf_dir, fname)
    if not os.path.exists(pdf_path):
        continue
        
    doc = fitz.open(pdf_path)
    print(f"\n==================================================")
    print(f"Processing Exam: {exam_id} ({fname}), Total Pages: {len(doc)}")
    print(f"==================================================")
    
    # 1. Search for Answer Key Page (参考答案)
    ans_page = None
    expl_pages = []
    
    for p in range(len(doc)):
        pix = doc[p].get_pixmap(dpi=150)
        img_path = f'temp_p{p+1}.png'
        pix.save(img_path)
        img = Image.open(img_path)
        
        txt = pytesseract.image_to_string(img, lang='chi_sim+jpn+eng')
        if os.path.exists(img_path):
            os.remove(img_path)
            
        clean = txt.replace(' ', '').replace('\n', '')
        if '参考答案' in clean or '答案' in clean or '正解' in clean:
            if not ans_page:
                ans_page = p + 1
        if '试题解析' in clean or '試題解析' in clean or '句意' in clean or '【解析】' in clean:
            expl_pages.append(p + 1)

    print(f"[{exam_id}] Detected Answer Page: {ans_page}, Explanation Pages: {expl_pages}")
    results[exam_id] = {
        "ans_page": ans_page,
        "expl_pages": expl_pages,
        "total_pages": len(doc)
    }

print("\nSUMMARY:")
print(json.dumps(results, indent=2))
