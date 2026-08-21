package com.anhsensei.identity.controller;

import com.anhsensei.common.util.SecurityUtils;
import com.anhsensei.identity.dto.AdminUserActionRequest;
import com.anhsensei.identity.service.AdminUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @PostMapping("/{userId}/lock")
    public ResponseEntity<Map<String, String>> lockUser(
            @PathVariable Long userId,
            @Valid @RequestBody(required = false) AdminUserActionRequest request,
            HttpServletRequest httpRequest
    ) {
        Long adminUserId = SecurityUtils.getCurrentUserId().orElse(null);
        String reason = request != null ? request.getReason() : "Tài khoản bị khóa bởi Admin";
        adminUserService.lockUser(adminUserId, userId, reason, httpRequest.getRemoteAddr());
        return ResponseEntity.ok(Map.of("message", "Đã khóa tài khoản người dùng thành công"));
    }

    @PostMapping("/{userId}/unlock")
    public ResponseEntity<Map<String, String>> unlockUser(
            @PathVariable Long userId,
            @Valid @RequestBody(required = false) AdminUserActionRequest request,
            HttpServletRequest httpRequest
    ) {
        Long adminUserId = SecurityUtils.getCurrentUserId().orElse(null);
        String reason = request != null ? request.getReason() : "Tài khoản được mở khóa bởi Admin";
        adminUserService.unlockUser(adminUserId, userId, reason, httpRequest.getRemoteAddr());
        return ResponseEntity.ok(Map.of("message", "Đã mở khóa tài khoản người dùng thành công"));
    }

    @PostMapping("/{userId}/disable")
    public ResponseEntity<Map<String, String>> disableUser(
            @PathVariable Long userId,
            @Valid @RequestBody(required = false) AdminUserActionRequest request,
            HttpServletRequest httpRequest
    ) {
        Long adminUserId = SecurityUtils.getCurrentUserId().orElse(null);
        String reason = request != null ? request.getReason() : "Tài khoản bị vô hiệu hóa bởi Admin";
        adminUserService.disableUser(adminUserId, userId, reason, httpRequest.getRemoteAddr());
        return ResponseEntity.ok(Map.of("message", "Đã vô hiệu hóa tài khoản người dùng thành công"));
    }
}
