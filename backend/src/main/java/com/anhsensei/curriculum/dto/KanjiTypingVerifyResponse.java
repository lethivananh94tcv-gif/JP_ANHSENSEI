package com.anhsensei.curriculum.dto;

public class KanjiTypingVerifyResponse {
    private boolean correct;
    private String inputRomaji;
    private String matchedReading;
    private String message;

    public KanjiTypingVerifyResponse() {}

    public KanjiTypingVerifyResponse(boolean correct, String inputRomaji, String matchedReading, String message) {
        this.correct = correct;
        this.inputRomaji = inputRomaji;
        this.matchedReading = matchedReading;
        this.message = message;
    }

    public boolean isCorrect() { return correct; }
    public void setCorrect(boolean correct) { this.correct = correct; }

    public String getInputRomaji() { return inputRomaji; }
    public void setInputRomaji(String inputRomaji) { this.inputRomaji = inputRomaji; }

    public String getMatchedReading() { return matchedReading; }
    public void setMatchedReading(String matchedReading) { this.matchedReading = matchedReading; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
