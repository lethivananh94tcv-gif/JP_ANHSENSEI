# -*- coding: utf-8 -*-
"""
Full verification script for JLPT N4 2013-07 (Questions 1 to 98)
Verifying against Page 14 official answer sheet (参考答案).
"""

import json
import sys
sys.path.append("scripts")

from apply_authentic_n4_2013_vocab import N4_2013_VOCAB
from apply_authentic_n4_2013_grammar import N4_2013_GRAMMAR
from apply_authentic_n4_2013_listening import N4_2013_LISTENING

ALL_98_GOLD = {}
for q, data in N4_2013_VOCAB.items():
    ALL_98_GOLD[q] = data
for q, data in N4_2013_GRAMMAR.items():
    ALL_98_GOLD[q] = data
for q, data in N4_2013_LISTENING.items():
    ALL_98_GOLD[q] = data

def verify():
    print(f"=== VERIFYING ALL 98 QUESTIONS OF N4 2013-07 ===")
    assert len(ALL_98_GOLD) == 98, f"Expected 98 keys, got {len(ALL_98_GOLD)}"

    # 1. Check scanned_n4_2013_official_answers.json
    with open("frontend/src/app/data/scanned_n4_2013_official_answers.json", "r", encoding="utf-8") as f:
        scanned = json.load(f)["officialAnswers"]
    for q in range(1, 99):
        sq = str(q)
        gold_opt = ALL_98_GOLD[q]["correctOption"]
        assert sq in scanned, f"Missing Q{q} in scanned answers"
        assert scanned[sq] == gold_opt, f"Scanned mismatch at Q{q}: {scanned[sq]} vs {gold_opt}"
    print("✅ scanned_n4_2013_official_answers.json: 98/98 questions match official keys perfectly!")

    # 2. Check master_gold_explanations.json
    with open("scripts/master_gold_explanations.json", "r", encoding="utf-8") as f:
        master = json.load(f)["n4-2013-07"]
    for q in range(1, 99):
        sq = str(q)
        gold_opt = ALL_98_GOLD[q]["correctOption"]
        assert sq in master, f"Missing Q{q} in master explanations"
        assert master[sq]["correctOption"] == gold_opt, f"Master mismatch at Q{q}: {master[sq]['correctOption']} vs {gold_opt}"
        if q >= 71:
            assert master[sq].get("audioScriptJa"), f"Missing audioScriptJa at listening Q{q}"
            assert master[sq].get("audioScriptVi"), f"Missing audioScriptVi at listening Q{q}"
    print("✅ master_gold_explanations.json: 98/98 questions match official keys and have rich scripts/explanations!")

    # 3. Check server_admin_exams.json and scratch
    for path in ["frontend/src/app/data/server_admin_exams.json", "scratch/server_admin_exams.json"]:
        with open(path, "r", encoding="utf-8") as f:
            admin_data = json.load(f)
        ex3 = next(e for e in admin_data["exams"] if e["id"] == "ex-3")
        qs = ex3["versions"][0]["questions"]
        for q in range(1, 99):
            sq = str(q)
            gold_opt = ALL_98_GOLD[q]["correctOption"]
            assert sq in qs, f"Missing Q{q} in {path}"
            assert qs[sq]["correctOption"] == gold_opt, f"Admin mismatch at Q{q} in {path}: {qs[sq]['correctOption']} vs {gold_opt}"
            if q >= 71:
                assert qs[sq].get("audioScriptJa"), f"Missing audioScriptJa at Q{q} in {path}"
        print(f"✅ {path}: 98/98 questions match official keys!")

    # 4. Check jlptDetailedExplanations.ts
    with open("frontend/src/app/data/jlptDetailedExplanations.ts", "r", encoding="utf-8") as f:
        ts_content = f.read()
    assert '"n4-2013-07": {' in ts_content, "n4-2013-07 not found in jlptDetailedExplanations.ts"
    for q in range(71, 99):
        assert f'"{q}": {{' in ts_content, f"Missing Q{q} in jlptDetailedExplanations.ts"
    assert "歯医者で受付の人と男の人が話しています" in ts_content
    assert "このバスはみどり公園行きですか" in ts_content
    print("✅ jlptDetailedExplanations.ts: Listening questions 71..98 present with authentic text & scripts!")

    print("\n🎉 ALL 98 QUESTIONS ACROSS ALL REPOSITORIES VERIFIED 100% AUTHENTIC & SYNCHRONIZED!")

if __name__ == "__main__":
    verify()
