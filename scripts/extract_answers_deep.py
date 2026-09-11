import re

def extract_answers_from_raw(fname):
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()

    print(f"=== Extracting answers from {fname} ===")
    
    # Extract from 试题解析
    # Lines like (1) 3 句意 or (1)3 句意 or 0) 2 杀意 or (31) 3 さいきん 意思是
    pattern = r'^\s*[(（]?\s*([0-9]{1,2})\s*[)）]?\s*([1-4])\s*(?:句意|殺意|名意|铝意|旬意|意思是|正)'
    matches = re.findall(pattern, text, re.MULTILINE)
    print(f"Found {len(matches)} question-answer pairs with regex 1:")
    for q, a in matches[:15]:
        print(f"  Q({q}) -> {a}")

extract_answers_from_raw('full_raw_n4-2018.pdf.txt')
extract_answers_from_raw('full_raw_n4-2014-07.pdf.txt')
extract_answers_from_raw('full_raw_n4-2013-07.pdf.txt')
extract_answers_from_raw('full_raw_n4-2012-12.pdf.txt')
