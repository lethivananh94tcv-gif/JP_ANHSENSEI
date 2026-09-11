import json
import re

def analyze_exam_raw(exam_code, raw_filename):
    with open(raw_filename, 'r', encoding='utf-8') as f:
        text = f.read()

    print(f"\n==========================================")
    print(f"       ANALYZING: {exam_code}")
    print(f"==========================================")

    # Find all Mondai occurrences
    # Matches: 問題 1, 問題 2, もんだい 1, etc.
    mondai_matches = list(re.finditer(r'(?:言語知識|文法|読解|聴解|問題\s*[1-9]|もんだい\s*[1-9])', text))
    for m in mondai_matches[:20]:
        pos = m.start()
        line = text[max(0, pos-10):min(len(text), pos+40)].replace('\n', ' ')
        print(f"  Pos {pos}: {line}")

analyze_exam_raw('n4-2010-2011', 'n4_2010_full_raw.txt')
analyze_exam_raw('n4-2012-12', 'full_raw_n4-2012-12.pdf.txt')
analyze_exam_raw('n4-2013-07', 'full_raw_n4-2013-07.pdf.txt')
analyze_exam_raw('n4-2014-07', 'full_raw_n4-2014-07.pdf.txt')
analyze_exam_raw('n4-2018', 'full_raw_n4-2018.pdf.txt')
