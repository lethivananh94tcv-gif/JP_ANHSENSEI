package com.anhsensei.learning.dto;

import jakarta.validation.constraints.NotNull;

public class ReviewFlashcardRequest {

    @NotNull(message = "Content type cannot be null")
    private String contentType;

    @NotNull(message = "Content id cannot be null")
    private Long contentId;

    @NotNull(message = "Rating cannot be null")
    private String rating; // AGAIN, HARD, GOOD, EASY

    private Integer durationSeconds = 0;

    public ReviewFlashcardRequest() {}

    public ReviewFlashcardRequest(String contentType, Long contentId, String rating, Integer durationSeconds) {
        this.contentType = contentType;
        this.contentId = contentId;
        this.rating = rating;
        this.durationSeconds = durationSeconds != null ? durationSeconds : 0;
    }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }
}
