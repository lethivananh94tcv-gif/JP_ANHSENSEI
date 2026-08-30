package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.common.response.ApiResponse;
import com.anhsensei.common.security.UserPrincipal;
import com.anhsensei.curriculum.domain.QuestionBank;
import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.curriculum.service.AdminQuestionBankService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/admin/question-bank", "/api/v1/admin/question-bank"})
public class AdminQuestionBankController {

    private final AdminQuestionBankService adminQuestionBankService;

    public AdminQuestionBankController(AdminQuestionBankService adminQuestionBankService) {
        this.adminQuestionBankService = adminQuestionBankService;
    }

    @GetMapping("/summary-all")
    public ResponseEntity<ApiResponse<List<java.util.Map<String, Object>>>> getAllLessonsSummary() {
        List<java.util.Map<String, Object>> summary = adminQuestionBankService.getAllLessonsSummary();
        return ResponseEntity.ok(ApiResponse.success(summary));
    }

    @DeleteMapping("/clear-all")
    public ResponseEntity<ApiResponse<Void>> clearAllQuestionBank() {
        adminQuestionBankService.clearAllQuestionBank();
        return ResponseEntity.ok(ApiResponse.success("Đã dọn sạch toàn bộ kho câu hỏi trong Database!", null));
    }

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<ApiResponse<List<QuestionBank>>> getQuestionsByLesson(@PathVariable Long lessonId) {
        List<QuestionBank> list = adminQuestionBankService.getQuestionsByLessonId(lessonId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PostMapping("/lesson/{lessonId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<QuestionBank>> createQuestion(
            @PathVariable Long lessonId,
            @RequestBody QuestionBank question,
            Authentication authentication) {
        Long adminUserId = getUserIdFromAuth(authentication);
        QuestionBank created = adminQuestionBankService.createQuestion(question, lessonId, adminUserId);
        return ResponseEntity.ok(ApiResponse.success("Thêm câu hỏi mới vào Kho đề thành công.", created));
    }

    @PutMapping("/{questionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<QuestionBank>> updateQuestion(
            @PathVariable Long questionId,
            @RequestBody QuestionBank question,
            Authentication authentication) {
        Long adminUserId = getUserIdFromAuth(authentication);
        QuestionBank updated = adminQuestionBankService.updateQuestion(questionId, question, adminUserId);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật câu hỏi Kho đề thành công.", updated));
    }

    @DeleteMapping("/{questionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable Long questionId) {
        adminQuestionBankService.softDeleteQuestion(questionId);
        return ResponseEntity.ok(ApiResponse.success("Đã xóa mềm câu hỏi khỏi Kho đề.", null));
    }

    @PostMapping("/generate/lesson/{lessonId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<QuestionBank>>> autoGenerateQuestions(
            @PathVariable Long lessonId,
            Authentication authentication) {
        Long adminUserId = getUserIdFromAuth(authentication);
        List<QuestionBank> generatedDrafts = adminQuestionBankService.generate30JLPTQuestionsForLesson(lessonId, adminUserId, true);
        return ResponseEntity.ok(ApiResponse.success("Đã sinh tự động " + generatedDrafts.size() + " câu hỏi từ vựng chuẩn JLPT N5/N4 cho bài học.", generatedDrafts));
    }

    @PostMapping("/generate-30/lesson/{lessonId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<QuestionBank>>> autoGenerate30Questions(
            @PathVariable Long lessonId,
            @RequestParam(required = false, defaultValue = "FULL") String mode,
            Authentication authentication) {
        Long adminUserId = getUserIdFromAuth(authentication);
        List<QuestionBank> generated;
        if ("ALL".equalsIgnoreCase(mode) || "ALL_CATEGORIES".equalsIgnoreCase(mode)) {
            generated = adminQuestionBankService.generateAll4CategoriesForLesson(lessonId, adminUserId);
        } else {
            generated = adminQuestionBankService.generateQuestionsForLessonByMode(lessonId, mode, adminUserId, true);
        }
        return ResponseEntity.ok(ApiResponse.success("Đã khởi tạo thành công " + generated.size() + " câu hỏi cho Bài #" + lessonId + "!", generated));
    }

    @PostMapping("/generate-all-30")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> autoGenerateAll30Questions(
            @RequestParam(required = false, defaultValue = "ALL") String mode,
            Authentication authentication) {
        Long adminUserId = getUserIdFromAuth(authentication);
        int successCount = 0;
        int totalQuestionsGenerated = 0;
        for (long lId = 1; lId <= 50; lId++) {
            try {
                List<QuestionBank> generated;
                if ("ALL".equalsIgnoreCase(mode) || "ALL_CATEGORIES".equalsIgnoreCase(mode)) {
                    generated = adminQuestionBankService.generateAll4CategoriesForLesson(lId, adminUserId);
                } else {
                    generated = adminQuestionBankService.generateQuestionsForLessonByMode(lId, mode, adminUserId, true);
                }
                totalQuestionsGenerated += generated.size();
                successCount++;
            } catch (Exception ignored) {}
        }
        return ResponseEntity.ok(ApiResponse.success(
                "Đã khởi tạo thành công toàn bộ kho đề (" + totalQuestionsGenerated + " câu hỏi Từ vựng, Ngữ pháp, Kanji) cho " + successCount + " bài học!",
                "Generated " + totalQuestionsGenerated + " questions across " + successCount + " lessons"));
    }

    @PostMapping("/approve-all/lesson/{lessonId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Integer>> approveAllDrafts(@PathVariable Long lessonId) {
        int approvedCount = adminQuestionBankService.approveAllDraftQuestionsForLesson(lessonId);
        return ResponseEntity.ok(ApiResponse.success("Đã duyệt thành công " + approvedCount + " câu hỏi DRAFT sang ACTIVE.", approvedCount));
    }

    @PostMapping("/publish/lesson/{lessonId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Quiz>> publishQuiz(
            @PathVariable Long lessonId,
            Authentication authentication) {
        Long adminUserId = getUserIdFromAuth(authentication);
        Quiz publishedQuiz = adminQuestionBankService.publishQuizForLesson(lessonId, adminUserId);
        return ResponseEntity.ok(ApiResponse.success("Đã Xuất bản (PUBLISHED) Quiz bài học thành công!", publishedQuiz));
    }

    @PostMapping("/unpublish/lesson/{lessonId}")
    public ResponseEntity<ApiResponse<Quiz>> unpublishQuiz(
            @PathVariable Long lessonId,
            Authentication authentication) {
        Long adminUserId = getUserIdFromAuth(authentication);
        Quiz unpublishedQuiz = adminQuestionBankService.unpublishQuizForLesson(lessonId, adminUserId);
        return ResponseEntity.ok(ApiResponse.success("Đã Hủy xuất bản (chuyển về DRAFT) Quiz bài học thành công!", unpublishedQuiz));
    }

    @GetMapping("/quiz-info/lesson/{lessonId}")
    public ResponseEntity<ApiResponse<Quiz>> getQuizInfoByLesson(@PathVariable Long lessonId) {
        Quiz quiz = adminQuestionBankService.getQuizInfoByLessonId(lessonId);
        return ResponseEntity.ok(ApiResponse.success(quiz));
    }

    private Long getUserIdFromAuth(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal principal) {
            return principal.getUserId();
        }
        return 1L; // Fallback admin user ID
    }
}
