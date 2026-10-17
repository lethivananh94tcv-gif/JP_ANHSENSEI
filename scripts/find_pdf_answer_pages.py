import os
import pymupdf as fitz
import re

pdf_dir = "frontend/public/pdf/jlpt/n4"
files = [
    "n4-2010-2011.pdf",
    "n4-2012-12.pdf",
    "n4-2013-07.pdf",
    "n4-2014-07.pdf",
    "n4-2017-07.pdf",
    "n4-2018.pdf",
    "n4-2021-12.pdf"
]

for fname in files:
    path = os.path.join(pdf_dir, fname)
    if not os.path.exists(path):
        print(f"File missing: {fname}")
        continue
    doc = fitz.open(path)
    print(f"\n=======================================================")
    print(f"FILE: {fname} (Total pages: {len(doc)})")
    print(f"=======================================================")
    
    # Search for answer key keywords: 正答表, 正解, 解答, 参考答案
    found_pages = []
    for p_idx in range(len(doc)):
        text = doc[p_idx].get_text()
        if any(kw in text for kw in ["正答", "正解", "解答", "参考答案", "正 答 表"]):
            found_pages.append((p_idx + 1, text[:300].replace('\n', ' ')))
            
    print(f"Found {len(found_pages)} pages with answer keywords:")
    for p_num, snippet in found_pages[:5]:
        print(f"  Page {p_num}: {snippet[:120]}")
