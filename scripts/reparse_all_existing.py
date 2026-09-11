import os
import sys
import json
import re

# Add scripts dir to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from jlpt_pdf_pipeline import parse_jlpt_pdf

def main():
    pdf_dir = r"h:\JP_ANHSENSEI\frontend\public\pdf\jlpt\n4"
    pdf_files = sorted([f for f in os.listdir(pdf_dir) if f.endswith(".pdf")])
    
    summary = []
    
    for fname in pdf_files:
        full_path = os.path.join(pdf_dir, fname)
        print(f"\n==================================================")
        print(f"Parsing Existing Exam: {fname}")
        print(f"==================================================")
        
        try:
            res = parse_jlpt_pdf(full_path)
            summary.append({
                "file": fname,
                "totalPages": res["totalPages"],
                "ansPages": res["answerPagesDetected"],
                "explPages": res["explanationPagesDetected"],
                "totalQ": res["totalQuestions"],
                "ansMatched": res["answersMatched"],
                "explMatched": res["explanationsMatched"],
                "status": res["status"]
            })
            
            # Save parsed JSON to scratch/
            scratch_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"parsed_{fname.replace('.pdf', '')}.json")
            with open(scratch_path, "w", encoding="utf-8") as f:
                json.dump(res, f, ensure_ascii=False, indent=2)
            print(f"Saved parsed result to {scratch_path}")
            
        except Exception as e:
            print(f"Error parsing {fname}: {e}")
            summary.append({
                "file": fname,
                "error": str(e)
            })

    print("\n================ FINAL RE-PARSE SUMMARY ================")
    print(json.dumps(summary, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
