package com.anhsensei.identity.service;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.dto.LearnerProfileDto;
import com.anhsensei.identity.dto.UpdateLearnerProfileRequest;
import com.anhsensei.identity.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.Set;

@Service
public class LearnerProfileService {

    private final UserRepository userRepository;
    private static final Set<String> SUPPORTED_TARGET_LEVELS = Set.of("N5", "N4", "N3");

    public LearnerProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public LearnerProfileDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return LearnerProfileDto.fromUser(user);
    }

    @Transactional
    public LearnerProfileDto updateProfile(Long userId, UpdateLearnerProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (request.getFullName() != null) {
            String trimmed = request.getFullName().trim();
            if (trimmed.isEmpty()) {
                throw new IllegalArgumentException("Full name cannot be empty");
            }
            if (trimmed.length() > 150) {
                throw new IllegalArgumentException("Full name cannot exceed 150 characters");
            }
            user.setFullName(trimmed);
        }

        if (request.getTargetLevel() != null) {
            String code = request.getTargetLevel().trim().toUpperCase();
            if (!code.isEmpty() && !SUPPORTED_TARGET_LEVELS.contains(code)) {
                throw new IllegalArgumentException("Invalid target level code: " + code + ". Supported levels: N5, N4, N3");
            }
            user.setTargetLevel(code.isEmpty() ? null : code);
        }

        if (request.getTimezone() != null) {
            String tz = request.getTimezone().trim();
            if (!tz.isEmpty()) {
                try {
                    ZoneId.of(tz);
                } catch (Exception e) {
                    throw new IllegalArgumentException("Invalid IANA timezone: " + tz);
                }
                user.setTimezone(tz);
            }
        }

        User saved = userRepository.save(user);
        return LearnerProfileDto.fromUser(saved);
    }
}
