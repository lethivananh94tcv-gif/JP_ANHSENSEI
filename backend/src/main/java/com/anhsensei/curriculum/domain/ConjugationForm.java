package com.anhsensei.curriculum.domain;

public enum ConjugationForm {
    // Phase 1 (MVP Forms)
    MASU,            // Thể Masu (ます形)
    DICT,            // Thể Từ điển (辞書形)
    TE,              // Thể Te (て形)
    NAI,             // Thể Phủ định (ない形)
    TA,              // Thể Quá khứ (た形)

    // Phase 2 (Advanced Forms)
    POTENTIAL,       // Thể Khả năng (可能形)
    VOLITIONAL,      // Thể Ý định (意向形)
    IMPERATIVE,      // Thể Mệnh lệnh (命令形)
    CONDITIONAL_BA,  // Thể Điều kiện (仮定形 - ば)
    PASSIVE,         // Thể Bị động (受身形)
    CAUSATIVE        // Thể Sai khiến (使役形)
}
