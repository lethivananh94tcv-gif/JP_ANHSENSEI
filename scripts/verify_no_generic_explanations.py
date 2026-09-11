import os
import sys

def verify_no_placeholders():
    print("==================================================")
    print("CHECKING FOR GENERIC PLACEHOLDER STRINGS")
    print("==================================================")

    ts_path = r"h:\JP_ANHSENSEI\frontend\src\app\data\jlptDetailedExplanations.ts"
    with open(ts_path, "r", encoding="utf-8") as f:
        content = f.read()

    placeholder_keywords = [
        "Phân tích đáp án chuẩn cho câu số",
        "Đáp án đối chiếu 1:1 với trang PDF gốc của đề",
        "Phương án đúng chính xác theo bảng đáp án chính thức",
        "Chưa có giải thích từ PDF"
    ]

    found_issues = 0
    for kw in placeholder_keywords:
        count = content.count(kw)
        print(f"Keyword '{kw}': {count} occurrences found")
        found_issues += count

    print("\n==================================================")
    print(f"STATUS: {'✅ CLEAN - 0 PLACEHOLDERS FOUND' if found_issues == 0 else f'❌ FOUND {found_issues} PLACEHOLDERS'}")
    print("==================================================")

if __name__ == "__main__":
    verify_no_placeholders()
