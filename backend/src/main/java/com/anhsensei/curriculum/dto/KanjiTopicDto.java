package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.KanjiTopic;

public class KanjiTopicDto {
    private Long topicId;
    private String title;
    private String jlptLevel;
    private Integer topicOrder;
    private String description;

    public KanjiTopicDto() {}

    public KanjiTopicDto(KanjiTopic topic) {
        this.topicId = topic.getTopicId();
        this.title = topic.getTitle();
        this.jlptLevel = topic.getJlptLevel();
        this.topicOrder = topic.getTopicOrder();
        this.description = topic.getDescription();
    }

    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getJlptLevel() { return jlptLevel; }
    public void setJlptLevel(String jlptLevel) { this.jlptLevel = jlptLevel; }

    public Integer getTopicOrder() { return topicOrder; }
    public void setTopicOrder(Integer topicOrder) { this.topicOrder = topicOrder; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
