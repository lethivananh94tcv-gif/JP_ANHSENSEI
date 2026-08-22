package com.anhsensei.learning.dto;

import java.util.List;

public class SubmitAttemptRequest {

    private List<AutosaveAnswersRequest.QuestionAnswerInput> answers;

    public SubmitAttemptRequest() {}

    public SubmitAttemptRequest(List<AutosaveAnswersRequest.QuestionAnswerInput> answers) {
        this.answers = answers;
    }

    public List<AutosaveAnswersRequest.QuestionAnswerInput> getAnswers() { return answers; }
    public void setAnswers(List<AutosaveAnswersRequest.QuestionAnswerInput> answers) { this.answers = answers; }
}
