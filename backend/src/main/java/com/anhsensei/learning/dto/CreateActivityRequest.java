package com.anhsensei.learning.dto;

import jakarta.validation.constraints.NotNull;

public class CreateActivityRequest {

    @NotNull(message = "Content type cannot be null")
    private String contentType;

    @NotNull(message = "Content id cannot be null")
    private Long contentId;

    private Integer durationSeconds = 0;

    public CreateActivityRequest() {}

    public CreateActivityRequest(String contentType, Long contentId, Integer durationSeconds) {
        this.contentType = contentType;
        this.contentId = contentId;
        this.durationSeconds = durationSeconds != null ? durationSeconds : 0;
    }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }
}
