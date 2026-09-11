import re

with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'r', encoding='utf-8') as f:
    text = f.read()

exams = re.findall(r'"(n4-[^"]+)": \{', text)
print('Exams found:', exams)

for exam in exams:
    pattern = r'"' + exam + r'": \{([\s\S]*?)\n  \},'
    m = re.search(pattern, text)
    if m:
        block = m.group(1)
        q_count = len(re.findall(r'^\s*"(\d+)": \{', block, re.MULTILINE))
        print(f'  ✓ {exam}: {q_count} questions')
