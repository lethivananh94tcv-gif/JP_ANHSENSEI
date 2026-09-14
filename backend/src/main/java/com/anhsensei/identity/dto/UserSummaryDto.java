package com.anhsensei.identity.dto;

import com.anhsensei.identity.domain.User;
import java.time.OffsetDateTime;

public class UserSummaryDto {
    private Long userId;
    private String email;
    private String fullName;
    private String roleName;
    private String status;
    private OffsetDateTime createdAt;
    private OffsetDateTime lastLoginAt;
    private Long totalDurationSeconds;
    private Double activeHours;

    public UserSummaryDto() {}

    public UserSummaryDto(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.roleName = user.getRole() != null ? user.getRole().getRoleName() : "LEARNER";
        this.status = user.getStatus();
        this.createdAt = user.getCreatedAt();
        this.lastLoginAt = user.getLastLoginAt();
        this.totalDurationSeconds = 0L;
        this.activeHours = 0.0;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(OffsetDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }

    public Long getTotalDurationSeconds() { return totalDurationSeconds; }
    public void setTotalDurationSeconds(Long totalDurationSeconds) { this.totalDurationSeconds = totalDurationSeconds; }

    public Double getActiveHours() { return activeHours; }
    public void setActiveHours(Double activeHours) { this.activeHours = activeHours; }
}
