package com.anhsensei.learning.service;

import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.dto.VocabularyDto;
import com.anhsensei.curriculum.repository.VocabularyRepository;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.Favorite;
import com.anhsensei.learning.dto.FavoriteStatusResponse;
import com.anhsensei.learning.repository.FavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final VocabularyRepository vocabularyRepository;
    private final UserRepository userRepository;

    public FavoriteService(
            FavoriteRepository favoriteRepository,
            VocabularyRepository vocabularyRepository,
            UserRepository userRepository
    ) {
        this.favoriteRepository = favoriteRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public FavoriteStatusResponse toggleFavorite(Long userId, String contentType, Long contentId) {
        String type = contentType != null ? contentType.toUpperCase() : "VOCABULARY";
        Optional<Favorite> existing = favoriteRepository.findByUserUserIdAndContentTypeAndContentId(userId, type, contentId);

        if (existing.isPresent()) {
            favoriteRepository.delete(existing.get());
            return new FavoriteStatusResponse(type, contentId, false);
        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
            Favorite favorite = new Favorite(user, type, contentId);
            favoriteRepository.save(favorite);
            return new FavoriteStatusResponse(type, contentId, true);
        }
    }

    @Transactional(readOnly = true)
    public List<Long> getFavoriteIds(Long userId, String contentType) {
        String type = contentType != null ? contentType.toUpperCase() : "VOCABULARY";
        return favoriteRepository.findByUserUserIdAndContentType(userId, type)
                .stream()
                .map(Favorite::getContentId)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VocabularyDto> getFavoriteVocabularies(Long userId) {
        List<Long> vocabIds = getFavoriteIds(userId, "VOCABULARY");
        if (vocabIds.isEmpty()) {
            return Collections.emptyList();
        }

        List<Vocabulary> vocabs = vocabularyRepository.findAllById(vocabIds);
        return vocabs.stream()
                .filter(v -> "PUBLISHED".equalsIgnoreCase(v.getStatus()))
                .map(VocabularyDto::new)
                .collect(Collectors.toList());
    }
}
