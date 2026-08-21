package com.anhsensei.identity.dto;

import jakarta.validation.constraints.Size;

public class AdminUserActionRequest {

    @Size(max = 500, message = "Lý do không vượt quá 500 ký tự")
    private String reason;

    public AdminUserActionRequest() {}

    public AdminUserActionRequest(String reason) {
        this.reason = reason;
    }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
