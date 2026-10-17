package com.anhsensei.identity.dto;

public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long userId;
    private String email;
    private String fullName;
    private String role;
    private String avatarUrl;
    private String targetLevel;

    public AuthResponse() {}

    public AuthResponse(String accessToken, String refreshToken, String tokenType, Long userId, String email, String fullName, String role) {
        this(accessToken, refreshToken, tokenType, userId, email, fullName, role, null, null);
    }

    public AuthResponse(String accessToken, String refreshToken, String tokenType, Long userId, String email, String fullName, String role, String avatarUrl, String targetLevel) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType != null ? tokenType : "Bearer";
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.avatarUrl = avatarUrl;
        this.targetLevel = targetLevel;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getRefreshToken() { return refreshToken; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

    public static class AuthResponseBuilder {
        private String accessToken;
        private String refreshToken;
        private String tokenType = "Bearer";
        private Long userId;
        private String email;
        private String fullName;
        private String role;
        private String avatarUrl;
        private String targetLevel;

        public AuthResponseBuilder accessToken(String accessToken) { this.accessToken = accessToken; return this; }
        public AuthResponseBuilder refreshToken(String refreshToken) { this.refreshToken = refreshToken; return this; }
        public AuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public AuthResponseBuilder userId(Long userId) { this.userId = userId; return this; }
        public AuthResponseBuilder email(String email) { this.email = email; return this; }
        public AuthResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public AuthResponseBuilder role(String role) { this.role = role; return this; }
        public AuthResponseBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public AuthResponseBuilder targetLevel(String targetLevel) { this.targetLevel = targetLevel; return this; }

        public AuthResponse build() {
            return new AuthResponse(accessToken, refreshToken, tokenType, userId, email, fullName, role, avatarUrl, targetLevel);
        }
    }
}
