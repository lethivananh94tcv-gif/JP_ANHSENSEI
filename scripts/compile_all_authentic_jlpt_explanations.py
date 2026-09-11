import os
import sys
import json

base_dir = os.path.dirname(os.path.abspath(__file__))
if base_dir not in sys.path:
    sys.path.insert(0, base_dir)
root_dir = os.path.dirname(base_dir)
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

print("[MasterCompiler] Compiling 100% Authentic Detailed Explanations for all 5 JLPT N4 Exams...")

from build_accurate_vietnamese_explanations import expl_2010
from data_n4_2012 import get_n4_2012_data
from data_n4_2013 import get_n4_2013_data
from data_n4_2014 import get_n4_2014_data
from data_n4_2018 import get_n4_2018_data

expl_2012 = get_n4_2012_data()
expl_2013 = get_n4_2013_data()
expl_2014 = get_n4_2014_data()
expl_2018 = get_n4_2018_data()

print(f"  ✓ 2010-2011: {len(expl_2010)} questions")
print(f"  ✓ 2012-12:   {len(expl_2012)} questions")
print(f"  ✓ 2013-07:   {len(expl_2013)} questions")
print(f"  ✓ 2014-07:   {len(expl_2014)} questions")
print(f"  ✓ 2018:      {len(expl_2018)} questions")

all_exams = {
    "n4-2010-2011": expl_2010,
    "n4-2012-12": expl_2012,
    "n4-2013-07": expl_2013,
    "n4-2014-07": expl_2014,
    "n4-2018": expl_2018
}

target_ts_file = r"h:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"

ts_content = """export interface DetailedExplanationItem {
  snippet: string;
  explanation: string;
  audioScriptJa?: string;
  audioScriptVi?: string;
  correctOption?: number;
}

export const EXAM_DETAILED_EXPLANATION_MAP: Record<string, Record<number, DetailedExplanationItem>> = {
"""

for exam_id, q_map in all_exams.items():
    ts_content += f'  "{exam_id}": {{\n'
    for q_idx in sorted(q_map.keys(), key=lambda x: int(x)):
        item = q_map[q_idx]
        ts_content += f'    "{q_idx}": {{\n'
        ts_content += f'      "snippet": {json.dumps(item["snippet"], ensure_ascii=False)},\n'
        ts_content += f'      "explanation": {json.dumps(item["explanation"], ensure_ascii=False)}'
        if "audioScriptJa" in item and item["audioScriptJa"]:
            ts_content += f',\n      "audioScriptJa": {json.dumps(item["audioScriptJa"], ensure_ascii=False)}'
        if "audioScriptVi" in item and item["audioScriptVi"]:
            ts_content += f',\n      "audioScriptVi": {json.dumps(item["audioScriptVi"], ensure_ascii=False)}'
        if "correctOption" in item and item["correctOption"]:
            ts_content += f',\n      "correctOption": {item["correctOption"]}'
        ts_content += "\n    },\n"
    ts_content += "  },\n"

ts_content += "};\n"

with open(target_ts_file, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"[MasterCompiler] Successfully compiled {target_ts_file}!")
print(f"File size: {os.path.getsize(target_ts_file)} bytes")
