package com.anhsensei;

import com.anhsensei.learning.domain.*;
import com.anhsensei.learning.dto.CreateJlptExamRequest;
import com.anhsensei.learning.dto.SubmitAnswerRequest;
import com.anhsensei.learning.repository.*;
import com.anhsensei.learning.service.JlptExamService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JlptExamServiceUnitTest {

    @Mock private JlptExamRepository examRepository;
    @Mock private JlptExamVersionRepository versionRepository;
    @Mock private JlptExamQuestionRepository questionRepository;
    @Mock private JlptExamAttemptRepository attemptRepository;
    @Spy private ObjectMapper objectMapper = new ObjectMapper();

    @InjectMocks private JlptExamService jlptExamService;

    private Long sampleUserId;
    private UUID sampleExamId;
    private UUID sampleVersionId;
    private UUID sampleAttemptId;
    private JlptExam sampleExam;
    private JlptExamVersion sampleVersion;
    private JlptExamAttempt sampleAttempt;

    @BeforeEach
    void setUp() {
        sampleUserId = 1001L;
        sampleExamId = UUID.randomUUID();
        sampleVersionId = UUID.randomUUID();
        sampleAttemptId = UUID.randomUUID();

        sampleExam = new JlptExam("n4-test", "N4", "2024", "Đề Thi Thật N4");
        sampleExam.setId(sampleExamId);
        sampleExam.setCurrentPublishedVersionId(sampleVersionId);

        sampleVersion = new JlptExamVersion(sampleExamId, 1, "/pdf/test.pdf", "/audio/test.mp3", 105);
        sampleVersion.setId(sampleVersionId);
        sampleVersion.setStatus("PUBLISHED");

        sampleAttempt = new JlptExamAttempt(sampleUserId, sampleVersionId, Instant.now(), Instant.now().plus(Duration.ofMinutes(105)));
        sampleAttempt.setId(sampleAttemptId);
        sampleAttempt.setStatus("IN_PROGRESS");
        sampleAttempt.setUserAnswersJson("{}");
    }

    @Test
    @DisplayName("EXAM-01: Tạo đề N5 hợp lệ - Thành công")
    void testEXAM_01_CreateExam_N5_Success() {
        CreateJlptExamRequest req = new CreateJlptExamRequest("N5", "2023", "Đề Thi N5 2023", 90, "/pdf/n5.pdf", "/audio/n5.mp3");
        when(examRepository.save(any(JlptExam.class))).thenAnswer(i -> {
            JlptExam e = i.getArgument(0);
            e.setId(UUID.randomUUID());
            return e;
        });
        when(versionRepository.save(any(JlptExamVersion.class))).thenAnswer(i -> i.getArgument(0));

        JlptExam created = jlptExamService.createExam(req);
        assertNotNull(created);
        assertEquals("N5", created.getLevelCode());
    }

    @Test
    @DisplayName("EXAM-02: Tạo đề N4 hợp lệ - Thành công")
    void testEXAM_02_CreateExam_N4_Success() {
        CreateJlptExamRequest req = new CreateJlptExamRequest("N4", "2024", "Đề Thi N4 2024", 105, "/pdf/n4.pdf", null);
        when(examRepository.save(any(JlptExam.class))).thenAnswer(i -> {
            JlptExam e = i.getArgument(0);
            e.setId(UUID.randomUUID());
            return e;
        });
        when(versionRepository.save(any(JlptExamVersion.class))).thenAnswer(i -> i.getArgument(0));

        JlptExam created = jlptExamService.createExam(req);
        assertNotNull(created);
        assertEquals("N4", created.getLevelCode());
    }

    @Test
    @DisplayName("EXAM-03: Tạo đề N3 hợp lệ - Thành công")
    void testEXAM_03_CreateExam_N3_Success() {
        CreateJlptExamRequest req = new CreateJlptExamRequest("N3", "2022", "Đề Thi N3 2022", 140, "/pdf/n3.pdf", null);
        when(examRepository.save(any(JlptExam.class))).thenAnswer(i -> {
            JlptExam e = i.getArgument(0);
            e.setId(UUID.randomUUID());
            return e;
        });
        when(versionRepository.save(any(JlptExamVersion.class))).thenAnswer(i -> i.getArgument(0));

        JlptExam created = jlptExamService.createExam(req);
        assertNotNull(created);
        assertEquals("N3", created.getLevelCode());
    }

    @Test
    @DisplayName("EXAM-04: Level không hợp lệ - Throw 400 Bad Request")
    void testEXAM_04_CreateExam_InvalidLevel_Throws400() {
        CreateJlptExamRequest req = new CreateJlptExamRequest("N6", "2024", "Đề Invalid Level", 105, "/pdf/test.pdf", null);
        assertThrows(IllegalArgumentException.class, () -> jlptExamService.createExam(req));
    }

    @Test
    @DisplayName("EXAM-05: Thiếu tên đề - Throw 400 Bad Request")
    void testEXAM_05_CreateExam_MissingTitle_Throws400() {
        CreateJlptExamRequest req = new CreateJlptExamRequest("N4", "2024", " ", 105, "/pdf/test.pdf", null);
        assertThrows(IllegalArgumentException.class, () -> jlptExamService.createExam(req));
    }

    @Test
    @DisplayName("EXAM-06: Thời gian thi <= 0 - Throw 400 Bad Request")
    void testEXAM_06_CreateExam_InvalidDuration_Throws400() {
        CreateJlptExamRequest req = new CreateJlptExamRequest("N4", "2024", "Đề Test", 0, "/pdf/test.pdf", null);
        assertThrows(IllegalArgumentException.class, () -> jlptExamService.createExam(req));
    }

    @Test
    @DisplayName("EXAM-07 & VERSION-03: Publish version không có câu hỏi - Reject")
    void testEXAM_07_VERSION_03_PublishVersion_ZeroQuestions_Reject() {
        sampleVersion.setStatus("DRAFT");
        when(versionRepository.findById(sampleVersionId)).thenReturn(Optional.of(sampleVersion));
        when(questionRepository.countByExamVersionId(sampleVersionId)).thenReturn(0L);

        assertThrows(IllegalStateException.class, () -> jlptExamService.updateVersionStatus(sampleVersionId, "PUBLISHED"));
    }

    @Test
    @DisplayName("VERSION-01 & VERSION-05: Clone version - Copy đầy đủ câu hỏi sang version mới")
    void testVERSION_01_VERSION_05_CloneVersion_Success() {
        when(examRepository.findById(sampleExamId)).thenReturn(Optional.of(sampleExam));
        when(versionRepository.findByExamIdOrderByVersionNumberDesc(sampleExamId)).thenReturn(List.of(sampleVersion));
        when(versionRepository.save(any(JlptExamVersion.class))).thenAnswer(i -> {
            JlptExamVersion v = i.getArgument(0);
            v.setId(UUID.randomUUID());
            return v;
        });

        JlptExamQuestion q1 = new JlptExamQuestion(sampleVersionId, 1, 1, "VOCAB", "Question 1", 3, "Option 3", "Explanation");
        when(questionRepository.findByExamVersionIdOrderByGlobalIndexAsc(sampleVersionId)).thenReturn(List.of(q1));

        JlptExamVersion newVer = jlptExamService.createNewVersion(sampleExamId);
        assertNotNull(newVer);
        assertEquals(2, newVer.getVersionNumber());
        assertEquals("DRAFT", newVer.getStatus());
        verify(questionRepository).save(any(JlptExamQuestion.class));
    }

    @Test
    @DisplayName("VERSION-02: Publish version hợp lệ - Thành công")
    void testVERSION_02_PublishVersion_ValidQuestions_Success() {
        sampleVersion.setStatus("APPROVED");
        when(versionRepository.findById(sampleVersionId)).thenReturn(Optional.of(sampleVersion));
        when(questionRepository.countByExamVersionId(sampleVersionId)).thenReturn(98L);
        when(examRepository.findById(sampleExamId)).thenReturn(Optional.of(sampleExam));
        when(versionRepository.save(any(JlptExamVersion.class))).thenAnswer(i -> i.getArgument(0));

        JlptExamVersion published = jlptExamService.updateVersionStatus(sampleVersionId, "PUBLISHED");
        assertEquals("PUBLISHED", published.getStatus());
        assertNotNull(published.getPublishedAt());
    }

    @Test
    @DisplayName("VERSION-04: Direct edit on PUBLISHED version - Reject")
    void testVERSION_04_EditPublishedVersion_DirectEdit_Reject() {
        when(versionRepository.findById(sampleVersionId)).thenReturn(Optional.of(sampleVersion));
        assertThrows(IllegalStateException.class, () -> jlptExamService.updateVersionStatus(sampleVersionId, "DRAFT"));
    }

    @Test
    @DisplayName("ATT-01, VERSION-06, ATT-05, ATT-06: Start Attempt cho đề đã published - Đã tạo Attempt đúng Version 1")
    void testATT_01_StartAttempt_PublishedExam_Success() {
        when(examRepository.findById(sampleExamId)).thenReturn(Optional.of(sampleExam));
        when(versionRepository.findById(sampleVersionId)).thenReturn(Optional.of(sampleVersion));
        when(attemptRepository.findByUserIdAndExamVersionIdAndStatus(sampleUserId, sampleVersionId, "IN_PROGRESS")).thenReturn(Optional.empty());
        when(attemptRepository.save(any(JlptExamAttempt.class))).thenAnswer(i -> {
            JlptExamAttempt att = i.getArgument(0);
            att.setId(UUID.randomUUID());
            return att;
        });

        JlptExamAttempt attempt = jlptExamService.startAttempt(sampleUserId, sampleExamId);
        assertNotNull(attempt);
        assertEquals(sampleVersionId, attempt.getExamVersionId());
        assertEquals("IN_PROGRESS", attempt.getStatus());
        assertTrue(attempt.getExpiresAt().isAfter(attempt.getStartedAt()));
    }

    @Test
    @DisplayName("ATT-02: Start Attempt cho đề chưa published - Reject")
    void testATT_02_StartAttempt_UnpublishedExam_Reject() {
        sampleExam.setCurrentPublishedVersionId(null);
        when(examRepository.findById(sampleExamId)).thenReturn(Optional.of(sampleExam));

        assertThrows(IllegalStateException.class, () -> jlptExamService.startAttempt(sampleUserId, sampleExamId));
    }

    @Test
    @DisplayName("ATT-03: Exam không tồn tại - Throw 404")
    void testATT_03_StartAttempt_ExamNotFound_Throws404() {
        when(examRepository.findById(sampleExamId)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> jlptExamService.startAttempt(sampleUserId, sampleExamId));
    }

    @Test
    @DisplayName("ATT-09: Duplicate start requests - Idempotent return existing attempt")
    void testATT_09_StartAttempt_DuplicateRequests_Idempotent() {
        when(examRepository.findById(sampleExamId)).thenReturn(Optional.of(sampleExam));
        when(versionRepository.findById(sampleVersionId)).thenReturn(Optional.of(sampleVersion));
        when(attemptRepository.findByUserIdAndExamVersionIdAndStatus(sampleUserId, sampleVersionId, "IN_PROGRESS"))
                .thenReturn(Optional.of(sampleAttempt));

        JlptExamAttempt attempt = jlptExamService.startAttempt(sampleUserId, sampleExamId);
        assertEquals(sampleAttemptId, attempt.getId());
    }

    @Test
    @DisplayName("ANSWER-01 & ANSWER-02: Save & Update Answer - Thành công")
    void testANSWER_01_02_SaveAnswer_Success() {
        when(attemptRepository.findById(sampleAttemptId)).thenReturn(Optional.of(sampleAttempt));
        JlptExamQuestion q = new JlptExamQuestion(sampleVersionId, 1, 1, "VOCAB", "Question 1", 3, "Option 3", "Explanation");
        when(questionRepository.findByExamVersionIdAndGlobalIndex(sampleVersionId, 1)).thenReturn(Optional.of(q));

        SubmitAnswerRequest req = new SubmitAnswerRequest(1, 3);
        Map<String, Object> res = jlptExamService.saveAnswer(sampleUserId, sampleAttemptId, req);

        assertNotNull(res);
        assertEquals(1, res.get("globalIndex"));
        assertEquals(3, res.get("selectedOption"));
    }

    @Test
    @DisplayName("ANSWER-03: Question không thuộc exam - Reject")
    void testANSWER_03_SaveAnswer_QuestionNotBelongToExam_Reject() {
        when(attemptRepository.findById(sampleAttemptId)).thenReturn(Optional.of(sampleAttempt));
        when(questionRepository.findByExamVersionIdAndGlobalIndex(sampleVersionId, 999)).thenReturn(Optional.empty());

        SubmitAnswerRequest req = new SubmitAnswerRequest(999, 2);
        assertThrows(IllegalArgumentException.class, () -> jlptExamService.saveAnswer(sampleUserId, sampleAttemptId, req));
    }

    @Test
    @DisplayName("ANSWER-04: Answer option không hợp lệ (e.g. 5) - Throw 400")
    void testANSWER_04_SaveAnswer_InvalidOption_Throws400() {
        when(attemptRepository.findById(sampleAttemptId)).thenReturn(Optional.of(sampleAttempt));
        SubmitAnswerRequest req = new SubmitAnswerRequest(1, 5);

        assertThrows(IllegalArgumentException.class, () -> jlptExamService.saveAnswer(sampleUserId, sampleAttemptId, req));
    }

    @Test
    @DisplayName("ANSWER-05: Attempt của user khác - Throw 403 Forbidden")
    void testANSWER_05_SaveAnswer_AnotherUserAttempt_Throws403() {
        Long otherUserId = 9999L;
        when(attemptRepository.findById(sampleAttemptId)).thenReturn(Optional.of(sampleAttempt));

        SubmitAnswerRequest req = new SubmitAnswerRequest(1, 2);
        assertThrows(SecurityException.class, () -> jlptExamService.saveAnswer(otherUserId, sampleAttemptId, req));
    }

    @Test
    @DisplayName("ATT-07 & ANSWER-06: Attempt đã submit - Reject")
    void testATT_07_ANSWER_06_SaveAnswer_AttemptSubmitted_Reject() {
        sampleAttempt.setStatus("SUBMITTED");
        when(attemptRepository.findById(sampleAttemptId)).thenReturn(Optional.of(sampleAttempt));

        SubmitAnswerRequest req = new SubmitAnswerRequest(1, 2);
        assertThrows(IllegalStateException.class, () -> jlptExamService.saveAnswer(sampleUserId, sampleAttemptId, req));
    }

    @Test
    @DisplayName("ATT-08 & ANSWER-07: Attempt đã expired - Reject")
    void testATT_08_ANSWER_07_SaveAnswer_AttemptExpired_Reject() {
        sampleAttempt.setStatus("EXPIRED");
        when(attemptRepository.findById(sampleAttemptId)).thenReturn(Optional.of(sampleAttempt));

        SubmitAnswerRequest req = new SubmitAnswerRequest(1, 2);
        assertThrows(IllegalStateException.class, () -> jlptExamService.saveAnswer(sampleUserId, sampleAttemptId, req));
    }
}
