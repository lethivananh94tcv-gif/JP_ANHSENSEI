import pymupdf as fitz
import pytesseract
from PIL import Image
import io

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

doc = fitz.open('frontend/public/pdf/jlpt/n4/n4-2021-12.pdf')
for p in range(len(doc)):
    page = doc[p]
    pix = page.get_pixmap(dpi=100)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    # Quick OCR
    txt = pytesseract.image_to_string(img, lang="eng")
    if any(k in txt.lower() for k in ["answer", "key", "seikai", "mondai", "score"]) or len(txt.split()) < 10:
        print(f"Page {p+1}: {txt[:100].replace(chr(10), ' ')}")
