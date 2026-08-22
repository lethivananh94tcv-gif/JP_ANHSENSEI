package com.anhsensei;

import com.anhsensei.curriculum.domain.Question;
import com.anhsensei.curriculum.domain.QuestionOption;
import com.anhsensei.curriculum.domain.Quiz;
import com.anhsensei.curriculum.repository.QuestionOptionRepository;
import com.anhsensei.curriculum.repository.QuestionRepository;
import com.anhsensei.curriculum.repository.QuizRepository;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.UserRepository;
import com.anhsensei.learning.domain.LearningActivity;
import com.anhsensei.learning.domain.QuizAttempt;
import com.anhsensei.learning.domain.QuizAttemptAnswer;
import com.anhsensei.learning.dto.*;
import com.anhsensei.learning.repository.LearningActivityRepository;
import com.anhsensei.learning.repository.QuizAttemptAnswerRepository;
import com.anhsensei.learning.repository.QuizAttemptRepository;
import com.anhsensei.learning.service.LearnerProgressService;
import com.anhsensei.learning.service.LearnerQuizService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LearnerQuizUnitTest {

    @Mock private UserRepository userRepository;
    @Mock private QuizRepository quizRepository;
    @Mock private QuestionRepository questionRepository;
    @Mock private QuestionOptionRepository questionOptionRepository;
    @Mock private QuizAttemptRepository quizAttemptRepository;
    @Mock private QuizAttemptAnswerRepository quizAttemptAnswerRepository;
    @Mock private LearningActivityRepository learningActivityRepository;
    @Mock private LearnerProgressService learnerProgressService;

    @InjectMocks
    private LearnerQuizService learnerQuizService;

    private User mockUser;
    private Quiz mockQuiz;
    private Question mockQuestion;
    private QuestionOption mockCorrectOpt;
    private QuestionOption mockWrongOpt;

    @BeforeEach
    void setUp() {
        mockUser = User.builder().userId(1L).email("learner@anhsensei.com").timezone("Asia/Ho_Chi_Minh").build();

        mockQuiz = new Quiz();
        mockQuiz.setQuizId(10L);
        mockQuiz.setTitle("Quiz N5 Test");
        mockQuiz.setStatus("PUBLISHED");
        mockQuiz.setPassScore(new BigDecimal("60.00"));
        mockQuiz.setMaxAttempts(3);
        mockQuiz.setTimeLimitMinutes(15);
        mockQuiz.setReviewMode("AFTER_ATTEMPT");

        mockQuestion = new Question();
        mockQuestion.setQuestionId(100L);
        mockQuestion.setQuiz(mockQuiz);
        mockQuestion.setQuestionType("SINGLE_CHOICE");
        mockQuestion.setPrompt("水 có nghĩa là gì?");
        mockQuestion.setWeight(BigDecimal.ONE);
        mockQuestion.setExplanation("水 có nghĩa là Nước.");
        mockQuestion.setSortOrder(1);

        mockCorrectOpt = new QuestionOption(mockQuestion, "Nước", true, 1);
        mockCorrectOpt.setOptionId(1001L);

        mockWrongOpt = new QuestionOption(mockQuestion, "Lửa", false, 2);
        mockWrongOpt.setOptionId(1002L);
    }

    @Test
    @DisplayName("startQuiz creates new attempt and snapshots questions")
    void testStartQuizNewAttempt() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(quizRepository.findById(10L)).thenReturn(Optional.of(mockQuiz));
        when(quizAttemptRepository.findFirstByUser_UserIdAndQuiz_QuizIdAndStatusOrderByStartedAtDesc(1L, 10L, "IN_PROGRESS"))
                .thenReturn(Optional.empty());
        when(quizAttemptRepository.countByUser_UserIdAndQuiz_QuizId(1L, 10L)).thenReturn(0L);
        when(quizAttemptRepository.save(any(QuizAttempt.class))).thenAnswer(inv -> {
            QuizAttempt qa = inv.getArgument(0);
            qa.setAttemptId(500L);
            return qa;
        });
        when(questionRepository.findByQuiz_QuizIdOrderBySortOrderAsc(10L)).thenReturn(List.of(mockQuestion));
        when(questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(100L)).thenReturn(List.of(mockCorrectOpt, mockWrongOpt));

        QuizAttemptAnswer mockQaa = new QuizAttemptAnswer(new QuizAttempt(mockUser, mockQuiz, 1), mockQuestion, "Prompt", "{}", "{}", "Exp");
        when(quizAttemptAnswerRepository.findByAttempt_AttemptId(any())).thenReturn(List.of(mockQaa));

        StartQuizResponse response = learnerQuizService.startQuiz(1L, 10L);

        assertNotNull(response);
        assertEquals(500L, response.getAttemptId());
        assertFalse(response.getIsResumed());
        verify(quizAttemptAnswerRepository, times(1)).save(any(QuizAttemptAnswer.class));
    }

    @Test
    @DisplayName("startQuiz resumes active attempt when present and valid")
    void testStartQuizResumeActive() {
        QuizAttempt activeAttempt = new QuizAttempt(mockUser, mockQuiz, 1);
        activeAttempt.setAttemptId(500L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(quizRepository.findById(10L)).thenReturn(Optional.of(mockQuiz));
        when(quizAttemptRepository.findFirstByUser_UserIdAndQuiz_QuizIdAndStatusOrderByStartedAtDesc(1L, 10L, "IN_PROGRESS"))
                .thenReturn(Optional.of(activeAttempt));

        QuizAttemptAnswer mockQaa = new QuizAttemptAnswer(activeAttempt, mockQuestion, "Prompt", "{}", "{}", "Exp");
        when(quizAttemptAnswerRepository.findByAttempt_AttemptId(500L)).thenReturn(List.of(mockQaa));
        when(questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(100L)).thenReturn(List.of(mockCorrectOpt, mockWrongOpt));

        StartQuizResponse response = learnerQuizService.startQuiz(1L, 10L);

        assertNotNull(response);
        assertEquals(500L, response.getAttemptId());
        assertTrue(response.getIsResumed());
    }

    @Test
    @DisplayName("submitAttempt by attemptId grades answers, records activity on fail if answered >= 1")
    void testSubmitAttemptGradingAndActivity() {
        QuizAttempt activeAttempt = new QuizAttempt(mockUser, mockQuiz, 1);
        activeAttempt.setAttemptId(500L);

        QuizAttemptAnswer qaa = new QuizAttemptAnswer(activeAttempt, mockQuestion, "Prompt", "{}", "{}", "Exp");
        qaa.setSelectedOption(mockWrongOpt); // Answered wrongly -> 0%

        when(quizAttemptRepository.findByAttemptIdAndUser_UserId(500L, 1L)).thenReturn(Optional.of(activeAttempt));
        when(quizAttemptAnswerRepository.findByAttempt_AttemptId(500L)).thenReturn(List.of(qaa));
        when(questionOptionRepository.findByQuestion_QuestionIdOrderBySortOrderAsc(100L)).thenReturn(List.of(mockCorrectOpt, mockWrongOpt));
        when(quizAttemptRepository.saveAndFlush(any(QuizAttempt.class))).thenAnswer(inv -> inv.getArgument(0));

        SubmitAttemptRequest request = new SubmitAttemptRequest(List.of(
                new AutosaveAnswersRequest.QuestionAnswerInput(100L, 1002L, null)
        ));

        QuizResultDto result = learnerQuizService.submitAttempt(1L, 500L, request);

        assertNotNull(result);
        assertEquals("SUBMITTED", result.getStatus());
        assertFalse(result.getPassed());
        assertEquals(new BigDecimal("0.00"), result.getScore());

        // Verify LearningActivity WAS recorded even on fail because answered >= 1 question
        verify(learningActivityRepository, times(1)).save(any(LearningActivity.class));
    }

    @Test
    @DisplayName("submitAttempt is idempotent: submitting already SUBMITTED attempt returns result directly")
    void testSubmitAttemptIdempotent() {
        QuizAttempt submittedAttempt = new QuizAttempt(mockUser, mockQuiz, 1);
        submittedAttempt.setAttemptId(500L);
        submittedAttempt.setStatus("SUBMITTED");
        submittedAttempt.setScore(new BigDecimal("100.00"));

        when(quizAttemptRepository.findByAttemptIdAndUser_UserId(500L, 1L)).thenReturn(Optional.of(submittedAttempt));
        when(quizAttemptAnswerRepository.findByAttempt_AttemptId(500L)).thenReturn(List.of());

        QuizResultDto result = learnerQuizService.submitAttempt(1L, 500L, new SubmitAttemptRequest());

        assertNotNull(result);
        assertEquals("SUBMITTED", result.getStatus());
        verify(quizAttemptRepository, never()).save(any(QuizAttempt.class));
    }
}
