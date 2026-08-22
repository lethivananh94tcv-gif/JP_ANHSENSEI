package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class CreateAdminQuizRequest {
    @NotNull(message = "Lesson ID không được để trống")
    private Long lessonId;

    @NotBlank(message = "Tiêu đề Quiz không được để trống")
    private String title;

    private String description;

    @NotBlank(message = "QuizType không được để trống (LESSON, PRACTICE, READING, LISTENING)")
    private String quizType = "LESSON";

    private BigDecimal passScore = new BigDecimal("60.00");
    private Integer timeLimitMinutes = 15;
    private Integer maxAttempts;
    private String reviewMode = "IMMEDIATE";

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

    public String getReviewMode() { return reviewMode; }
    public void setReviewMode(String reviewMode) { this.reviewMode = reviewMode; }
}
