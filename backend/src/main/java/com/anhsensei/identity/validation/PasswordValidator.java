package com.anhsensei.identity.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null || password.length() < 8) {
            return false;
        }

        int groupCount = 0;
        if (password.matches(".*[A-Z].*")) {
            groupCount++;
        }
        if (password.matches(".*[a-z].*")) {
            groupCount++;
        }
        if (password.matches(".*[0-9].*")) {
            groupCount++;
        }
        if (password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            groupCount++;
        }

        return groupCount >= 3;
    }
}
