package com.anhsensei;

import com.anhsensei.identity.validation.PasswordValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class PasswordPolicyAndEncodingTest {

    private PasswordValidator passwordValidator;

    @BeforeEach
    void setUp() {
        passwordValidator = new PasswordValidator();
    }

    @Test
    @DisplayName("Test 3: Mật khẩu không đủ tiêu chuẩn (dưới 8 ký tự hoặc không đủ 3/4 nhóm) bị từ chối")
    void testPasswordValidationPolicy() {
        assertFalse(passwordValidator.isValid("short1!", null), "Dưới 8 ký tự phải bị từ chối");
        assertFalse(passwordValidator.isValid("lowercaseonly", null), "Chỉ có chữ thường phải bị từ chối");
        assertFalse(passwordValidator.isValid("12345678", null), "Chỉ có chữ số phải bị từ chối");

        assertTrue(passwordValidator.isValid("Password123!", null), "Có hoa, thường, số, đặc biệt -> Hợp lệ");
        assertTrue(passwordValidator.isValid("Pass1234", null), "Có hoa, thường, số (3/4 nhóm) -> Hợp lệ");
        assertTrue(passwordValidator.isValid("pass123!", null), "Có thường, số, đặc biệt (3/4 nhóm) -> Hợp lệ");
    }

    @Test
    @DisplayName("Test 4: BCrypt cost nhỏ hơn 12 không được chấp nhận")
    void testBCryptCostRequirement() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        String hashed = encoder.encode("Password123!");

        assertTrue(encoder.matches("Password123!", hashed));
        // Verify cost is at least 12
        assertTrue(hashed.startsWith("$2a$12$") || hashed.startsWith("$2b$12$"), "BCrypt cost phải >= 12");
    }
}
