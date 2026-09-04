package com.anhsensei.learning.service;

import com.anhsensei.learning.domain.JlptExam;
import com.anhsensei.learning.domain.JlptExamAttempt;
import com.anhsensei.learning.domain.JlptExamQuestion;
import com.anhsensei.learning.domain.JlptExamVersion;
import com.anhsensei.learning.dto.CreateJlptExamRequest;
import com.anhsensei.learning.dto.SubmitAnswerRequest;
import com.anhsensei.learning.repository.JlptExamAttemptRepository;
import com.anhsensei.learning.repository.JlptExamQuestionRepository;
import com.anhsensei.learning.repository.JlptExamRepository;
import com.anhsensei.learning.repository.JlptExamVersionRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Service
public class JlptExamService {

    private final JlptExamRepository examRepository;
    private final JlptExamVersionRepository versionRepository;
    private final JlptExamQuestionRepository questionRepository;
    private final JlptExamAttemptRepository attemptRepository;
    private final ObjectMapper objectMapper;

    public JlptExamService(JlptExamRepository examRepository,
                           JlptExamVersionRepository versionRepository,
                           JlptExamQuestionRepository questionRepository,
                           JlptExamAttemptRepository attemptRepository,
                           ObjectMapper objectMapper) {
        this.examRepository = examRepository;
        this.versionRepository = versionRepository;
        this.questionRepository = questionRepository;
        this.attemptRepository = attemptRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public JlptExam createExam(CreateJlptExamRequest req) {
        if (req.getLevelCode() == null || (!req.getLevelCode().equalsIgnoreCase("N5") 
                && !req.getLevelCode().equalsIgnoreCase("N4") 
                && !req.getLevelCode().equalsIgnoreCase("N3"))) {
            throw new IllegalArgumentException("Level không hợp lệ. Chỉ hỗ trợ N5, N4, N3");
        }

        if (req.getTitle() == null || req.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên đề thi không được để trống");
        }

        if (req.getDurationMinutes() <= 0) {
            throw new IllegalArgumentException("Thời gian thi không hợp lệ, phải lớn hơn 0");
        }

        String examCode = req.getLevelCode().toLowerCase() + "-" + UUID.randomUUID().toString().substring(0, 8);
        JlptExam exam = new JlptExam(examCode, req.getLevelCode().toUpperCase(), req.getYearSession(), req.getTitle().trim());
        exam = examRepository.save(exam);

        JlptExamVersion version = new JlptExamVersion(exam.getId(), 1, req.getPdfUrl(), req.getAudioUrl(), req.getDurationMinutes());
        version.setStatus("DRAFT");
        versionRepository.save(version);

        return exam;
    }

    @Transactional
    public JlptExamVersion updateVersionStatus(UUID versionId, String nextStatus) {
        JlptExamVersion version = versionRepository.findById(versionId)
                .orElseThrow(() -> new IllegalArgumentException("Version không tồn tại"));

        if ("PUBLISHED".equalsIgnoreCase(nextStatus)) {
            long questionCount = questionRepository.countByExamVersionId(versionId);
            if (questionCount == 0) {
                throw new IllegalStateException("Đề thi chưa có câu hỏi, không thể phát hành (Publish)");
            }

            version.setStatus("PUBLISHED");
            version.setPublishedAt(Instant.now());
            version = versionRepository.save(version);

            JlptExam exam = examRepository.findById(version.getExamId())
                    .orElseThrow(() -> new IllegalArgumentException("Exam không tồn tại"));
            exam.setCurrentPublishedVersionId(version.getId());
            exam.setUpdatedAt(Instant.now());
            examRepository.save(exam);

            return version;
        }

        if ("PUBLISHED".equalsIgnoreCase(version.getStatus()) && !"PUBLISHED".equalsIgnoreCase(nextStatus)) {
            throw new IllegalStateException("Phiên bản đã PUBLISHED không được phép chỉnh sửa trực tiếp. Vui lòng tạo Version mới.");
        }

        version.setStatus(nextStatus.toUpperCase());
        return versionRepository.save(version);
    }

    @Transactional
    public JlptExamVersion createNewVersion(UUID examId) {
        JlptExam exam = examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam không tồn tại"));

        List<JlptExamVersion> existingVersions = versionRepository.findByExamIdOrderByVersionNumberDesc(examId);
        int nextVersionNum = existingVersions.isEmpty() ? 1 : existingVersions.get(0).getVersionNumber() + 1;

        JlptExamVersion previousVer = existingVersions.isEmpty() ? null : existingVersions.get(0);
        String pdfUrl = previousVer != null ? previousVer.getPdfUrl() : "";
        String audioUrl = previousVer != null ? previousVer.getAudioUrl() : "";
        int duration = previousVer != null ? previousVer.getDurationMinutes() : 105;

        JlptExamVersion newVersion = new JlptExamVersion(examId, nextVersionNum, pdfUrl, audioUrl, duration);
        newVersion.setStatus("DRAFT");
        newVersion.setChangeLog("Phiên bản v" + nextVersionNum + ".0 nâng cấp.");
        newVersion = versionRepository.save(newVersion);

        if (previousVer != null) {
            List<JlptExamQuestion> oldQuestions = questionRepository.findByExamVersionIdOrderByGlobalIndexAsc(previousVer.getId());
            for (JlptExamQuestion q : oldQuestions) {
                JlptExamQuestion clonedQ = new JlptExamQuestion(
                        newVersion.getId(),
                        q.getGlobalIndex(),
                        q.getLocalPdfNumber(),
                        q.getSectionType(),
                        q.getQuestionSnippet(),
                        q.getCorrectOption(),
                        q.getOptionText(),
                        q.getExplanation()
                );
                clonedQ.setAudioScript(q.getAudioScript());
                questionRepository.save(clonedQ);
            }
        }

        return newVersion;
    }

    @Transactional
    public JlptExamAttempt startAttempt(Long userId, UUID examId) {
        JlptExam exam = examRepository.findById(examId)
                .orElseThrow(() -> new NoSuchElementException("Đề thi không tồn tại"));

        if (exam.getCurrentPublishedVersionId() == null) {
            throw new IllegalStateException("Đề thi chưa được phát hành (Publish)");
        }

        JlptExamVersion publishedVersion = versionRepository.findById(exam.getCurrentPublishedVersionId())
                .orElseThrow(() -> new IllegalStateException("Phiên bản đề thi không hợp lệ"));

        if (!"PUBLISHED".equalsIgnoreCase(publishedVersion.getStatus())) {
            throw new IllegalStateException("Phiên bản đề thi chưa được phát hành (Publish)");
        }

        Optional<JlptExamAttempt> activeOpt = attemptRepository.findByUserIdAndExamVersionIdAndStatus(
                userId, publishedVersion.getId(), "IN_PROGRESS");

        if (activeOpt.isPresent()) {
            JlptExamAttempt active = activeOpt.get();
            if (Instant.now().isBefore(active.getExpiresAt())) {
                return active;
            } else {
                active.setStatus("EXPIRED");
                attemptRepository.save(active);
            }
        }

        Instant startedAt = Instant.now();
        Instant expiresAt = startedAt.plus(Duration.ofMinutes(publishedVersion.getDurationMinutes()));

        JlptExamAttempt attempt = new JlptExamAttempt(userId, publishedVersion.getId(), startedAt, expiresAt);
        attempt.setStatus("IN_PROGRESS");
        attempt.setUserAnswersJson("{}");

        return attemptRepository.save(attempt);
    }

    @Transactional
    public Map<String, Object> saveAnswer(Long userId, UUID attemptId, SubmitAnswerRequest req) {
        JlptExamAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new NoSuchElementException("Lượt làm bài không tồn tại"));

        if (!attempt.getUserId().equals(userId)) {
            throw new SecurityException("Bạn không có quyền thao tác trên lượt làm bài của người dùng khác");
        }

        if ("SUBMITTED".equalsIgnoreCase(attempt.getStatus())) {
            throw new IllegalStateException("Bài thi đã được nộp, không thể thay đổi đáp án");
        }

        if (Instant.now().isAfter(attempt.getExpiresAt()) || "EXPIRED".equalsIgnoreCase(attempt.getStatus())) {
            attempt.setStatus("EXPIRED");
            attemptRepository.save(attempt);
            throw new IllegalStateException("Bài thi đã hết thời gian làm bài");
        }

        if (req.getSelectedOption() < 1 || req.getSelectedOption() > 4) {
            throw new IllegalArgumentException("Đáp án không hợp lệ, phải từ 1 đến 4");
        }

        Optional<JlptExamQuestion> qOpt = questionRepository.findByExamVersionIdAndGlobalIndex(
                attempt.getExamVersionId(), req.getGlobalIndex());

        if (qOpt.isEmpty()) {
            throw new IllegalArgumentException("Câu hỏi số " + req.getGlobalIndex() + " không thuộc đề thi này");
        }

        Map<String, Integer> answersMap = new HashMap<>();
        try {
            if (attempt.getUserAnswersJson() != null && !attempt.getUserAnswersJson().isEmpty()) {
                answersMap = objectMapper.readValue(attempt.getUserAnswersJson(), new TypeReference<Map<String, Integer>>() {});
            }
        } catch (Exception e) {
            answersMap = new HashMap<>();
        }

        answersMap.put(String.valueOf(req.getGlobalIndex()), req.getSelectedOption());

        try {
            attempt.setUserAnswersJson(objectMapper.writeValueAsString(answersMap));
        } catch (Exception e) {
            throw new RuntimeException("Lỗi lưu phiếu trả lời", e);
        }

        attemptRepository.save(attempt);

        Map<String, Object> response = new HashMap<>();
        response.put("attemptId", attempt.getId());
        response.put("globalIndex", req.getGlobalIndex());
        response.put("selectedOption", req.getSelectedOption());
        response.put("answeredCount", answersMap.size());
        return response;
    }

    @Transactional
    public Map<String, Object> submitAndGradeAttempt(Long userId, UUID attemptId) {
        JlptExamAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new NoSuchElementException("Lượt làm bài không tồn tại"));

        if (!attempt.getUserId().equals(userId)) {
            throw new SecurityException("Bạn không có quyền thao tác trên lượt làm bài của người dùng khác");
        }

        JlptExamVersion version = versionRepository.findById(attempt.getExamVersionId())
                .orElseThrow(() -> new NoSuchElementException("Phiên bản đề thi không tồn tại"));

        List<JlptExamQuestion> questions = questionRepository.findByExamVersionIdOrderByGlobalIndexAsc(version.getId());

        // Parse student answers
        Map<String, Integer> userAnswers = new HashMap<>();
        try {
            if (attempt.getUserAnswersJson() != null && !attempt.getUserAnswersJson().isEmpty()) {
                userAnswers = objectMapper.readValue(attempt.getUserAnswersJson(), new TypeReference<Map<String, Integer>>() {});
            }
        } catch (Exception e) {
            userAnswers = new HashMap<>();
        }

        int vocabCorrect = 0, vocabTotal = 0;
        int grammarCorrect = 0, grammarTotal = 0;
        int listeningCorrect = 0, listeningTotal = 0;

        List<Map<String, Object>> questionBreakdown = new ArrayList<>();

        for (JlptExamQuestion q : questions) {
            int qIdx = q.getGlobalIndex();
            String sec = q.getSectionType();
            int correctOpt = q.getCorrectOption();
            Integer userOpt = userAnswers.get(String.valueOf(qIdx));
            boolean isCorrect = userOpt != null && userOpt == correctOpt;

            if ("VOCAB".equalsIgnoreCase(sec) || qIdx <= 35) {
                vocabTotal++;
                if (isCorrect) vocabCorrect++;
            } else if ("GRAMMAR".equalsIgnoreCase(sec) || qIdx <= 70) {
                grammarTotal++;
                if (isCorrect) grammarCorrect++;
            } else {
                listeningTotal++;
                if (isCorrect) listeningCorrect++;
            }

            Map<String, Object> qDetail = new HashMap<>();
            qDetail.put("globalIndex", qIdx);
            qDetail.put("section", sec);
            qDetail.put("correctOption", correctOpt);
            qDetail.put("userOption", userOpt);
            qDetail.put("isCorrect", isCorrect);
            qDetail.put("audioScript", q.getAudioScript());
            qDetail.put("explanation", q.getExplanation());
            questionBreakdown.add(qDetail);
        }

        int vocabScore = vocabTotal > 0 ? (int) Math.round((vocabCorrect * 60.0) / vocabTotal) : 0;
        int grammarScore = grammarTotal > 0 ? (int) Math.round((grammarCorrect * 60.0) / grammarTotal) : 0;
        int listeningScore = listeningTotal > 0 ? (int) Math.round((listeningCorrect * 60.0) / listeningTotal) : 0;
        int totalScore = vocabScore + grammarScore + listeningScore;

        boolean isPass = totalScore >= 90 && vocabScore >= 19 && grammarScore >= 19 && listeningScore >= 19;

        long timeSpentSec = Duration.between(attempt.getStartedAt(), Instant.now()).getSeconds();

        attempt.setVocabScore(vocabScore);
        attempt.setGrammarScore(grammarScore);
        attempt.setListeningScore(listeningScore);
        attempt.setTotalScore(totalScore);
        attempt.setPass(isPass);
        attempt.setTimeSpentSeconds((int) timeSpentSec);
        attempt.setStatus("SUBMITTED");
        attempt.setCompletedAt(Instant.now());

        attemptRepository.save(attempt);

        Map<String, Object> report = new HashMap<>();
        report.put("attemptId", attempt.getId());
        report.put("status", attempt.getStatus());
        report.put("isPass", isPass);
        report.put("totalScore", totalScore);
        report.put("vocabScore", vocabScore);
        report.put("grammarScore", grammarScore);
        report.put("listeningScore", listeningScore);
        report.put("timeSpentSeconds", timeSpentSec);
        report.put("questionBreakdown", questionBreakdown);
        return report;
    }
}
