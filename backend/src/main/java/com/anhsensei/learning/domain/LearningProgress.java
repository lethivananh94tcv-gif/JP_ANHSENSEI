package com.anhsensei.learning.domain;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.identity.domain.User;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "learning_progress", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "lesson_id"})
})
public class LearningProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "learning_progress_id")
    private Long learningProgressId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(name = "completion_percent", nullable = false, precision = 5, scale = 2)
    private BigDecimal completionPercent = BigDecimal.ZERO;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "NOT_STARTED";

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    @Column(name = "last_accessed_at")
    private OffsetDateTime lastAccessedAt;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    public LearningProgress() {}

    public LearningProgress(User user, Lesson lesson, BigDecimal completionPercent, String status) {
        this.user = user;
        this.lesson = lesson;
        this.completionPercent = completionPercent != null ? completionPercent : BigDecimal.ZERO;
        this.status = status != null ? status : "NOT_STARTED";
        this.lastAccessedAt = OffsetDateTime.now();
    }

    public Long getLearningProgressId() { return learningProgressId; }
    public void setLearningProgressId(Long learningProgressId) { this.learningProgressId = learningProgressId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Lesson getLesson() { return lesson; }
    public void setLesson(Lesson lesson) { this.lesson = lesson; }

    public BigDecimal getCompletionPercent() { return completionPercent; }
    public void setCompletionPercent(BigDecimal completionPercent) { this.completionPercent = completionPercent; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(OffsetDateTime completedAt) { this.completedAt = completedAt; }

    public OffsetDateTime getLastAccessedAt() { return lastAccessedAt; }
    public void setLastAccessedAt(OffsetDateTime lastAccessedAt) { this.lastAccessedAt = lastAccessedAt; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
