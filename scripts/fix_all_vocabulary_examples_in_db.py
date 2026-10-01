#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANH SENSEI - Fast Master Database Fixer & Single Batch V81 Migration Generator
--------------------------------------------------------------------------------
1. Reads 2,875 authentic vocabulary example sentences from official Excel dataset.
2. Fast Batch Updates PostgreSQL database (Supabase).
3. Generates a SINGLE BATCH Flyway Migration V81__fix_all_vocabulary_examples_robust_match.sql for instant execution.
"""

import os
import sys
import openpyxl
import psycopg2
from psycopg2.extras import execute_values

sys.stdout.reconfigure(encoding='utf-8')

DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres.vdzlkldjhxdzoztgcagy:duonggiakien@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require")
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCEL_PATH = os.path.join(BASE_DIR, "DANH_SACH_TU_VUNG_N5_N3_ANH_SENSEI_FULL.xlsx")
MIGRATION_PATH = os.path.join(BASE_DIR, "backend", "src", "main", "resources", "db", "migration", "V81__fix_all_vocabulary_examples_robust_match.sql")
TARGET_MIGRATION_PATH = os.path.join(BASE_DIR, "backend", "target", "classes", "db", "migration", "V81__fix_all_vocabulary_examples_robust_match.sql")

def sql_escape(val):
    if val is None:
        return ''
    return str(val).replace("'", "''").strip()

def run_fix():
    print("=== ANH SENSEI - BẮT ĐẦU SỬA TOÀN BỘ CÂU VÍ DỤ TRÊN DATABASE ===")
    
    if not os.path.exists(EXCEL_PATH):
        print(f"❌ Không tìm thấy file Excel: {EXCEL_PATH}")
        return

    print(f"📖 Đang đọc dữ liệu từ file Excel {EXCEL_PATH}...")
    wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)
    sheet = wb['TẤT CẢ TỪ VỰNG (N5-N3)']
    excel_rows = list(sheet.iter_rows(values_only=True))[2:]
    print(f"   - Tổng số từ vựng trong Excel: {len(excel_rows)}")

    print("🔌 Đang kết nối tới PostgreSQL Supabase...")
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    # Load mapping from DB
    query = """
        SELECT v.vocabulary_id, lev.code, les.sort_order, v.word, v.kana
        FROM vocabulary v
        JOIN lessons les ON v.lesson_id = les.lesson_id
        JOIN levels lev ON les.level_id = lev.level_id;
    """
    cur.execute(query)
    db_vocab_rows = cur.fetchall()

    db_map_word = {}
    db_map_kana = {}

    for vid, lev, les_sort, word, kana in db_vocab_rows:
        w_key = (lev.strip(), les_sort, word.strip() if word else '')
        k_key = (lev.strip(), les_sort, kana.strip() if kana else '')
        db_map_word[w_key] = vid
        db_map_kana[k_key] = vid

    update_tuples = []
    value_rows = []

    for r in excel_rows:
        lev = str(r[1]).strip() if r[1] else ''
        les_order = int(r[2]) if r[2] else 0
        word = str(r[4]).strip() if r[4] else ''
        kana = str(r[5]).strip() if r[5] else ''
        ex_jp = str(r[15]).strip() if r[15] is not None else ''
        ex_reading = str(r[16]).strip() if r[16] is not None else ''
        ex_vi = str(r[17]).strip() if r[17] is not None else ''

        if not ex_jp:
            continue

        w_key = (lev, les_order, word)
        k_key = (lev, les_order, kana)
        vid = db_map_word.get(w_key) or db_map_kana.get(k_key)

        if vid:
            update_tuples.append((ex_jp, ex_reading, ex_vi, vid))

            safe_jp = sql_escape(ex_jp)
            safe_rd = sql_escape(ex_reading)
            safe_vi = sql_escape(ex_vi)
            safe_word = sql_escape(word)
            safe_kana = sql_escape(kana)

            value_rows.append(f"('{safe_jp}', '{safe_rd}', '{safe_vi}', '{lev}', {les_order}, '{safe_word}', '{safe_kana}')")

    print(f"🚀 Đang thực thi Batch Update cho {len(update_tuples)} từ vựng trên Database Supabase...")
    
    batch_update_sql = """
        UPDATE vocabulary AS v SET
            example_jp = data.ex_jp,
            example_reading = data.ex_reading,
            example_vi = data.ex_vi
        FROM (VALUES %s) AS data(ex_jp, ex_reading, ex_vi, vid)
        WHERE v.vocabulary_id = data.vid;
    """
    execute_values(cur, batch_update_sql, update_tuples)
    
    conn.commit()
    conn.close()

    print(f"✅ ĐÃ CẬP NHẬT THÀNH CÔNG {len(update_tuples)} BẢN GHI VÀO DATABASE SUPABASE!")

    # Write Single Batch Flyway V81
    values_str = ",\n    ".join(value_rows)
    single_batch_migration_sql = f"""-- ============================================================
-- ANH SENSEI - FLYWAY MIGRATION V81
-- Fast Single-Batch Authentic Vocabulary Examples Update for N5, N4, N3
-- ============================================================

UPDATE vocabulary AS v SET
    example_jp = data.ex_jp,
    example_reading = data.ex_reading,
    example_vi = data.ex_vi
FROM (VALUES
    {values_str}
) AS data(ex_jp, ex_reading, ex_vi, lev_code, les_sort, word, kana)
JOIN lessons les ON v.lesson_id = les.lesson_id
JOIN levels lev ON les.level_id = lev.level_id
WHERE lev.code = data.lev_code
  AND les.sort_order = data.les_sort
  AND (v.word = data.word OR v.kana = data.kana);
"""

    with open(MIGRATION_PATH, 'w', encoding='utf-8') as f:
        f.write(single_batch_migration_sql)

    if os.path.exists(os.path.dirname(TARGET_MIGRATION_PATH)):
        with open(TARGET_MIGRATION_PATH, 'w', encoding='utf-8') as f:
            f.write(single_batch_migration_sql)

    print(f"✅ Đã tạo file Single-Batch Flyway Migration V81 thành công!")

if __name__ == "__main__":
    run_fix()
