package com.anhsensei.learning.domain;

import com.anhsensei.identity.domain.User;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "flashcard_review_logs")
public class FlashcardReviewLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_log_id")
    private Long reviewLogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "progress_id")
    private FlashcardProgress progress;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content_type", nullable = false, length = 30)
    private String contentType;

    @Column(name = "content_id", nullable = false)
    private Long contentId;

    @Column(name = "rating", nullable = false, length = 10)
    private String rating;

    @Column(name = "previous_interval", nullable = false)
    private Integer previousInterval;

    @Column(name = "new_interval", nullable = false)
    private Integer newInterval;

    @Column(name = "previous_ease_factor", precision = 5, scale = 2)
    private BigDecimal previousEaseFactor;

    @Column(name = "new_ease_factor", precision = 5, scale = 2)
    private BigDecimal newEaseFactor;

    @Column(name = "algorithm_version", nullable = false, length = 30)
    private String algorithmVersion = "SM2_V1";

    @Column(name = "reviewed_at", nullable = false)
    private OffsetDateTime reviewedAt = OffsetDateTime.now();

    public FlashcardReviewLog() {}

    public FlashcardReviewLog(FlashcardProgress progress, User user, String contentType, Long contentId, String rating, Integer previousInterval, Integer newInterval, BigDecimal previousEaseFactor, BigDecimal newEaseFactor, String algorithmVersion) {
        this.progress = progress;
        this.user = user;
        this.contentType = contentType;
        this.contentId = contentId;
        this.rating = rating;
        this.previousInterval = previousInterval;
        this.newInterval = newInterval;
        this.previousEaseFactor = previousEaseFactor;
        this.newEaseFactor = newEaseFactor;
        this.algorithmVersion = algorithmVersion != null ? algorithmVersion : "SM2_V1";
        this.reviewedAt = OffsetDateTime.now();
    }

    public Long getReviewLogId() { return reviewLogId; }
    public void setReviewLogId(Long reviewLogId) { this.reviewLogId = reviewLogId; }

    public FlashcardProgress getProgress() { return progress; }
    public void setProgress(FlashcardProgress progress) { this.progress = progress; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }

    public Integer getPreviousInterval() { return previousInterval; }
    public void setPreviousInterval(Integer previousInterval) { this.previousInterval = previousInterval; }

    public Integer getNewInterval() { return newInterval; }
    public void setNewInterval(Integer newInterval) { this.newInterval = newInterval; }

    public BigDecimal getPreviousEaseFactor() { return previousEaseFactor; }
    public void setPreviousEaseFactor(BigDecimal previousEaseFactor) { this.previousEaseFactor = previousEaseFactor; }

    public BigDecimal getNewEaseFactor() { return newEaseFactor; }
    public void setNewEaseFactor(BigDecimal newEaseFactor) { this.newEaseFactor = newEaseFactor; }

    public String getAlgorithmVersion() { return algorithmVersion; }
    public void setAlgorithmVersion(String algorithmVersion) { this.algorithmVersion = algorithmVersion; }

    public OffsetDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(OffsetDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
}
