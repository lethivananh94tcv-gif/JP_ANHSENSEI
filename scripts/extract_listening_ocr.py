# -*- coding: utf-8 -*-
import os
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
os.environ['TESSDATA_PREFIX'] = r'H:\JP_ANHSENSEI\scripts\tessdata'

for p in [19, 20, 21]:
    img = Image.open(rf'H:\JP_ANHSENSEI\scratch\n5_pages\page_{p}.png')
    txt = pytesseract.image_to_string(img, lang='jpn')
    out_file = rf'H:\JP_ANHSENSEI\scratch\n5_pages\page_{p}_ocr.txt'
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(txt)
    print(f'Page {p} OCR saved ({len(txt)} chars) to {out_file}')
