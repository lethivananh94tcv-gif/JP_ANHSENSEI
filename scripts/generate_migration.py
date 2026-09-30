#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANH SENSEI - Safe SQL Migration Generator for Vocabulary Examples
-----------------------------------------------------------------
Generates Flyway SQL migrations for N4 (V74) and N3 (V75) from intermediate APPROVED CSV datasets.
Enforces strict level checks (WHERE level_id = ...) and escaping rules.
"""

import sys
import os
import csv

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REVIEW_DIR = os.path.join(BASE_DIR, "data", "review")
MIGRATION_DIR = os.path.join(BASE_DIR, "backend", "src", "main", "resources", "db", "migration")

def sql_escape(text):
    if text is None:
        return ''
    return str(text).replace("'", "''")

def generate_n4_migration():
    csv_path = os.path.join(REVIEW_DIR, "n4_examples_corrected.csv")
    output_sql_path = os.path.join(MIGRATION_DIR, "V74__update_n4_authentic_vocabulary_examples.sql")

    if not os.path.exists(csv_path):
        print(f"❌ Không tìm thấy file CSV N4: {csv_path}")
        return

    print(f"📖 Đang đọc {csv_path} để tạo Flyway Migration V74...")

    rows = []
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for r in reader:
            if r.get('review_status') == 'APPROVED':
                rows.append(r)

    print(f"   - Số bản ghi N4 đã phê duyệt (APPROVED): {len(rows)}")

    sql_statements = [
        "-- ============================================================",
        "-- ANH SENSEI - FLYWAY MIGRATION V74",
        "-- Safe Authentic Vocabulary Example Sentences Update for JLPT N4",
        "-- Strictly scoped to N4 level (level_id = 2)",
        "-- ============================================================\n"
    ]

    for r in rows:
        vid = r.get('vocabulary_id')
        ex_jp = sql_escape(r.get('new_example_jp') or r.get('example_jp'))
        ex_rd = sql_escape(r.get('new_example_furigana') or r.get('example_reading'))
        ex_vi = sql_escape(r.get('new_example_vi') or r.get('example_vi'))

        stmt = (
            f"UPDATE vocabulary\n"
            f"SET example_jp = '{ex_jp}',\n"
            f"    example_reading = '{ex_rd}',\n"
            f"    example_vi = '{ex_vi}',\n"
            f"    updated_at = CURRENT_TIMESTAMP\n"
            f"WHERE vocabulary_id = {vid}\n"
            f"  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 2);\n"
        )
        sql_statements.append(stmt)

    with open(output_sql_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))

    print(f"✅ Đã sinh file migration Flyway V74 thành công: {output_sql_path}")

def generate_n3_migration():
    csv_path = os.path.join(REVIEW_DIR, "n3_examples_corrected.csv")
    output_sql_path = os.path.join(MIGRATION_DIR, "V75__update_n3_authentic_vocabulary_examples.sql")

    if not os.path.exists(csv_path):
        print(f"❌ Không tìm thấy file CSV N3: {csv_path}")
        return

    print(f"📖 Đang đọc {csv_path} để tạo Flyway Migration V75...")

    rows = []
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for r in reader:
            if r.get('review_status') == 'APPROVED':
                rows.append(r)

    print(f"   - Số bản ghi N3 đã phê duyệt (APPROVED): {len(rows)}")

    sql_statements = [
        "-- ============================================================",
        "-- ANH SENSEI - FLYWAY MIGRATION V75",
        "-- Safe Authentic Vocabulary Example Sentences Update for JLPT N3",
        "-- Strictly scoped to N3 level (level_id = 3)",
        "-- ============================================================\n"
    ]

    for r in rows:
        vid = r.get('vocabulary_id')
        ex_jp = sql_escape(r.get('new_example_jp') or r.get('example_jp'))
        ex_rd = sql_escape(r.get('new_example_furigana') or r.get('example_reading'))
        ex_vi = sql_escape(r.get('new_example_vi') or r.get('example_vi'))

        stmt = (
            f"UPDATE vocabulary\n"
            f"SET example_jp = '{ex_jp}',\n"
            f"    example_reading = '{ex_rd}',\n"
            f"    example_vi = '{ex_vi}',\n"
            f"    updated_at = CURRENT_TIMESTAMP\n"
            f"WHERE vocabulary_id = {vid}\n"
            f"  AND lesson_id IN (SELECT lesson_id FROM lessons WHERE level_id = 3);\n"
        )
        sql_statements.append(stmt)

    with open(output_sql_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))

    print(f"✅ Đã sinh file migration Flyway V75 thành công: {output_sql_path}")

if __name__ == "__main__":
    generate_n4_migration()
    generate_n3_migration()
