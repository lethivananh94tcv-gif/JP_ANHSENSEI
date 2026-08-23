package com.anhsensei.curriculum.dto;

import java.util.ArrayList;
import java.util.List;

public class KanjiTopicDetailDto {
    private KanjiTopicDto topic;
    private List<KanjiTopicItemDto> items = new ArrayList<>();
    private List<KanjiExerciseDto> readingExercises = new ArrayList<>();
    private List<KanjiExerciseDto> quizTests = new ArrayList<>();

    public KanjiTopicDetailDto() {}

    public KanjiTopicDetailDto(KanjiTopicDto topic, List<KanjiTopicItemDto> items, List<KanjiExerciseDto> readingExercises, List<KanjiExerciseDto> quizTests) {
        this.topic = topic;
        this.items = items;
        this.readingExercises = readingExercises;
        this.quizTests = quizTests;
    }

    public KanjiTopicDto getTopic() { return topic; }
    public void setTopic(KanjiTopicDto topic) { this.topic = topic; }

    public List<KanjiTopicItemDto> getItems() { return items; }
    public void setItems(List<KanjiTopicItemDto> items) { this.items = items; }

    public List<KanjiExerciseDto> getReadingExercises() { return readingExercises; }
    public void setReadingExercises(List<KanjiExerciseDto> readingExercises) { this.readingExercises = readingExercises; }

    public List<KanjiExerciseDto> getQuizTests() { return quizTests; }
    public void setQuizTests(List<KanjiExerciseDto> quizTests) { this.quizTests = quizTests; }
}
