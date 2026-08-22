package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.FlashcardReviewLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardReviewLogRepository extends JpaRepository<FlashcardReviewLog, Long> {

    List<FlashcardReviewLog> findByUser_UserIdOrderByReviewedAtDesc(Long userId);

    void deleteByUser_UserId(Long userId);
}
