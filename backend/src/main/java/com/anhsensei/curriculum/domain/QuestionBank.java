package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "question_bank")
public class QuestionBank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "level"})
    private Lesson lesson;

    @Column(name = "question_type", nullable = false, length = 30)
    private String questionType; // MULTIPLE_CHOICE, LISTENING, TYPING

    @Column(name = "difficulty", nullable = false, length = 20)
    private String difficulty = "MEDIUM"; // EASY, MEDIUM, HARD

    @Column(name = "prompt", nullable = false, columnDefinition = "TEXT")
    private String prompt;

    @Column(name = "japanese_text", columnDefinition = "TEXT")
    private String japaneseText;

    @Column(name = "audio_url", columnDefinition = "TEXT")
    private String audioUrl;

    @Column(name = "audio_text", columnDefinition = "TEXT")
    private String audioText;

    @Column(name = "transcript", columnDefinition = "TEXT")
    private String transcript;

    @Column(name = "valid_answers", columnDefinition = "JSONB")
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.JSON)
    private String validAnswers; // JSON Array String: ["こんにちは", "コンニチハ", "konnichiwa"]

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "weight", nullable = false, precision = 8, scale = 2)
    private BigDecimal weight = new BigDecimal("1.00");

    @Column(name = "status", nullable = false, length = 20)
    private String status = "DRAFT"; // DRAFT, ACTIVE, INACTIVE

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "updated_by")
    private Long updatedBy;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private OffsetDateTime updatedAt;

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;

    @OneToMany(mappedBy = "questionBank", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionBankOption> options = new ArrayList<>();

    public QuestionBank() {}

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Lesson getLesson() { return lesson; }
    public void setLesson(Lesson lesson) { this.lesson = lesson; }

    public String getQuestionType() { return questionType; }
    public void setQuestionType(String questionType) { this.questionType = questionType; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getJapaneseText() { return japaneseText; }
    public void setJapaneseText(String japaneseText) { this.japaneseText = japaneseText; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    public String getAudioText() { return audioText; }
    public void setAudioText(String audioText) { this.audioText = audioText; }

    public String getTranscript() { return transcript; }
    public void setTranscript(String transcript) { this.transcript = transcript; }

    public String getValidAnswers() { return validAnswers; }
    public void setValidAnswers(String validAnswers) { this.validAnswers = validAnswers; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public BigDecimal getWeight() { return weight; }
    public void setWeight(BigDecimal weight) { this.weight = weight; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getCreatedBy() { return createdBy; }
    public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }

    public Long getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(Long updatedBy) { this.updatedBy = updatedBy; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }

    public OffsetDateTime getDeletedAt() { return deletedAt; }
    public void setDeletedAt(OffsetDateTime deletedAt) { this.deletedAt = deletedAt; }

    public List<QuestionBankOption> getOptions() { return options; }
    public void setOptions(List<QuestionBankOption> options) {
        this.options.clear();
        if (options != null) {
            options.forEach(opt -> {
                opt.setQuestionBank(this);
                this.options.add(opt);
            });
        }
    }
}
