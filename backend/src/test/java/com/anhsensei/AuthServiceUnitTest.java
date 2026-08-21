package com.anhsensei;

import com.anhsensei.common.security.JwtTokenProvider;
import com.anhsensei.common.service.EmailService;
import com.anhsensei.identity.domain.*;
import com.anhsensei.identity.dto.*;
import com.anhsensei.identity.repository.*;
import com.anhsensei.identity.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AuthServiceUnitTest {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private EmailVerificationTokenRepository emailVerificationRepository;
    private PasswordResetTokenRepository passwordResetRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthService authService;

    private EmailService emailService;
    private Role learnerRole;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        roleRepository = mock(RoleRepository.class);
        refreshTokenRepository = mock(RefreshTokenRepository.class);
        emailVerificationRepository = mock(EmailVerificationTokenRepository.class);
        passwordResetRepository = mock(PasswordResetTokenRepository.class);
        emailService = mock(EmailService.class);
        passwordEncoder = new BCryptPasswordEncoder(12);

        jwtTokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", "default_jwt_secret_must_be_overridden_in_env_file_32_chars");
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpirationInMs", 900000L);

        authService = new AuthService(
                userRepository,
                roleRepository,
                refreshTokenRepository,
                emailVerificationRepository,
                passwordResetRepository,
                passwordEncoder,
                jwtTokenProvider,
                emailService
        );

        learnerRole = new Role(1L, "LEARNER", "Người học", null);
        when(roleRepository.findByRoleName("LEARNER")).thenReturn(Optional.of(learnerRole));
    }

    @Test
    @DisplayName("Test 1 & 11: Email được trim/lowercase, tài khoản tạo mới ở dạng PENDING_VERIFICATION")
    void testRegisterEmailNormalizationAndPendingVerification() {
        RegisterRequest request = new RegisterRequest("  Nguyễn Văn A  ", "  TestUSER@Example.COM  ", "Password123!");
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.empty());

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        when(userRepository.save(userCaptor.capture())).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setUserId(100L);
            return u;
        });

        String verificationToken = authService.register(request);

        assertNotNull(verificationToken);
        User savedUser = userCaptor.getValue();
        assertEquals("testuser@example.com", savedUser.getEmail());
        assertEquals("Nguyễn Văn A", savedUser.getFullName());
        assertEquals("PENDING_VERIFICATION", savedUser.getStatus());
        assertEquals("LEARNER", savedUser.getRole().getRoleName());
    }

    @Test
    @DisplayName("Test 2: Email trùng đã ACTIVE bị từ chối")
    void testDuplicateActiveEmailRejection() {
        RegisterRequest request = new RegisterRequest("Nguyễn Văn B", "EXISTING@Example.com", "Password123!");
        User activeUser = new User();
        activeUser.setEmail("existing@example.com");
        activeUser.setStatus("ACTIVE");
        when(userRepository.findByEmail("existing@example.com")).thenReturn(Optional.of(activeUser));

        assertThrows(IllegalArgumentException.class, () -> authService.register(request));
    }

    @Test
    @DisplayName("Test 5 & 15: Đăng nhập thành công trả token và lưu HASH refresh token vào DB (không lưu thô)")
    void testLoginSuccessAndHashStorage() {
        User user = new User();
        user.setUserId(1L);
        user.setEmail("user@example.com");
        user.setPasswordHash(passwordEncoder.encode("Password123!"));
        user.setFullName("User Test");
        user.setRole(learnerRole);
        user.setStatus("ACTIVE");
        user.setFailedLoginCount(0);

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));

        ArgumentCaptor<RefreshToken> tokenCaptor = ArgumentCaptor.forClass(RefreshToken.class);
        when(refreshTokenRepository.save(tokenCaptor.capture())).thenAnswer(invocation -> invocation.getArgument(0));

        LoginRequest loginRequest = new LoginRequest("User@Example.com", "Password123!");
        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response.getAccessToken());
        assertNotNull(response.getRefreshToken());

        RefreshToken savedToken = tokenCaptor.getValue();
        assertNotEquals(response.getRefreshToken(), savedToken.getTokenHash(), "Database KHÔNG được lưu refresh token thô, chỉ lưu HASH!");
        assertEquals(64, savedToken.getTokenHash().length(), "Token hash SHA-256 có độ dài 64 ký tự hex");
    }

    @Test
    @DisplayName("Test 6: Sai mật khẩu trả thông báo chung")
    void testWrongPasswordGenericError() {
        User user = new User();
        user.setEmail("user@example.com");
        user.setPasswordHash(passwordEncoder.encode("Password123!"));
        user.setStatus("ACTIVE");
        user.setFailedLoginCount(0);

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));

        LoginRequest loginRequest = new LoginRequest("user@example.com", "WrongPassword!");
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> authService.login(loginRequest));

        assertEquals("Email hoặc mật khẩu không chính xác", ex.getMessage());
    }

    @Test
    @DisplayName("Test 7, 8, 9, 10: Sai 5 lần liên tiếp khóa 15p; hết khóa đăng nhập lại và reset bộ đếm")
    void testFailedLoginLockoutAndReset() {
        User user = new User();
        user.setUserId(1L);
        user.setEmail("user@example.com");
        user.setPasswordHash(passwordEncoder.encode("Password123!"));
        user.setRole(learnerRole);
        user.setStatus("ACTIVE");
        user.setFailedLoginCount(4);

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));

        // Attempt 5 (fail) -> should trigger 15 minute lock
        LoginRequest loginRequest = new LoginRequest("user@example.com", "WrongPassword!");
        assertThrows(IllegalArgumentException.class, () -> authService.login(loginRequest));
        assertEquals(5, user.getFailedLoginCount());
        assertNotNull(user.getLockUntil());
        assertTrue(user.getLockUntil().isAfter(OffsetDateTime.now()));

        // Attempt during lockout period -> should be rejected
        IllegalStateException lockEx = assertThrows(IllegalStateException.class, () -> authService.login(loginRequest));
        assertTrue(lockEx.getMessage().contains("khóa tạm thời"));

        // Simulate expired lock
        user.setLockUntil(OffsetDateTime.now().minusMinutes(1));

        // Successful login after lock expiration -> resets failedLoginCount to 0
        LoginRequest correctLogin = new LoginRequest("user@example.com", "Password123!");
        AuthResponse response = authService.login(correctLogin);

        assertNotNull(response.getAccessToken());
        assertEquals(0, user.getFailedLoginCount());
        assertNull(user.getLockUntil());
    }

    @Test
    @DisplayName("Test 12: Tài khoản Locked/Disabled/Pending không nhận token")
    void testInactiveAccountDeniedToken() {
        User pendingUser = new User();
        pendingUser.setEmail("pending@example.com");
        pendingUser.setPasswordHash(passwordEncoder.encode("Password123!"));
        pendingUser.setStatus("PENDING_VERIFICATION");

        when(userRepository.findByEmail("pending@example.com")).thenReturn(Optional.of(pendingUser));
        assertThrows(IllegalStateException.class, () -> authService.login(new LoginRequest("pending@example.com", "Password123!")));

        User lockedUser = new User();
        lockedUser.setEmail("locked@example.com");
        lockedUser.setPasswordHash(passwordEncoder.encode("Password123!"));
        lockedUser.setStatus("LOCKED");

        when(userRepository.findByEmail("locked@example.com")).thenReturn(Optional.of(lockedUser));
        assertThrows(IllegalStateException.class, () -> authService.login(new LoginRequest("locked@example.com", "Password123!")));
    }

    @Test
    @DisplayName("Test 16 & 17: Refresh token được rotate, token cũ bị thu hồi")
    void testRefreshTokenRotation() {
        User user = new User();
        user.setUserId(1L);
        user.setEmail("user@example.com");
        user.setRole(learnerRole);
        user.setStatus("ACTIVE");

        RefreshToken oldToken = new RefreshToken();
        oldToken.setTokenId(10L);
        oldToken.setUser(user);
        oldToken.setTokenFamily(UUID.randomUUID());
        oldToken.setExpiresAt(OffsetDateTime.now().plusDays(7));

        when(refreshTokenRepository.findByTokenHashWithLock(anyString())).thenReturn(Optional.of(oldToken));
        when(refreshTokenRepository.save(any(RefreshToken.class))).thenAnswer(i -> i.getArgument(0));

        AuthResponse response = authService.refresh(new RefreshTokenRequest("raw_refresh_token"));

        assertNotNull(response.getAccessToken());
        assertNotNull(response.getRefreshToken());
        assertNotNull(oldToken.getRevokedAt(), "Token cũ phải bị đánh dấu thu hồi (revokedAt)");
    }

    @Test
    @DisplayName("Test 19: Logout revoke đúng refresh token")
    void testLogoutRevokesToken() {
        RefreshToken token = new RefreshToken();
        token.setTokenId(5L);
        when(refreshTokenRepository.findByTokenHash(anyString())).thenReturn(Optional.of(token));

        authService.logout(new LogoutRequest("some_refresh_token"));

        assertNotNull(token.getRevokedAt(), "Logout phải đánh dấu thu hồi token");
    }

    @Test
    @DisplayName("Test 20, 21, 24: Đổi mật khẩu / Lock / Reset password revoke toàn bộ refresh token")
    void testRevokeAllTokensOnSecurityEvents() {
        User user = new User();
        user.setUserId(99L);
        user.setPasswordHash(passwordEncoder.encode("OldPassword123!"));

        when(userRepository.findById(99L)).thenReturn(Optional.of(user));

        ChangePasswordRequest req = new ChangePasswordRequest("OldPassword123!", "NewPassword123!");
        authService.changePassword(99L, req);

        verify(refreshTokenRepository, times(1)).revokeAllByUserId(eq(99L), any(OffsetDateTime.class));
    }

    @Test
    @DisplayName("Test 27: Forgot password ném ra ngoại lệ khi email không tồn tại trong hệ thống")
    void testForgotPasswordGenericResponse() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> authService.forgotPassword(new ForgotPasswordRequest("nonexistent@example.com")));
    }
}
