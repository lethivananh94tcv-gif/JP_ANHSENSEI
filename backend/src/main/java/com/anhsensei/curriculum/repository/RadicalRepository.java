package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.Radical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RadicalRepository extends JpaRepository<Radical, Long> {
    List<Radical> findAllByOrderByRadicalNumberAsc();
}
