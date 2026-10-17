# -*- coding: utf-8 -*-
import json
import sys
sys.path.insert(0, r'H:\JP_ANHSENSEI\scripts')
from generate_n5_master_data import N5_2010_DATA

# Load official answers
with open(r'H:\JP_ANHSENSEI\frontend\src\app\data\scanned_n5_2010_official_answers.json', encoding='utf-8') as f:
    official = json.load(f)

official_ans = official['officialAnswers']
mismatches = []
for q_idx, item in N5_2010_DATA.items():
    official_opt = official_ans.get(str(q_idx))
    python_opt = item['opt']
    if official_opt != python_opt:
        snippet = item['snippet']
        mismatches.append(f'Q{q_idx}: Python={python_opt}, OfficialJSON={official_opt}, snippet={snippet}')

print(f'Total questions in Python: {len(N5_2010_DATA)}')
print(f'Total questions in Official JSON: {len(official_ans)}')
print(f'Mismatches: {len(mismatches)}')
for m in mismatches:
    print(m)

# Check if n5 key exists in explanations ts
with open(r'H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts', encoding='utf-8') as f:
    ts_content = f.read()

print()
if '"n5-2010-2011"' in ts_content:
    print('N5 key EXISTS in jlptDetailedExplanations.ts')
    # Count entries
    import re
    n5_section = re.search(r'"n5-2010-2011"\s*:\s*\{(.*?)\n  \}', ts_content, re.DOTALL)
    if n5_section:
        entries = re.findall(r'"(\d+)"\s*:', n5_section.group(1))
        print(f'N5 entries in TS: {len(entries)}')
else:
    print('N5 key MISSING from jlptDetailedExplanations.ts')
