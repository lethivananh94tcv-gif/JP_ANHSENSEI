package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.ImportJob;
import com.anhsensei.curriculum.domain.ImportJobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImportJobRepository extends JpaRepository<ImportJob, Long> {
    List<ImportJob> findByAdminIdOrderByCreatedAtDesc(Long adminId);
    List<ImportJob> findByStatusOrderByCreatedAtDesc(ImportJobStatus status);
}
