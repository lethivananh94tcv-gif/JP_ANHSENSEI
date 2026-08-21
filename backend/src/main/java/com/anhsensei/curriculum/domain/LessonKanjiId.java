package com.anhsensei.curriculum.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LessonKanjiId implements Serializable {

    @Column(name = "lesson_id")
    private Long lessonId;

    @Column(name = "kanji_id")
    private Long kanjiId;

    public LessonKanjiId() {}

    public LessonKanjiId(Long lessonId, Long kanjiId) {
        this.lessonId = lessonId;
        this.kanjiId = kanjiId;
    }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public Long getKanjiId() { return kanjiId; }
    public void setKanjiId(Long kanjiId) { this.kanjiId = kanjiId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LessonKanjiId that = (LessonKanjiId) o;
        return Objects.equals(lessonId, that.lessonId) && Objects.equals(kanjiId, that.kanjiId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lessonId, kanjiId);
    }
}
