package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByQuiz_QuizIdOrderBySortOrderAsc(Long quizId);
}
