package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "lesson_kanji")
public class LessonKanji {

    @EmbeddedId
    private LessonKanjiId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("lessonId")
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("kanjiId")
    @JoinColumn(name = "kanji_id")
    private Kanji kanji;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 1;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "is_required", nullable = false)
    private Boolean isRequired = true;

    public LessonKanji() {}

    public LessonKanji(Lesson lesson, Kanji kanji, Integer sortOrder, String notes) {
        this(lesson, kanji, sortOrder, notes, true);
    }

    public LessonKanji(Lesson lesson, Kanji kanji, Integer sortOrder, String notes, Boolean isRequired) {
        this.id = new LessonKanjiId(lesson.getLessonId(), kanji.getKanjiId());
        this.lesson = lesson;
        this.kanji = kanji;
        this.sortOrder = sortOrder != null ? sortOrder : 1;
        this.notes = notes;
        this.isRequired = isRequired != null ? isRequired : true;
    }

    public LessonKanjiId getId() { return id; }
    public void setId(LessonKanjiId id) { this.id = id; }

    public Lesson getLesson() { return lesson; }
    public void setLesson(Lesson lesson) { this.lesson = lesson; }

    public Kanji getKanji() { return kanji; }
    public void setKanji(Kanji kanji) { this.kanji = kanji; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Boolean getIsRequired() { return isRequired; }
    public void setIsRequired(Boolean isRequired) { this.isRequired = isRequired; }
}
