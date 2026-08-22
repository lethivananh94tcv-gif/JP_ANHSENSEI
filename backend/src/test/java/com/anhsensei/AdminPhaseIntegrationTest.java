package com.anhsensei;

import com.anhsensei.common.security.JwtTokenProvider;
import com.anhsensei.identity.domain.Role;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.RoleRepository;
import com.anhsensei.identity.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
@Transactional
public class AdminPhaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String adminToken;
    private String learnerToken;
    private User testLearner;

    @BeforeEach
    void setUp() {
        Role adminRole = roleRepository.findByRoleName("ADMIN")
                .orElseGet(() -> roleRepository.save(Role.builder().roleName("ADMIN").description("Admin role").build()));
        Role learnerRole = roleRepository.findByRoleName("LEARNER")
                .orElseGet(() -> roleRepository.save(Role.builder().roleName("LEARNER").description("Learner role").build()));

        String uniqueSuffix = UUID.randomUUID().toString().substring(0, 8);

        User admin = User.builder()
                .email("admin_" + uniqueSuffix + "@anhsensei.com")
                .passwordHash(passwordEncoder.encode("AdminPass123!"))
                .fullName("System Admin")
                .role(adminRole)
                .status("ACTIVE")
                .build();
        admin = userRepository.save(admin);

        adminToken = jwtTokenProvider.generateToken(admin.getUserId(), admin.getEmail(), "ADMIN");

        testLearner = User.builder()
                .email("learner_" + uniqueSuffix + "@anhsensei.com")
                .passwordHash(passwordEncoder.encode("LearnerPass123!"))
                .fullName("Test Learner")
                .role(learnerRole)
                .status("ACTIVE")
                .build();
        testLearner = userRepository.save(testLearner);

        learnerToken = jwtTokenProvider.generateToken(testLearner.getUserId(), testLearner.getEmail(), "LEARNER");
    }

    @Test
    @DisplayName("Learner role accessing /admin/levels should be forbidden (403)")
    void testLearnerAccessAdminForbidden() throws Exception {
        mockMvc.perform(get("/admin/levels")
                        .header("Authorization", "Bearer " + learnerToken))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Admin user management: lock and unlock user")
    void testAdminUserManagementLockAndUnlock() throws Exception {
        mockMvc.perform(post("/admin/users/" + testLearner.getUserId() + "/lock")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"reason\": \"Vi phạm quy định học tập\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Đã khóa tài khoản người dùng thành công"));

        mockMvc.perform(post("/admin/users/" + testLearner.getUserId() + "/unlock")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"reason\": \"Đã giải trình thành công\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Đã mở khóa tài khoản người dùng thành công"));
    }

    @Test
    @DisplayName("Admin curriculum CRUD & Quiz Builder integration flow")
    void testAdminCurriculumAndQuizFlow() throws Exception {
        // 1. Get Levels
        String levelsResponse = mockMvc.perform(get("/admin/levels")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Long levelId = extractId(levelsResponse, "levelId");

        // 3. Create a Lesson
        String lessonJson = String.format("""
                {
                    "levelId": %d,
                    "title": "Bài 1 Level N6",
                    "description": "Mô tả bài 1",
                    "estimatedMinutes": 30,
                    "sortOrder": 99,
                    "isSample": false
                }
                """, levelId);

        String lessonResponse = mockMvc.perform(post("/admin/levels/" + levelId + "/lessons")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(lessonJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Bài 1 Level N6"))
                .andReturn().getResponse().getContentAsString();

        Long lessonId = extractId(lessonResponse, "lessonId");

        // 4. Create Quiz for Lesson
        String quizJson = String.format("""
                {
                    "lessonId": %d,
                    "title": "Quiz Admin Test",
                    "description": "Mô tả Quiz Test",
                    "quizType": "LESSON",
                    "passScore": 70.00,
                    "timeLimitMinutes": 20,
                    "reviewMode": "IMMEDIATE"
                }
                """, lessonId);

        String quizResponse = mockMvc.perform(post("/admin/quizzes")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(quizJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Quiz Admin Test"))
                .andReturn().getResponse().getContentAsString();

        Long quizId = extractId(quizResponse, "quizId");

        // 5. Add Question to Quiz
        String questionJson = String.format("""
                {
                    "quizId": %d,
                    "questionType": "SINGLE_CHOICE",
                    "prompt": "Từ vựng nào có nghĩa là Núi?",
                    "weight": 2,
                    "explanation": "Yama (山) có nghĩa là Núi.",
                    "sortOrder": 1,
                    "options": [
                        { "optionText": "山 (Yama)", "isCorrect": true, "sortOrder": 1 },
                        { "optionText": "川 (Kawa)", "isCorrect": false, "sortOrder": 2 }
                    ]
                }
                """, quizId);

        mockMvc.perform(post("/admin/questions")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(questionJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.prompt").value("Từ vựng nào có nghĩa là Núi?"));

        // 6. Retrieve Quiz list for Lesson
        mockMvc.perform(get("/admin/quizzes/lesson/" + lessonId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Quiz Admin Test"))
                .andExpect(jsonPath("$[0].questions[0].prompt").value("Từ vựng nào có nghĩa là Núi?"));
    }

    private Long extractId(String json, String key) {
        String searchStr = "\"" + key + "\":";
        int idx = json.indexOf(searchStr);
        if (idx == -1) return 1L;
        int start = idx + searchStr.length();
        int end = json.indexOf(",", start);
        if (end == -1) end = json.indexOf("}", start);
        return Long.parseLong(json.substring(start, end).trim());
    }
}
