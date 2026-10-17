import pypdf
def inspect_pdf(path):
    try:
        reader = pypdf.PdfReader(path)
        print(f"=== {path} ===")
        print(f"Total pages: {len(reader.pages)}")
        for i in range(min(3, len(reader.pages))):
            txt = reader.pages[i].extract_text()
            print(f"Page {i+1} sample: {txt[:200] if txt else 'NO TEXT (SCANNED IMAGE)'}")
    except Exception as e:
        print(f"Error reading {path}: {e}")

inspect_pdf("frontend/public/pdf/jlpt/n4/n4-2012-12.pdf")
inspect_pdf("frontend/public/pdf/jlpt/n4/n4-2013-07.pdf")
