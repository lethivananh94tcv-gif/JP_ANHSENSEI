package com.anhsensei.identity.repository;

import com.anhsensei.identity.domain.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {

    Optional<EmailVerificationToken> findByTokenHash(String tokenHash);

    @Query("SELECT evt FROM EmailVerificationToken evt WHERE evt.user.userId = :userId ORDER BY evt.createdAt DESC LIMIT 1")
    Optional<EmailVerificationToken> findLatestByUserId(@Param("userId") Long userId);
}
