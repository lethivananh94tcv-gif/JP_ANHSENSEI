# -*- coding: utf-8 -*-
import json
import re

# 1. Load official JSON
with open(r'H:\JP_ANHSENSEI\frontend\src\app\data\scanned_n5_2010_official_answers.json', encoding='utf-8') as f:
    official_json = json.load(f)['officialAnswers']

# 2. PDF Answer key from user's authentic screenshots
pdf_answers = {
    # Moji/Goi (1..33)
    1: 2, 2: 4, 3: 1, 4: 2, 5: 2, 6: 3, 7: 4, 8: 2, 9: 2, 10: 3,
    11: 1, 12: 2, 13: 3, 14: 4, 15: 4, 16: 1, 17: 3, 18: 1,
    19: 4, 20: 3, 21: 1, 22: 1, 23: 3, 24: 2, 25: 1, 26: 4, 27: 2, 28: 4,
    29: 3, 30: 1, 31: 2, 32: 3, 33: 4,

    # Bunpou / Dokkai (34..65)
    # Mondai 1 (1..16): Global 34..49
    34: 2, 35: 3, 36: 2, 37: 4, 38: 3, 39: 2, 40: 3, 41: 1,
    42: 3, 43: 3, 44: 1, 45: 1, 46: 4, 47: 2, 48: 4, 49: 1,
    # Mondai 2 (17..21): Global 50..54
    50: 4, 51: 1, 52: 4, 53: 2, 54: 2,
    # Mondai 3 (22..26): Global 55..59
    55: 4, 56: 2, 57: 4, 58: 3, 59: 1,
    # Mondai 4 (27..29): Global 60..62
    60: 2, 61: 3, 62: 4,
    # Mondai 5 (30..31): Global 63..64
    63: 4, 64: 3,
    # Mondai 6 (32): Global 65
    65: 2,

    # Choukai (66..89)
    # Mondai 1 (1..7): Global 66..72
    66: 2, 67: 2, 68: 3, 69: 3, 70: 1, 71: 4, 72: 4,
    # Mondai 2 (1..6): Global 73..78
    73: 4, 74: 3, 75: 2, 76: 4, 77: 1, 78: 3,
    # Mondai 3 (1..5): Global 79..83
    79: 1, 80: 3, 81: 2, 82: 3, 83: 2,
    # Mondai 4 (1..6): Global 84..89
    84: 1, 85: 1, 86: 2, 87: 3, 88: 3, 89: 1
}

# 3. Read from TS
with open(r'H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts', encoding='utf-8') as f:
    ts_text = f.read()

m_sec = re.search(r'"n5-2010-2011"\s*:\s*\{(.*?)\n  \},', ts_text, re.DOTALL)
ts_opts = {}
if m_sec:
    sec = m_sec.group(1)
    for q in range(1, 90):
        mq = re.search(r'"' + str(q) + r'"\s*:\s*\{[^{]*?"correctOption"\s*:\s*(\d+)', sec)
        if mq:
            ts_opts[q] = int(mq.group(1))

# 4. Compare all
all_good = True
for q in range(1, 90):
    pdf_opt = pdf_answers[q]
    json_opt = official_json.get(str(q))
    ts_opt = ts_opts.get(q)

    if json_opt != pdf_opt or ts_opt != pdf_opt:
        all_good = False
        print(f"MISMATCH Q{q:02d}: PDF={pdf_opt}, JSON={json_opt}, TS={ts_opt}")

if all_good:
    print("SUCCESS: 100% OF ALL 89 QUESTIONS MATCH THE OFFICIAL PDF ANSWER KEY!")
else:
    print("FAILED: Some questions still mismatched!")
