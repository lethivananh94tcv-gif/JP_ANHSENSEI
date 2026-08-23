package com.anhsensei.curriculum.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class KanjiTopicItemId implements Serializable {

    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "kanji_id")
    private Long kanjiId;

    public KanjiTopicItemId() {}

    public KanjiTopicItemId(Long topicId, Long kanjiId) {
        this.topicId = topicId;
        this.kanjiId = kanjiId;
    }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public Long getKanjiId() { return kanjiId; }
    public void setKanjiId(Long kanjiId) { this.kanjiId = kanjiId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KanjiTopicItemId that = (KanjiTopicItemId) o;
        return Objects.equals(topicId, that.topicId) && Objects.equals(kanjiId, that.kanjiId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(topicId, kanjiId);
    }
}
