import pymupdf as fitz

doc = fitz.open('frontend/public/pdf/jlpt/n4/n4-2017-07.pdf')
print("=== PAGE 43 ===")
print(doc[42].get_text())
print("=== PAGE 44 ===")
print(doc[43].get_text())
