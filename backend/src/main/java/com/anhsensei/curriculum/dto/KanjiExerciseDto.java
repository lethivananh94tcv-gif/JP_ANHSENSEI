package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.KanjiExercise;

public class KanjiExerciseDto {
    private Long exerciseId;
    private Long topicId;
    private String exerciseType;
    private String sentenceJp;
    private String targetKanji;
    private String readingHiragana;
    private String optionsJson;
    private Integer correctOption;
    private Integer displayOrder;

    public KanjiExerciseDto() {}

    public KanjiExerciseDto(KanjiExercise exercise) {
        this.exerciseId = exercise.getExerciseId();
        if (exercise.getTopic() != null) {
            this.topicId = exercise.getTopic().getTopicId();
        }
        this.exerciseType = exercise.getExerciseType();
        this.sentenceJp = exercise.getSentenceJp();
        this.targetKanji = exercise.getTargetKanji();
        this.readingHiragana = exercise.getReadingHiragana();
        this.optionsJson = exercise.getOptionsJson();
        this.correctOption = exercise.getCorrectOption();
        this.displayOrder = exercise.getDisplayOrder();
    }

    public Long getExerciseId() { return exerciseId; }
    public void setExerciseId(Long exerciseId) { this.exerciseId = exerciseId; }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public String getExerciseType() { return exerciseType; }
    public void setExerciseType(String exerciseType) { this.exerciseType = exerciseType; }

    public String getSentenceJp() { return sentenceJp; }
    public void setSentenceJp(String sentenceJp) { this.sentenceJp = sentenceJp; }

    public String getTargetKanji() { return targetKanji; }
    public void setTargetKanji(String targetKanji) { this.targetKanji = targetKanji; }

    public String getReadingHiragana() { return readingHiragana; }
    public void setReadingHiragana(String readingHiragana) { this.readingHiragana = readingHiragana; }

    public String getOptionsJson() { return optionsJson; }
    public void setOptionsJson(String optionsJson) { this.optionsJson = optionsJson; }

    public Integer getCorrectOption() { return correctOption; }
    public void setCorrectOption(Integer correctOption) { this.correctOption = correctOption; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
