package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.GrammarExample;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrammarExampleRepository extends JpaRepository<GrammarExample, Long> {

    List<GrammarExample> findByGrammarIdOrderBySortOrderAsc(Long grammarId);

    void deleteByGrammarId(Long grammarId);
}
