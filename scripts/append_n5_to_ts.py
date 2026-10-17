# -*- coding: utf-8 -*-
from generate_n5_master_data import N5_2010_DATA, format_gold_standard_expl
import json
import re

ts_file = r'H:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts'
content = open(ts_file, 'r', encoding='utf-8').read()

entries_ts = []
for q_idx, item in N5_2010_DATA.items():
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

if '"n5-2010-2011"' not in content:
    idx = content.rfind('};')
    if idx > 0:
        new_content = content[:idx] + n5_block + content[idx:]
        open(ts_file, 'w', encoding='utf-8').write(new_content)
        print('Successfully appended N5 data to jlptDetailedExplanations.ts!')
    else:
        print('Could not find closing };')
else:
    print('Updating N5 data in jlptDetailedExplanations.ts...')
    new_content = re.sub(r'  "n5-2010-2011":\s*\{.*?\n  \},?\n', '', content, flags=re.DOTALL)
    new_content = re.sub(r'  "n5-2026-new":\s*\{.*?\n  \},?\n', '', new_content, flags=re.DOTALL)
    idx = new_content.rfind('};')
    new_content = new_content[:idx] + n5_block + new_content[idx:]
    open(ts_file, 'w', encoding='utf-8').write(new_content)
    print('Updated N5 data successfully!')
