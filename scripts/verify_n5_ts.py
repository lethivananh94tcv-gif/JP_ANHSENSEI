# -*- coding: utf-8 -*-
import re

with open(r'H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts', encoding='utf-8') as f:
    text = f.read()

for k in ['n5-2010-2011', 'n5-2026-new']:
    m = re.search(r'"' + k + r'"\s*:\s*\{', text)
    if m:
        print(f"Key {k}: FOUND")
    else:
        print(f"Key {k}: NOT FOUND")

# Check first 10 questions of n5-2010-2011 in TS
m_sec = re.search(r'"n5-2010-2011"\s*:\s*\{(.*?)\n  \},', text, re.DOTALL)
if m_sec:
    sec = m_sec.group(1)
    for q in range(1, 11):
        mq = re.search(r'"' + str(q) + r'"\s*:\s*\{[^{]*?"snippet"\s*:\s*"([^"]+)"[^{]*?"correctOption"\s*:\s*(\d+)', sec)
        if mq:
            print(f"Q{q:02d}: snippet={mq.group(1)}, opt={mq.group(2)}")
        else:
            print(f"Q{q:02d}: not found")
