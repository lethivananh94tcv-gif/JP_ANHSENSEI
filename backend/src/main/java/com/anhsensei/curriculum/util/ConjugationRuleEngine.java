package com.anhsensei.curriculum.util;

import com.anhsensei.curriculum.domain.ConjugationForm;
import com.anhsensei.curriculum.domain.VerbGroup;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class ConjugationRuleEngine {

    // Famous N5/N4 Ichidan (Group 2) verbs that end in -i + masu
    private static final Set<String> GROUP_2_I_EXCEPTIONS = new HashSet<>(Arrays.asList(
            "見ます", "みます", "起きます", "おきます", "借ります", "かります",
            "降ります", "ふります", "おります", "浴びます", "あびます",
            "居ます", "います", "足ります", "たります", "着ます", "きます"
    ));

    /**
     * Automatically detects verb group if not provided
     */
    public static VerbGroup detectGroup(String masuForm, String dictForm) {
        String verb = (masuForm != null && !masuForm.isBlank()) ? masuForm.trim() : (dictForm != null ? dictForm.trim() : "");
        if (verb.isEmpty()) {
            return VerbGroup.GROUP_1;
        }

        if (verb.endsWith("します") || verb.equals("する") || verb.endsWith("きます") || verb.equals("くる") || verb.equals("来る")) {
            return VerbGroup.GROUP_3;
        }

        if (GROUP_2_I_EXCEPTIONS.contains(verb)) {
            return VerbGroup.GROUP_2;
        }

        if (verb.endsWith("ます")) {
            String stemChar = verb.substring(Math.max(0, verb.length() - 3), verb.length() - 2);
            // Check if stemChar ends in -e sound (え, け, せ, て, ね, へ, め, れ)
            if ("えけせてねへめれエケセテネヘメレ".contains(stemChar)) {
                return VerbGroup.GROUP_2;
            }
        }

        return VerbGroup.GROUP_1;
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
            if (fullVerb.endsWith("きます") || fullVerb.equals("くる") || fullVerb.equals("来る")) return "くる";
            if (fullVerb.endsWith("します")) return stem.substring(0, stem.length() - 1) + "する";
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
            if (fullVerb.endsWith("きます") || fullVerb.equals("くる") || fullVerb.equals("来る")) {
                return fullVerb.contains("来") ? "来て" : "きて";
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
            if (fullVerb.endsWith("きます") || fullVerb.equals("くる") || fullVerb.equals("来る")) {
                return fullVerb.contains("来") ? "来ない" : "こない";
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
            if (fullVerb.endsWith("きます")) return "こられる";
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
            if (fullVerb.endsWith("きます")) return "こよう";
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
            if (fullVerb.endsWith("きます")) return "こい";
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
            if (fullVerb.endsWith("きます")) return "くれば";
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
            if (fullVerb.endsWith("きます")) return "こられる";
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
            if (fullVerb.endsWith("きます")) return "こさせる";
            return "させる";
        }
        if (group == VerbGroup.GROUP_2) {
            return stem + "させる";
        }
        char last = stem.charAt(stem.length() - 1);
        String prefix = stem.substring(0, stem.length() - 1);
        return prefix + changeItoA(last) + "せる";
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
