package com.anhsensei.curriculum.config;

import com.anhsensei.curriculum.repository.QuestionBankRepository;
import com.anhsensei.curriculum.service.AdminQuestionBankService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class QuizDataSeeder {

    private static final Logger log = LoggerFactory.getLogger(QuizDataSeeder.class);

    private final AdminQuestionBankService adminQuestionBankService;
    private final QuestionBankRepository questionBankRepository;

    public QuizDataSeeder(AdminQuestionBankService adminQuestionBankService, QuestionBankRepository questionBankRepository) {
        this.adminQuestionBankService = adminQuestionBankService;
        this.questionBankRepository = questionBankRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seed50LessonQuizQuestionBanks() {
        log.info("QuizDataSeeder auto-seeding disabled. Question Bank is managed via Admin Portal.");
    }
}
