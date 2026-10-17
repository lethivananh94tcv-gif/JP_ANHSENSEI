# -*- coding: utf-8 -*-
"""
Kiểm tra chất lượng giải thích N5 trong TS file:
- So sánh explanation trong TS với explanation từ generate_n5_master_data.py
- Phát hiện câu nào có giải thích ngắn/generic/placeholder
"""
import json
import re
import sys
sys.path.insert(0, r'H:\JP_ANHSENSEI\scripts')
from generate_n5_master_data import N5_2010_DATA, format_gold_standard_expl

TS_FILE = r'H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts'

with open(TS_FILE, encoding='utf-8') as f:
    ts_content = f.read()

# Extract n5-2010-2011 section
n5_match = re.search(r'"n5-2010-2011"\s*:\s*\{(.*?)\n  \}', ts_content, re.DOTALL)
if not n5_match:
    print("ERROR: Cannot find n5-2010-2011 section in TS!")
    exit(1)

n5_section = n5_match.group(1)

# Extract individual entries
entry_pattern = re.compile(r'"(\d+)"\s*:\s*\{[^{]*?"explanation"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,', re.DOTALL)
ts_entries = {}
for m in entry_pattern.finditer(n5_section):
    qnum = int(m.group(1))
    expl = m.group(2).replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
    ts_entries[qnum] = expl

print(f"Found {len(ts_entries)} entries in TS n5-2010-2011 section")
print()

# Compare with gold standard
problems = []
good_count = 0
for q_idx in range(1, 90):
    item = N5_2010_DATA.get(q_idx)
    ts_expl = ts_entries.get(q_idx, "")
    
    if not item:
        problems.append(f"Q{q_idx}: MISSING from generate_n5_master_data.py!")
        continue
    
    gold_expl = format_gold_standard_expl(item)
    
    # Check if TS explanation has proper content
    if not ts_expl:
        problems.append(f"Q{q_idx}: EMPTY explanation in TS!")
    elif len(ts_expl) < 100:
        problems.append(f"Q{q_idx}: TOO SHORT ({len(ts_expl)} chars): {ts_expl[:80]}...")
    elif "Đáp án đúng" not in ts_expl and "đáp án" not in ts_expl.lower():
        problems.append(f"Q{q_idx}: Missing answer format: {ts_expl[:100]}...")
    else:
        gold_len = len(gold_expl)
        ts_len = len(ts_expl)
        if ts_len < gold_len * 0.6:
            problems.append(f"Q{q_idx}: TS shorter than gold ({ts_len} vs {gold_len}): {ts_expl[:100]}...")
        else:
            good_count += 1

print(f"Good quality entries: {good_count}/89")
print(f"Problematic entries: {len(problems)}")
print()
for p in problems[:20]:
    print(p)

# Show first 3 gold vs TS comparison
print("\n" + "="*60)
print("SAMPLE COMPARISON (Q1):")
print("GOLD:", format_gold_standard_expl(N5_2010_DATA[1])[:300])
print()
print("TS  :", ts_entries.get(1, "MISSING")[:300])
