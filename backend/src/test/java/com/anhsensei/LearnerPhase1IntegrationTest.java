package com.anhsensei;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.identity.domain.Role;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
@Transactional
class LearnerPhase1IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private User testLearner;

    @BeforeEach
    void setUp() {
        Role learnerRole = Role.builder().roleId(2L).roleName("LEARNER").build();
        testLearner = User.builder()
                .email("integration_learner@anhsensei.com")
                .passwordHash("$2a$12$eImiTXuWVxfM37uY4JANjO5E/0bS6iK6C5vVnF7NnQk2l2V3zG4bC")
                .fullName("Test Learner Integration")
                .role(learnerRole)
                .targetLevel("N5")
                .timezone("Asia/Ho_Chi_Minh")
                .status("ACTIVE")
                .build();
        testLearner = userRepository.save(testLearner);
    }

    private UsernamePasswordAuthenticationToken createAuthToken(User user) {
        UserPrincipal principal = new UserPrincipal(
                user.getUserId(),
                user.getEmail(),
                user.getPasswordHash(),
                user.getRole().getRoleName(),
                true
        );
        return new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    }

    @Test
    @DisplayName("GET /api/v1/learner/profile with LEARNER role returns 200 OK")
    void testGetProfileSuccess() throws Exception {
        mockMvc.perform(get("/learner/profile")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.email", is("integration_learner@anhsensei.com")))
                .andExpect(jsonPath("$.data.fullName", is("Test Learner Integration")))
                .andExpect(jsonPath("$.data.role", is("LEARNER")));
    }

    @Test
    @DisplayName("GET /api/v1/learner/profile with ADMIN role returns 403 Forbidden")
    @WithMockUser(roles = "ADMIN")
    void testGetProfileAdminForbidden() throws Exception {
        mockMvc.perform(get("/learner/profile"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("PATCH /api/v1/learner/profile updates fullName, targetLevel, timezone")
    void testPatchProfileSuccess() throws Exception {
        String requestJson = """
                {
                    "fullName": "Updated Learner Name",
                    "targetLevel": "N4",
                    "timezone": "Asia/Tokyo"
                }
                """;

        mockMvc.perform(patch("/learner/profile")
                        .with(authentication(createAuthToken(testLearner)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.fullName", is("Updated Learner Name")))
                .andExpect(jsonPath("$.data.targetLevel", is("N4")))
                .andExpect(jsonPath("$.data.timezone", is("Asia/Tokyo")));
    }

    @Test
    @DisplayName("GET /api/v1/learner/levels returns 200 OK")
    void testGetPublishedLevels() throws Exception {
        mockMvc.perform(get("/learner/levels")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", is(notNullValue())));
    }

    @Test
    @DisplayName("GET /api/v1/learner/continue-learning returns fallback lesson or message")
    void testContinueLearningFallback() throws Exception {
        mockMvc.perform(get("/learner/continue-learning")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)));
    }
}
