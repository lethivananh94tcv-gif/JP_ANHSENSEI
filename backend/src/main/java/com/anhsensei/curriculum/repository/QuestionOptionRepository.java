package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.QuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {

    List<QuestionOption> findByQuestion_QuestionIdOrderBySortOrderAsc(Long questionId);
}
