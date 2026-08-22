package com.anhsensei;

import com.anhsensei.common.exception.ResourceNotFoundException;
import com.anhsensei.identity.domain.Role;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.dto.LearnerProfileDto;
import com.anhsensei.identity.dto.UpdateLearnerProfileRequest;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.identity.service.LearnerProfileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LearnerProfileUnitTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LearnerProfileService learnerProfileService;

    private User mockUser;

    @BeforeEach
    void setUp() {
        Role learnerRole = Role.builder().roleId(2L).roleName("LEARNER").build();
        mockUser = User.builder()
                .userId(100L)
                .email("learner@anhsensei.com")
                .fullName("Original Name")
                .role(learnerRole)
                .targetLevel("N5")
                .timezone("Asia/Ho_Chi_Minh")
                .status("ACTIVE")
                .build();
    }

    @Test
    @DisplayName("getProfile returns valid DTO when user exists")
    void testGetProfileSuccess() {
        when(userRepository.findById(100L)).thenReturn(Optional.of(mockUser));

        LearnerProfileDto result = learnerProfileService.getProfile(100L);

        assertNotNull(result);
        assertEquals(100L, result.getUserId());
        assertEquals("learner@anhsensei.com", result.getEmail());
        assertEquals("Original Name", result.getFullName());
        assertEquals("N5", result.getTargetLevel());
        assertEquals("Asia/Ho_Chi_Minh", result.getTimezone());
        assertEquals("LEARNER", result.getRole());
    }

    @Test
    @DisplayName("getProfile throws ResourceNotFoundException when user does not exist")
    void testGetProfileNotFound() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> learnerProfileService.getProfile(999L));
    }

    @Test
    @DisplayName("updateProfile updates only non-null fields according to PATCH semantics")
    void testUpdateProfilePatchSemantics() {
        when(userRepository.findById(100L)).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateLearnerProfileRequest request = new UpdateLearnerProfileRequest();
        request.setFullName("Updated Full Name");
        // targetLevel and timezone are null in request

        LearnerProfileDto updated = learnerProfileService.updateProfile(100L, request);

        assertEquals("Updated Full Name", updated.getFullName());
        assertEquals("N5", updated.getTargetLevel()); // Unmodified
        assertEquals("Asia/Ho_Chi_Minh", updated.getTimezone()); // Unmodified
    }

    @Test
    @DisplayName("updateProfile updates targetLevel and timezone correctly")
    void testUpdateProfileTargetLevelAndTimezone() {
        when(userRepository.findById(100L)).thenReturn(Optional.of(mockUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateLearnerProfileRequest request = new UpdateLearnerProfileRequest();
        request.setTargetLevel("N4");
        request.setTimezone("Asia/Tokyo");

        LearnerProfileDto updated = learnerProfileService.updateProfile(100L, request);

        assertEquals("Original Name", updated.getFullName()); // Unmodified
        assertEquals("N4", updated.getTargetLevel());
        assertEquals("Asia/Tokyo", updated.getTimezone());
    }

    @Test
    @DisplayName("updateProfile throws IllegalArgumentException for invalid target level code")
    void testUpdateProfileInvalidTargetLevel() {
        when(userRepository.findById(100L)).thenReturn(Optional.of(mockUser));

        UpdateLearnerProfileRequest request = new UpdateLearnerProfileRequest();
        request.setTargetLevel("INVALID_LEVEL");

        assertThrows(IllegalArgumentException.class, () -> learnerProfileService.updateProfile(100L, request));
    }

    @Test
    @DisplayName("updateProfile throws IllegalArgumentException for invalid timezone string")
    void testUpdateProfileInvalidTimezone() {
        when(userRepository.findById(100L)).thenReturn(Optional.of(mockUser));

        UpdateLearnerProfileRequest request = new UpdateLearnerProfileRequest();
        request.setTimezone("Invalid/Timezone_Location");

        assertThrows(IllegalArgumentException.class, () -> learnerProfileService.updateProfile(100L, request));
    }

    @Test
    @DisplayName("updateProfile throws IllegalArgumentException for empty full name")
    void testUpdateProfileEmptyFullName() {
        when(userRepository.findById(100L)).thenReturn(Optional.of(mockUser));

        UpdateLearnerProfileRequest request = new UpdateLearnerProfileRequest();
        request.setFullName("   ");

        assertThrows(IllegalArgumentException.class, () -> learnerProfileService.updateProfile(100L, request));
    }
}
