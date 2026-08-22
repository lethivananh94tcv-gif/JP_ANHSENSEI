package com.anhsensei.learning.domain;

import com.anhsensei.identity.domain.User;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "flashcard_progress", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "content_type", "content_id"})
})
public class FlashcardProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long progressId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content_type", nullable = false, length = 30)
    private String contentType;

    @Column(name = "content_id", nullable = false)
    private Long contentId;

    @Column(name = "state", nullable = false, length = 20)
    private String state = "NEW";

    @Column(name = "ease_factor", nullable = false, precision = 5, scale = 2)
    private BigDecimal easeFactor = new BigDecimal("2.50");

    @Column(name = "interval_days", nullable = false)
    private Integer intervalDays = 0;

    @Column(name = "next_review_at", nullable = false)
    private OffsetDateTime nextReviewAt = OffsetDateTime.now();

    @Column(name = "review_count", nullable = false)
    private Integer reviewCount = 0;

    @Column(name = "lapse_count", nullable = false)
    private Integer lapseCount = 0;

    @Column(name = "algorithm_version", nullable = false, length = 30)
    private String algorithmVersion = "SM2_V1";

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    public FlashcardProgress() {}

    public FlashcardProgress(User user, String contentType, Long contentId) {
        this.user = user;
        this.contentType = contentType;
        this.contentId = contentId;
        this.state = "NEW";
        this.easeFactor = new BigDecimal("2.50");
        this.intervalDays = 0;
        this.nextReviewAt = OffsetDateTime.now();
        this.reviewCount = 0;
        this.lapseCount = 0;
        this.algorithmVersion = "SM2_V1";
    }

    public Long getProgressId() { return progressId; }
    public void setProgressId(Long progressId) { this.progressId = progressId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }

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

    public Integer getLapseCount() { return lapseCount; }
    public void setLapseCount(Integer lapseCount) { this.lapseCount = lapseCount; }

    public String getAlgorithmVersion() { return algorithmVersion; }
    public void setAlgorithmVersion(String algorithmVersion) { this.algorithmVersion = algorithmVersion; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
