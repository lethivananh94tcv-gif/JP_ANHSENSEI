package com.anhsensei.learning.dto;

public class FavoriteStatusResponse {
    private String contentType;
    private Long contentId;
    private boolean favorited;

    public FavoriteStatusResponse() {}

    public FavoriteStatusResponse(String contentType, Long contentId, boolean favorited) {
        this.contentType = contentType;
        this.contentId = contentId;
        this.favorited = favorited;
    }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }

    public boolean isFavorited() { return favorited; }
    public void setFavorited(boolean favorited) { this.favorited = favorited; }
}
