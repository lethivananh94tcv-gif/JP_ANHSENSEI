#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Japanese Example Sentence Quality Validator
------------------------------------------
Validates presence of target word, naturalness, length, and absence of generic placeholders.
Supports Japanese verb conjugation forms and brackets (［ご］ / ［お］).
"""

import re

GENERIC_PLACEHOLDERS = [
    '勉強して 覚えます',
    '勉強して覚えます',
    '役に立ちます',
    'これはテストです'
]

def get_verb_stems(word_str):
    """
    Generates common conjugation stems for a Japanese verb in dictionary or ます form.
    E.g. 診ます -> [診ます, 診て, 診た, 診ない, 診る, 診]
    """
    w = word_str.replace('～', '').replace('・', '').replace('~', '').replace('［', '').replace('］', '').replace('[', '').replace(']', '').strip()
    stems = {w}

    if w.endswith('ます'):
        base = w[:-2]
        stems.add(base)
        # Te/Ta forms
        if base.endswith('き'):
            stems.add(base[:-1] + 'いて')
            stems.add(base[:-1] + 'いた')
        elif base.endswith('ぎ'):
            stems.add(base[:-1] + 'いで')
            stems.add(base[:-1] + 'いだ')
        elif base.endswith(('ち', 'り', 'い')):
            stems.add(base[:-1] + 'って')
            stems.add(base[:-1] + 'った')
        elif base.endswith(('み', 'び', 'に')):
            stems.add(base[:-1] + 'んで')
            stems.add(base[:-1] + 'んだ')
        elif base.endswith('し'):
            stems.add(base[:-1] + 'して')
            stems.add(base[:-1] + 'した')
        else:
            stems.add(base + 'て')
            stems.add(base + 'た')
    elif w.endswith('む'):
        base = w[:-1]
        stems.add(base)
        stems.add(base + 'んで')
        stems.add(base + 'んだ')
        stems.add(base + 'みます')
    elif w.endswith('つ') or w.endswith('る') or w.endswith('う'):
        base = w[:-1]
        stems.add(base)
        stems.add(base + 'って')
        stems.add(base + 'った')

    return [s for s in stems if len(s) > 0]

def validate_japanese(item):
    """
    Validates example_jp field against target word/kana/kanji.
    Returns list of error dicts: [{'code': '...', 'message': '...'}]
    """
    errors = []
    ex_jp = (item.get('example_jp') or '').strip()
    ex_rd = (item.get('example_reading') or '').strip()
    word = (item.get('word') or '').strip()
    kana = (item.get('kana') or '').strip()
    kanji = (item.get('kanji_form') or item.get('kanji') or '').strip()

    # 1. Missing check
    if not ex_jp:
        errors.append({
            'code': 'MISSING_JAPANESE',
            'message': 'Câu ví dụ tiếng Nhật bị rỗng'
        })
        return errors

    # 2. Generic placeholder check
    for ph in GENERIC_PLACEHOLDERS:
        if ph in ex_jp and word not in ph and kana not in ph:
            errors.append({
                'code': 'UNNATURAL_JAPANESE',
                'message': f"Câu chứa mẫu lặp khuôn mẫu/thô: '{ph}'"
            })

    # 3. Target word presence check
    disp = kanji if kanji else word
    clean_disp = disp.replace('～', '').replace('・', '').replace('~', '').replace('［', '').replace('］', '').replace('[', '').replace(']', '').strip()
    clean_kana = kana.replace('～', '').replace('・', '').replace('~', '').replace('［', '').replace('］', '').replace('[', '').replace(']', '').strip()

    found = False

    # Check prefix tilde (e.g. ～場所) or brackets
    if '～' in disp or '～' in kana or '~' in disp or '~' in kana:
        tokens = [t.strip() for t in re.split(r'[～・~]', disp if '～' in disp or '~' in disp else kana) if t.strip()]
        if tokens and all(t in ex_jp or t in ex_rd for t in tokens):
            found = True

    if not found:
        stems_disp = get_verb_stems(clean_disp)
        stems_kana = get_verb_stems(clean_kana)
        all_stems = set(stems_disp + stems_kana + [clean_disp, clean_kana])

        for s in all_stems:
            if s and (s in ex_jp or s in ex_rd):
                found = True
                break

    if not found and len(clean_disp) > 0:
        errors.append({
            'code': 'TARGET_WORD_NOT_FOUND',
            'message': f"Không tìm thấy từ vựng mục tiêu '{clean_disp}' (hoặc biến thể) trong câu ví dụ"
        })

    # 4. Sentence length check
    if len(ex_jp) > 150:
        errors.append({
            'code': 'LEVEL_TOO_DIFFICULT',
            'message': f"Câu ví dụ quá dài ({len(ex_jp)} ký tự), có thể quá phức tạp"
        })

    return errors
