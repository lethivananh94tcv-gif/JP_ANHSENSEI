package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {

    @Query("SELECT DISTINCT q FROM QuestionBank q LEFT JOIN FETCH q.options WHERE q.lesson.lessonId = :lessonId AND q.deletedAt IS NULL ORDER BY q.questionId DESC")
    List<QuestionBank> findQuestionsWithOptionsByLessonId(@Param("lessonId") Long lessonId);

    List<QuestionBank> findByLesson_LessonIdAndDeletedAtIsNullOrderByQuestionIdDesc(Long lessonId);

    List<QuestionBank> findByLesson_LessonIdAndStatusAndDeletedAtIsNull(Long lessonId, String status);

    List<QuestionBank> findByLesson_LessonIdAndQuestionTypeAndStatusAndDeletedAtIsNull(Long lessonId, String questionType, String status);

    List<QuestionBank> findByLesson_LessonIdAndDifficultyAndStatusAndDeletedAtIsNull(Long lessonId, String difficulty, String status);

    @Query("SELECT COUNT(q) FROM QuestionBank q WHERE q.lesson.lessonId = :lessonId AND q.status = 'ACTIVE' AND q.deletedAt IS NULL")
    long countActiveByLessonId(@Param("lessonId") Long lessonId);

    @org.springframework.data.jpa.repository.Modifying
    @Query(value = "DELETE FROM question_bank_options WHERE question_id IN (SELECT question_id FROM question_bank WHERE lesson_id = :lessonId)", nativeQuery = true)
    void deleteOptionsByLessonIdNative(@Param("lessonId") Long lessonId);

    @org.springframework.data.jpa.repository.Modifying
    @Query(value = "DELETE FROM question_bank WHERE lesson_id = :lessonId", nativeQuery = true)
    void deleteQuestionsByLessonIdNative(@Param("lessonId") Long lessonId);
}
