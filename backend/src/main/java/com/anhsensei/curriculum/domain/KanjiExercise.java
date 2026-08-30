package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "kanji_exercises")
public class KanjiExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercise_id")
    private Long exerciseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private KanjiTopic topic;

    @Column(name = "exercise_type", nullable = false, length = 50)
    private String exerciseType; // 'READING_SENTENCE', 'QUIZ_TEST'

    @Column(name = "sentence_jp", nullable = false, columnDefinition = "TEXT")
    private String sentenceJp;

    @Column(name = "target_kanji", length = 100)
    private String targetKanji;

    @Column(name = "reading_hiragana", length = 200)
    private String readingHiragana;

    @Column(name = "options_json", columnDefinition = "TEXT")
    private String optionsJson;

    @Column(name = "correct_option")
    private Integer correctOption;

    @Column(name = "meaning_vi", columnDefinition = "TEXT")
    private String meaningVi;

    @Column(name = "display_order")
    private Integer displayOrder = 1;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    public KanjiExercise() {}

    public Long getExerciseId() { return exerciseId; }
    public void setExerciseId(Long exerciseId) { this.exerciseId = exerciseId; }

    public KanjiTopic getTopic() { return topic; }
    public void setTopic(KanjiTopic topic) { this.topic = topic; }

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

    public String getMeaningVi() { return meaningVi; }
    public void setMeaningVi(String meaningVi) { this.meaningVi = meaningVi; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
