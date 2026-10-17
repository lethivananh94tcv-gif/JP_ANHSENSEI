import re
with open("frontend/src/app/data/jlptDetailedExplanations.ts", "r", encoding="utf-8") as f:
    content = f.read()

keys = re.findall(r'"(n[3-5]-[a-zA-Z0-9_-]+)":\s*\{', content)
print("Keys in EXAM_DETAILED_EXPLANATION_MAP:", keys)
