package com.anhsensei.learning.dto;

import java.math.BigDecimal;
import java.util.List;

public class StartQuizResponse {

    private Long attemptId;
    private Long quizId;
    private String title;
    private String description;
    private Integer timeLimitMinutes;
    private BigDecimal passScore;
    private Integer attemptNumber;
    private Boolean isResumed;
    private List<QuizQuestionDto> questions;

    public StartQuizResponse() {}

    public Long getAttemptId() { return attemptId; }
    public void setAttemptId(Long attemptId) { this.attemptId = attemptId; }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getTimeLimitMinutes() { return timeLimitMinutes; }
    public void setTimeLimitMinutes(Integer timeLimitMinutes) { this.timeLimitMinutes = timeLimitMinutes; }

    public BigDecimal getPassScore() { return passScore; }
    public void setPassScore(BigDecimal passScore) { this.passScore = passScore; }

    public Integer getAttemptNumber() { return attemptNumber; }
    public void setAttemptNumber(Integer attemptNumber) { this.attemptNumber = attemptNumber; }

    public Boolean getIsResumed() { return isResumed; }
    public void setIsResumed(Boolean isResumed) { this.isResumed = isResumed; }

    public List<QuizQuestionDto> getQuestions() { return questions; }
    public void setQuestions(List<QuizQuestionDto> questions) { this.questions = questions; }

    public static class QuizQuestionDto {
        private Long questionId;
        private String questionType;
        private String prompt;
        private BigDecimal weight;
        private String audioUrl;
        private Integer sortOrder;
        private List<QuizOptionDto> options;
        private Long currentSavedOptionId;
        private String currentSavedTextAnswer;

        public QuizQuestionDto() {}

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getQuestionType() { return questionType; }
        public void setQuestionType(String questionType) { this.questionType = questionType; }

        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }

        public BigDecimal getWeight() { return weight; }
        public void setWeight(BigDecimal weight) { this.weight = weight; }

        public String getAudioUrl() { return audioUrl; }
        public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

        public Integer getSortOrder() { return sortOrder; }
        public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

        public List<QuizOptionDto> getOptions() { return options; }
        public void setOptions(List<QuizOptionDto> options) { this.options = options; }

        public Long getCurrentSavedOptionId() { return currentSavedOptionId; }
        public void setCurrentSavedOptionId(Long currentSavedOptionId) { this.currentSavedOptionId = currentSavedOptionId; }

        public String getCurrentSavedTextAnswer() { return currentSavedTextAnswer; }
        public void setCurrentSavedTextAnswer(String currentSavedTextAnswer) { this.currentSavedTextAnswer = currentSavedTextAnswer; }
    }

    public static class QuizOptionDto {
        private Long optionId;
        private String optionText;
        private Integer sortOrder;

        public QuizOptionDto() {}

        public QuizOptionDto(Long optionId, String optionText, Integer sortOrder) {
            this.optionId = optionId;
            this.optionText = optionText;
            this.sortOrder = sortOrder;
        }

        public Long getOptionId() { return optionId; }
        public void setOptionId(Long optionId) { this.optionId = optionId; }

        public String getOptionText() { return optionText; }
        public void setOptionText(String optionText) { this.optionText = optionText; }

        public Integer getSortOrder() { return sortOrder; }
        public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    }
}
