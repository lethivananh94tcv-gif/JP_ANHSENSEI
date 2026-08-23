package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.KanjiTopicItem;
import com.anhsensei.curriculum.domain.KanjiTopicItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KanjiTopicItemRepository extends JpaRepository<KanjiTopicItem, KanjiTopicItemId> {

    @Query("SELECT ki FROM KanjiTopicItem ki JOIN FETCH ki.kanji WHERE ki.id.topicId = :topicId ORDER BY ki.displayOrder ASC")
    List<KanjiTopicItem> findByTopicIdWithKanji(@Param("topicId") Long topicId);
}
