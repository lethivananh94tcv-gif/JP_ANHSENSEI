import re

with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Find keys that are top-level keys in EXAM_DETAILED_EXPLANATION_MAP
# Top-level keys have 2 spaces indentation: '  "n4-2010-2011": {'
keys = re.findall(r'^  "([^"]+)":\s*\{', text, flags=re.MULTILINE)
print('Top level keys in EXAM_DETAILED_EXPLANATION_MAP:')
for k in keys:
    print(' -', k)
