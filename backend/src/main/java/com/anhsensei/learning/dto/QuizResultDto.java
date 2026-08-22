package com.anhsensei.learning.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public class QuizResultDto {

    private Long attemptId;
    private Long quizId;
    private String quizTitle;
    private Integer attemptNumber;
    private BigDecimal score;
    private BigDecimal passScore;
    private Boolean passed;
    private String status;
    private Integer correctCount;
    private Integer totalCount;
    private OffsetDateTime startedAt;
    private OffsetDateTime submittedAt;
    private List<AttemptAnswerDetailDto> answers;

    public QuizResultDto() {}

    public Long getAttemptId() { return attemptId; }
    public void setAttemptId(Long attemptId) { this.attemptId = attemptId; }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }

    public Integer getAttemptNumber() { return attemptNumber; }
    public void setAttemptNumber(Integer attemptNumber) { this.attemptNumber = attemptNumber; }

    public BigDecimal getScore() { return score; }
    public void setScore(BigDecimal score) { this.score = score; }

    public BigDecimal getPassScore() { return passScore; }
    public void setPassScore(BigDecimal passScore) { this.passScore = passScore; }

    public Boolean getPassed() { return passed; }
    public void setPassed(Boolean passed) { this.passed = passed; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getCorrectCount() { return correctCount; }
    public void setCorrectCount(Integer correctCount) { this.correctCount = correctCount; }

    public Integer getTotalCount() { return totalCount; }
    public void setTotalCount(Integer totalCount) { this.totalCount = totalCount; }

    public OffsetDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(OffsetDateTime startedAt) { this.startedAt = startedAt; }

    public OffsetDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(OffsetDateTime submittedAt) { this.submittedAt = submittedAt; }

    public List<AttemptAnswerDetailDto> getAnswers() { return answers; }
    public void setAnswers(List<AttemptAnswerDetailDto> answers) { this.answers = answers; }

    public static class AttemptAnswerDetailDto {
        private Long questionId;
        private String prompt;
        private Long selectedOptionId;
        private String textAnswer;
        private Boolean isCorrect;
        private BigDecimal earnedScore;
        private String explanation; // null if ReviewMode hides it
        private String correctAnswer; // null if ReviewMode hides it
        private List<OptionDetailDto> options;

        public AttemptAnswerDetailDto() {}

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }

        public Long getSelectedOptionId() { return selectedOptionId; }
        public void setSelectedOptionId(Long selectedOptionId) { this.selectedOptionId = selectedOptionId; }

        public String getTextAnswer() { return textAnswer; }
        public void setTextAnswer(String textAnswer) { this.textAnswer = textAnswer; }

        public Boolean getIsCorrect() { return isCorrect; }
        public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }

        public BigDecimal getEarnedScore() { return earnedScore; }
        public void setEarnedScore(BigDecimal earnedScore) { this.earnedScore = earnedScore; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }

        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

        public List<OptionDetailDto> getOptions() { return options; }
        public void setOptions(List<OptionDetailDto> options) { this.options = options; }
    }

    public static class OptionDetailDto {
        private Long optionId;
        private String optionText;
        private Boolean isCorrect; // null if ReviewMode hides it

        public OptionDetailDto() {}

        public OptionDetailDto(Long optionId, String optionText, Boolean isCorrect) {
            this.optionId = optionId;
            this.optionText = optionText;
            this.isCorrect = isCorrect;
        }

        public Long getOptionId() { return optionId; }
        public void setOptionId(Long optionId) { this.optionId = optionId; }

        public String getOptionText() { return optionText; }
        public void setOptionText(String optionText) { this.optionText = optionText; }

        public Boolean getIsCorrect() { return isCorrect; }
        public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
    }
}
