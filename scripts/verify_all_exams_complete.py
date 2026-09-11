import re
import json
import glob

with open("frontend/src/app/data/jlptDetailedExplanations.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Only match top-level exam keys (indented by exactly 2 spaces)
exams = re.findall(r'^  "([a-z0-9-]+)": \{', text, re.MULTILINE)
print(f"Total exams in jlptDetailedExplanations.ts: {len(exams)}")
for e in exams:
    # Match the block for this exam
    m = re.search(r'^  "' + re.escape(e) + r'": \{(.*?)\n  \},', text, re.DOTALL | re.MULTILINE)
    if m:
        qs = re.findall(r'^    "(\d+)": \{', m.group(1), re.MULTILINE)
        print(f"  ✓ Exam [{e}]: {len(qs)} detailed Vietnamese explanations (Q{qs[0]} to Q{qs[-1]})")

print("\nOfficial Answers JSON Verification:")
for p in sorted(glob.glob("frontend/src/app/data/scanned_n4_*_official_answers.json")):
    with open(p, "r", encoding="utf-8") as f:
        d = json.load(f)
    print(f"  ✓ [{d['examCode']}]: {len(d['officialAnswers'])} official answers (Expected: {d['totalQuestions']}) -> File: {p.split('/')[-1]}")
