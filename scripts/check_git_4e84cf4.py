import subprocess
import re

txt = subprocess.check_output(['git', 'show', '4e84cf4:frontend/src/app/data/jlptDetailedExplanations.ts'], text=True, encoding='utf-8')
keys = re.findall(r'^  "([a-z0-9-]+)": \{', txt, re.MULTILINE)
print("Top-level keys in 4e84cf4:", keys)
