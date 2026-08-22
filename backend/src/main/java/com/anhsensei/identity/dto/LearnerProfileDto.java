package com.anhsensei.identity.dto;

import com.anhsensei.identity.domain.User;

public class LearnerProfileDto {

    private Long userId;
    private String email;
    private String fullName;
    private String avatarUrl;
    private String targetLevel;
    private String timezone;
    private String role;
    private String status;

    public LearnerProfileDto() {}

    public LearnerProfileDto(Long userId, String email, String fullName, String avatarUrl, String targetLevel, String timezone, String role, String status) {
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.targetLevel = targetLevel;
        this.timezone = timezone;
        this.role = role;
        this.status = status;
    }

    public static LearnerProfileDto fromUser(User user) {
        if (user == null) return null;
        return new LearnerProfileDto(
                user.getUserId(),
                user.getEmail(),
                user.getFullName(),
                user.getAvatarUrl(),
                user.getTargetLevel(),
                user.getTimezone(),
                user.getRole() != null ? user.getRole().getRoleName() : null,
                user.getStatus()
        );
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
