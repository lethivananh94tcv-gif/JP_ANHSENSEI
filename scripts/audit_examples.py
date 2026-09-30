#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANH SENSEI - Central Modular Example Sentence Audit CLI Engine
--------------------------------------------------------------
Usage:
    python scripts/audit_examples.py --level N4
    python scripts/audit_examples.py --level N3 --fail-on-error
"""

import sys
import os
import csv
import json
import argparse

sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from validators.japanese_validator import validate_japanese
from validators.furigana_validator import validate_furigana
from validators.vietnamese_validator import validate_vietnamese
from validators.duplicate_validator import validate_duplicates

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAPSHOTS_DIR = os.path.join(BASE_DIR, "data", "snapshots")
REVIEW_DIR = os.path.join(BASE_DIR, "data", "review")
REPORTS_DIR = os.path.join(BASE_DIR, "data", "reports")

def load_dataset(level):
    level_lower = level.lower()
    corrected_csv = os.path.join(REVIEW_DIR, f"{level_lower}_examples_corrected.csv")
    before_csv = os.path.join(REVIEW_DIR, f"{level_lower}_examples_before.csv")
    snapshot_csv = os.path.join(SNAPSHOTS_DIR, f"{level_lower}_examples_before.csv")

    if os.path.exists(corrected_csv):
        target_csv = corrected_csv
    elif os.path.exists(before_csv):
        target_csv = before_csv
    elif os.path.exists(snapshot_csv):
        target_csv = snapshot_csv
    else:
        print(f"❌ Không tìm thấy file dữ liệu cho level {level}")
        sys.exit(1)

    print(f"📖 Đang đọc dữ liệu từ: {os.path.basename(target_csv)}")
    data = []
    with open(target_csv, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append(dict(row))
    return data, target_csv

def run_audit(level, fail_on_error=False):
    print(f"\n==================================================")
    print(f"🔍 BẮT ĐẦU AUDIT DỮ LIỆU CÂU VÍ DỤ JLPT {level}")
    print(f"==================================================")

    data, csv_path = load_dataset(level)

    audit_results = []
    error_summary = {}
    total_passed = 0
    total_failed = 0

    dup_errors_map = validate_duplicates(data)

    for item in data:
        vid = item.get('vocabulary_id')
        jp_errs = validate_japanese(item)
        rd_errs = validate_furigana(item)
        vi_errs = validate_vietnamese(item)
        dup_errs = dup_errors_map.get(vid, [])

        all_errs = jp_errs + rd_errs + vi_errs + dup_errs

        if all_errs:
            total_failed += 1
            for err in all_errs:
                code = err['code']
                error_summary[code] = error_summary.get(code, 0) + 1
            status = "FAILED"
        else:
            total_passed += 1
            status = "PASSED"

        audit_results.append({
            'vocabulary_id': vid,
            'word': item.get('word'),
            'kana': item.get('kana'),
            'kanji_form': item.get('kanji_form'),
            'meaning_vi': item.get('meaning_vi'),
            'lesson_title': item.get('lesson_title'),
            'example_jp': item.get('example_jp'),
            'example_reading': item.get('example_reading'),
            'example_vi': item.get('example_vi'),
            'status': status,
            'errors': all_errs
        })

    total_items = len(data)
    pass_rate = (total_passed / total_items * 100) if total_items > 0 else 0.0

    print(f"\n📊 KẾT QUẢ AUDIT DỮ LIỆU {level}:")
    print(f"   - Tổng số từ vựng audit: {total_items}")
    print(f"   - Số lượng ĐẠT (PASS) : {total_passed} ({pass_rate:.1f}%)")
    print(f"   - Số lượng LỖI (FAIL) : {total_failed}")

    if error_summary:
        print("\n⚠️ THỐNG KÊ CHI TIẾT CÁC LỖI PHÁT HIỆN:")
        for code, count in sorted(error_summary.items(), key=lambda x: x[1], reverse=True):
            print(f"   - [{code}]: {count} trường hợp")

    # Save Audit Report JSON
    report_file = os.path.join(REPORTS_DIR, f"{level.lower()}_audit_report.json")
    report_data = {
        "level": level,
        "total_items": total_items,
        "total_passed": total_passed,
        "total_failed": total_failed,
        "pass_rate_percent": round(pass_rate, 2),
        "error_summary": error_summary,
        "items": audit_results
    }

    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report_data, f, ensure_ascii=False, indent=2)

    print(f"\n📄 Báo cáo chi tiết đã xuất tại: {report_file}")

    if fail_on_error and total_failed > 0:
        print(f"\n❌ AUDIT FAILED: Còn {total_failed} bản ghi lỗi!")
        sys.exit(1)
    elif total_failed == 0:
        print(f"\n✨ AUDIT SUCCESS: 100% dữ liệu {level} đạt tiêu chuẩn!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="ANH SENSEI Example Audit CLI")
    parser.add_argument("--level", required=True, choices=["N5", "N4", "N3"], help="Cấp độ JLPT cần audit")
    parser.add_argument("--fail-on-error", action="store_true", help="Dừng script với error code 1 nếu có bất kỳ lỗi nào")
    args = parser.parse_args()

    run_audit(args.level, args.fail_on_error)
