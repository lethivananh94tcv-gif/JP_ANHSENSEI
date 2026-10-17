# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, r'H:\JP_ANHSENSEI\scripts')
from generate_n5_master_data import N5_2010_DATA

print(f"Total: {len(N5_2010_DATA)}")
for q in range(1, 90):
    d = N5_2010_DATA.get(q)
    if not d:
        print(f"Missing Q{q}")
    else:
        snip = d.get('snippet', '')
        raw = d.get('rawExcerpt', '')
        audio = d.get('audioJa', '')
        has_audio = bool(audio)
        print(f"Q{q:02d} [Ans: {d['opt']}] M:{d.get('mondai')} Sec:{d.get('section')} | {snip[:30]} | {raw[:30] if raw else 'Audio: ' + audio[:30]}")
