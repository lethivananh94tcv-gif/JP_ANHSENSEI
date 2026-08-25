package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {

    List<QuestionBank> findByLesson_LessonIdAndDeletedAtIsNullOrderByQuestionIdDesc(Long lessonId);

    List<QuestionBank> findByLesson_LessonIdAndStatusAndDeletedAtIsNull(Long lessonId, String status);

    List<QuestionBank> findByLesson_LessonIdAndQuestionTypeAndStatusAndDeletedAtIsNull(Long lessonId, String questionType, String status);

    List<QuestionBank> findByLesson_LessonIdAndDifficultyAndStatusAndDeletedAtIsNull(Long lessonId, String difficulty, String status);

    @Query("SELECT COUNT(q) FROM QuestionBank q WHERE q.lesson.lessonId = :lessonId AND q.status = 'ACTIVE' AND q.deletedAt IS NULL")
    long countActiveByLessonId(@Param("lessonId") Long lessonId);

    @Query("SELECT q.lesson.lessonId, q.status, COUNT(q) FROM QuestionBank q WHERE q.deletedAt IS NULL GROUP BY q.lesson.lessonId, q.status")
    List<Object[]> countQuestionsGroupedByLessonAndStatus();
}
