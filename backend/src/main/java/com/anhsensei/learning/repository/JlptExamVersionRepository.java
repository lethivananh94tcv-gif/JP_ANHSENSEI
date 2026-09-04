package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.JlptExamVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JlptExamVersionRepository extends JpaRepository<JlptExamVersion, UUID> {
    List<JlptExamVersion> findByExamIdOrderByVersionNumberDesc(UUID examId);
    Optional<JlptExamVersion> findByExamIdAndVersionNumber(UUID examId, int versionNumber);
}
