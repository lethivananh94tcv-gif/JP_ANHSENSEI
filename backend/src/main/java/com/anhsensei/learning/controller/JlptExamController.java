package com.anhsensei.learning.controller;

import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.JlptExam;
import com.anhsensei.learning.domain.JlptExamAttempt;
import com.anhsensei.learning.domain.JlptExamVersion;
import com.anhsensei.learning.dto.CreateJlptExamRequest;
import com.anhsensei.learning.dto.SubmitAnswerRequest;
import com.anhsensei.learning.service.JlptExamService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import com.anhsensei.ai.service.AiJlptSolverService;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

import com.anhsensei.ai.service.AnswerKeyScannerService;

@RestController
@RequestMapping("/api/v1/jlpt/exams")
public class JlptExamController {

    private final JlptExamService examService;
    private final AiJlptSolverService aiSolverService;
    private final AnswerKeyScannerService answerKeyScannerService;
    private final UserRepository userRepository;

    public JlptExamController(JlptExamService examService,
                             AiJlptSolverService aiSolverService,
                             AnswerKeyScannerService answerKeyScannerService,
                             UserRepository userRepository) {
        this.examService = examService;
        this.aiSolverService = aiSolverService;
        this.answerKeyScannerService = answerKeyScannerService;
        this.userRepository = userRepository;
    }

    // EXAM-01, EXAM-02, EXAM-03, EXAM-04, EXAM-05, EXAM-06, EXAM-08 (Admin Only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JlptExam> createExam(@Valid @RequestBody CreateJlptExamRequest req) {
        JlptExam exam = examService.createExam(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(exam);
    }

    // Official Answer Key File Scanner Endpoint (Admin Only - PDF/JSON/CSV Scanned Keys)
    @PostMapping("/versions/{versionId}/scan-answer-key")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> scanOfficialAnswerKey(
            @PathVariable UUID versionId,
            @RequestBody Map<Integer, Integer> scannedAnswers) {
        Map<String, Object> response = answerKeyScannerService.applyOfficialScannedAnswerKey(versionId, scannedAnswers);
        return ResponseEntity.ok(response);
    }

    // AI Auto-Solver Endpoint (Admin Only)
    @PostMapping("/versions/{versionId}/auto-solve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> autoSolveExamVersion(@PathVariable UUID versionId) {
        var solvedQuestions = aiSolverService.autoSolveExamVersion(versionId);
        return ResponseEntity.ok(Map.of(
            "status", "AI_GENERATED",
            "message", "Trợ lý AI đã tự động giải bài và tạo Script Choukai thành công!",
            "totalQuestionsSolved", solvedQuestions.size()
        ));
    }

    // VERSION-01, VERSION-05 (Admin Only: Create New Version)
    @PostMapping("/{examId}/versions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JlptExamVersion> createNewVersion(@PathVariable UUID examId) {
        JlptExamVersion version = examService.createNewVersion(examId);
        return ResponseEntity.status(HttpStatus.CREATED).body(version);
    }

    // VERSION-02, VERSION-03, VERSION-04, EXAM-07 (Admin Only: Status Update)
    @PutMapping("/versions/{versionId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JlptExamVersion> updateVersionStatus(
            @PathVariable UUID versionId,
            @RequestParam String status) {
        JlptExamVersion version = examService.updateVersionStatus(versionId, status);
        return ResponseEntity.ok(version);
    }

    // ATT-01, ATT-02, ATT-03, ATT-04, ATT-05, ATT-06, ATT-09 (Learner Start Attempt)
    @PostMapping("/{examId}/start")
    public ResponseEntity<?> startAttempt(
            @PathVariable UUID examId,
            @AuthenticationPrincipal UserDetails userDetails) {
        // ATT-04: User unauthenticated
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực người dùng"));
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy thông tin người dùng"));

        JlptExamAttempt attempt = examService.startAttempt(user.getUserId(), examId);
        return ResponseEntity.ok(attempt);
    }

    // ANSWER-01 -> ANSWER-10 (Learner Save Answer)
    @PostMapping("/attempts/{attemptId}/answers")
    public ResponseEntity<?> saveAnswer(
            @PathVariable UUID attemptId,
            @Valid @RequestBody SubmitAnswerRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {
        // ATT-04: User unauthenticated
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực người dùng"));
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy thông tin người dùng"));

        Map<String, Object> response = examService.saveAnswer(user.getUserId(), attemptId, req);
        return ResponseEntity.ok(response);
    }

    // Learner Submit Attempt & Calculate Authentic JLPT Score
    @PostMapping("/attempts/{attemptId}/submit")
    public ResponseEntity<?> submitAttempt(
            @PathVariable UUID attemptId,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực người dùng"));
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy thông tin người dùng"));

        Map<String, Object> report = examService.submitAndGradeAttempt(user.getUserId(), attemptId);
        return ResponseEntity.ok(report);
    }

    // Exception Handlers mapped to expected HTTP Status Codes
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<?> handleIllegalState(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleNotFound(NoSuchElementException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<?> handleForbidden(SecurityException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", ex.getMessage()));
    }
}
