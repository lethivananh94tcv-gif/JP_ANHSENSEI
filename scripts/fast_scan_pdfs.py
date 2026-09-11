import fitz
import pytesseract
import os
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pdf_dir = r'frontend/public/pdf/jlpt/n4'

for fname in sorted(os.listdir(pdf_dir)):
    if not fname.endswith('.pdf'): continue
    path = os.path.join(pdf_dir, fname)
    doc = fitz.open(path)
    print(f"\n==================================================")
    print(f"PDF: {fname} (Total Pages: {len(doc)})")
    print(f"==================================================")
    
    start_p = max(0, len(doc) - 15)
    for p in range(start_p, len(doc)):
        pix = doc[p].get_pixmap(dpi=100)
        img_path = f'temp_fast_p{p+1}.png'
        pix.save(img_path)
        img = Image.open(img_path)
        txt = pytesseract.image_to_string(img, lang='chi_sim+eng')
        if os.path.exists(img_path):
            os.remove(img_path)
        
        clean = txt.replace(' ', '').replace('\n', '')
        found = []
        if '参考答案' in clean or '答案' in clean or '正解' in clean:
            found.append('ANSWER_KEY')
        if '试题解析' in clean or '試題解析' in clean or '句意' in clean or '解析' in clean:
            found.append('EXPLANATION')
            
        print(f"  Page {p+1}: {found if found else '[len: ' + str(len(txt)) + ']'}")
        if found:
            lines = [l.strip() for l in txt.splitlines() if l.strip()]
            for l in lines[:6]:
                print(f"    > {l}")
