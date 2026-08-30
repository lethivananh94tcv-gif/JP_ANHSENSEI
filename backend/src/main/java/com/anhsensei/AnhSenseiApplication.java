package com.anhsensei;

import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableCaching
@EnableAsync
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
