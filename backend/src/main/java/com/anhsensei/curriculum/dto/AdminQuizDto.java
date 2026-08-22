package com.anhsensei.curriculum.dto;

import com.anhsensei.curriculum.domain.Question;
import com.anhsensei.curriculum.domain.QuestionOption;
import com.anhsensei.curriculum.domain.Quiz;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class AdminQuizDto {
    private Long quizId;
    private String title;
    private String description;
    private String quizType;
    private BigDecimal passScore;
    private Integer timeLimitMinutes;
    private Integer maxAttempts;
    private String reviewMode;
    private String status;
    private Long lessonId;
    private List<QuestionDto> questions = new ArrayList<>();

    public AdminQuizDto() {}

    public AdminQuizDto(Quiz quiz, List<Question> questionList) {
        this.quizId = quiz.getQuizId();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.quizType = quiz.getQuizType();
        this.passScore = quiz.getPassScore();
        this.timeLimitMinutes = quiz.getTimeLimitMinutes();
        this.maxAttempts = quiz.getMaxAttempts();
        this.reviewMode = quiz.getReviewMode();
        this.status = quiz.getStatus();
        this.lessonId = quiz.getLesson() != null ? quiz.getLesson().getLessonId() : null;

        if (questionList != null) {
            for (Question q : questionList) {
                this.questions.add(new QuestionDto(q));
            }
        }
    }

    public static class QuestionDto {
        private Long questionId;
        private String questionType;
        private String prompt;
        private BigDecimal weight;
        private String audioUrl;
        private String explanation;
        private Integer sortOrder;
        private List<OptionDto> options = new ArrayList<>();

        public QuestionDto() {}

        public QuestionDto(Question q) {
            this.questionId = q.getQuestionId();
            this.questionType = q.getQuestionType();
            this.prompt = q.getPrompt();
            this.weight = q.getWeight();
            this.audioUrl = q.getAudioUrl();
            this.explanation = q.getExplanation();
            this.sortOrder = q.getSortOrder();
            if (q.getOptions() != null) {
                for (QuestionOption opt : q.getOptions()) {
                    this.options.add(new OptionDto(opt));
                }
            }
        }

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getQuestionType() { return questionType; }
        public void setQuestionType(String questionType) { this.questionType = questionType; }

        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }

        public BigDecimal getWeight() { return weight; }
        public void setWeight(BigDecimal weight) { this.weight = weight; }

        public String getAudioUrl() { return audioUrl; }
        public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }

        public Integer getSortOrder() { return sortOrder; }
        public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

        public List<OptionDto> getOptions() { return options; }
        public void setOptions(List<OptionDto> options) { this.options = options; }
    }

    public static class OptionDto {
        private Long optionId;
        private String optionText;
        private Boolean isCorrect;
        private Integer sortOrder;

        public OptionDto() {}

        public OptionDto(QuestionOption opt) {
            this.optionId = opt.getOptionId();
            this.optionText = opt.getOptionText();
            this.isCorrect = opt.getIsCorrect();
            this.sortOrder = opt.getSortOrder();
        }

        public Long getOptionId() { return optionId; }
        public void setOptionId(Long optionId) { this.optionId = optionId; }

        public String getOptionText() { return optionText; }
        public void setOptionText(String optionText) { this.optionText = optionText; }

        public Boolean getIsCorrect() { return isCorrect; }
        public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }

        public Integer getSortOrder() { return sortOrder; }
        public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    }

    // Getters and Setters
    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getQuizType() { return quizType; }
    public void setQuizType(String quizType) { this.quizType = quizType; }

    public BigDecimal getPassScore() { return passScore; }
    public void setPassScore(BigDecimal passScore) { this.passScore = passScore; }

    public Integer getTimeLimitMinutes() { return timeLimitMinutes; }
    public void setTimeLimitMinutes(Integer timeLimitMinutes) { this.timeLimitMinutes = timeLimitMinutes; }

    public Integer getMaxAttempts() { return maxAttempts; }
    public void setMaxAttempts(Integer maxAttempts) { this.maxAttempts = maxAttempts; }

    public String getReviewMode() { return reviewMode; }
    public void setReviewMode(String reviewMode) { this.reviewMode = reviewMode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getLessonId() { return lessonId; }
    public void setLessonId(Long lessonId) { this.lessonId = lessonId; }

    public List<QuestionDto> getQuestions() { return questions; }
    public void setQuestions(List<QuestionDto> questions) { this.questions = questions; }
}
