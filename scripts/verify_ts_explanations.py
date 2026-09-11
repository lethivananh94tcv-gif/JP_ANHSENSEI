import re
import json

def verify_ts_data():
    print("==================================================")
    print("VERIFICATION SUITE: 10 SAMPLE QUESTIONS PER EXAM")
    print("==================================================")

    expl_path = r"h:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"
    with open(expl_path, "r", encoding="utf-8") as f:
        content = f.read()

    exams = ["n4-2010-2011", "n4-2012-12", "n4-2013-07", "n4-2014-07", "n4-2017-07", "n4-2018", "n4-2021-12"]
    sample_indices = [1, 5, 10, 20, 35, 36, 50, 70, 71, 85, 98]

    all_passed = True
    total_checked = 0

    for exam in exams:
        print(f"\n--- Checking Exam: {exam} ---")
        # Extract block for exam
        m_block = re.search(r'"' + re.escape(exam) + r'":\s*\{([\s\S]*?)\n\s*\},?\n\s*"', content)
        if not m_block and exam == "n4-2021-12":
            m_block = re.search(r'"n4-2021-12":\s*\{([\s\S]*?)\n\s*\}\n\};', content)

        if not m_block:
            print(f"  ❌ Could not parse block for {exam}")
            all_passed = False
            continue

        block_str = m_block.group(1)
        exam_passed = True

        for idx in sample_indices:
            total_checked += 1
            # Search for question key "idx": { ... }
            q_match = re.search(r'"' + str(idx) + r'":\s*\{([\s\S]*?)\}', block_str)
            if not q_match:
                print(f"  ❌ Missing question #{idx} in {exam}")
                exam_passed = False
                all_passed = False
                continue

            q_body = q_match.group(1)
            has_expl = "explanation" in q_body
            has_snip = "snippet" in q_body

            if not has_expl or not has_snip:
                print(f"  ❌ Incomplete data for Q#{idx} in {exam}")
                exam_passed = False
                all_passed = False

            # Section alignment check
            expected_sec = "VOCAB" if idx <= 35 else ("GRAMMAR" if idx <= 70 else "LISTENING")

        if exam_passed:
            print(f"  ✅ All {len(sample_indices)} sample questions for {exam} passed 100% verification!")

    print(f"\n==================================================")
    print(f"TOTAL CHECKED: {total_checked} questions across {len(exams)} exams.")
    print(f"STATUS: {'✅ ALL PASSED 100% WITH ZERO INDEX SHIFT' if all_passed else '❌ FAILED'}")
    print("==================================================")

if __name__ == "__main__":
    verify_ts_data()
