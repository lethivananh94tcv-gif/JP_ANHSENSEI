package com.anhsensei.learning.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "jlpt_exam_attempts")
public class JlptExamAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "exam_version_id", nullable = false)
    private UUID examVersionId;

    @Column(name = "total_score", nullable = false)
    private int totalScore = 0;

    @Column(name = "vocab_score", nullable = false)
    private int vocabScore = 0;

    @Column(name = "grammar_score", nullable = false)
    private int grammarScore = 0;

    @Column(name = "listening_score", nullable = false)
    private int listeningScore = 0;

    @Column(name = "is_pass", nullable = false)
    private boolean isPass = false;

    @Column(name = "time_spent_seconds", nullable = false)
    private int timeSpentSeconds = 0;

    @Column(name = "started_at", nullable = false)
    private Instant startedAt = Instant.now();

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(name = "completed_at")
    private Instant completedAt;

    @Column(nullable = false, length = 30)
    private String status = "IN_PROGRESS"; // IN_PROGRESS, SUBMITTED, EXPIRED

    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.JSON)
    @Column(name = "questions_snapshot_json", columnDefinition = "jsonb")
    private String questionsSnapshotJson;

    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.JSON)
    @Column(name = "user_answers_json", columnDefinition = "jsonb")
    private String userAnswersJson;

    public JlptExamAttempt() {}

    public JlptExamAttempt(Long userId, UUID examVersionId, Instant startedAt, Instant expiresAt) {
        this.userId = userId;
        this.examVersionId = examVersionId;
        this.startedAt = startedAt;
        this.expiresAt = expiresAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public UUID getExamVersionId() { return examVersionId; }
    public void setExamVersionId(UUID examVersionId) { this.examVersionId = examVersionId; }

    public int getTotalScore() { return totalScore; }
    public void setTotalScore(int totalScore) { this.totalScore = totalScore; }

    public int getVocabScore() { return vocabScore; }
    public void setVocabScore(int vocabScore) { this.vocabScore = vocabScore; }

    public int getGrammarScore() { return grammarScore; }
    public void setGrammarScore(int grammarScore) { this.grammarScore = grammarScore; }

    public int getListeningScore() { return listeningScore; }
    public void setListeningScore(int listeningScore) { this.listeningScore = listeningScore; }

    public boolean isPass() { return isPass; }
    public void setPass(boolean pass) { isPass = pass; }

    public int getTimeSpentSeconds() { return timeSpentSeconds; }
    public void setTimeSpentSeconds(int timeSpentSeconds) { this.timeSpentSeconds = timeSpentSeconds; }

    public Instant getStartedAt() { return startedAt; }
    public void setStartedAt(Instant startedAt) { this.startedAt = startedAt; }

    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }

    public Instant getCompletedAt() { return completedAt; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getQuestionsSnapshotJson() { return questionsSnapshotJson; }
    public void setQuestionsSnapshotJson(String questionsSnapshotJson) { this.questionsSnapshotJson = questionsSnapshotJson; }

    public String getUserAnswersJson() { return userAnswersJson; }
    public void setUserAnswersJson(String userAnswersJson) { this.userAnswersJson = userAnswersJson; }
}
