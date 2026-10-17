# -*- coding: utf-8 -*-
import sys
import json
import re

sys.path.insert(0, r'H:\JP_ANHSENSEI\scripts')
from accurate_listening_data import ACCURATE_LISTENING_DATA
import generate_n5_master_data

# 1. Update in-memory dict
for q_idx, data in ACCURATE_LISTENING_DATA.items():
    generate_n5_master_data.N5_2010_DATA[q_idx] = data

print(f"Total questions in master data: {len(generate_n5_master_data.N5_2010_DATA)}")

# 2. Re-generate entries for TS
from generate_n5_master_data import N5_2010_DATA, format_gold_standard_expl

ts_file = r'H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts'
content = open(ts_file, 'r', encoding='utf-8').read()

entries_ts = []
for q_idx in range(1, 90):
    item = N5_2010_DATA[q_idx]
    expl_str = format_gold_standard_expl(item)
    expl_json = json.dumps(expl_str, ensure_ascii=False)
    snippet_json = json.dumps(item['snippet'], ensure_ascii=False)
    ja_json = json.dumps(item.get('audioJa'), ensure_ascii=False) if item.get('audioJa') else 'undefined'
    vi_json = json.dumps(item.get('audioVi'), ensure_ascii=False) if item.get('audioVi') else 'undefined'
    opt = item['opt']

    entry = f'''    "{q_idx}": {{
      "snippet": {snippet_json},
      "explanation": {expl_json},
      "correctOption": {opt},
      "audioScriptJa": {ja_json},
      "audioScriptVi": {vi_json}
    }}'''
    entries_ts.append(entry)

block_body = ',\n'.join(entries_ts)
n5_block = f'''  "n5-2010-2011": {{\n{block_body}\n  }},\n  "n5-2026-new": {{\n{block_body}\n  }},\n'''

new_content = re.sub(r'  "n5-2010-2011":\s*\{.*?\n  \},?\n', '', content, flags=re.DOTALL)
new_content = re.sub(r'  "n5-2026-new":\s*\{.*?\n  \},?\n', '', new_content, flags=re.DOTALL)
idx = new_content.rfind('};')
if idx > 0:
    new_content = new_content[:idx] + n5_block + new_content[idx:]
    open(ts_file, 'w', encoding='utf-8').write(new_content)
    print("Successfully updated jlptDetailedExplanations.ts with accurate listening explanations!")
else:
    print("ERROR: Could not find closing }; in ts_file")
    exit(1)

# 3. Also update master_gold_explanations.json if it exists
master_json_path = r'H:\JP_ANHSENSEI\scripts\master_gold_explanations.json'
try:
    with open(master_json_path, 'r', encoding='utf-8') as f:
        master_data = json.load(f)
    if "n5-2010-2011" in master_data:
        for q_idx, data in ACCURATE_LISTENING_DATA.items():
            expl = format_gold_standard_expl(data)
            master_data["n5-2010-2011"][str(q_idx)] = {
                "snippet": data["snippet"],
                "explanation": expl,
                "correctOption": data["opt"],
                "audioScriptJa": data.get("audioJa"),
                "audioScriptVi": data.get("audioVi")
            }
        with open(master_json_path, 'w', encoding='utf-8') as f:
            json.dump(master_data, f, ensure_ascii=False, indent=2)
        print("Updated master_gold_explanations.json successfully!")
except Exception as e:
    print("master_gold_explanations update note:", e)

# 4. Verify questions 66..89
for q in range(66, 90):
    item = N5_2010_DATA[q]
    print(f"Q{q} [Ans: {item['opt']}] - {item['snippet'][:35]}")
