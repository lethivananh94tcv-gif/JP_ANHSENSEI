package com.anhsensei;

import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableCaching
@EnableAsync
@EntityScan(basePackages = "com.anhsensei")
@EnableJpaRepositories(basePackages = "com.anhsensei")
public class AnhSenseiApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnhSenseiApplication.class, args);
    }

    @Bean
    public FlywayMigrationStrategy flywayMigrationStrategy() {
        return flyway -> {
            try {
                flyway.repair();
            } catch (Exception ignored) {}
            flyway.migrate();
        };
    }
}
