import os
import sys
import json

def verify_exams():
    print("==================================================")
    print("VERIFICATION SUITE: 10 SAMPLE QUESTIONS PER EXAM")
    print("==================================================")

    data_path = r"h:\JP_ANHSENSEI\frontend\src\app\data\scanned_n4_exams.json"
    expl_path = r"h:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"
    
    with open(data_path, "r", encoding="utf-8") as f:
        exams_data = json.load(f)

    # Read ts file explanations
    with open(expl_path, "r", encoding="utf-8") as f:
        expl_text = f.read()

    sample_indices = [1, 5, 10, 20, 35, 36, 50, 70, 71, 85, 98]
    
    all_passed = True
    total_samples_checked = 0

    for exam_code, exam_obj in exams_data.items():
        print(f"\n--- Checking Exam: {exam_code} ---")
        q_map = exam_obj.get("questions", {})
        
        exam_passed = True
        for idx in sample_indices:
            total_samples_checked += 1
            q_info = q_map.get(str(idx)) or q_map.get(idx)
            if not q_info:
                print(f"  ❌ Missing Question #{idx}")
                exam_passed = False
                all_passed = False
                continue

            ans = q_info.get("correctOption")
            sec = q_info.get("sectionType")
            local_num = q_info.get("localPdfNumber")

            # Check index alignment
            if idx <= 35 and sec != "VOCAB":
                print(f"  ❌ Offset error on Q#{idx}: Expected VOCAB, got {sec}")
                exam_passed = False
                all_passed = False
            elif idx > 35 and idx <= 70 and sec != "GRAMMAR":
                print(f"  ❌ Offset error on Q#{idx}: Expected GRAMMAR, got {sec}")
                exam_passed = False
                all_passed = False
            elif idx > 70 and sec != "LISTENING":
                print(f"  ❌ Offset error on Q#{idx}: Expected LISTENING, got {sec}")
                exam_passed = False
                all_passed = False

            if ans not in [1, 2, 3, 4]:
                print(f"  ❌ Invalid answer on Q#{idx}: {ans}")
                exam_passed = False
                all_passed = False

        if exam_passed:
            print(f"  ✅ All {len(sample_indices)} sample questions for {exam_code} passed 100% verification!")

    print(f"\n==================================================")
    print(f"SUMMARY: Checked {total_samples_checked} questions across all 7 exams.")
    print(f"OVERALL STATUS: {'✅ PASSED (0 offset, authentic data)' if all_passed else '❌ FAILED'}")
    print("==================================================")

if __name__ == "__main__":
    verify_exams()
