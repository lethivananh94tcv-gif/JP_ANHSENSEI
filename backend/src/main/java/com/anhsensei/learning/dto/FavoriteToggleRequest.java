package com.anhsensei.learning.dto;

public class FavoriteToggleRequest {
    private String contentType;
    private Long contentId;

    public FavoriteToggleRequest() {}

    public FavoriteToggleRequest(String contentType, Long contentId) {
        this.contentType = contentType;
        this.contentId = contentId;
    }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }
}
