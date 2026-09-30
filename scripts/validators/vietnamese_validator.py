#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Vietnamese Translation Quality Validator
---------------------------------------
Validates Vietnamese translation for completeness, natural phrasing, and absence of generic machine translation artifacts.
"""

def validate_vietnamese(item):
    """
    Validates example_vi field.
    Returns list of error dicts.
    """
    errors = []
    ex_vi = (item.get('example_vi') or '').strip()

    if not ex_vi:
        errors.append({
            'code': 'TRANSLATION_MISMATCH',
            'message': 'Bản dịch tiếng Việt bị rỗng'
        })
        return errors

    # Check for raw translation artifacts or English fallback inside Vietnamese
    if any(kw in ex_vi.lower() for kw in ['undefined', 'null', 'translation missing', '[object object]']):
        errors.append({
            'code': 'TRANSLATION_MISMATCH',
            'message': 'Bản dịch tiếng Việt chứa giá trị lỗi hệ thống (undefined/null)'
        })

    # Check for overly generic machine translations like "Tôi học và nhớ..."
    if ex_vi in ['Tôi học và ghi nhớ.', 'Tôi học và nhớ.', 'Đây là câu ví dụ.']:
        errors.append({
            'code': 'TRANSLATION_MISMATCH',
            'message': f"Bản dịch rập khuôn: '{ex_vi}'"
        })

    return errors
