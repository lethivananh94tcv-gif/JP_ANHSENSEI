package com.anhsensei.identity.domain;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "email", nullable = false, length = 320)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "target_level", length = 10)
    private String targetLevel;

    @Column(name = "timezone", nullable = false, length = 100)
    private String timezone = "Asia/Ho_Chi_Minh";

    @Column(name = "status", nullable = false, length = 30)
    private String status = "PENDING_VERIFICATION";

    @Column(name = "email_verified_at")
    private OffsetDateTime emailVerifiedAt;

    @Column(name = "failed_login_count", nullable = false)
    private Integer failedLoginCount = 0;

    @Column(name = "lock_until")
    private OffsetDateTime lockUntil;

    @Column(name = "last_login_at")
    private OffsetDateTime lastLoginAt;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;

    public User() {}

    public User(Long userId, Role role, String email, String passwordHash, String fullName, String avatarUrl, String targetLevel, String timezone, String status, OffsetDateTime emailVerifiedAt, Integer failedLoginCount, OffsetDateTime lockUntil, OffsetDateTime lastLoginAt, OffsetDateTime createdAt, OffsetDateTime updatedAt, OffsetDateTime deletedAt) {
        this.userId = userId;
        this.role = role;
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.targetLevel = targetLevel;
        this.timezone = timezone != null ? timezone : "Asia/Ho_Chi_Minh";
        this.status = status != null ? status : "PENDING_VERIFICATION";
        this.emailVerifiedAt = emailVerifiedAt;
        this.failedLoginCount = failedLoginCount != null ? failedLoginCount : 0;
        this.lockUntil = lockUntil;
        this.lastLoginAt = lastLoginAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public boolean isTemporarilyLocked() {
        return lockUntil != null && lockUntil.isAfter(OffsetDateTime.now());
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getEmailVerifiedAt() { return emailVerifiedAt; }
    public void setEmailVerifiedAt(OffsetDateTime emailVerifiedAt) { this.emailVerifiedAt = emailVerifiedAt; }

    public Integer getFailedLoginCount() { return failedLoginCount; }
    public void setFailedLoginCount(Integer failedLoginCount) { this.failedLoginCount = failedLoginCount; }

    public OffsetDateTime getLockUntil() { return lockUntil; }
    public void setLockUntil(OffsetDateTime lockUntil) { this.lockUntil = lockUntil; }

    public OffsetDateTime getLastLoginAt() { return lastLoginAt; }
    public void setLastLoginAt(OffsetDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }

    public OffsetDateTime getDeletedAt() { return deletedAt; }
    public void setDeletedAt(OffsetDateTime deletedAt) { this.deletedAt = deletedAt; }

    public static class UserBuilder {
        private Long userId;
        private Role role;
        private String email;
        private String passwordHash;
        private String fullName;
        private String avatarUrl;
        private String targetLevel;
        private String timezone = "Asia/Ho_Chi_Minh";
        private String status = "PENDING_VERIFICATION";
        private OffsetDateTime emailVerifiedAt;
        private Integer failedLoginCount = 0;
        private OffsetDateTime lockUntil;
        private OffsetDateTime lastLoginAt;
        private OffsetDateTime createdAt;
        private OffsetDateTime updatedAt;
        private OffsetDateTime deletedAt;

        public UserBuilder userId(Long userId) { this.userId = userId; return this; }
        public UserBuilder role(Role role) { this.role = role; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder passwordHash(String passwordHash) { this.passwordHash = passwordHash; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserBuilder targetLevel(String targetLevel) { this.targetLevel = targetLevel; return this; }
        public UserBuilder timezone(String timezone) { this.timezone = timezone; return this; }
        public UserBuilder status(String status) { this.status = status; return this; }
        public UserBuilder emailVerifiedAt(OffsetDateTime emailVerifiedAt) { this.emailVerifiedAt = emailVerifiedAt; return this; }
        public UserBuilder failedLoginCount(Integer failedLoginCount) { this.failedLoginCount = failedLoginCount; return this; }
        public UserBuilder lockUntil(OffsetDateTime lockUntil) { this.lockUntil = lockUntil; return this; }
        public UserBuilder lastLoginAt(OffsetDateTime lastLoginAt) { this.lastLoginAt = lastLoginAt; return this; }
        public UserBuilder createdAt(OffsetDateTime createdAt) { this.createdAt = createdAt; return this; }
        public UserBuilder updatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; return this; }
        public UserBuilder deletedAt(OffsetDateTime deletedAt) { this.deletedAt = deletedAt; return this; }

        public User build() {
            return new User(userId, role, email, passwordHash, fullName, avatarUrl, targetLevel, timezone, status, emailVerifiedAt, failedLoginCount, lockUntil, lastLoginAt, createdAt, updatedAt, deletedAt);
        }
    }
}
