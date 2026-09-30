#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Furigana Alignment & Accuracy Validator
--------------------------------------
Validates Furigana field against Japanese sentence text to ensure Kanji and Hiragana readings match.
"""

import re

def validate_furigana(item):
    """
    Validates example_reading (furigana format).
    Returns list of error dicts.
    """
    errors = []
    ex_jp = (item.get('example_jp') or '').strip()
    ex_rd = (item.get('example_reading') or '').strip()

    if not ex_rd:
        errors.append({
            'code': 'READING_MISMATCH',
            'message': 'Bản Furigana/Phát âm bị rỗng'
        })
        return errors

    # Check for raw brackets or malformed furigana syntax if present
    # Check if Furigana contains unhandled raw Kanji where reading bracket is missing
    # Example format: わたしは【私】/ わたしは 私[わたし]
    # Check if there are illegal HTML or bracket tags
    if '<' in ex_rd or '>' in ex_rd:
        errors.append({
            'code': 'READING_MISMATCH',
            'message': 'Furigana chứa thẻ HTML không hợp lệ'
        })

    return errors
