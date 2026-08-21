package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.Kanji;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KanjiRepository extends JpaRepository<Kanji, Long> {

    Optional<Kanji> findByCharacter(String character);

    boolean existsByCharacter(String character);
}
