#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANH SENSEI - Phase 0 Baseline Exporter & Data Safety Lock Engine
----------------------------------------------------------------
Exports baseline datasets for N5, N4, and N3 from PostgreSQL into CSV format.
Computes SHA256 checksum for N5 to guarantee zero mutation during Phase 1 & Phase 2.
"""

import os
import sys
import csv
import hashlib
import json
import psycopg2
from psycopg2.extras import RealDictCursor

sys.stdout.reconfigure(encoding='utf-8')

DB_URL = "postgresql://postgres.vdzlkldjhxdzoztgcagy:duonggiakien@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAPSHOTS_DIR = os.path.join(BASE_DIR, "data", "snapshots")
REVIEW_DIR = os.path.join(BASE_DIR, "data", "review")
REPORTS_DIR = os.path.join(BASE_DIR, "data", "reports")

os.makedirs(SNAPSHOTS_DIR, exist_ok=True)
os.makedirs(REVIEW_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

CSV_FIELDNAMES = [
    'vocabulary_id',
    'lesson_id',
    'lesson_title',
    'sort_order',
    'level',
    'word',
    'kana',
    'kanji_form',
    'meaning_vi',
    'part_of_speech',
    'example_jp',
    'example_reading',
    'example_vi'
]

def fetch_vocab_by_level(level_code):
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)

    query = """
        SELECT 
            v.vocabulary_id,
            v.lesson_id,
            les.title as lesson_title,
            les.sort_order,
            lev.code as level,
            v.word,
            v.kana,
            v.kanji_form,
            v.meaning_vi,
            v.part_of_speech,
            v.example_jp,
            v.example_reading,
            v.example_vi
        FROM vocabulary v
        JOIN lessons les ON v.lesson_id = les.lesson_id
        JOIN levels lev ON les.level_id = lev.level_id
        WHERE lev.code = %s
        ORDER BY les.sort_order, v.sort_order, v.vocabulary_id;
    """
    cur.execute(query, (level_code,))
    rows = cur.fetchall()
    conn.close()
    return rows

def write_csv(file_path, data):
    with open(file_path, mode='w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDNAMES)
        writer.writeheader()
        for row in data:
            writer.writerow({k: (row.get(k) or '') for k in CSV_FIELDNAMES})

def compute_file_sha256(file_path):
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def run_phase_0():
    print("=== GIAI ĐOẠN 0: XUẤT DATA BASELINE & TẠO KHÓA AN TOÀN N5 ===")

    # 1. Export N5 Snapshot
    print("1. Đang xuất N5 snapshot...")
    n5_data = fetch_vocab_by_level('N5')
    n5_csv_path = os.path.join(SNAPSHOTS_DIR, "n5_examples_before.csv")
    write_csv(n5_csv_path, n5_data)
    n5_hash = compute_file_sha256(n5_csv_path)

    n5_checksum_path = os.path.join(SNAPSHOTS_DIR, "n5_checksum.txt")
    with open(n5_checksum_path, 'w', encoding='utf-8') as f:
        f.write(f"SHA256: {n5_hash}\nCOUNT: {len(n5_data)}\n")
    print(f"   -> N5 Snapshot saved: {n5_csv_path}")
    print(f"   -> N5 Total Items: {len(n5_data)}")
    print(f"   -> N5 SHA256 Checksum: {n5_hash}")

    # 2. Export N4 Baseline
    print("2. Đang xuất N4 baseline...")
    n4_data = fetch_vocab_by_level('N4')
    n4_csv_path = os.path.join(REVIEW_DIR, "n4_examples_before.csv")
    write_csv(n4_csv_path, n4_data)
    print(f"   -> N4 Baseline saved: {n4_csv_path}")
    print(f"   -> N4 Total Items: {len(n4_data)}")

    # 3. Export N3 Baseline
    print("3. Đang xuất N3 baseline...")
    n3_data = fetch_vocab_by_level('N3')
    n3_csv_path = os.path.join(REVIEW_DIR, "n3_examples_before.csv")
    write_csv(n3_csv_path, n3_data)
    print(f"   -> N3 Baseline saved: {n3_csv_path}")
    print(f"   -> N3 Total Items: {len(n3_data)}")

    # 4. Generate Phase 0 Summary Report
    report = {
        "phase": 0,
        "n5_total": len(n5_data),
        "n5_sha256": n5_hash,
        "n4_total": len(n4_data),
        "n3_total": len(n3_data),
        "db_schema": {
            "table": "vocabulary",
            "primary_key": "vocabulary_id",
            "columns": {
                "ja": "example_jp",
                "furigana": "example_reading",
                "vi": "example_vi"
            }
        },
        "next_flyway_version": "V74"
    }

    report_path = os.path.join(REPORTS_DIR, "phase0_report.json")
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Hoàn thành Giai đoạn 0! Báo cáo lưu tại: {report_path}")

if __name__ == "__main__":
    run_phase_0()
