package com.anhsensei;

import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.identity.domain.Role;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.QuizAttempt;
import com.anhsensei.learning.repository.QuizAttemptRepository;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
@Transactional
class LearnerPhase4IntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private LevelRepository levelRepository;
    @Autowired private LessonRepository lessonRepository;
    @Autowired private QuizRepository quizRepository;
    @Autowired private QuestionRepository questionRepository;
    @Autowired private QuestionOptionRepository questionOptionRepository;
    @Autowired private QuizAttemptRepository quizAttemptRepository;
    @Autowired private ObjectMapper objectMapper;

    private User testLearner;
    private Quiz testQuiz;
    private Question testQuestion;
    private QuestionOption correctOption;
    private QuestionOption wrongOption;

    @BeforeEach
    void setUp() {
        Role learnerRole = Role.builder().roleId(2L).roleName("LEARNER").build();
        testLearner = User.builder()
                .email("phase4_learner@anhsensei.com")
                .passwordHash("$2a$12$eImiTXuWVxfM37uY4JANjO5E/0bS6iK6C5vVnF7NnQk2l2V3zG4bC")
                .fullName("Phase 4 Learner")
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

        Lesson lesson = new Lesson(null, level, "Lesson 1 Phase 4", "Desc", 9991, false, 20, "PUBLISHED");
        lesson = lessonRepository.save(lesson);

        testQuiz = new Quiz();
        testQuiz.setLesson(lesson);
        testQuiz.setTitle("Quiz 1 Phase 4");
        testQuiz.setDescription("Quiz Description");
        testQuiz.setQuizType("LESSON");
        testQuiz.setPassScore(new BigDecimal("60.00"));
        testQuiz.setTimeLimitMinutes(15);
        testQuiz.setMaxAttempts(5);
        testQuiz.setReviewMode("IMMEDIATE");
        testQuiz.setStatus("PUBLISHED");
        testQuiz = quizRepository.save(testQuiz);

        testQuestion = new Question();
        testQuestion.setQuiz(testQuiz);
        testQuestion.setQuestionType("SINGLE_CHOICE");
        testQuestion.setPrompt("山 là gì?");
        testQuestion.setCorrectAnswer("{\"optionId\":1}");
        testQuestion.setExplanation("山 có nghĩa là Núi.");
        testQuestion.setWeight(BigDecimal.ONE);
        testQuestion.setSortOrder(1);
        testQuestion = questionRepository.save(testQuestion);

        correctOption = new QuestionOption(testQuestion, "Núi", true, 1);
        correctOption = questionOptionRepository.save(correctOption);

        wrongOption = new QuestionOption(testQuestion, "Sông", false, 2);
        wrongOption = questionOptionRepository.save(wrongOption);
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
    @DisplayName("Full Quiz Flow: start -> autosave -> submit by attemptId -> history & result")
    void testFullQuizFlowIntegration() throws Exception {
        // 1. Start Quiz
        MvcResult startResult = mockMvc.perform(post("/learner/quizzes/" + testQuiz.getQuizId() + "/start")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.attemptId", is(notNullValue())))
                .andReturn();

        String responseBody = startResult.getResponse().getContentAsString();
        JsonNode startNode = objectMapper.readTree(responseBody);
        long attemptId = startNode.get("data").get("attemptId").asLong();

        // 2. Autosave Answers
        String autosaveJson = String.format("""
                {
                    "answers": [
                        { "questionId": %d, "selectedOptionId": %d }
                    ]
                }
                """, testQuestion.getQuestionId(), correctOption.getOptionId());

        mockMvc.perform(put("/learner/quizzes/attempts/" + attemptId + "/answers")
                        .with(authentication(createAuthToken(testLearner)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(autosaveJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)));

        // 3. Submit Attempt by attemptId
        String submitJson = String.format("""
                {
                    "answers": [
                        { "questionId": %d, "selectedOptionId": %d }
                    ]
                }
                """, testQuestion.getQuestionId(), correctOption.getOptionId());

        mockMvc.perform(post("/learner/quizzes/attempts/" + attemptId + "/submit")
                        .with(authentication(createAuthToken(testLearner)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(submitJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.passed", is(true)))
                .andExpect(jsonPath("$.data.score", is(100.0)));

        // 4. Get Quiz Attempt History
        mockMvc.perform(get("/learner/quizzes/" + testQuiz.getQuizId() + "/attempts")
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)));

        // 5. Get Attempt Result Snapshot
        mockMvc.perform(get("/learner/quizzes/attempts/" + attemptId)
                        .with(authentication(createAuthToken(testLearner))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.answers[0].explanation", is("山 có nghĩa là Núi.")));
    }
}
