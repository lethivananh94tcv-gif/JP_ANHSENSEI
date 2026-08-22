package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.QuizAttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptAnswerRepository extends JpaRepository<QuizAttemptAnswer, Long> {

    List<QuizAttemptAnswer> findByAttempt_AttemptId(Long attemptId);

    Optional<QuizAttemptAnswer> findByAttempt_AttemptIdAndQuestion_QuestionId(Long attemptId, Long questionId);
}
