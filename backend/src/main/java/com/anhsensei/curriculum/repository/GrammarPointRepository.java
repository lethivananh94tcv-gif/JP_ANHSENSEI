package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.GrammarPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GrammarPointRepository extends JpaRepository<GrammarPoint, Long> {

    List<GrammarPoint> findByLesson_LessonIdOrderBySortOrderAsc(Long lessonId);

    List<GrammarPoint> findByLesson_LessonIdAndStatusOrderBySortOrderAsc(Long lessonId, String status);

    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END FROM GrammarPoint g WHERE g.lesson.lessonId = :lessonId AND g.status = 'PUBLISHED' AND g.deletedAt IS NULL")
    boolean existsPublishedByLessonId(@Param("lessonId") Long lessonId);

    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END FROM GrammarPoint g WHERE g.lesson.lessonId = :lessonId AND g.sortOrder = :sortOrder AND g.status <> :excludedStatus AND g.deletedAt IS NULL")
    boolean existsByLessonIdAndSortOrderAndStatusNot(@Param("lessonId") Long lessonId, @Param("sortOrder") Integer sortOrder, @Param("excludedStatus") String excludedStatus);
}
