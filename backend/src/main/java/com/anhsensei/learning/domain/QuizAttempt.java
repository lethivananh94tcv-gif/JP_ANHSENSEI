package com.anhsensei.learning.domain;

import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.identity.domain.User;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "quiz_attempts", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "quiz_id", "attempt_number"}),
        @UniqueConstraint(columnNames = {"submission_key"})
})
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Long attemptId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(name = "attempt_number", nullable = false)
    private Integer attemptNumber;

    @Column(name = "score", precision = 5, scale = 2)
    private BigDecimal score;

    @Column(name = "correct_count", nullable = false)
    private Integer correctCount = 0;

    @Column(name = "total_count", nullable = false)
    private Integer totalCount = 0;

    @Column(name = "started_at", nullable = false)
    private OffsetDateTime startedAt = OffsetDateTime.now();

    @Column(name = "submitted_at")
    private OffsetDateTime submittedAt;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "IN_PROGRESS";

    @Column(name = "submission_key", nullable = false)
    private UUID submissionKey = UUID.randomUUID();

    public QuizAttempt() {}

    public QuizAttempt(User user, Quiz quiz, Integer attemptNumber) {
        this.user = user;
        this.quiz = quiz;
        this.attemptNumber = attemptNumber;
        this.startedAt = OffsetDateTime.now();
        this.status = "IN_PROGRESS";
        this.submissionKey = UUID.randomUUID();
        this.correctCount = 0;
        this.totalCount = 0;
    }

    public Long getAttemptId() { return attemptId; }
    public void setAttemptId(Long attemptId) { this.attemptId = attemptId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

    public Integer getAttemptNumber() { return attemptNumber; }
    public void setAttemptNumber(Integer attemptNumber) { this.attemptNumber = attemptNumber; }

    public BigDecimal getScore() { return score; }
    public void setScore(BigDecimal score) { this.score = score; }

    public Integer getCorrectCount() { return correctCount; }
    public void setCorrectCount(Integer correctCount) { this.correctCount = correctCount; }

    public Integer getTotalCount() { return totalCount; }
    public void setTotalCount(Integer totalCount) { this.totalCount = totalCount; }

    public OffsetDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(OffsetDateTime startedAt) { this.startedAt = startedAt; }

    public OffsetDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(OffsetDateTime submittedAt) { this.submittedAt = submittedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public UUID getSubmissionKey() { return submissionKey; }
    public void setSubmissionKey(UUID submissionKey) { this.submissionKey = submissionKey; }
}
