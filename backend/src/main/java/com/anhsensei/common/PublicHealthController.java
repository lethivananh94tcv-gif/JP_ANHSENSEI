package com.anhsensei.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class PublicHealthController {

    @GetMapping(value = {"/healthz", "/health", "/public/health", "/actuator/health"})
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "anhsensei-backend"));
    }
}
