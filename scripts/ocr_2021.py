import pymupdf as fitz
import pytesseract
from PIL import Image
import io

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

doc = fitz.open('frontend/public/pdf/jlpt/n4/n4-2021-12.pdf')
print("Pages in 2021:", len(doc))

# Check last 4 pages (17, 18, 19, 20)
for p in range(len(doc)-4, len(doc)):
    page = doc[p]
    pix = page.get_pixmap(dpi=150)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    text = pytesseract.image_to_string(img, lang="jpn+chi_sim+eng")
    print(f"\n=== OCR Page {p+1} ===")
    print(text[:400])
