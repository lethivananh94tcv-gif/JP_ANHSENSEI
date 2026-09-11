package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.VerbGroup;

public class JapaneseVerbDto {
    private Long vocabularyId;
    private String dictionaryForm;
    private String masuForm;
    private String kanaReading;
    private String meaningVi;
    private VerbGroup group;
    private String jlptLevel;
    private String verbType;
    private String verbTypeJa;
    private String verbNote;
    private Long pairedVerbId;

    public JapaneseVerbDto() {}

    public JapaneseVerbDto(Long vocabularyId, String dictionaryForm, String masuForm, String kanaReading, String meaningVi, VerbGroup group, String jlptLevel) {
        this.vocabularyId = vocabularyId;
        this.dictionaryForm = dictionaryForm;
        this.masuForm = masuForm;
        this.kanaReading = kanaReading;
        this.meaningVi = meaningVi;
        this.group = group;
        this.jlptLevel = jlptLevel;
    }

    public Long getVocabularyId() { return vocabularyId; }
    public void setVocabularyId(Long vocabularyId) { this.vocabularyId = vocabularyId; }

    public String getDictionaryForm() { return dictionaryForm; }
    public void setDictionaryForm(String dictionaryForm) { this.dictionaryForm = dictionaryForm; }

    public String getMasuForm() { return masuForm; }
    public void setMasuForm(String masuForm) { this.masuForm = masuForm; }

    public String getKanaReading() { return kanaReading; }
    public void setKanaReading(String kanaReading) { this.kanaReading = kanaReading; }

    public String getMeaningVi() { return meaningVi; }
    public void setMeaningVi(String meaningVi) { this.meaningVi = meaningVi; }

    public VerbGroup getGroup() { return group; }
    public void setGroup(VerbGroup group) { this.group = group; }

    public String getJlptLevel() { return jlptLevel; }
    public void setJlptLevel(String jlptLevel) { this.jlptLevel = jlptLevel; }

    public String getVerbType() { return verbType; }
    public void setVerbType(String verbType) { this.verbType = verbType; }

    public String getVerbTypeJa() { return verbTypeJa; }
    public void setVerbTypeJa(String verbTypeJa) { this.verbTypeJa = verbTypeJa; }

    public String getVerbNote() { return verbNote; }
    public void setVerbNote(String verbNote) { this.verbNote = verbNote; }

    public Long getPairedVerbId() { return pairedVerbId; }
    public void setPairedVerbId(Long pairedVerbId) { this.pairedVerbId = pairedVerbId; }
}
