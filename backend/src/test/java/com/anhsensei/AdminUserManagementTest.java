package com.anhsensei;

import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.RefreshTokenRepository;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.identity.service.AdminUserService;
import com.anhsensei.operations.service.AuditLogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminUserManagementTest {

    @Mock private UserRepository userRepository;
    @Mock private RefreshTokenRepository refreshTokenRepository;
    @Mock private AuditLogService auditLogService;

    private AdminUserService adminUserService;
    private User learnerUser;

    @BeforeEach
    void setUp() {
        adminUserService = new AdminUserService(userRepository, refreshTokenRepository, auditLogService);

        learnerUser = new User();
        learnerUser.setUserId(20L);
        learnerUser.setEmail("learner@gmail.com");
        learnerUser.setStatus("ACTIVE");
        learnerUser.setFailedLoginCount(3);
    }

    @Test
    @DisplayName("Test 31: Lock user revokes active refresh tokens and updates status to LOCKED")
    void test31_lockUserSuccess() {
        when(userRepository.findById(20L)).thenReturn(Optional.of(learnerUser));

        adminUserService.lockUser(1L, 20L, "Vi phạm quy định", "127.0.0.1");

        assertEquals("LOCKED", learnerUser.getStatus());
        verify(refreshTokenRepository, times(1)).revokeAllByUserId(eq(20L), any(OffsetDateTime.class));
        verify(auditLogService, times(1)).logAction(
                eq(1L),
                eq("USER_LOCKED"),
                eq("User"),
                eq("20"),
                eq("ACTIVE"),
                contains("Reason: Vi phạm quy định"),
                eq("127.0.0.1")
        );
    }

    @Test
    @DisplayName("Test 32: Prevent Admin from self-locking")
    void test32_preventAdminSelfLock() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                adminUserService.lockUser(1L, 1L, "Tự khóa", "127.0.0.1")
        );
        assertTrue(ex.getMessage().contains("Admin không thể tự khóa"));
    }

    @Test
    @DisplayName("Test 33: Unlock user resets status to ACTIVE and clears failed login count")
    void test33_unlockUserSuccess() {
        learnerUser.setStatus("LOCKED");
        when(userRepository.findById(20L)).thenReturn(Optional.of(learnerUser));

        adminUserService.unlockUser(1L, 20L, "Duyệt mở khóa", "127.0.0.1");

        assertEquals("ACTIVE", learnerUser.getStatus());
        assertEquals(0, learnerUser.getFailedLoginCount());
        assertNull(learnerUser.getLockUntil());
        verify(auditLogService, times(1)).logAction(
                eq(1L),
                eq("USER_UNLOCKED"),
                eq("User"),
                eq("20"),
                eq("LOCKED"),
                contains("Reason: Duyệt mở khóa"),
                eq("127.0.0.1")
        );
    }
}
