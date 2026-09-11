import re

with open('frontend/src/app/data/jlptDetailedExplanations.ts', 'r', encoding='utf-8') as f:
    text = f.read()

exams = ["n4-2010-2011", "n4-2012-12", "n4-2013-07", "n4-2014-07", "n4-2017-07", "n4-2018", "n4-2021-12"]

for exam in exams:
    pos = text.find(f'"{exam}":')
    if pos != -1:
        snippet = text[pos:pos+500]
        print(f"=== {exam} ===")
        print(snippet[:300])
        print("\n")
