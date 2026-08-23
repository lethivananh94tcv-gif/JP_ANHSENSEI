package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.KanjiTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiTopicRepository extends JpaRepository<KanjiTopic, Long> {
    List<KanjiTopic> findByJlptLevelOrderByTopicOrderAsc(String jlptLevel);
}
