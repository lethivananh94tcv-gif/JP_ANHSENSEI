package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.JlptExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JlptExamQuestionRepository extends JpaRepository<JlptExamQuestion, UUID> {
    List<JlptExamQuestion> findByExamVersionIdOrderByGlobalIndexAsc(UUID examVersionId);
    Optional<JlptExamQuestion> findByExamVersionIdAndGlobalIndex(UUID examVersionId, int globalIndex);
    long countByExamVersionId(UUID examVersionId);
}
