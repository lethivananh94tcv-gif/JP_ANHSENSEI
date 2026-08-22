package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.LearningProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {

    Optional<LearningProgress> findByUser_UserIdAndLesson_LessonId(Long userId, Long lessonId);

    List<LearningProgress> findByUser_UserId(Long userId);

    @Query("SELECT COUNT(lp) FROM LearningProgress lp WHERE lp.user.userId = :userId AND lp.status = 'COMPLETED'")
    long countCompletedLessonsByUserId(@Param("userId") Long userId);

    @Query("SELECT lp FROM LearningProgress lp WHERE lp.user.userId = :userId ORDER BY lp.lastAccessedAt DESC")
    List<LearningProgress> findMostRecentlyAccessedByUserId(@Param("userId") Long userId);
}
