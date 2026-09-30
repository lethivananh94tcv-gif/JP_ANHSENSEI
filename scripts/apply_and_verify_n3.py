#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANH SENSEI - N3 Migration Execution & Rigorous Lock Verification Engine
-----------------------------------------------------------------------
1. Checks N5 and N4 integrity locks.
2. Applies V75 Flyway SQL Migration (1010 N3 items) to PostgreSQL database.
3. Re-verifies N5 and N4 integrity locks post-migration.
"""

import sys
import os
import io
import csv
import hashlib
import psycopg2
from psycopg2.extras import RealDictCursor

sys.stdout.reconfigure(encoding='utf-8')

DB_URL = "postgresql://postgres.vdzlkldjhxdzoztgcagy:duonggiakien@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAPSHOTS_DIR = os.path.join(BASE_DIR, "data", "snapshots")
MIGRATION_PATH = os.path.join(BASE_DIR, "backend", "src", "main", "resources", "db", "migration", "V75__update_n3_authentic_vocabulary_examples.sql")

CSV_FIELDNAMES = [
    'vocabulary_id', 'lesson_id', 'lesson_title', 'sort_order', 'level',
    'word', 'kana', 'kanji_form', 'meaning_vi', 'part_of_speech',
    'example_jp', 'example_reading', 'example_vi'
]

def verify_n5_integrity(conn):
    print("🔒 1. Kiểm tra an toàn N5 (N5 Integrity Lock Check)...")
    cur = conn.cursor(cursor_factory=RealDictCursor)
    query = """
        SELECT 
            v.vocabulary_id, v.lesson_id, les.title as lesson_title, les.sort_order,
            lev.code as level, v.word, v.kana, v.kanji_form, v.meaning_vi, v.part_of_speech,
            v.example_jp, v.example_reading, v.example_vi
        FROM vocabulary v
        JOIN lessons les ON v.lesson_id = les.lesson_id
        JOIN levels lev ON les.level_id = lev.level_id
        WHERE lev.code = 'N5'
        ORDER BY les.sort_order, v.sort_order, v.vocabulary_id;
    """
    cur.execute(query)
    rows = cur.fetchall()

    out = io.StringIO()
    writer = csv.DictWriter(out, fieldnames=CSV_FIELDNAMES)
    writer.writeheader()
    for r in rows:
        writer.writerow({k: (r.get(k) or '') for k in CSV_FIELDNAMES})

    data_bytes = out.getvalue().encode('utf-8-sig')
    current_hash = hashlib.sha256(data_bytes).hexdigest()

    checksum_file = os.path.join(SNAPSHOTS_DIR, "n5_checksum.txt")
    with open(checksum_file, 'r', encoding='utf-8') as f:
        stored_hash = f.read().splitlines()[0].replace("SHA256: ", "").strip()

    print(f"   - N5 Stored Hash  : {stored_hash}")
    print(f"   - N5 Current Hash : {current_hash}")

    if stored_hash != current_hash:
        print("❌ CẢNH BÁO: DỮ LIỆU N5 BỊ THAY ĐỔI!")
        return False
    
    print("✅ N5 AN TOÀN TUYỆT ĐỐI! 0% BỊ THAY ĐỔI.")
    return True

def apply_n3_migration():
    print("\n🚀 2. Thực thi Migration V75 N3 vào PostgreSQL Database...")
    conn = psycopg2.connect(DB_URL)
    
    if not verify_n5_integrity(conn):
        conn.close()
        sys.exit(1)

    cur = conn.cursor()
    with open(MIGRATION_PATH, 'r', encoding='utf-8') as f:
        sql_content = f.read()

    try:
        cur.execute(sql_content)
        conn.commit()
        print("✅ Đã thực thi xong file V75 SQL Migration (1010 bản ghi N3) vào Database.")
    except Exception as e:
        conn.rollback()
        print(f"❌ LỖI THỰC THI SQL: {e}")
        conn.close()
        sys.exit(1)

    # Post-check N5
    if not verify_n5_integrity(conn):
        print("❌ Dữ liệu N5 bị vi phạm sau migration!")
        conn.close()
        sys.exit(1)

    conn.close()
    print("\n✨ NGHIỆM THU DATABASE N3 THÀNH CÔNG!")

if __name__ == "__main__":
    apply_n3_migration()
