package com.anhsensei.curriculum.dto;

public class VerbVerifyResponse {
    private boolean isCorrect;
    private String userAnswer;
    private String correctAnswerKana;
    private String correctAnswerKanji;
    private String ruleExplanation;

    public VerbVerifyResponse() {}

    public VerbVerifyResponse(boolean isCorrect, String userAnswer, String correctAnswerKana, String correctAnswerKanji, String ruleExplanation) {
        this.isCorrect = isCorrect;
        this.userAnswer = userAnswer;
        this.correctAnswerKana = correctAnswerKana;
        this.correctAnswerKanji = correctAnswerKanji;
        this.ruleExplanation = ruleExplanation;
    }

    public boolean isCorrect() { return isCorrect; }
    public void setCorrect(boolean correct) { isCorrect = correct; }

    public String getUserAnswer() { return userAnswer; }
    public void setUserAnswer(String userAnswer) { this.userAnswer = userAnswer; }

    public String getCorrectAnswerKana() { return correctAnswerKana; }
    public void setCorrectAnswerKana(String correctAnswerKana) { this.correctAnswerKana = correctAnswerKana; }

    public String getCorrectAnswerKanji() { return correctAnswerKanji; }
    public void setCorrectAnswerKanji(String correctAnswerKanji) { this.correctAnswerKanji = correctAnswerKanji; }

    public String getRuleExplanation() { return ruleExplanation; }
    public void setRuleExplanation(String ruleExplanation) { this.ruleExplanation = ruleExplanation; }
}
