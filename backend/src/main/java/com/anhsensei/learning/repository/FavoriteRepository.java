package com.anhsensei.learning.repository;

import com.anhsensei.learning.domain.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserUserIdAndContentType(Long userId, String contentType);
    List<Favorite> findByUserUserId(Long userId);
    Optional<Favorite> findByUserUserIdAndContentTypeAndContentId(Long userId, String contentType, Long contentId);
    boolean existsByUserUserIdAndContentTypeAndContentId(Long userId, String contentType, Long contentId);
    void deleteByUserUserIdAndContentTypeAndContentId(Long userId, String contentType, Long contentId);
}
