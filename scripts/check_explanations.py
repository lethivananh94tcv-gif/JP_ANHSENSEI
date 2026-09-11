with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if l.strip().startswith('"n4-'):
        print(f"Line {i+1}: {l.strip()}")
