package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findByLesson_LessonIdAndStatus(Long lessonId, String status);

    List<Quiz> findByLesson_LessonIdAndStatusAndDeletedAtIsNull(Long lessonId, String status);

    List<Quiz> findByLesson_LessonIdAndDeletedAtIsNull(Long lessonId);
}
