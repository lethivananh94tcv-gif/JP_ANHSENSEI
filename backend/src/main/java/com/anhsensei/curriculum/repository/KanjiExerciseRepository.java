package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.KanjiExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiExerciseRepository extends JpaRepository<KanjiExercise, Long> {
    List<KanjiExercise> findByTopic_TopicIdOrderByDisplayOrderAsc(Long topicId);
    List<KanjiExercise> findByTopic_TopicIdAndExerciseTypeOrderByDisplayOrderAsc(Long topicId, String exerciseType);
}
