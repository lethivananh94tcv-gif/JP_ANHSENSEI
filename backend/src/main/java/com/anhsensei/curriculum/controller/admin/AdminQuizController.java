package com.anhsensei.curriculum.controller.admin;

import com.anhsensei.curriculum.dto.AdminQuizDto;
import com.anhsensei.curriculum.dto.CreateAdminQuestionRequest;
import com.anhsensei.curriculum.dto.CreateAdminQuizRequest;
import com.anhsensei.curriculum.service.AdminQuizService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminQuizController {

    private final AdminQuizService adminQuizService;

    public AdminQuizController(AdminQuizService adminQuizService) {
        this.adminQuizService = adminQuizService;
    }

    @GetMapping("/quizzes/lesson/{lessonId}")
    public ResponseEntity<List<AdminQuizDto>> getQuizzesByLesson(@PathVariable Long lessonId) {
        List<AdminQuizDto> quizzes = adminQuizService.getQuizzesByLesson(lessonId);
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping("/quizzes")
    public ResponseEntity<AdminQuizDto> createQuiz(@Valid @RequestBody CreateAdminQuizRequest req) {
        AdminQuizDto created = adminQuizService.createQuiz(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<Map<String, String>> deleteQuiz(@PathVariable Long quizId) {
        adminQuizService.deleteQuiz(quizId);
        return ResponseEntity.ok(Map.of("message", "Xóa bài Quiz thành công"));
    }

    @PostMapping("/questions")
    public ResponseEntity<AdminQuizDto.QuestionDto> addQuestionToQuiz(@Valid @RequestBody CreateAdminQuestionRequest req) {
        AdminQuizDto.QuestionDto created = adminQuizService.addQuestionToQuiz(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Map<String, String>> deleteQuestion(@PathVariable Long questionId) {
        adminQuizService.deleteQuestion(questionId);
        return ResponseEntity.ok(Map.of("message", "Xóa câu hỏi thành công"));
    }
}
