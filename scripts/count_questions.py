import re

with open("frontend/src/app/data/jlptDetailedExplanations.ts", "r", encoding="utf-8") as f:
    content = f.read()

keys = ['n4-2010-2011', 'n4-2012-12', 'n4-2013-07', 'n4-2014-07', 'n4-2018', 'n5-2010-2011', 'n5-2026-new']

for k in keys:
    idx = content.find(f'"{k}":')
    if idx != -1:
        # find end of block (next key or end of dict)
        next_indices = [content.find(f'"{other}":', idx + 10) for other in keys if content.find(f'"{other}":', idx + 10) != -1]
        end_idx = min(next_indices) if next_indices else len(content)
        block = content[idx:end_idx]
        q_count = len(re.findall(r'"(\d+)":\s*\{', block))
        print(f"Exam '{k}': {q_count} questions found in EXAM_DETAILED_EXPLANATION_MAP")
