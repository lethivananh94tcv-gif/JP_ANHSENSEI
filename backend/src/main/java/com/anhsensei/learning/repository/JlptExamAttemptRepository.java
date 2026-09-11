package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.JlptExamAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JlptExamAttemptRepository extends JpaRepository<JlptExamAttempt, UUID> {
    List<JlptExamAttempt> findByUserIdOrderByStartedAtDesc(Long userId);
    Optional<JlptExamAttempt> findByUserIdAndExamVersionIdAndStatus(Long userId, UUID examVersionId, String status);
}
