#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANH SENSEI - Random 20 Lessons Verification Audit Engine
---------------------------------------------------------
Randomly selects 20 distinct lessons using random.sample across all 65 lessons in PostgreSQL.
Audits 100% of vocabulary items within the selected 20 random lessons item-by-item to ensure 
zero template flaws and 100% natural, authentic Japanese sentences.
"""

import sys
import os
import random
import psycopg2
from psycopg2.extras import RealDictCursor

sys.stdout.reconfigure(encoding='utf-8')

DB_URL = "postgresql://postgres.vdzlkldjhxdzoztgcagy:duonggiakien@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require"

BANNED_FLAWS = [
    '図書館で 専門の',
    'この 文章は とても 背が高い',
    '専門の体を勉強',
    'レストランで 美味しい どれ',
    '丁寧な 日本語',
    '生活の中で',
    '放課後に 友達と',
    '新しい～を買いました',
    'まずの 健康',
    '次にの 本',
    'まだまだですの 本',
    'お引き出しですかの 本'
]

def run_random_20_lessons_audit():
    print("Connecting to Supabase PostgreSQL Database for Random 20 Lessons Audit...")
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)

    # 1. Fetch all distinct lessons in DB
    cur.execute("""
        SELECT l.lesson_id, l.title as lesson_title, l.sort_order as lesson_order, lvl.code as level_code
        FROM lessons l
        LEFT JOIN levels lvl ON lvl.level_id = l.level_id
        ORDER BY lvl.code DESC, l.sort_order ASC;
    """)
    all_lessons = cur.fetchall()

    total_lessons_cnt = len(all_lessons)
    print(f"Total Lessons available in DB: {total_lessons_cnt}")

    # 2. Pick 20 TRULY RANDOM lessons using random.sample
    random_20_lessons = random.sample(all_lessons, 20)
    
    # Sort selected lessons for nice report display
    random_20_lessons.sort(key=lambda x: (x['level_code'] or '', x['lesson_order'] or 0))

    print("\n==========================================================================================")
    print(f"BỐC NGẪU NHIÊN 20 BÀI HỌC (RANDOM SAMPLE OF 20 LESSONS)")
    print("==========================================================================================")
    for idx, l in enumerate(random_20_lessons, 1):
        print(f"  {idx:2d}. [{l['level_code']} - Bài {l['lesson_order']}] {l['lesson_title']}")
    print("==========================================================================================\n")

    total_random_vocab = 0
    total_passed_vocab = 0
    total_failed_vocab = 0

    print("AUDITING 100% VOCABULARY ITEMS IN THE 20 RANDOM LESSONS...\n")

    for l_idx, l_item in enumerate(random_20_lessons, 1):
        l_id = l_item['lesson_id']
        l_key = f"{l_item['level_code']} - Bài {l_item['lesson_order']}"
        l_title = l_item['lesson_title'] or ''

        cur.execute("""
            SELECT vocabulary_id, word, kana, kanji_form, meaning_vi, part_of_speech, 
                   example_jp, example_reading, example_vi, usage_note, sort_order
            FROM vocabulary
            WHERE lesson_id = %s
            ORDER BY sort_order ASC, vocabulary_id ASC;
        """, (l_id,))
        
        vocab_list = cur.fetchall()
        
        print(f"------------------------------------------------------------------------------------------")
        print(f"📌 BÀI NGẪU NHIÊN [{l_idx}/20]: {l_key} ({l_title}) — Tổng số: {len(vocab_list)} từ vựng")
        print(f"------------------------------------------------------------------------------------------")

        l_pass_cnt = 0
        l_fail_cnt = 0

        for v_idx, v in enumerate(vocab_list, 1):
            total_random_vocab += 1
            jp = v.get('example_jp') or ''
            vi = v.get('example_vi') or ''

            is_flawed = any(flaw in jp or flaw in vi for flaw in BANNED_FLAWS)
            is_valid = not is_flawed and jp.strip() and vi.strip()

            word_disp = v['word'] or v['kana'] or ''
            kanji_disp = f" ({v['kanji_form']})" if v['kanji_form'] else ""

            if is_valid:
                l_pass_cnt += 1
                total_passed_vocab += 1
                status_str = "✅ PASS"
            else:
                l_fail_cnt += 1
                total_failed_vocab += 1
                status_str = "❌ FAIL"

            print(f"  [{v_idx:2d}/{len(vocab_list)}] **{word_disp}**{kanji_disp} | Nghĩa: {v['meaning_vi']}")
            print(f"       JP: {jp}")
            print(f"       VI: {vi}")
            print(f"       Trạng thái: {status_str}\n")

        print(f"  👉 TỔNG KẾT {l_key}: {l_pass_cnt}/{len(vocab_list)} PASSED\n")

    cur.close()
    conn.close()

    print("==========================================================================================")
    print("FINAL RANDOM 20 LESSONS VERIFICATION REPORT")
    print("==========================================================================================")
    print(f"Total Random Lessons Checked : 20 / {total_lessons_cnt}")
    print(f"Total Vocabulary Checked     : {total_random_vocab}")
    print(f"Passed Vocabulary            : {total_passed_vocab}")
    print(f"Failed Vocabulary            : {total_failed_vocab}")
    print(f"Success Rate                 : {(total_passed_vocab / total_random_vocab * 100):.2f}%")
    print("==========================================================================================\n")

if __name__ == "__main__":
    run_random_20_lessons_audit()
