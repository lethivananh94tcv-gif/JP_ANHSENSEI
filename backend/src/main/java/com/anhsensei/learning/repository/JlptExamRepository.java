package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.JlptExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JlptExamRepository extends JpaRepository<JlptExam, UUID> {
    Optional<JlptExam> findByCode(String code);
    List<JlptExam> findByLevelCode(String levelCode);
}
