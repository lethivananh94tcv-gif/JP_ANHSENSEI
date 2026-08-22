package com.anhsensei;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.Level;
import com.anhsensei.curriculum.domain.Vocabulary;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.LevelRepository;
import com.anhsensei.curriculum.repository.VocabularyRepository;
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
class LearnerPhase3IntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private LevelRepository levelRepository;
    @Autowired private LessonRepository lessonRepository;
    @Autowired private VocabularyRepository vocabularyRepository;

    private User testLearner;
    private Vocabulary testVocab;

    @BeforeEach
    void setUp() {
        Role learnerRole = Role.builder().roleId(2L).roleName("LEARNER").build();
        testLearner = User.builder()
                .email("phase3_learner@anhsensei.com")
                .passwordHash("$2a$12$eImiTXuWVxfM37uY4JANjO5E/0bS6iK6C5vVnF7NnQk2l2V3zG4bC")
                .fullName("Phase 3 Learner")
                .role(learnerRole)
                .targetLevel("N5")
                .timezone("Asia/Ho_Chi_Minh")
                .status("ACTIVE")
                .build();
        testLearner = userRepository.save(testLearner);

        Level level = levelRepository.findByCode("N5").orElseGet(() -> {
            Level l = new Level(null, "N5", "Level N5", "Desc", 1, "PUBLISHED");
            return levelRepository.save(l);
        });

        Lesson lesson = new Lesson(null, level, "Lesson 1 Phase 3", "Desc", 8888, false, 20, "PUBLISHED");
        lesson = lessonRepository.save(lesson);

        testVocab = new Vocabulary();
        testVocab.setLesson(lesson);
        testVocab.setWord("火");
        testVocab.setKana("ひ");
        testVocab.setMeaningVi("Lửa");
        testVocab.setSortOrder(1);
        testVocab.setStatus("PUBLISHED");
        testVocab = vocabularyRepository.save(testVocab);
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
    @DisplayName("GET /api/v1/learner/flashcards/due returns due flashcards list")
    void testGetDueFlashcardsIntegration() throws Exception {
        mockMvc.perform(get("/learner/flashcards/due")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", is(notNullValue())));
    }

    @Test
    @DisplayName("GET /api/v1/learner/flashcards/due-count returns count object")
    void testGetDueCountIntegration() throws Exception {
        mockMvc.perform(get("/learner/flashcards/due-count")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.dueCount", is(notNullValue())));
    }

    @Test
    @DisplayName("POST /api/v1/learner/flashcards/review updates SM-2 status")
    void testReviewFlashcardIntegration() throws Exception {
        String requestJson = String.format("""
                {
                    "contentType": "VOCABULARY",
                    "contentId": %d,
                    "rating": "GOOD",
                    "durationSeconds": 10
                }
                """, testVocab.getVocabularyId());

        mockMvc.perform(post("/learner/flashcards/review")
                        .with(authentication(createAuthToken(testLearner)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.state", is("REVIEW")))
                .andExpect(jsonPath("$.data.intervalDays", is(1)));
    }

    @Test
    @DisplayName("POST /api/v1/learner/flashcards/reset resets user flashcard progress")
    void testResetFlashcardsIntegration() throws Exception {
        mockMvc.perform(post("/learner/flashcards/reset")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)));
    }
}
