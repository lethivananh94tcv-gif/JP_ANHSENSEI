package com.anhsensei;

import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.RefreshTokenRepository;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.identity.service.AdminUserService;
import com.anhsensei.operations.domain.AuditLog;
import com.anhsensei.operations.repository.AuditLogRepository;
import com.anhsensei.operations.service.AuditLogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AuditLogAndAdminTest {

    private UserRepository userRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private AuditLogRepository auditLogRepository;
    private AuditLogService auditLogService;
    private AdminUserService adminUserService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        refreshTokenRepository = mock(RefreshTokenRepository.class);
        auditLogRepository = mock(AuditLogRepository.class);
        auditLogService = new AuditLogService(auditLogRepository);
        adminUserService = new AdminUserService(userRepository, refreshTokenRepository, auditLogService);
    }

    @Test
    @DisplayName("Test 29 & 21: Lock user tạo Audit Log và revoke toàn bộ active refresh token")
    void testLockUserAuditLogAndTokenRevocation() {
        User targetUser = new User();
        targetUser.setUserId(42L);
        targetUser.setStatus("ACTIVE");

        when(userRepository.findById(42L)).thenReturn(Optional.of(targetUser));

        ArgumentCaptor<AuditLog> auditLogCaptor = ArgumentCaptor.forClass(AuditLog.class);
        when(auditLogRepository.save(auditLogCaptor.capture())).thenAnswer(i -> i.getArgument(0));

        adminUserService.lockUser(1L, 42L, "Vi phạm chính sách", "127.0.0.1");

        assertEquals("LOCKED", targetUser.getStatus());
        verify(refreshTokenRepository, times(1)).revokeAllByUserId(eq(42L), any());

        AuditLog savedAuditLog = auditLogCaptor.getValue();
        assertEquals(1L, savedAuditLog.getActorUserId());
        assertEquals("USER_LOCKED", savedAuditLog.getAction());
        assertEquals("User", savedAuditLog.getEntityType());
        assertEquals("42", savedAuditLog.getEntityId());
        assertEquals("127.0.0.1", savedAuditLog.getIpAddress());
    }

    @Test
    @DisplayName("Test 29: Unlock user tạo Audit Log")
    void testUnlockUserAuditLog() {
        User targetUser = new User();
        targetUser.setUserId(42L);
        targetUser.setStatus("LOCKED");

        when(userRepository.findById(42L)).thenReturn(Optional.of(targetUser));

        ArgumentCaptor<AuditLog> auditLogCaptor = ArgumentCaptor.forClass(AuditLog.class);
        when(auditLogRepository.save(auditLogCaptor.capture())).thenAnswer(i -> i.getArgument(0));

        adminUserService.unlockUser(1L, 42L, "Đã xử lý xong vi phạm", "127.0.0.1");

        assertEquals("ACTIVE", targetUser.getStatus());

        AuditLog savedAuditLog = auditLogCaptor.getValue();
        assertEquals(1L, savedAuditLog.getActorUserId());
        assertEquals("USER_UNLOCKED", savedAuditLog.getAction());
        assertEquals("User", savedAuditLog.getEntityType());
        assertEquals("42", savedAuditLog.getEntityId());
    }
}
