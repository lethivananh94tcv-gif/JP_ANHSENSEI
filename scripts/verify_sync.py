import json
import re
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sync_all_official_answers_and_structure import EXAMS

with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'r', encoding='utf-8') as fp:
    ts_text = fp.read()

total_errors = 0

for exam_code, title, src_file, total_q, gt_dict in EXAMS:
    clean_name = exam_code.replace('-', '_')
    json_path = f'frontend/src/app/data/scanned_{clean_name}_official_answers.json'
    with open(json_path, 'r', encoding='utf-8') as fp:
        json_answers = json.load(fp)['officialAnswers']
    
    json_mismatches = []
    ts_mismatches = []
    
    # Find exam block in TS
    start_token = f'"{exam_code}":'
    pos1 = ts_text.find(start_token)
    pos2 = ts_text.find('\n  },', pos1) if pos1 != -1 else -1
    exam_ts_block = ts_text[pos1:pos2] if pos1 != -1 and pos2 != -1 else ''
    
    for q_idx, exp_opt in gt_dict.items():
        j_val = json_answers.get(str(q_idx))
        if j_val != exp_opt:
            json_mismatches.append((q_idx, exp_opt, j_val))
        
        q_token = f'"{q_idx}":'
        q_pos = exam_ts_block.find(q_token)
        if q_pos != -1:
            q_block = exam_ts_block[q_pos:q_pos+1800]
            m = re.search(r'"correctOption":\s*(\d+)', q_block)
            m_header = re.search(r'🎯\\s*Đáp án đúng:\\s*\[(\d+)\]', q_block)
            if m:
                c_opt = int(m.group(1))
                if c_opt != exp_opt:
                    ts_mismatches.append((q_idx, exp_opt, c_opt))
            else:
                ts_mismatches.append((q_idx, exp_opt, 'NO_OPT'))
        else:
            ts_mismatches.append((q_idx, exp_opt, 'MISSING_Q'))

    print(f'=== AUDIT: {exam_code} ===')
    print(f'  Target count:    {total_q}')
    print(f'  JSON mismatches: {len(json_mismatches)}')
    print(f'  TS mismatches:   {len(ts_mismatches)}')
    if json_mismatches:
        print('    JSON details:', json_mismatches[:5])
        total_errors += len(json_mismatches)
    if ts_mismatches:
        print('    TS details:', ts_mismatches[:5])
        total_errors += len(ts_mismatches)

if total_errors == 0:
    print('\n🎉 PERFECT AUDIT! 100% Zero Mismatches across all exams!')
else:
    print(f'\n❌ Found {total_errors} total errors.')
