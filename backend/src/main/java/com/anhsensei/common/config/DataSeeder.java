package com.anhsensei.common.config;

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

import java.time.OffsetDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
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
}
