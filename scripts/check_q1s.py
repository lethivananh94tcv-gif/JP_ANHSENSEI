import re

with open("frontend/src/app/data/jlptDetailedExplanations.ts", "r", encoding="utf-8") as f:
    content = f.read()

for key in ['n4-2010-2011', 'n4-2012-12', 'n4-2013-07', 'n4-2014-07', 'n4-2018', 'n5-2010-2011']:
    # Find block for key
    idx = content.find(f'"{key}":')
    if idx != -1:
        # find "1": { ... }
        q1_match = re.search(r'"1":\s*\{\s*"snippet":\s*"([^"]+)",\s*"explanation":\s*"([^"\\]*(?:\\.[^"\\]*)*)"', content[idx:idx+1500])
        if q1_match:
            print(f"[{key}] Q1 snippet: {q1_match.group(1)}")
            print(f"[{key}] Q1 expl snippet: {q1_match.group(2)[:100]}")
            print("-" * 50)
