import json
import re

with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'r', encoding='utf-8') as f:
    text = f.read()

ts_exams = re.findall(r'\n  "([a-zA-Z0-9_-]+)":\s*\{', text)
print("TS exams:", ts_exams)

with open('scripts/master_gold_explanations.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

print("Master exams:", list(master.keys()))
all_exams = sorted(list(set(ts_exams) | set(master.keys())))
print(f"Combined total exams ({len(all_exams)}): {all_exams}")

missing_in_ts = [e for e in master.keys() if e not in ts_exams]
print(f"Missing in TS ({len(missing_in_ts)}): {missing_in_ts}")
