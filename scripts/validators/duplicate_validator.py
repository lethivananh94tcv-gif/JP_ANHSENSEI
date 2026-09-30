#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Duplicate Example Validator
--------------------------
Detects duplicate Japanese sentences or abnormal duplicate Vietnamese translations across a dataset.
"""

from collections import Counter

def validate_duplicates(dataset):
    """
    Validates a list of items for duplicates.
    Returns a dict mapping vocabulary_id to list of error dicts.
    """
    errors_map = {}

    jp_counts = Counter()
    vi_counts = Counter()

    for item in dataset:
        ex_jp = (item.get('example_jp') or '').strip()
        ex_vi = (item.get('example_vi') or '').strip()
        if ex_jp:
            jp_counts[ex_jp] += 1
        if ex_vi:
            vi_counts[ex_vi] += 1

    for item in dataset:
        vid = item.get('vocabulary_id')
        ex_jp = (item.get('example_jp') or '').strip()
        ex_vi = (item.get('example_vi') or '').strip()

        item_errors = []

        if ex_jp and jp_counts[ex_jp] > 1:
            item_errors.append({
                'code': 'DUPLICATE_EXAMPLE',
                'message': f"Câu tiếng Nhật bị trùng lặp ({jp_counts[ex_jp]} lần)"
            })

        if ex_vi and vi_counts[ex_vi] > 3: # Allow up to 3 short common translations, flag higher
            item_errors.append({
                'code': 'DUPLICATE_EXAMPLE',
                'message': f"Bản dịch tiếng Việt bị lặp lại bất thường ({vi_counts[ex_vi]} lần)"
            })

        if item_errors:
            errors_map[vid] = item_errors

    return errors_map
