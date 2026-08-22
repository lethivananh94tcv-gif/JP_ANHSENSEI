package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.LessonKanji;
import com.anhsensei.curriculum.domain.LessonKanjiId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonKanjiRepository extends JpaRepository<LessonKanji, LessonKanjiId> {

    List<LessonKanji> findByLesson_LessonIdOrderBySortOrderAsc(Long lessonId);

    List<LessonKanji> findByLesson_LessonIdAndKanji_StatusAndKanji_DeletedAtIsNullOrderBySortOrderAsc(Long lessonId, String status);

    boolean existsByLesson_LessonIdAndKanji_KanjiId(Long lessonId, Long kanjiId);

    @Query("SELECT CASE WHEN COUNT(lk) > 0 THEN true ELSE false END FROM LessonKanji lk WHERE lk.lesson.lessonId = :lessonId AND lk.kanji.status = 'PUBLISHED' AND lk.kanji.deletedAt IS NULL")
    boolean existsPublishedKanjiByLessonId(@Param("lessonId") Long lessonId);

    void deleteByLesson_LessonIdAndKanji_KanjiId(Long lessonId, Long kanjiId);
}
