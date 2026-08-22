package com.anhsensei.learning.dto;

import java.util.List;

public class AutosaveAnswersRequest {

    private List<QuestionAnswerInput> answers;

    public AutosaveAnswersRequest() {}

    public AutosaveAnswersRequest(List<QuestionAnswerInput> answers) {
        this.answers = answers;
    }

    public List<QuestionAnswerInput> getAnswers() { return answers; }
    public void setAnswers(List<QuestionAnswerInput> answers) { this.answers = answers; }

    public static class QuestionAnswerInput {
        private Long questionId;
        private Long selectedOptionId;
        private String textAnswer;

        public QuestionAnswerInput() {}

        public QuestionAnswerInput(Long questionId, Long selectedOptionId, String textAnswer) {
            this.questionId = questionId;
            this.selectedOptionId = selectedOptionId;
            this.textAnswer = textAnswer;
        }

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public Long getSelectedOptionId() { return selectedOptionId; }
        public void setSelectedOptionId(Long selectedOptionId) { this.selectedOptionId = selectedOptionId; }

        public String getTextAnswer() { return textAnswer; }
        public void setTextAnswer(String textAnswer) { this.textAnswer = textAnswer; }
    }
}
