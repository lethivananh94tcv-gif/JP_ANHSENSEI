package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.ConjugationForm;

public class VerbVerifyRequest {
    private Long vocabularyId;
    private ConjugationForm targetForm;
    private String userAnswer;

    public VerbVerifyRequest() {}

    public VerbVerifyRequest(Long vocabularyId, ConjugationForm targetForm, String userAnswer) {
        this.vocabularyId = vocabularyId;
        this.targetForm = targetForm;
        this.userAnswer = userAnswer;
    }

    public Long getVocabularyId() { return vocabularyId; }
    public void setVocabularyId(Long vocabularyId) { this.vocabularyId = vocabularyId; }

    public ConjugationForm getTargetForm() { return targetForm; }
    public void setTargetForm(ConjugationForm targetForm) { this.targetForm = targetForm; }

    public String getUserAnswer() { return userAnswer; }
    public void setUserAnswer(String userAnswer) { this.userAnswer = userAnswer; }
}
