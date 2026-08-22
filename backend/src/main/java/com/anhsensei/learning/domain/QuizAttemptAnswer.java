package com.anhsensei.learning.domain;

import com.anhsensei.curriculum.domain.Question;
import com.anhsensei.curriculum.domain.QuestionOption;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "quiz_attempt_answers", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"attempt_id", "question_id"})
})
public class QuizAttemptAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_answer_id")
    private Long attemptAnswerId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "attempt_id", nullable = false)
    private QuizAttempt attempt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "selected_option_id")
    private QuestionOption selectedOption;

    @Column(name = "text_answer", columnDefinition = "text")
    private String textAnswer;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect = false;

    @Column(name = "earned_score", nullable = false, precision = 8, scale = 2)
    private BigDecimal earnedScore = BigDecimal.ZERO;

    @Column(name = "question_prompt_snapshot", nullable = false, columnDefinition = "text")
    private String questionPromptSnapshot;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "user_answer_snapshot", nullable = false)
    private String userAnswerSnapshot = "{}";

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "correct_answer_snapshot", nullable = false)
    private String correctAnswerSnapshot = "{}";

    @Column(name = "explanation_snapshot", columnDefinition = "text")
    private String explanationSnapshot;

    @Column(name = "answered_at", nullable = false)
    private OffsetDateTime answeredAt = OffsetDateTime.now();

    public QuizAttemptAnswer() {}

    public QuizAttemptAnswer(QuizAttempt attempt, Question question, String promptSnapshot, String userAnswerSnapshot, String correctAnswerSnapshot, String explanationSnapshot) {
        this.attempt = attempt;
        this.question = question;
        this.questionPromptSnapshot = promptSnapshot;
        this.userAnswerSnapshot = userAnswerSnapshot != null ? userAnswerSnapshot : "{}";
        this.correctAnswerSnapshot = correctAnswerSnapshot != null ? correctAnswerSnapshot : "{}";
        this.explanationSnapshot = explanationSnapshot;
        this.answeredAt = OffsetDateTime.now();
        this.isCorrect = false;
        this.earnedScore = BigDecimal.ZERO;
    }

    public Long getAttemptAnswerId() { return attemptAnswerId; }
    public void setAttemptAnswerId(Long attemptAnswerId) { this.attemptAnswerId = attemptAnswerId; }

    public QuizAttempt getAttempt() { return attempt; }
    public void setAttempt(QuizAttempt attempt) { this.attempt = attempt; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public QuestionOption getSelectedOption() { return selectedOption; }
    public void setSelectedOption(QuestionOption selectedOption) { this.selectedOption = selectedOption; }

    public String getTextAnswer() { return textAnswer; }
    public void setTextAnswer(String textAnswer) { this.textAnswer = textAnswer; }

    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }

    public BigDecimal getEarnedScore() { return earnedScore; }
    public void setEarnedScore(BigDecimal earnedScore) { this.earnedScore = earnedScore; }

    public String getQuestionPromptSnapshot() { return questionPromptSnapshot; }
    public void setQuestionPromptSnapshot(String questionPromptSnapshot) { this.questionPromptSnapshot = questionPromptSnapshot; }

    public String getUserAnswerSnapshot() { return userAnswerSnapshot; }
    public void setUserAnswerSnapshot(String userAnswerSnapshot) { this.userAnswerSnapshot = userAnswerSnapshot; }

    public String getCorrectAnswerSnapshot() { return correctAnswerSnapshot; }
    public void setCorrectAnswerSnapshot(String correctAnswerSnapshot) { this.correctAnswerSnapshot = correctAnswerSnapshot; }

    public String getExplanationSnapshot() { return explanationSnapshot; }
    public void setExplanationSnapshot(String explanationSnapshot) { this.explanationSnapshot = explanationSnapshot; }

    public OffsetDateTime getAnsweredAt() { return answeredAt; }
    public void setAnsweredAt(OffsetDateTime answeredAt) { this.answeredAt = answeredAt; }
}
