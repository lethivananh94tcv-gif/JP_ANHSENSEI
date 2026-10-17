import pymupdf as fitz

doc = fitz.open('frontend/public/pdf/jlpt/n4/n4-2021-12.pdf')
print("Total pages in 2021:", len(doc))
for p_idx in range(len(doc)):
    txt = doc[p_idx].get_text()
    if any(k in txt for k in ["正答", "正解", "解答", "参考", "問題１", "問題1"]):
        print(f"=== 2021 PAGE {p_idx+1} ===")
        print(txt[:400])
