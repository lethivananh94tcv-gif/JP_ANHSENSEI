package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Quiz;

import java.math.BigDecimal;

public class LearnerQuizSummaryDto {

    private Long quizId;
    private Long lessonId;
    private String title;
    private String description;
    private String quizType;
    private BigDecimal passScore;
    private Integer timeLimitMinutes;
    private Integer maxAttempts;
    private Boolean isRequired;

    public LearnerQuizSummaryDto() {}

    public LearnerQuizSummaryDto(Long quizId, Long lessonId, String title, String description, String quizType, BigDecimal passScore, Integer timeLimitMinutes, Integer maxAttempts, Boolean isRequired) {
        this.quizId = quizId;
        this.lessonId = lessonId;
        this.title = title;
        this.description = description;
        this.quizType = quizType;
        this.passScore = passScore;
        this.timeLimitMinutes = timeLimitMinutes;
        this.maxAttempts = maxAttempts;
        this.isRequired = isRequired;
    }

    public static LearnerQuizSummaryDto fromQuiz(Quiz quiz) {
        if (quiz == null) return null;
        return new LearnerQuizSummaryDto(
                quiz.getQuizId(),
                quiz.getLesson() != null ? quiz.getLesson().getLessonId() : null,
                quiz.getTitle(),
                quiz.getDescription(),
                quiz.getQuizType(),
                quiz.getPassScore(),
                quiz.getTimeLimitMinutes(),
                quiz.getMaxAttempts(),
                quiz.getIsRequired()
        );
    }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getQuizType() { return quizType; }
    public void setQuizType(String quizType) { this.quizType = quizType; }

    public BigDecimal getPassScore() { return passScore; }
    public void setPassScore(BigDecimal passScore) { this.passScore = passScore; }

    public Integer getTimeLimitMinutes() { return timeLimitMinutes; }
    public void setTimeLimitMinutes(Integer timeLimitMinutes) { this.timeLimitMinutes = timeLimitMinutes; }

    public Integer getMaxAttempts() { return maxAttempts; }
    public void setMaxAttempts(Integer maxAttempts) { this.maxAttempts = maxAttempts; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }
}
