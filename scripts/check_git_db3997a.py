import subprocess
import re

txt = subprocess.check_output(['git', 'show', 'db3997a:frontend/src/app/data/jlptDetailedExplanations.ts'], text=True, encoding='utf-8')
keys = re.findall(r'  "([a-zA-Z0-9_-]+)": \{', txt)
print("Keys in db3997a:", keys)

for k in keys:
    m = re.search(r'  "' + k + r'": \{(.*?)\n  \},', txt, re.DOTALL)
    if m:
        qs = re.findall(r'    "(\d+)": \{', m.group(1))
        print(f"  {k}: {len(qs)} questions (Q{qs[0]} to Q{qs[-1]})")
