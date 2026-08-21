package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {

    List<Vocabulary> findByLesson_LessonIdOrderBySortOrderAsc(Long lessonId);

    List<Vocabulary> findByLesson_LessonIdAndStatusOrderBySortOrderAsc(Long lessonId, String status);

    @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM Vocabulary v WHERE v.lesson.lessonId = :lessonId AND v.status = 'PUBLISHED' AND v.deletedAt IS NULL")
    boolean existsPublishedByLessonId(@Param("lessonId") Long lessonId);

    @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM Vocabulary v WHERE v.lesson.lessonId = :lessonId AND v.sortOrder = :sortOrder AND v.status <> :excludedStatus AND v.deletedAt IS NULL")
    boolean existsByLessonIdAndSortOrderAndStatusNot(@Param("lessonId") Long lessonId, @Param("sortOrder") Integer sortOrder, @Param("excludedStatus") String excludedStatus);
}
