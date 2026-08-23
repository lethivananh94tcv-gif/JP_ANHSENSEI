package com.anhsensei.common.config;

import com.anhsensei.curriculum.domain.*;
import com.anhsensei.curriculum.repository.*;
import com.anhsensei.curriculum.service.ExcelCommitService;
import com.anhsensei.curriculum.service.ExcelValidationService;
import com.anhsensei.identity.domain.Role;
import com.anhsensei.identity.domain.User;
import com.anhsensei.identity.repository.RoleRepository;
import com.anhsensei.identity.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.OffsetDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;
    private final ImportJobRepository importJobRepository;
    private final VocabularyRepository vocabularyRepository;
    private final ExcelValidationService excelValidationService;
    private final ExcelCommitService excelCommitService;

    public DataSeeder(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            org.springframework.jdbc.core.JdbcTemplate jdbcTemplate,
            ImportJobRepository importJobRepository,
            VocabularyRepository vocabularyRepository,
            ExcelValidationService excelValidationService,
            ExcelCommitService excelCommitService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jdbcTemplate = jdbcTemplate;
        this.importJobRepository = importJobRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.excelValidationService = excelValidationService;
        this.excelCommitService = excelCommitService;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // 0. Ensure target_lesson_id in import_jobs allows NULL values & update check constraints
        try {
            jdbcTemplate.execute("ALTER TABLE import_jobs ALTER COLUMN target_lesson_id DROP NOT NULL;");
            jdbcTemplate.execute("ALTER TABLE import_jobs DROP CONSTRAINT IF EXISTS ck_import_job_mode;");
            jdbcTemplate.execute("DELETE FROM flyway_schema_history WHERE version = '26';");

            // Reassign vocabularies from temporary lessons 151-157 to primary N4 lessons 101-107
            jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 101 WHERE lesson_id = 151;");
            jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 102 WHERE lesson_id = 152;");
            jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 103 WHERE lesson_id = 153;");
            jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 104 WHERE lesson_id = 154;");
            jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 105 WHERE lesson_id = 155;");
            jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 106 WHERE lesson_id = 156;");
            jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 107 WHERE lesson_id = 157;");
            jdbcTemplate.execute("DELETE FROM lessons WHERE lesson_id BETWEEN 151 AND 157;");
        } catch (Exception ignored) {}

        // 1. Ensure ADMIN Role exists
        Role adminRole = roleRepository.findByRoleName("ADMIN")
                .orElseGet(() -> roleRepository.save(new Role(null, "ADMIN", "Quản trị viên hệ thống", null)));

        // 2. Ensure LEARNER Role exists
        roleRepository.findByRoleName("LEARNER")
                .orElseGet(() -> roleRepository.save(new Role(null, "LEARNER", "Người học", null)));

        // 3. Ensure Default Admin Account exists
        String adminEmail = "admin@anhsensei.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode("AdminPassword123!"));
            admin.setFullName("Quản Trị Viên ANH SENSEI");
            admin.setRole(adminRole);
            admin.setTargetLevel("N1");
            admin.setStatus("ACTIVE");
            admin.setEmailVerifiedAt(OffsetDateTime.now());
            userRepository.save(admin);
            log.info(">>> [DATA SEEDER] Đã khởi tạo tài khoản ADMIN mặc định: {} | Mật khẩu: AdminPassword123!", adminEmail);
        }

        // 4. N4 Minna 26..32 vocabularies (347 items) have been successfully imported and mapped to Lessons 151..157.
    }
}
