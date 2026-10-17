import json

with open('scripts/master_gold_explanations.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

m2017 = master.get('n4-2017-07', {})

# Real answers from page 43 & 44:
# Q1: 1, Q2: 1, Q3: 4, Q4: 2, Q5: 2, Q6: 3, Q7: 1, Q8: 2, Q9: 4
print("Sample Q1-9 options in master_gold_explanations for 2017:")
for i in range(1, 10):
    item = m2017.get(str(i), {})
    print(f"  Q{i}: opt in master = {item.get('correctOption')}, snippet = {item.get('snippet')}")
