# -*- coding: utf-8 -*-
import json
import os
from apply_authentic_n4_2013_listening import N4_2013_LISTENING

ts_path = "frontend/src/app/data/jlptDetailedExplanations.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

start_2013 = -1
for i, line in enumerate(lines):
    if '"n4-2013-07": {' in line:
        start_2013 = i
        break

q71_start = -1
for i in range(start_2013, len(lines)):
    if '    "71": {' in lines[i]:
        q71_start = i
        break

end_2013 = -1
for i in range(len(lines) - 1, start_2013, -1):
    if lines[i].strip() == '}' or lines[i].strip() == '},':
        end_2013 = i
        break

print(f"Replacing lines {q71_start+1} to {end_2013} in {ts_path}")

# Build formatted TypeScript code for questions 71..98
new_q_lines = []
for q_idx in range(71, 99):
    item = N4_2013_LISTENING[q_idx]
    new_q_lines.append(f'    "{q_idx}": {{\n')
    new_q_lines.append(f'      "snippet": {json.dumps(item["snippet"], ensure_ascii=False)},\n')
    new_q_lines.append(f'      "explanation": {json.dumps(item["explanation"], ensure_ascii=False)},\n')
    new_q_lines.append(f'      "correctOption": {item["correctOption"]},\n')
    new_q_lines.append(f'      "text": {json.dumps(item["text"], ensure_ascii=False)},\n')
    new_q_lines.append(f'      "options": {json.dumps(item["options"], ensure_ascii=False)},\n')
    new_q_lines.append(f'      "audioScriptJa": {json.dumps(item["audioScriptJa"], ensure_ascii=False)},\n')
    new_q_lines.append(f'      "audioScriptVi": {json.dumps(item["audioScriptVi"], ensure_ascii=False)}\n')
    new_q_lines.append('    },\n')

# Replace the lines in lines
updated_lines = lines[:q71_start] + new_q_lines + lines[end_2013:]

with open(ts_path, "w", encoding="utf-8") as f:
    f.writelines(updated_lines)

print(f"Successfully updated {ts_path} with 100% authentic questions 71..98!")
