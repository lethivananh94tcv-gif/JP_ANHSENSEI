package com.anhsensei.learning.dto;

import java.util.List;

public class AdminQuizAttemptDetailDto {

    private AdminQuizAttemptDto attemptInfo;
    private List<AnswerSnapshotDto> answers;

    public AdminQuizAttemptDetailDto() {}

    public AdminQuizAttemptDetailDto(AdminQuizAttemptDto attemptInfo, List<AnswerSnapshotDto> answers) {
        this.attemptInfo = attemptInfo;
        this.answers = answers;
    }

    public AdminQuizAttemptDto getAttemptInfo() { return attemptInfo; }
    public void setAttemptInfo(AdminQuizAttemptDto attemptInfo) { this.attemptInfo = attemptInfo; }

    public List<AnswerSnapshotDto> getAnswers() { return answers; }
    public void setAnswers(List<AnswerSnapshotDto> answers) { this.answers = answers; }

    public static class AnswerSnapshotDto {
        private Long attemptAnswerId;
        private Long questionId;
        private String prompt;
        private String userAnswer;
        private String correctAnswer;
        private String explanation;
        private Boolean isCorrect;

        public AnswerSnapshotDto() {}

        public AnswerSnapshotDto(Long attemptAnswerId, Long questionId, String prompt, String userAnswer, String correctAnswer, String explanation, Boolean isCorrect) {
            this.attemptAnswerId = attemptAnswerId;
            this.questionId = questionId;
            this.prompt = prompt;
            this.userAnswer = userAnswer;
            this.correctAnswer = correctAnswer;
            this.explanation = explanation;
            this.isCorrect = isCorrect;
        }

        public Long getAttemptAnswerId() { return attemptAnswerId; }
        public void setAttemptAnswerId(Long attemptAnswerId) { this.attemptAnswerId = attemptAnswerId; }

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }

        public String getUserAnswer() { return userAnswer; }
        public void setUserAnswer(String userAnswer) { this.userAnswer = userAnswer; }

        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }

        public Boolean getIsCorrect() { return isCorrect; }
        public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
    }
}
