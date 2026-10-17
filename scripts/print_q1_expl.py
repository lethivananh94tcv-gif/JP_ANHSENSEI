# -*- coding: utf-8 -*-
import re

with open(r'H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts', encoding='utf-8') as f:
    text = f.read()

m_sec = re.search(r'"n5-2010-2011"\s*:\s*\{(.*?)\n  \},', text, re.DOTALL)
if m_sec:
    sec = m_sec.group(1)
    m1 = re.search(r'"1"\s*:\s*\{[^{]*?"explanation"\s*:\s*"((?:[^"\\]|\\.)*)"', sec)
    if m1:
        expl = m1.group(1).replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
        print("=== EXPLANATION Q1 IN TS ===")
        print(expl)
