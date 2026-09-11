package com.anhsensei.curriculum.util;

import com.anhsensei.curriculum.domain.ConjugationForm;
import com.anhsensei.curriculum.domain.VerbGroup;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ConjugationRuleEngineTest {

    @Test
    @DisplayName("Test Group 1 Verb Conjugations (書きます & 飲みます)")
    void testGroup1Conjugations() {
        // かきます (Godan)
        assertEquals("かく", ConjugationRuleEngine.conjugate("かきます", VerbGroup.GROUP_1, ConjugationForm.DICT));
        assertEquals("かいて", ConjugationRuleEngine.conjugate("かきます", VerbGroup.GROUP_1, ConjugationForm.TE));
        assertEquals("かいた", ConjugationRuleEngine.conjugate("かきます", VerbGroup.GROUP_1, ConjugationForm.TA));
        assertEquals("かかない", ConjugationRuleEngine.conjugate("かきます", VerbGroup.GROUP_1, ConjugationForm.NAI));

        // のみます (Godan)
        assertEquals("のんで", ConjugationRuleEngine.conjugate("のみます", VerbGroup.GROUP_1, ConjugationForm.TE));
        assertEquals("のんだ", ConjugationRuleEngine.conjugate("のみます", VerbGroup.GROUP_1, ConjugationForm.TA));
        assertEquals("のまない", ConjugationRuleEngine.conjugate("のみます", VerbGroup.GROUP_1, ConjugationForm.NAI));
    }

    @Test
    @DisplayName("Test Group 2 Verb Conjugations (食べます & 見ます)")
    void testGroup2Conjugations() {
        // たべます (Ichidan)
        assertEquals("たべる", ConjugationRuleEngine.conjugate("たべます", VerbGroup.GROUP_2, ConjugationForm.DICT));
        assertEquals("たべて", ConjugationRuleEngine.conjugate("たべます", VerbGroup.GROUP_2, ConjugationForm.TE));
        assertEquals("たべた", ConjugationRuleEngine.conjugate("たべます", VerbGroup.GROUP_2, ConjugationForm.TA));
        assertEquals("たべない", ConjugationRuleEngine.conjugate("たべます", VerbGroup.GROUP_2, ConjugationForm.NAI));
    }

    @Test
    @DisplayName("Test Group 3 Verb Conjugations (します & きます)")
    void testGroup3Conjugations() {
        // します (Irregular)
        assertEquals("して", ConjugationRuleEngine.conjugate("します", VerbGroup.GROUP_3, ConjugationForm.TE));
        assertEquals("した", ConjugationRuleEngine.conjugate("します", VerbGroup.GROUP_3, ConjugationForm.TA));
        assertEquals("しない", ConjugationRuleEngine.conjugate("します", VerbGroup.GROUP_3, ConjugationForm.NAI));

        // きます (Irregular)
        assertEquals("きて", ConjugationRuleEngine.conjugate("きます", VerbGroup.GROUP_3, ConjugationForm.TE));
        assertEquals("きた", ConjugationRuleEngine.conjugate("きます", VerbGroup.GROUP_3, ConjugationForm.TA));
        assertEquals("こない", ConjugationRuleEngine.conjugate("きます", VerbGroup.GROUP_3, ConjugationForm.NAI));
    }

    @Test
    @DisplayName("Test Important Verb Exceptions (行きます & あります)")
    void testExceptions() {
        // 行きます -> いって / いった (Not いいて / いいた)
        assertEquals("いって", ConjugationRuleEngine.conjugate("いきます", VerbGroup.GROUP_1, ConjugationForm.TE));
        assertEquals("いった", ConjugationRuleEngine.conjugate("いきます", VerbGroup.GROUP_1, ConjugationForm.TA));
        assertEquals("行って", ConjugationRuleEngine.conjugate("行きます", VerbGroup.GROUP_1, ConjugationForm.TE));
        assertEquals("行った", ConjugationRuleEngine.conjugate("行きます", VerbGroup.GROUP_1, ConjugationForm.TA));

        // あります -> ない (Not あらない)
        assertEquals("ない", ConjugationRuleEngine.conjugate("あります", VerbGroup.GROUP_1, ConjugationForm.NAI));
    }
}
