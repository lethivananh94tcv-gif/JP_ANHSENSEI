import json

for fname in ['auto_parsed_n4-2017-07.json', 'auto_parsed_n4-2021-12.json']:
    with open(f'scripts/{fname}', 'r', encoding='utf-8') as f:
        d = json.load(f)
    print(f"\n=== {fname} ({len(d)} keys) ===")
    for k in ['1', '5', '10', '35', '71', '98']:
        item = d.get(k, {})
        snip = item.get('snippet', '')
        opt = item.get('correctOption')
        expl = item.get('explanation', '')[:100].replace('\n', ' ')
        print(f"  Q{k}: opt={opt} | snippet={snip} | expl={expl}")
