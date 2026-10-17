# -*- coding: utf-8 -*-
"""
Build and apply 100% authentic explanations and official answers for JLPT N4 2012-12
Grammar & Reading Section (Môn 2: Ngữ pháp & Đọc hiểu, Câu 1 đến Câu 35, Global indices 35..69)
Extracted directly from Pages 18 to 21 of n4-2012-12.pdf
"""
import os
import json

def get_n4_2012_grammar_35_69():
    from update_n4_2012_grammar import GRAMMAR_QUESTIONS
    return GRAMMAR_QUESTIONS

def apply_grammar_updates():
    grammar_data = get_n4_2012_grammar_35_69()
    print(f"Loaded {len(grammar_data)} authentic grammar questions (35..69).")

    # 1. Update scanned_n4_2012_official_answers.json and scanned_n4_2012_12_official_answers.json
    for ans_path in [
        r"frontend/src/app/data/scanned_n4_2012_official_answers.json",
        r"frontend/src/app/data/scanned_n4_2012_12_official_answers.json"
    ]:
        if os.path.exists(ans_path):
            with open(ans_path, "r", encoding="utf-8") as f:
                d = json.load(f)
            answers = d.get("officialAnswers", d)
            for q_idx, item in grammar_data.items():
                answers[str(q_idx)] = item["correctOption"]
            with open(ans_path, "w", encoding="utf-8") as f:
                json.dump(d, f, ensure_ascii=False, indent=2)
            print(f"Updated answers in {ans_path}")

    # 2. Update master_gold_explanations.json
    master_path = r"scripts/master_gold_explanations.json"
    if os.path.exists(master_path):
        with open(master_path, "r", encoding="utf-8") as f:
            master = json.load(f)
        if "n4-2012-12" in master:
            for q_idx, item in grammar_data.items():
                master["n4-2012-12"][str(q_idx)] = {
                    "snippet": item["snippet"],
                    "correctOption": item["correctOption"],
                    "explanation": item["explanation"]
                }
            with open(master_path, "w", encoding="utf-8") as f:
                json.dump(master, f, ensure_ascii=False, indent=2)
            print(f"Updated {master_path} successfully!")

    # 3. Update jlptDetailedExplanations.ts
    ts_file = r"frontend/src/app/data/jlptDetailedExplanations.ts"
    with open(master_path, "r", encoding="utf-8") as f:
        master = json.load(f)
    
    all_exams_to_export = ["n4-2010-2011", "n4-2012-12"]
    ts_content = """export interface DetailedExplanationItem {
  snippet: string;
  explanation: string;
  audioScriptJa?: string;
  audioScriptVi?: string;
  correctOption?: number;
}

export const EXAM_DETAILED_EXPLANATION_MAP: Record<string, Record<number, DetailedExplanationItem>> = {
"""
    for exam_id in all_exams_to_export:
        if exam_id in master:
            ts_content += f'  "{exam_id}": {{\n'
            q_map = master[exam_id]
            sorted_keys = sorted([int(k) for k in q_map.keys()])
            for q_idx in sorted_keys:
                item = q_map[str(q_idx)]
                ts_content += f'    "{q_idx}": {{\n'
                ts_content += f'      "snippet": {json.dumps(item.get("snippet", ""), ensure_ascii=False)},\n'
                ts_content += f'      "explanation": {json.dumps(item.get("explanation", ""), ensure_ascii=False)}'
                if item.get("audioScriptJa"):
                    ts_content += f',\n      "audioScriptJa": {json.dumps(item["audioScriptJa"], ensure_ascii=False)}'
                if item.get("audioScriptVi"):
                    ts_content += f',\n      "audioScriptVi": {json.dumps(item["audioScriptVi"], ensure_ascii=False)}'
                if item.get("correctOption") is not None:
                    ts_content += f',\n      "correctOption": {item["correctOption"]}'
                ts_content += "\n    },\n"
            ts_content += "  },\n"
    ts_content += "};\n"
    
    with open(ts_file, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Updated {ts_file} (Size: {os.path.getsize(ts_file)} bytes)!")

    # 4. Update server_admin_exams.json and scratch/server_admin_exams.json
    for json_path in [
        r"frontend/src/app/data/server_admin_exams.json",
        r"scratch/server_admin_exams.json"
    ]:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                admin_data = json.load(f)
            exams = admin_data.get("exams", [])
            ex2 = next((e for e in exams if e.get("id") == "ex-2" or e.get("examCode") == "n4-2012-12"), None)
            if ex2 and ex2.get("versions"):
                v = ex2["versions"][0]
                qs = v.get("questions", {})
                updated_count = 0
                for q_idx, item in grammar_data.items():
                    s_key = str(q_idx)
                    if s_key not in qs:
                        qs[s_key] = {}
                    q_obj = qs[s_key]
                    q_obj["globalIndex"] = q_idx
                    q_obj["localPdfNumber"] = item["localPdfNumber"]
                    q_obj["sectionType"] = "GRAMMAR"
                    q_obj["mondai"] = item["mondai"]
                    q_obj["text"] = item["text"]
                    q_obj["options"] = item["options"]
                    q_obj["correctOption"] = item["correctOption"]
                    q_obj["correctAnswer"] = item["correctOption"]
                    q_obj["snippet"] = item["snippet"]
                    q_obj["explanation"] = item["explanation"]
                    q_obj["optionText"] = f"Phương án [{item['correctOption']}]"
                    q_obj.pop("audioScriptJa", None)
                    q_obj.pop("audioScriptVi", None)
                    updated_count += 1
                
                # Also ensure question 70 does not retain duplicate Grammar Q35
                if "70" in qs and qs["70"].get("sectionType") == "GRAMMAR":
                    qs["70"]["sectionType"] = "LISTENING"
                    qs["70"]["localPdfNumber"] = 1
                    qs["70"]["mondai"] = 1
                    qs["70"]["snippet"] = "Mondai 1 - Câu 1: Phương tiện đi đến bảo tàng mỹ thuật (何で美術館へ行きますか)"
                
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(admin_data, f, ensure_ascii=False, indent=2)
                print(f"Updated {updated_count} questions in {json_path}!")

if __name__ == "__main__":
    apply_grammar_updates()
