# -*- coding: utf-8 -*-
"""
Apply 100% authentic listening data (pages 20-23 of PDF) to:
1. scripts/master_gold_explanations.json
2. frontend/src/app/data/jlptDetailedExplanations.ts
3. frontend/src/app/data/server_admin_exams.json
4. scratch/server_admin_exams.json
"""
import os
import json
from build_authentic_listening_2010 import get_listening_2010_explanations

def apply_all():
    listening_data = get_listening_2010_explanations()
    print(f"Loaded {len(listening_data)} authentic listening items.")

    # 1. Update scripts/master_gold_explanations.json
    master_path = os.path.join(os.path.dirname(__file__), "master_gold_explanations.json")
    if os.path.exists(master_path):
        with open(master_path, "r", encoding="utf-8") as f:
            master = json.load(f)
        if "n4-2010-2011" in master:
            for q_idx, item in listening_data.items():
                master["n4-2010-2011"][str(q_idx)] = item
            with open(master_path, "w", encoding="utf-8") as f:
                json.dump(master, f, ensure_ascii=False, indent=2)
            print(f"Updated {master_path} successfully!")

    # 2. Update frontend/src/app/data/server_admin_exams.json & scratch/server_admin_exams.json
    for json_path in [
        r"h:\JP_ANHSENSEI\frontend\src\app\data\server_admin_exams.json",
        r"h:\JP_ANHSENSEI\scratch\server_admin_exams.json"
    ]:
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                admin_data = json.load(f)
            exams = admin_data.get("exams", [])
            ex1 = next((e for e in exams if e.get("id") == "ex-1"), None)
            if ex1 and ex1.get("versions"):
                v = ex1["versions"][0]
                qs = v.get("questions", {})
                updated_count = 0
                for q_idx, item in listening_data.items():
                    s_key = str(q_idx)
                    if s_key in qs:
                        q_obj = qs[s_key]
                        q_obj["snippet"] = item["snippet"]
                        q_obj["explanation"] = item["explanation"]
                        q_obj["audioScriptJa"] = item.get("audioScriptJa", "")
                        q_obj["audioScriptVi"] = item.get("audioScriptVi", "")
                        q_obj["correctOption"] = item["correctOption"]
                        updated_count += 1
                with open(json_path, "w", encoding="utf-8") as f:
                    json.dump(admin_data, f, ensure_ascii=False, indent=2)
                print(f"Updated {updated_count} questions in {json_path}!")

    # 3. Update build_accurate_vietnamese_explanations.py
    build_script_path = os.path.join(os.path.dirname(__file__), "build_accurate_vietnamese_explanations.py")
    if os.path.exists(build_script_path):
        with open(build_script_path, "r", encoding="utf-8") as f:
            code = f.read()
        
        # Replace the listening loop with import from build_authentic_listening_2010
        old_pattern = "# Listening (Nghe hiểu 71-97)"
        if old_pattern in code:
            lines = code.split("\n")
            start_idx = None
            end_idx = None
            for idx, line in enumerate(lines):
                if "# Listening (Nghe hiểu 71-97)" in line:
                    start_idx = idx
                if start_idx is not None and "print(f\"[ExplanationsBuilder]" in line:
                    end_idx = idx
                    break
            if start_idx is not None and end_idx is not None:
                new_chunk = """# Listening (Nghe hiểu 71-97)
from build_authentic_listening_2010 import get_listening_2010_explanations
for q_idx, item in get_listening_2010_explanations().items():
    expl_2010[q_idx] = item
"""
                lines[start_idx:end_idx] = [new_chunk]
                with open(build_script_path, "w", encoding="utf-8") as f:
                    f.write("\n".join(lines))
                print(f"Updated {build_script_path} successfully!")

if __name__ == "__main__":
    apply_all()
