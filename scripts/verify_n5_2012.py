import json

# Check answers json
with open("frontend/src/app/data/scanned_n5_2012_official_answers.json", "r", encoding="utf-8") as f:
    ans_data = json.load(f)

answers = ans_data["officialAnswers"]
print(f"Total official answers: {len(answers)}")
assert len(answers) >= 91, f"Expected at least 91 answers, got {len(answers)}"

# Check Q1, Q2, Q3
print(f"Q1: {answers['1']} (Expected: 3 - みず)")
print(f"Q2: {answers['2']} (Expected: 4 - がっこう)")
print(f"Q3: {answers['3']} (Expected: 1 - やすい)")
assert answers["1"] == 3
assert answers["2"] == 4
assert answers["3"] == 1

# Check master_gold_explanations
with open("scripts/master_gold_explanations.json", "r", encoding="utf-8") as f:
    gold = json.load(f)

assert "n5-2012-12" in gold, "n5-2012-12 missing from master_gold_explanations"
n5_2012 = gold["n5-2012-12"]
print(f"Total gold explanations for n5-2012-12: {len(n5_2012)}")
assert len(n5_2012) >= 91, f"Expected >= 91 gold explanations, got {len(n5_2012)}"

q1 = n5_2012["1"]
print("Q1 snippet:", q1["snippet"])
print("Q1 correctOption:", q1["correctOption"])
assert q1["correctOption"] == 3
assert "水をください" in q1["snippet"]

q68 = n5_2012["68"] # Listening question 1
print("Q68 audioScriptJa present:", bool(q68.get("audioScriptJa")))
print("Q68 audioScriptVi present:", bool(q68.get("audioScriptVi")))
assert q68.get("audioScriptJa"), "Q68 audioScriptJa missing"

print("\n--- ALL VERIFICATIONS PASSED SUCCESSFULLY! ---")
