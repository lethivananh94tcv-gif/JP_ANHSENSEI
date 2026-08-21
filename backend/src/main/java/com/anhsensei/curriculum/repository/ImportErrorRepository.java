package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.ImportError;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImportErrorRepository extends JpaRepository<ImportError, Long> {
    List<ImportError> findByImportJob_ImportJobIdOrderByRowNumberAsc(Long importJobId);
    Page<ImportError> findByImportJob_ImportJobIdOrderByRowNumberAsc(Long importJobId, Pageable pageable);
    void deleteByImportJob_ImportJobId(Long importJobId);
}
