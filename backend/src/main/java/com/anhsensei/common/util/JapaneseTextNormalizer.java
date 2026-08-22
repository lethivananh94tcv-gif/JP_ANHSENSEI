package com.anhsensei.common.util;

import java.util.ArrayList;
import java.util.List;

public class JapaneseTextNormalizer {

    public static String normalize(String input) {
        if (input == null) return "";
        String trimmed = input.trim().toLowerCase();

        // Convert full-width ASCII to half-width
        StringBuilder sb = new StringBuilder();
        for (char c : trimmed.toCharArray()) {
            if (c >= 0xFF01 && c <= 0xFF5E) {
                sb.append((char) (c - 0xEE00));
            } else if (c == 0x3000) { // Ideographic space
                sb.append(' ');
            } else {
                sb.append(c);
            }
        }
        return sb.toString().trim();
    }

    public static boolean matches(String userInput, String mainWord, String mainKana, List<String> extraAliases) {
        if (userInput == null || userInput.isBlank()) return false;
        String normUser = normalize(userInput);

        List<String> validTargets = new ArrayList<>();
        if (mainWord != null && !mainWord.isBlank()) validTargets.add(normalize(mainWord));
        if (mainKana != null && !mainKana.isBlank()) validTargets.add(normalize(mainKana));
        if (extraAliases != null) {
            for (String alias : extraAliases) {
                if (alias != null && !alias.isBlank()) {
                    validTargets.add(normalize(alias));
                }
            }
        }

        for (String target : validTargets) {
            if (normUser.equals(target)) {
                return true;
            }
        }
        return false;
    }
}
