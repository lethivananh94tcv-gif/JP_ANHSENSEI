import pymupdf as fitz
import pytesseract
from PIL import Image
import io

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

doc = fitz.open('frontend/public/pdf/jlpt/n4/n4-2012-12.pdf')
for p in [13, 14, 15]: # pages 14, 15, 16
    page = doc[p]
    pix = page.get_pixmap(dpi=150)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    text = pytesseract.image_to_string(img, lang="jpn+chi_sim+eng")
    print(f"\n=== 2012 Page {p+1} ===")
    print(text[:400])
