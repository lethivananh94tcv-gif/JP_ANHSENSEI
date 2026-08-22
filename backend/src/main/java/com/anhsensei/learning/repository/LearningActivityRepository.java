package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.LearningActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface LearningActivityRepository extends JpaRepository<LearningActivity, Long> {

    boolean existsByUser_UserIdAndReferenceTypeAndReferenceId(Long userId, String referenceType, Long referenceId);

    long countByUser_UserId(Long userId);

    @Query("SELECT la.referenceId FROM LearningActivity la WHERE la.user.userId = :userId AND la.referenceType = :referenceType")
    List<Long> findCompletedReferenceIds(@Param("userId") Long userId, @Param("referenceType") String referenceType);

    @Query("SELECT la.activityDate, COUNT(la) FROM LearningActivity la WHERE la.user.userId = :userId AND la.activityDate >= :startDate GROUP BY la.activityDate ORDER BY la.activityDate ASC")
    List<Object[]> findWeeklyActivityCounts(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);
}
