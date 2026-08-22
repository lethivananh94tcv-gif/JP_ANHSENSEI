package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.FlashcardProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface FlashcardProgressRepository extends JpaRepository<FlashcardProgress, Long> {

    Optional<FlashcardProgress> findByUser_UserIdAndContentTypeAndContentId(Long userId, String contentType, Long contentId);

    @Query("SELECT fp FROM FlashcardProgress fp WHERE fp.user.userId = :userId AND fp.nextReviewAt <= :now AND fp.state <> 'SUSPENDED' ORDER BY fp.nextReviewAt ASC")
    List<FlashcardProgress> findDueFlashcards(@Param("userId") Long userId, @Param("now") OffsetDateTime now);

    @Query("SELECT COUNT(fp) FROM FlashcardProgress fp WHERE fp.user.userId = :userId AND fp.nextReviewAt <= :now AND fp.state <> 'SUSPENDED'")
    long countDueFlashcardsByUserId(@Param("userId") Long userId, @Param("now") OffsetDateTime now);

    List<FlashcardProgress> findByUser_UserId(Long userId);

    void deleteByUser_UserId(Long userId);
}
