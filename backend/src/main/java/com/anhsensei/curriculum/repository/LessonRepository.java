package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByLevel_LevelIdOrderBySortOrderAsc(Long levelId);

    List<Lesson> findByLevel_LevelIdAndStatusOrderBySortOrderAsc(Long levelId, String status);

    Optional<Lesson> findByLevel_LevelIdAndSortOrder(Long levelId, Integer sortOrder);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Lesson l WHERE l.level.levelId = :levelId AND l.sortOrder = :sortOrder AND l.status <> :excludedStatus AND l.deletedAt IS NULL")
    boolean existsByLevelIdAndSortOrderAndStatusNot(@Param("levelId") Long levelId, @Param("sortOrder") Integer sortOrder, @Param("excludedStatus") String excludedStatus);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Lesson l WHERE l.level.levelId = :levelId AND l.sortOrder = :sortOrder AND l.status <> :excludedStatus AND l.lessonId <> :lessonId AND l.deletedAt IS NULL")
    boolean existsByLevelIdAndSortOrderAndStatusNotExcludingId(@Param("levelId") Long levelId, @Param("sortOrder") Integer sortOrder, @Param("excludedStatus") String excludedStatus, @Param("lessonId") Long lessonId);

    Optional<Lesson> findFirstByLevel_CodeIgnoreCaseAndSortOrderAndStatusAndDeletedAtIsNull(String levelCode, Integer sortOrder, String status);

    List<Lesson> findByIsSampleTrueAndStatusOrderBySortOrderAsc(String status);
}
