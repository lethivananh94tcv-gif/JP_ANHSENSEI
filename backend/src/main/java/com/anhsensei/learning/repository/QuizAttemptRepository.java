package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    Optional<QuizAttempt> findFirstByUser_UserIdAndQuiz_QuizIdAndStatusOrderByStartedAtDesc(Long userId, Long quizId, String status);

    long countByUser_UserIdAndQuiz_QuizId(Long userId, Long quizId);

    List<QuizAttempt> findByUser_UserIdAndQuiz_QuizIdOrderByAttemptNumberDesc(Long userId, Long quizId);

    Optional<QuizAttempt> findByAttemptIdAndUser_UserId(Long attemptId, Long userId);

    List<QuizAttempt> findAllByOrderByStartedAtDesc();
}
