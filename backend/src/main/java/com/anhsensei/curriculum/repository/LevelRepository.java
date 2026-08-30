package com.anhsensei.curriculum.repository;

import com.anhsensei.curriculum.domain.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {

    Optional<Level> findByCode(String code);

    Optional<Level> findByCodeIgnoreCase(String code);

    boolean existsByCode(String code);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Level l WHERE l.sortOrder = :sortOrder AND l.status <> :excludedStatus AND l.deletedAt IS NULL")
    boolean existsBySortOrderAndStatusNot(@Param("sortOrder") Integer sortOrder, @Param("excludedStatus") String excludedStatus);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Level l WHERE l.sortOrder = :sortOrder AND l.status <> :excludedStatus AND l.levelId <> :levelId AND l.deletedAt IS NULL")
    boolean existsBySortOrderAndStatusNotExcludingId(@Param("sortOrder") Integer sortOrder, @Param("excludedStatus") String excludedStatus, @Param("levelId") Long levelId);

    List<Level> findByStatusOrderBySortOrderAsc(String status);

    List<Level> findAllByOrderBySortOrderAsc();
}
