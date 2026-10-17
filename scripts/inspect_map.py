import re

with open("frontend/src/app/data/jlptDetailedExplanations.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Find top level keys in EXAM_DETAILED_EXPLANATION_MAP
top_keys = re.findall(r'^\s*\"([^\"]+)\":\s*\{', text, re.MULTILINE)
print("Top level keys in EXAM_DETAILED_EXPLANATION_MAP:")
for k in top_keys:
    print(" -", k)
