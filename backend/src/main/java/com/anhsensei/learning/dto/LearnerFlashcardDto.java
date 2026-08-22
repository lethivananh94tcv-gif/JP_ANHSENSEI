package com.anhsensei.learning.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class LearnerFlashcardDto {

    private Long progressId;
    private String contentType;
    private Long contentId;
    private String front;
    private String reading;
    private String meaning;
    private String example;
    private String audioUrl;
    private String state;
    private BigDecimal easeFactor;
    private Integer intervalDays;
    private OffsetDateTime nextReviewAt;
    private Integer reviewCount;

    public LearnerFlashcardDto() {}

    public Long getProgressId() { return progressId; }
    public void setProgressId(Long progressId) { this.progressId = progressId; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }

    public String getFront() { return front; }
    public void setFront(String front) { this.front = front; }

    public String getReading() { return reading; }
    public void setReading(String reading) { this.reading = reading; }

    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }

    public String getExample() { return example; }
    public void setExample(String example) { this.example = example; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public BigDecimal getEaseFactor() { return easeFactor; }
    public void setEaseFactor(BigDecimal easeFactor) { this.easeFactor = easeFactor; }

    public Integer getIntervalDays() { return intervalDays; }
    public void setIntervalDays(Integer intervalDays) { this.intervalDays = intervalDays; }

    public OffsetDateTime getNextReviewAt() { return nextReviewAt; }
    public void setNextReviewAt(OffsetDateTime nextReviewAt) { this.nextReviewAt = nextReviewAt; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
}
