package com.anhsensei.identity.dto;

import jakarta.validation.constraints.Size;

public class UpdateLearnerProfileRequest {

    @Size(max = 150, message = "Full name cannot exceed 150 characters")
    private String fullName;

    @Size(max = 10, message = "Target level code cannot exceed 10 characters")
    private String targetLevel;

    @Size(max = 100, message = "Timezone string cannot exceed 100 characters")
    private String timezone;

    public UpdateLearnerProfileRequest() {}

    public UpdateLearnerProfileRequest(String fullName, String targetLevel, String timezone) {
        this.fullName = fullName;
        this.targetLevel = targetLevel;
        this.timezone = timezone;
    }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
}
