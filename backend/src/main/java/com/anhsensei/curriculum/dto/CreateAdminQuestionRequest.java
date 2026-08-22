package com.anhsensei.curriculum.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CreateAdminQuestionRequest {
    @NotNull(message = "Quiz ID không được để trống")
    private Long quizId;

    @NotBlank(message = "QuestionType không được để trống")
    private String questionType = "SINGLE_CHOICE";

    @NotBlank(message = "Nội dung câu hỏi không được để trống")
    private String prompt;

    private Integer weight = 1;
    private String audioUrl;
    private String explanation;
    private String correctAnswer;
    private Integer sortOrder = 1;
    private List<OptionInput> options;

    public static class OptionInput {
        @NotBlank(message = "Nội dung lựa chọn không được để trống")
        private String optionText;
        private Boolean isCorrect = false;
        private Integer sortOrder = 1;

        public String getOptionText() { return optionText; }
        public void setOptionText(String optionText) { this.optionText = optionText; }

        public Boolean getIsCorrect() { return isCorrect; }
        public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }

        public Integer getSortOrder() { return sortOrder; }
        public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getQuestionType() { return questionType; }
    public void setQuestionType(String questionType) { this.questionType = questionType; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public Integer getWeight() { return weight; }
    public void setWeight(Integer weight) { this.weight = weight; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public List<OptionInput> getOptions() { return options; }
    public void setOptions(List<OptionInput> options) { this.options = options; }
}
