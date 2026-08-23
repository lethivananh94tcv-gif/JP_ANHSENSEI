package com.anhsensei.curriculum.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "kanji_topic_items")
public class KanjiTopicItem {

    @EmbeddedId
    private KanjiTopicItemId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("topicId")
    @JoinColumn(name = "topic_id")
    private KanjiTopic topic;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("kanjiId")
    @JoinColumn(name = "kanji_id")
    private Kanji kanji;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 1;

    @Column(name = "kun_examples", columnDefinition = "TEXT")
    private String kunExamples;

    @Column(name = "on_examples", columnDefinition = "TEXT")
    private String onExamples;

    @Column(name = "accepted_romaji", columnDefinition = "TEXT")
    private String acceptedRomaji;

    public KanjiTopicItem() {}

    public KanjiTopicItemId getId() { return id; }
    public void setId(KanjiTopicItemId id) { this.id = id; }

    public KanjiTopic getTopic() { return topic; }
    public void setTopic(KanjiTopic topic) { this.topic = topic; }

    public Kanji getKanji() { return kanji; }
    public void setKanji(Kanji kanji) { this.kanji = kanji; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public String getKunExamples() { return kunExamples; }
    public void setKunExamples(String kunExamples) { this.kunExamples = kunExamples; }

    public String getOnExamples() { return onExamples; }
    public void setOnExamples(String onExamples) { this.onExamples = onExamples; }

    public String getAcceptedRomaji() { return acceptedRomaji; }
    public void setAcceptedRomaji(String acceptedRomaji) { this.acceptedRomaji = acceptedRomaji; }
}
