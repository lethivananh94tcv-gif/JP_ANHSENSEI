package com.anhsensei.curriculum.service;

import com.anhsensei.curriculum.domain.Lesson;
import com.anhsensei.curriculum.domain.Question;
import com.anhsensei.curriculum.domain.QuestionOption;
import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.curriculum.dto.AdminQuizDto;
import com.anhsensei.curriculum.dto.CreateAdminQuestionRequest;
import com.anhsensei.curriculum.dto.CreateAdminQuizRequest;
import com.anhsensei.curriculum.repository.LessonRepository;
import com.anhsensei.curriculum.repository.QuestionOptionRepository;
import com.anhsensei.curriculum.repository.QuestionRepository;
import com.anhsensei.curriculum.repository.QuizRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminQuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuestionOptionRepository questionOptionRepository;
    private final LessonRepository lessonRepository;

    public AdminQuizService(
            QuizRepository quizRepository,
            QuestionRepository questionRepository,
            QuestionOptionRepository questionOptionRepository,
            LessonRepository lessonRepository
    ) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.questionOptionRepository = questionOptionRepository;
        this.lessonRepository = lessonRepository;
    }

    @Transactional(readOnly = true)
    public List<AdminQuizDto> getQuizzesByLesson(Long lessonId) {
        List<Quiz> quizzes = quizRepository.findByLesson_LessonIdAndDeletedAtIsNull(lessonId);
        return quizzes.stream().map(q -> {
            List<Question> questions = questionRepository.findByQuiz_QuizIdOrderBySortOrderAsc(q.getQuizId());
            for (Question question : questions) {
                List<QuestionOption> options = questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(question.getQuestionId());
                question.setOptions(options);
            }
            return new AdminQuizDto(q, questions);
        }).collect(Collectors.toList());
    }

    public AdminQuizDto createQuiz(CreateAdminQuizRequest req) {
        Lesson lesson = lessonRepository.findById(req.getLessonId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Lesson ID: " + req.getLessonId()));

        Quiz quiz = new Quiz();
        quiz.setLesson(lesson);
        quiz.setTitle(req.getTitle());
        quiz.setDescription(req.getDescription());
        quiz.setQuizType(req.getQuizType());
        quiz.setPassScore(req.getPassScore());
        quiz.setTimeLimitMinutes(req.getTimeLimitMinutes());
        quiz.setMaxAttempts(req.getMaxAttempts());
        quiz.setReviewMode(req.getReviewMode());
        quiz.setStatus("PUBLISHED");

        Quiz saved = quizRepository.save(quiz);
        return new AdminQuizDto(saved, List.of());
    }

    public AdminQuizDto.QuestionDto addQuestionToQuiz(CreateAdminQuestionRequest req) {
        Quiz quiz = quizRepository.findById(req.getQuizId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Quiz ID: " + req.getQuizId()));

        Question question = new Question();
        question.setQuiz(quiz);
        question.setQuestionType(req.getQuestionType());
        question.setPrompt(req.getPrompt());
        question.setWeight(req.getWeight() != null ? new java.math.BigDecimal(req.getWeight()) : java.math.BigDecimal.ONE);
        question.setAudioUrl(req.getAudioUrl());
        question.setExplanation(req.getExplanation());
        question.setSortOrder(req.getSortOrder() != null ? req.getSortOrder() : 1);

        String correctAnswer = req.getCorrectAnswer();
        if ((correctAnswer == null || correctAnswer.isBlank()) && req.getOptions() != null) {
            correctAnswer = req.getOptions().stream()
                    .filter(o -> Boolean.TRUE.equals(o.getIsCorrect()))
                    .map(CreateAdminQuestionRequest.OptionInput::getOptionText)
                    .findFirst()
                    .orElse("N/A");
        }
        if (correctAnswer == null || correctAnswer.isBlank()) {
            correctAnswer = "N/A";
        }
        // Format as valid JSON string since correct_answer column is jsonb
        try {
            question.setCorrectAnswer(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(correctAnswer));
        } catch (Exception e) {
            question.setCorrectAnswer("\"" + correctAnswer.replace("\"", "\\\"") + "\"");
        }

        Question savedQ = questionRepository.save(question);

        if (req.getOptions() != null) {
            for (CreateAdminQuestionRequest.OptionInput optIn : req.getOptions()) {
                QuestionOption opt = new QuestionOption();
                opt.setQuestion(savedQ);
                opt.setOptionText(optIn.getOptionText());
                opt.setIsCorrect(optIn.getIsCorrect() != null ? optIn.getIsCorrect() : false);
                opt.setSortOrder(optIn.getSortOrder() != null ? optIn.getSortOrder() : 1);
                questionOptionRepository.save(opt);
            }
        }

        List<QuestionOption> options = questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(savedQ.getQuestionId());
        savedQ.setOptions(options);
        return new AdminQuizDto.QuestionDto(savedQ);
    }

    public void deleteQuiz(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Quiz ID: " + quizId));
        quizRepository.delete(quiz);
    }

    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy Question ID: " + questionId));
        questionRepository.delete(question);
    }
}
