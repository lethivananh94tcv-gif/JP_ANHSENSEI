package com.anhsensei.curriculum.util;

import com.anhsensei.curriculum.domain.ConjugationForm;
import com.anhsensei.curriculum.domain.VerbGroup;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class ConjugationRuleEngine {

    // Known Group 1 verbs ending in します (Godan su-verbs)
    private static final Set<String> GROUP_1_SU_VERBS = new HashSet<>(Arrays.asList(
            "話します", "はなします", "貸します", "かします", "消します", "けします",
            "押します", "おします", "直します", "なおします", "起こします", "おこします",
            "落とします", "おとします", "探します", "さがします", "回します", "まわします",
            "渡します", "わたします", "出します", "だします", "壊します", "こわします",
            "戻します", "もどします", "沸かします", "わかします", "冷やします", "ひやします",
            "蒸します", "むします", "動かします", "うごかします", "減らします", "へらします",
            "増やします", "ふやします", "残します", "のこします", "伸ばします", "のばします",
            "鳴らします", "ならします"
    ));

    // Famous N5/N4 Ichidan (Group 2) verbs that end in -i + masu
    private static final Set<String> GROUP_2_I_EXCEPTIONS = new HashSet<>(Arrays.asList(
            "見ます", "みます", "起きます", "おきます", "借ります", "かります",
            "降ります", "ふります", "おります", "浴びます", "あびます",
            "居ます", "います", "足ります", "たります", "着ます", "きます",
            "落ちます", "おちます", "信じます", "しんじます", "閉じます", "とじます",
            "生きます", "いきます"
    ));

    /**
     * Automatically detects verb group if not provided
     */
    public static VerbGroup detectGroup(String masuForm, String dictForm) {
        String verb = (masuForm != null && !masuForm.isBlank()) ? masuForm.trim() : (dictForm != null ? dictForm.trim() : "");
        if (verb.isEmpty()) {
            return VerbGroup.GROUP_1;
        }

        // 1. Group 3 Irregular check
        if (isGroup3Kuru(verb)) {
            return VerbGroup.GROUP_3;
        }

        // Suru (します / する / Noun + します) - except known Group 1 su-verbs
        if (!GROUP_1_SU_VERBS.contains(verb)) {
            if (verb.equals("します") || verb.equals("する") || verb.endsWith("します") || verb.endsWith("する")) {
                return VerbGroup.GROUP_3;
            }
        }

        // 2. Group 2 Ichidan check
        if (GROUP_2_I_EXCEPTIONS.contains(verb)) {
            return VerbGroup.GROUP_2;
        }

        if (verb.endsWith("ます")) {
            if (verb.length() >= 3) {
                String stemChar = verb.substring(verb.length() - 3, verb.length() - 2);
                if ("えけせてねへめれエケセテネヘメレ".contains(stemChar)) {
                    return VerbGroup.GROUP_2;
                }
            }
        } else if (verb.endsWith("る")) {
            if (verb.length() >= 2) {
                String prevChar = verb.substring(verb.length() - 2, verb.length() - 1);
                if ("えけせてねへめれエケセテネヘメレ".contains(prevChar)) {
                    return VerbGroup.GROUP_2;
                }
            }
        }

        // 3. Group 1 Godan fallback
        return VerbGroup.GROUP_1;
    }

    private static boolean isGroup3Kuru(String verb) {
        return verb.equals("来ます") || verb.equals("きます") || verb.equals("くる") || verb.equals("来る")
                || verb.endsWith("来ます") || verb.endsWith("てきます") || verb.endsWith("てくる") || verb.endsWith("て来る");
    }

    /**
     * Core conjugation method
     */
    public static String conjugate(String masuForm, VerbGroup group, ConjugationForm form) {
        if (masuForm == null || masuForm.isBlank()) {
            return "";
        }

        String verb = masuForm.trim();
        VerbGroup effectiveGroup = (group != null) ? group : detectGroup(verb, null);

        // Remove "ます" if present
        String stem = verb.endsWith("ます") ? verb.substring(0, verb.length() - 2) : verb;

        switch (form) {
            case MASU:
                return verb.endsWith("ます") ? verb : stem + "ます";

            case DICT:
                return conjugateDict(stem, verb, effectiveGroup);

            case TE:
                return conjugateTe(stem, verb, effectiveGroup);

            case NAI:
                return conjugateNai(stem, verb, effectiveGroup);

            case TA:
                return conjugateTa(stem, verb, effectiveGroup);

            case POTENTIAL:
                return conjugatePotential(stem, verb, effectiveGroup);

            case VOLITIONAL:
                return conjugateVolitional(stem, verb, effectiveGroup);

            case IMPERATIVE:
                return conjugateImperative(stem, verb, effectiveGroup);

            case CONDITIONAL_BA:
                return conjugateConditionalBa(stem, verb, effectiveGroup);

            case PASSIVE:
                return conjugatePassive(stem, verb, effectiveGroup);

            case CAUSATIVE:
                return conjugateCausative(stem, verb, effectiveGroup);

            default:
                return verb;
        }
    }

    // ==========================================
    // PHASE 1: MVP CONJUGATION RULES
    // ==========================================

    private static String conjugateDict(String stem, String fullVerb, VerbGroup group) {
        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来る" : "くる");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "する";
            }
            return stem + "する";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "る";
        }
        // Group 1: Change last kana of stem from -i to -u
        if (stem.isEmpty()) return fullVerb;
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoU(last);
    }

    private static String conjugateTe(String stem, String fullVerb, VerbGroup group) {
        // Exception: 行きます / いく
        if (fullVerb.equals("行きます") || fullVerb.equals("いきます") || stem.equals("行") || stem.equals("い")) {
            return fullVerb.contains("行") ? "行って" : "いって";
        }

        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来て" : "きて");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "して";
            }
            return stem + "て";
        }

        if (group == VerbGroup.GROUP_2) {
            return stem + "て";
        }

        // Group 1 Te-form rules
        if (stem.isEmpty()) return fullVerb;
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);

        switch (last) {
            case 'い': case 'ち': case 'り':
                return prefix + "った";
            case 'み': case 'び': case 'に':
                return prefix + "んで";
            case 'き':
                return prefix + "いて";
            case 'ぎ':
                return prefix + "いで";
            case 'し':
                return prefix + "して";
            default:
                return stem + "て";
        }
    }

    private static String conjugateTa(String stem, String fullVerb, VerbGroup group) {
        String te = conjugateTe(stem, fullVerb, group);
        if (te.endsWith("て")) {
            return te.substring(0, te.length() - 1) + "た";
        } else if (te.endsWith("で")) {
            return te.substring(0, te.length() - 1) + "だ";
        }
        return te;
    }

    private static String conjugateNai(String stem, String fullVerb, VerbGroup group) {
        // Exception: ある / あります
        if (fullVerb.equals("あります") || fullVerb.equals("ある")) {
            return "ない";
        }

        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来ない" : "こない");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "しない";
            }
            return stem + "ない";
        }

        if (group == VerbGroup.GROUP_2) {
            return stem + "ない";
        }

        // Group 1: Change last kana from -i to -a + ない (Special: い -> わない)
        if (stem.isEmpty()) return fullVerb;
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoA(last) + "ない";
    }

    // ==========================================
    // PHASE 2: ADVANCED CONJUGATION RULES
    // ==========================================

    private static String conjugatePotential(String stem, String fullVerb, VerbGroup group) {
        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来られる" : "こられる");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "できる";
            }
            return "できる";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "られる";
        }
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoE(last) + "る";
    }

    private static String conjugateVolitional(String stem, String fullVerb, VerbGroup group) {
        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来よう" : "こよう");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "しよう";
            }
            return "しよう";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "よう";
        }
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoO(last) + "う";
    }

    private static String conjugateImperative(String stem, String fullVerb, VerbGroup group) {
        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来い" : "こい");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "しろ";
            }
            return "しろ";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "ろ";
        }
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoE(last);
    }

    private static String conjugateConditionalBa(String stem, String fullVerb, VerbGroup group) {
        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来れば" : "くれば");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "すれば";
            }
            return "すれば";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "れば";
        }
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoE(last) + "ば";
    }

    private static String conjugatePassive(String stem, String fullVerb, VerbGroup group) {
        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来られる" : "こられる");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "される";
            }
            return "される";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "られる";
        }
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoA(last) + "れる";
    }

    private static String conjugateCausative(String stem, String fullVerb, VerbGroup group) {
        if (group == VerbGroup.GROUP_3) {
            if (isGroup3Kuru(fullVerb)) {
                boolean isKanji = fullVerb.contains("来");
                String prefix = extractPrefixBeforeKuru(fullVerb);
                return prefix + (isKanji ? "来させる" : "こさせる");
            }
            if (fullVerb.endsWith("します") && stem.endsWith("し")) {
                return stem.substring(0, stem.length() - 1) + "させる";
            }
            return "させる";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "させる";
        }
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoA(last) + "せる";
    }

    private static String extractPrefixBeforeKuru(String verb) {
        if (verb.endsWith("来ます")) return verb.substring(0, verb.length() - 3);
        if (verb.endsWith("きます")) return verb.substring(0, verb.length() - 3);
        if (verb.endsWith("来る")) return verb.substring(0, verb.length() - 2);
        if (verb.endsWith("くる")) return verb.substring(0, verb.length() - 2);
        return "";
    }

    // Helper Kana Transliterations
    private static String changeItoU(char c) {
        switch (c) {
            case 'い': return "う";
            case 'き': return "く";
            case 'ぎ': return "ぐ";
            case 'し': return "す";
            case 'ち': return "つ";
            case 'に': return "ぬ";
            case 'ひ': return "ふ";
            case 'み': return "む";
            case 'り': return "る";
            default: return String.valueOf(c);
        }
    }

    private static String changeItoA(char c) {
        switch (c) {
            case 'い': return "わ";
            case 'き': return "か";
            case 'ぎ': return "が";
            case 'し': return "さ";
            case 'ち': return "た";
            case 'に': return "な";
            case 'ひ': return "は";
            case 'み': return "ま";
            case 'り': return "ら";
            default: return String.valueOf(c);
        }
    }

    private static String changeItoE(char c) {
        switch (c) {
            case 'い': return "え";
            case 'き': return "け";
            case 'ぎ': return "げ";
            case 'し': return "せ";
            case 'ち': return "て";
            case 'に': return "ね";
            case 'ひ': return "へ";
            case 'み': return "め";
            case 'り': return "れ";
            default: return String.valueOf(c);
        }
    }

    private static String changeItoO(char c) {
        switch (c) {
            case 'い': return "お";
            case 'き': return "こ";
            case 'ぎ': return "ご";
            case 'し': return "そ";
            case 'ち': return "と";
            case 'に': return "の";
            case 'ひ': return "ほ";
            case 'み': return "も";
            case 'り': return "ろ";
            default: return String.valueOf(c);
        }
    }
}
