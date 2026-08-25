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
        try {
            long totalActiveQuestions = questionBankRepository.count();
            log.info("Checking Question Bank status... Current active question count = {}", totalActiveQuestions);

            if (totalActiveQuestions < 1500) {
                log.info("Seeding 30 JLPT-aligned vocabulary questions for all 50 Minna no Nihongo lessons...");
                int successCount = 0;
                for (long lessonNum = 1; lessonNum <= 50; lessonNum++) {
                    try {
                        adminQuestionBankService.generate30JLPTQuestionsForLesson(lessonNum, 1L, true);
                        successCount++;
                    } catch (Exception e) {
                        log.warn("Could not auto-seed quiz for lesson #{}: {}", lessonNum, e.getMessage());
                    }
                }
                log.info("Successfully seeded and published 30-question quiz banks for {}/50 lessons!", successCount);
            } else {
                log.info("Question Bank is already fully seeded with {} questions.", totalActiveQuestions);
            }
        } catch (Exception e) {
            log.error("Error during Quiz Question Bank seeding: {}", e.getMessage(), e);
        }
    }
}
