package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.ConjugationForm;

public class VerbPracticeQuestionDto {
    private Long vocabularyId;
    private JapaneseVerbDto verb;
    private ConjugationForm targetForm;
    private String targetFormName;
    private String prompt;

    public VerbPracticeQuestionDto() {}

    public VerbPracticeQuestionDto(Long vocabularyId, JapaneseVerbDto verb, ConjugationForm targetForm, String targetFormName, String prompt) {
        this.vocabularyId = vocabularyId;
        this.verb = verb;
        this.targetForm = targetForm;
        this.targetFormName = targetFormName;
        this.prompt = prompt;
    }

    public Long getVocabularyId() { return vocabularyId; }
    public void setVocabularyId(Long vocabularyId) { this.vocabularyId = vocabularyId; }

    public JapaneseVerbDto getVerb() { return verb; }
    public void setVerb(JapaneseVerbDto verb) { this.verb = verb; }

    public ConjugationForm getTargetForm() { return targetForm; }
    public void setTargetForm(ConjugationForm targetForm) { this.targetForm = targetForm; }

    public String getTargetFormName() { return targetFormName; }
    public void setTargetFormName(String targetFormName) { this.targetFormName = targetFormName; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }
}
