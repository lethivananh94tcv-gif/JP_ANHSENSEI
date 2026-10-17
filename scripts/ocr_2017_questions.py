import pymupdf as fitz
import pytesseract
from PIL import Image
import io

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

doc = fitz.open('frontend/public/pdf/jlpt/n4/n4-2017-07.pdf')
# Pages 2, 3, 4 are Mondai 1 & 2
for p in [1, 2, 3]:
    pix = doc[p].get_pixmap(dpi=150)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    text = pytesseract.image_to_string(img, lang="jpn+chi_sim+eng")
    print(f"\n=== 2017 Page {p+1} ===")
    print(text[:500])
