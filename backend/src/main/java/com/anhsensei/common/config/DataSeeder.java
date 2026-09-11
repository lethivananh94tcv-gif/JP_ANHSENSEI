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
    public void run(String... args) {
        // 0. Ensure target_lesson_id in import_jobs allows NULL values & update check constraints
        try {
            jdbcTemplate.execute("ALTER TABLE import_jobs ALTER COLUMN target_lesson_id DROP NOT NULL;");
            jdbcTemplate.execute("ALTER TABLE import_jobs DROP CONSTRAINT IF EXISTS ck_import_job_mode;");
        } catch (Exception ignored) {}

        // Seed initial data ONLY if vocabulary table is empty
        if (vocabularyRepository.count() == 0) {
            log.info(">>> [DATA SEEDER] Vocabulary table is empty. Seeding V26, V27, V59...");
            executeSqlFile("src/main/resources/db/migration/V26__seed_minna_no_nihongo_n5_vocabularies.sql");
            executeSqlFile("src/main/resources/db/migration/V27__seed_minna_no_nihongo_n4_vocabularies.sql");
            executeSqlFile("src/main/resources/db/migration/V59__add_verb_classification_to_vocabulary.sql");

            try {
                jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 101 WHERE lesson_id = 151;");
                jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 102 WHERE lesson_id = 152;");
                jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 103 WHERE lesson_id = 153;");
                jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 104 WHERE lesson_id = 154;");
                jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 105 WHERE lesson_id = 155;");
                jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 106 WHERE lesson_id = 156;");
                jdbcTemplate.execute("UPDATE vocabulary SET lesson_id = 107 WHERE lesson_id = 157;");
                jdbcTemplate.execute("DELETE FROM lessons WHERE lesson_id BETWEEN 151 AND 157;");
            } catch (Exception ignored) {}
        }

        // Always execute V66 to ensure authentic example sentences are updated across all 1865 vocabularies
        executeSqlFile("src/main/resources/db/migration/V66__seed_authentic_examples_all_vocabularies.sql");

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
    }

    private void executeSqlFile(String relativePath) {
        try {
            java.nio.file.Path path = java.nio.file.Paths.get(relativePath);
            if (!java.nio.file.Files.exists(path)) {
                path = java.nio.file.Paths.get("backend/" + relativePath);
            }
            if (java.nio.file.Files.exists(path)) {
                String content = java.nio.file.Files.readString(path, java.nio.charset.StandardCharsets.UTF_8);
                // Strip SQL single-line comments
                String cleanContent = content.replaceAll("(?m)^--.*$", "");
                String[] statements = cleanContent.split(";");
                java.util.List<String> batch = new java.util.ArrayList<>();
                int count = 0;
                for (String stmt : statements) {
                    String trimmed = stmt.trim();
                    if (!trimmed.isEmpty()) {
                        batch.add(trimmed);
                        if (batch.size() >= 50) {
                            try {
                                jdbcTemplate.batchUpdate(batch.toArray(new String[0]));
                                count += batch.size();
                            } catch (Exception ex) {
                                log.warn("Warning executing batch from {}: {}", relativePath, ex.getMessage());
                            }
                            batch.clear();
                        }
                    }
                }
                if (!batch.isEmpty()) {
                    try {
                        jdbcTemplate.batchUpdate(batch.toArray(new String[0]));
                        count += batch.size();
                    } catch (Exception ex) {
                        log.warn("Warning executing remaining batch from {}: {}", relativePath, ex.getMessage());
                    }
                    batch.clear();
                }
                log.info(">>> [DATA SEEDER] Successfully executed {} statements from {}!", count, relativePath);
            }
        } catch (Exception e) {
            log.warn("Error running SQL file {}: {}", relativePath, e.getMessage());
        }
    }
}

