import os
import sys
import json
import traceback

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from universal_jlpt_parser import parse_universal_pdf

def reprocess_all():
    print("==================================================")
    print("UNIVERSAL BATCH RE-PROCESSOR (ALL EXISTING EXAMS)")
    print("==================================================")
    
    pdf_dir = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4"
    pdf_files = sorted([f for f in os.listdir(pdf_dir) if f.endswith(".pdf")])
    
    results_summary = []
    
    for fname in pdf_files:
        full_path = os.path.join(pdf_dir, fname)
        print(f"\n---> Re-processing: {fname}")
        
        try:
            parsed_data = parse_universal_pdf(full_path)
            
            summary_entry = {
                "file": fname,
                "status": parsed_data["status"],
                "totalQuestions": parsed_data["totalQuestions"],
                "answersMatched": parsed_data["answersMatched"],
                "explanationsMatched": parsed_data["explanationsMatched"],
                "answerPages": parsed_data["answerPagesDetected"],
                "explanationPages": parsed_data["explanationPagesDetected"],
            }
            results_summary.append(summary_entry)
            
            # Save individual output JSON
            out_json = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"auto_parsed_{fname.replace('.pdf', '')}.json")
            with open(out_json, "w", encoding="utf-8") as f:
                json.dump(parsed_data, f, ensure_ascii=False, indent=2)
                
            print(f"  ✅ Finished {fname} -> Status: {parsed_data['status']} ({parsed_data['answersMatched']}/{parsed_data['totalQuestions']} answers, {parsed_data['explanationsMatched']}/{parsed_data['totalQuestions']} explanations)")

        except Exception as e:
            print(f"  ⚠️ Error processing {fname}: {e}")
            traceback.print_exc()
            results_summary.append({
                "file": fname,
                "status": "NEEDS_REVIEW",
                "error": str(e)
            })

    print("\n==================================================")
    print("FINAL BATCH RE-PROCESS SUMMARY:")
    print("==================================================")
    print(json.dumps(results_summary, ensure_ascii=False, indent=2))
    
    # Save overall summary
    summary_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "reprocess_summary.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(results_summary, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    reprocess_all()
