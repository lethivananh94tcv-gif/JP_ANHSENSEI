package com.anhsensei.identity.service;

import com.anhsensei.common.security.JwtTokenProvider;
import com.anhsensei.common.service.EmailService;
import com.anhsensei.identity.domain.*;
import com.anhsensei.identity.dto.*;
import com.anhsensei.identity.repository.*;
import com.anhsensei.identity.validation.PasswordValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.HexFormat;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailVerificationTokenRepository emailVerificationRepository;
    private final PasswordResetTokenRepository passwordResetRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;

    @Value("${app.jwt.refresh-token-expiration-ms:604800000}")
    private long refreshTokenExpirationMs;

    private final SecureRandom secureRandom = new SecureRandom();
    private final PasswordValidator passwordValidator = new PasswordValidator();

    // In-memory OTP store for email login (Email -> OTP entry)
    private final ConcurrentHashMap<String, OtpEntry> loginOtpMap = new ConcurrentHashMap<>();

    private static class OtpEntry {
        final String code;
        final OffsetDateTime expiresAt;

        OtpEntry(String code, OffsetDateTime expiresAt) {
            this.code = code;
            this.expiresAt = expiresAt;
        }
    }

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            RefreshTokenRepository refreshTokenRepository,
            EmailVerificationTokenRepository emailVerificationRepository,
            PasswordResetTokenRepository passwordResetRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.emailVerificationRepository = emailVerificationRepository;
        this.passwordResetRepository = passwordResetRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.emailService = emailService;
    }

    private String hashToken(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error computing token hash", e);
        }
    }

    private String generateRandomToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return HexFormat.of().formatHex(bytes);
    }

    private String generateNumericOtp() {
        int otp = 100000 + secureRandom.nextInt(900000);
        return String.valueOf(otp);
    }

    @Transactional
    public String register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        Optional<User> existingUserOpt = userRepository.findByEmail(normalizedEmail);
        User user;

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            if ("ACTIVE".equalsIgnoreCase(existingUser.getStatus())) {
                throw new IllegalArgumentException("Email này đã được đăng ký và kích hoạt. Vui lòng chuyển sang Đăng Nhập.");
            }

            // User is PENDING_VERIFICATION -> Update info & allow re-sending OTP
            user = existingUser;
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName().trim());
            if (request.getTargetLevel() != null) {
                user.setTargetLevel(request.getTargetLevel());
            }
        } else {
            if (!passwordValidator.isValid(request.getPassword(), null)) {
                throw new IllegalArgumentException("Mật khẩu không đáp ứng chính sách an toàn");
            }

            Role learnerRole = roleRepository.findByRoleName("LEARNER")
                    .orElseGet(() -> roleRepository.save(new Role(null, "LEARNER", "Người học", null)));

            user = new User();
            user.setEmail(normalizedEmail);
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            user.setFullName(request.getFullName().trim());
            user.setRole(learnerRole);
            user.setTargetLevel(request.getTargetLevel() != null ? request.getTargetLevel() : "N5");
            user.setStatus("PENDING_VERIFICATION");
            user.setFailedLoginCount(0);
        }

        user = userRepository.save(user);

        // Generate and send numeric OTP (Expires in 5 mins) for immediate verification
        String otpCode = generateNumericOtp();
        loginOtpMap.put(normalizedEmail, new OtpEntry(otpCode, OffsetDateTime.now().plusMinutes(5)));

        // Generate raw Token (Expires in 24h)
        String rawToken = generateRandomToken();

        // Store both raw token hash and numeric OTP hash in DB for seamless 6-digit OTP verification
        EmailVerificationToken verificationToken1 = new EmailVerificationToken();
        verificationToken1.setUser(user);
        verificationToken1.setTokenHash(hashToken(rawToken));
        verificationToken1.setExpiresAt(OffsetDateTime.now().plusHours(24));
        emailVerificationRepository.save(verificationToken1);

        EmailVerificationToken verificationToken2 = new EmailVerificationToken();
        verificationToken2.setUser(user);
        verificationToken2.setTokenHash(hashToken(otpCode));
        verificationToken2.setExpiresAt(OffsetDateTime.now().plusHours(24));
        emailVerificationRepository.save(verificationToken2);

        // Always send 6-digit numeric OTP in Email
        emailService.sendVerificationEmail(normalizedEmail, otpCode);

        return rawToken;
    }

    @Transactional
    public void verifyEmail(VerifyEmailRequest request) {
        String inputToken = request.getToken().trim();
        String tokenHash = hashToken(inputToken);

        EmailVerificationToken token = emailVerificationRepository.findByTokenHash(tokenHash)
                .orElseGet(() -> emailVerificationRepository.findByTokenHash(inputToken)
                        .orElseThrow(() -> new IllegalArgumentException("Mã OTP xác thực không hợp lệ hoặc không tồn tại")));

        if (token.getUsedAt() != null) {
            throw new IllegalStateException("Mã OTP xác thực đã được sử dụng");
        }

        if (token.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new IllegalStateException("Mã OTP xác thực đã hết hạn");
        }

        token.setUsedAt(OffsetDateTime.now());
        emailVerificationRepository.save(token);

        User user = token.getUser();
        user.setStatus("ACTIVE");
        user.setEmailVerifiedAt(OffsetDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public void resendVerificationEmail(ResendVerificationRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail).orElse(null);

        if (user == null || "ACTIVE".equalsIgnoreCase(user.getStatus())) {
            return;
        }

        String numericOtp = generateNumericOtp();
        loginOtpMap.put(normalizedEmail, new OtpEntry(numericOtp, OffsetDateTime.now().plusMinutes(5)));

        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setUser(user);
        verificationToken.setTokenHash(hashToken(numericOtp));
        verificationToken.setExpiresAt(OffsetDateTime.now().plusHours(24));
        emailVerificationRepository.save(verificationToken);

        emailService.sendVerificationEmail(normalizedEmail, numericOtp);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException("Email hoặc mật khẩu không chính xác"));

        OffsetDateTime now = OffsetDateTime.now();

        if (user.isTemporarilyLocked()) {
            throw new IllegalStateException("Tài khoản đang bị khóa tạm thời 15 phút do nhập sai 5 lần liên tiếp. Vui lòng thử lại sau.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            int newFailedCount = user.getFailedLoginCount() + 1;
            user.setFailedLoginCount(newFailedCount);
            if (newFailedCount >= 5) {
                user.setLockUntil(now.plusMinutes(15));
            }
            userRepository.save(user);
            throw new IllegalArgumentException("Email hoặc mật khẩu không chính xác");
        }

        user.setFailedLoginCount(0);
        user.setLockUntil(null);
        user.setLastLoginAt(now);

        if ("PENDING_VERIFICATION".equalsIgnoreCase(user.getStatus())) {
            userRepository.save(user);
            throw new IllegalStateException("Tài khoản chưa xác thực email. Vui lòng kiểm tra hộp thư của bạn.");
        }
        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            userRepository.save(user);
            throw new IllegalStateException("Tài khoản của bạn đã bị khóa hoặc bị vô hiệu hóa.");
        }

        userRepository.save(user);

        return createAuthResponseForUser(user);
    }

    @Transactional
    public void requestOtpLogin(OtpLoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail).orElse(null);

        if (user == null) {
            // Auto create account for new email login
            Role learnerRole = roleRepository.findByRoleName("LEARNER")
                    .orElseGet(() -> roleRepository.save(new Role(null, "LEARNER", "Người học", null)));

            user = new User();
            user.setEmail(normalizedEmail);
            user.setPasswordHash(passwordEncoder.encode(generateRandomToken()));
            user.setFullName(normalizedEmail.split("@")[0]);
            user.setRole(learnerRole);
            user.setTargetLevel("N5");
            user.setStatus("ACTIVE");
            user.setEmailVerifiedAt(OffsetDateTime.now());
            user = userRepository.save(user);
        }

        if ("LOCKED".equalsIgnoreCase(user.getStatus()) || "DISABLED".equalsIgnoreCase(user.getStatus())) {
            throw new IllegalStateException("Tài khoản đã bị khóa hoặc bị vô hiệu hóa.");
        }

        String otpCode = generateNumericOtp();
        loginOtpMap.put(normalizedEmail, new OtpEntry(otpCode, OffsetDateTime.now().plusMinutes(5)));

        emailService.sendOtpLoginEmail(normalizedEmail, otpCode);
    }

    @Transactional
    public AuthResponse verifyOtpLogin(OtpLoginVerifyRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        String otpCode = request.getOtpCode().trim();

        OtpEntry entry = loginOtpMap.get(normalizedEmail);
        if (entry == null || !entry.code.equals(otpCode)) {
            throw new IllegalArgumentException("Mã OTP không chính xác");
        }

        if (entry.expiresAt.isBefore(OffsetDateTime.now())) {
            loginOtpMap.remove(normalizedEmail);
            throw new IllegalStateException("Mã OTP đã hết hạn");
        }

        loginOtpMap.remove(normalizedEmail);

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            user.setStatus("ACTIVE");
            user.setEmailVerifiedAt(OffsetDateTime.now());
        }
        user.setLastLoginAt(OffsetDateTime.now());
        userRepository.save(user);

        return createAuthResponseForUser(user);
    }

    @Transactional
    public AuthResponse refresh(RefreshTokenRequest request) {
        String rawRefreshToken = request.getRefreshToken();
        String tokenHash = hashToken(rawRefreshToken);

        OffsetDateTime now = OffsetDateTime.now();

        RefreshToken oldToken = refreshTokenRepository.findByTokenHashWithLock(tokenHash)
                .orElseThrow(() -> new IllegalArgumentException("Refresh token không hợp lệ hoặc không tồn tại"));

        if (oldToken.getRevokedAt() != null) {
            refreshTokenRepository.revokeAllByTokenFamily(oldToken.getTokenFamily(), now);
            throw new IllegalArgumentException("Refresh token đã bị thu hồi");
        }

        if (oldToken.getExpiresAt().isBefore(now)) {
            throw new IllegalArgumentException("Refresh token đã hết hạn");
        }

        User user = oldToken.getUser();

        if (user == null || !"ACTIVE".equalsIgnoreCase(user.getStatus()) || user.isTemporarilyLocked()) {
            throw new IllegalStateException("Tài khoản không ở trạng thái hoạt động");
        }

        oldToken.setRevokedAt(now);

        String newRawRefreshToken = generateRandomToken();
        RefreshToken newToken = new RefreshToken();
        newToken.setUser(user);
        newToken.setTokenHash(hashToken(newRawRefreshToken));
        newToken.setTokenFamily(oldToken.getTokenFamily());
        newToken.setExpiresAt(now.plusSeconds(refreshTokenExpirationMs / 1000));
        newToken = refreshTokenRepository.save(newToken);

        oldToken.setReplacedByToken(newToken);
        refreshTokenRepository.save(oldToken);

        String newAccessToken = jwtTokenProvider.generateToken(user.getUserId(), user.getEmail(), user.getRole().getRoleName());

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRawRefreshToken)
                .tokenType("Bearer")
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().getRoleName())
                .build();
    }

    @Transactional
    public void logout(LogoutRequest request) {
        String tokenHash = hashToken(request.getRefreshToken());
        refreshTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
            if (token.getRevokedAt() == null) {
                token.setRevokedAt(OffsetDateTime.now());
                refreshTokenRepository.save(token);
            }
        });
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new IllegalArgumentException("Email này chưa được đăng ký trong hệ thống. Vui lòng kiểm tra lại."));

        if ("PENDING_VERIFICATION".equalsIgnoreCase(user.getStatus())) {
            throw new IllegalStateException("Tài khoản chưa được kích hoạt OTP. Vui lòng sử dụng tính năng Kích hoạt OTP.");
        }

        if ("LOCKED".equalsIgnoreCase(user.getStatus()) || "DISABLED".equalsIgnoreCase(user.getStatus())) {
            throw new IllegalStateException("Tài khoản của bạn đã bị khóa hoặc vô hiệu hóa.");
        }

        String numericOtp = generateNumericOtp();
        String rawToken = generateRandomToken();

        PasswordResetToken resetToken1 = new PasswordResetToken();
        resetToken1.setUser(user);
        resetToken1.setTokenHash(hashToken(rawToken));
        resetToken1.setExpiresAt(OffsetDateTime.now().plusMinutes(30));
        passwordResetRepository.save(resetToken1);

        PasswordResetToken resetToken2 = new PasswordResetToken();
        resetToken2.setUser(user);
        resetToken2.setTokenHash(hashToken(numericOtp));
        resetToken2.setExpiresAt(OffsetDateTime.now().plusMinutes(30));
        passwordResetRepository.save(resetToken2);

        loginOtpMap.put(normalizedEmail, new OtpEntry(numericOtp, OffsetDateTime.now().plusMinutes(30)));

        emailService.sendPasswordResetEmail(normalizedEmail, numericOtp);
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        if (!passwordValidator.isValid(request.getNewPassword(), null)) {
            throw new IllegalArgumentException("Mật khẩu mới không đáp ứng chính sách an toàn (tối thiểu 8 ký tự, chữ HOA, chữ thường & chữ số).");
        }

        String inputToken = request.getToken().trim();
        String tokenHash = hashToken(inputToken);

        PasswordResetToken resetToken = passwordResetRepository.findByTokenHash(tokenHash)
                .orElseGet(() -> passwordResetRepository.findByTokenHash(inputToken).orElse(null));

        User user = null;
        if (resetToken != null) {
            if (resetToken.getUsedAt() != null) {
                throw new IllegalStateException("Mã khôi phục mật khẩu đã được sử dụng trước đó");
            }
            if (resetToken.getExpiresAt().isBefore(OffsetDateTime.now())) {
                throw new IllegalStateException("Mã khôi phục mật khẩu đã hết hạn (30 phút)");
            }
            resetToken.setUsedAt(OffsetDateTime.now());
            passwordResetRepository.save(resetToken);
            user = resetToken.getUser();
        } else {
            for (Map.Entry<String, OtpEntry> entry : loginOtpMap.entrySet()) {
                if (entry.getValue().code.equals(inputToken)) {
                    if (entry.getValue().expiresAt.isBefore(OffsetDateTime.now())) {
                        throw new IllegalStateException("Mã khôi phục mật khẩu đã hết hạn");
                    }
                    user = userRepository.findByEmail(entry.getKey()).orElse(null);
                    loginOtpMap.remove(entry.getKey());
                    break;
                }
            }
        }

        if (user == null) {
            throw new IllegalArgumentException("Mã khôi phục mật khẩu 6 chữ số không chính xác hoặc không tồn tại.");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        user.setFailedLoginCount(0);
        user.setLockUntil(null);
        userRepository.save(user);

        refreshTokenRepository.revokeAllByUserId(user.getUserId(), OffsetDateTime.now());
    }

    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest request) {
        if (!passwordValidator.isValid(request.getNewPassword(), null)) {
            throw new IllegalArgumentException("Mật khẩu mới không đáp ứng chính sách an toàn");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Mật khẩu hiện tại không chính xác");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        refreshTokenRepository.revokeAllByUserId(userId, OffsetDateTime.now());
    }

    @Transactional
    public AuthResponse loginWithGoogle(GoogleLoginRequest request) {
        String idToken = request.getIdToken();
        String googleEmail = null;
        String googleName = null;
        String googlePicture = null;

        try {
            RestTemplate restTemplate = new RestTemplate();
            String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
            Map<String, Object> tokenInfo = restTemplate.getForObject(tokenInfoUrl, Map.class);
            if (tokenInfo != null && tokenInfo.containsKey("email")) {
                googleEmail = (String) tokenInfo.get("email");
                googleName = (String) tokenInfo.get("name");
                googlePicture = (String) tokenInfo.get("picture");
            }
        } catch (Exception e) {
            log.error("Xác thực Google ID Token thất bại: {}", e.getMessage());
            throw new IllegalArgumentException("Google ID Token không hợp lệ hoặc đã hết hạn");
        }

        if (googleEmail == null || googleEmail.isBlank()) {
            throw new IllegalArgumentException("Không thể xác thực thông tin Email từ Google");
        }

        String normalizedEmail = googleEmail.trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail).orElse(null);

        if (user == null) {
            Role learnerRole = roleRepository.findByRoleName("LEARNER")
                    .orElseGet(() -> roleRepository.save(new Role(null, "LEARNER", "Người học", null)));

            user = new User();
            user.setEmail(normalizedEmail);
            user.setPasswordHash(passwordEncoder.encode(generateRandomToken()));
            user.setFullName(googleName != null ? googleName : normalizedEmail.split("@")[0]);
            user.setAvatarUrl(googlePicture);
            user.setRole(learnerRole);
            user.setTargetLevel("N5");
            user.setStatus("ACTIVE");
            user.setEmailVerifiedAt(OffsetDateTime.now());
            user = userRepository.save(user);
        } else {
            if ("LOCKED".equalsIgnoreCase(user.getStatus()) || "DISABLED".equalsIgnoreCase(user.getStatus())) {
                throw new IllegalStateException("Tài khoản đã bị khóa hoặc bị vô hiệu hóa");
            }
            user.setStatus("ACTIVE");
            user.setEmailVerifiedAt(OffsetDateTime.now());
            if (googlePicture != null && user.getAvatarUrl() == null) {
                user.setAvatarUrl(googlePicture);
            }
            user.setLastLoginAt(OffsetDateTime.now());
            userRepository.save(user);
        }

        return createAuthResponseForUser(user);
    }

    private AuthResponse createAuthResponseForUser(User user) {
        OffsetDateTime now = OffsetDateTime.now();
        String accessToken = jwtTokenProvider.generateToken(user.getUserId(), user.getEmail(), user.getRole().getRoleName());
        String rawRefreshToken = generateRandomToken();

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setUser(user);
        refreshTokenEntity.setTokenHash(hashToken(rawRefreshToken));
        refreshTokenEntity.setTokenFamily(UUID.randomUUID());
        refreshTokenEntity.setExpiresAt(now.plusSeconds(refreshTokenExpirationMs / 1000));
        refreshTokenRepository.save(refreshTokenEntity);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(rawRefreshToken)
                .tokenType("Bearer")
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().getRoleName())
                .build();
    }
}
