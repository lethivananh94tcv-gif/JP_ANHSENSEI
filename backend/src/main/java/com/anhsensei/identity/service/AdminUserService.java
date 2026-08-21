package com.anhsensei.identity.service;

import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.RefreshTokenRepository;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.operations.service.AuditLogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service
public class AdminUserService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuditLogService auditLogService;

    public AdminUserService(
            UserRepository userRepository,
            RefreshTokenRepository refreshTokenRepository,
            AuditLogService auditLogService
    ) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public void lockUser(Long adminUserId, Long targetUserId, String reason, String ipAddress) {
        if (adminUserId != null && adminUserId.equals(targetUserId)) {
            throw new IllegalArgumentException("Admin không thể tự khóa tài khoản của chính mình");
        }

        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        String oldStatus = target.getStatus();
        target.setStatus("LOCKED");
        userRepository.save(target);

        // BR-AUTH-04: Revoke all active refresh tokens of user
        refreshTokenRepository.revokeAllByUserId(targetUserId, OffsetDateTime.now());

        // BR-OPS-01: Audit log
        auditLogService.logAction(
                adminUserId,
                "USER_LOCKED",
                "User",
                targetUserId.toString(),
                oldStatus,
                "LOCKED (Reason: " + (reason != null ? reason : "N/A") + ")",
                ipAddress
        );
    }

    @Transactional
    public void unlockUser(Long adminUserId, Long targetUserId, String reason, String ipAddress) {
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        if (!"LOCKED".equalsIgnoreCase(target.getStatus())) {
            throw new IllegalArgumentException("Chỉ có thể mở khóa tài khoản đang ở trạng thái LOCKED.");
        }

        String oldStatus = target.getStatus();
        target.setStatus("ACTIVE");
        target.setFailedLoginCount(0);
        target.setLockUntil(null);
        userRepository.save(target);

        // BR-OPS-01: Audit log
        auditLogService.logAction(
                adminUserId,
                "USER_UNLOCKED",
                "User",
                targetUserId.toString(),
                oldStatus,
                "ACTIVE (Reason: " + (reason != null ? reason : "N/A") + ")",
                ipAddress
        );
    }

    @Transactional
    public void disableUser(Long adminUserId, Long targetUserId, String reason, String ipAddress) {
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        String oldStatus = target.getStatus();
        target.setStatus("DISABLED");
        userRepository.save(target);

        // BR-AUTH-04: Revoke all active refresh tokens of user
        refreshTokenRepository.revokeAllByUserId(targetUserId, OffsetDateTime.now());

        // BR-OPS-01: Audit log
        auditLogService.logAction(
                adminUserId,
                "USER_DISABLED",
                "User",
                targetUserId.toString(),
                oldStatus,
                "DISABLED (Reason: " + (reason != null ? reason : "N/A") + ")",
                ipAddress
        );
    }
}
