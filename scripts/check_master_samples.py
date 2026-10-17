import json

with open('scripts/master_gold_explanations.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

for exam in ['n4-2010-2011', 'n4-2012-12', 'n4-2017-07', 'n4-2021-12']:
    print(f"\n=================== EXAM: {exam} ===================")
    data = master.get(exam, {})
    for q in ['1', '10', '35', '71']:
        if q in data:
            item = data[q]
            print(f"--- Q{q} (opt: {item.get('correctOption')}) ---")
            print("Snippet:", item.get('snippet'))
            expl = item.get('explanation', '')
            print("Expl (first 150 chars):", expl[:150].replace('\n', ' -- '))
            if item.get('audioScriptJa'):
                print("Audio Ja:", item.get('audioScriptJa')[:60].replace('\n', ' -- '))
