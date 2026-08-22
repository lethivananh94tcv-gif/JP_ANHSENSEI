package com.anhsensei.learning.domain;

import com.anhsensei.identity.domain.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "learning_activities")
public class LearningActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private Long activityId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "activity_type", nullable = false, length = 40)
    private String activityType = "CONTENT_COMPLETED";

    @Column(name = "reference_type", nullable = false, length = 30)
    private String referenceType;

    @Column(name = "reference_id", nullable = false)
    private Long referenceId;

    @Column(name = "duration_seconds", nullable = false)
    private Integer durationSeconds = 0;

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate;

    @Column(name = "user_timezone", nullable = false, length = 100)
    private String userTimezone = "Asia/Ho_Chi_Minh";

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    public LearningActivity() {}

    public LearningActivity(User user, String activityType, String referenceType, Long referenceId, Integer durationSeconds, LocalDate activityDate, String userTimezone) {
        this.user = user;
        this.activityType = activityType != null ? activityType : "CONTENT_COMPLETED";
        this.referenceType = referenceType;
        this.referenceId = referenceId;
        this.durationSeconds = durationSeconds != null ? durationSeconds : 0;
        this.activityDate = activityDate != null ? activityDate : LocalDate.now();
        this.userTimezone = userTimezone != null ? userTimezone : "Asia/Ho_Chi_Minh";
    }

    public Long getActivityId() { return activityId; }
    public void setActivityId(Long activityId) { this.activityId = activityId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getActivityType() { return activityType; }
    public void setActivityType(String activityType) { this.activityType = activityType; }

    public String getReferenceType() { return referenceType; }
    public void setReferenceType(String referenceType) { this.referenceType = referenceType; }

    public Long getReferenceId() { return referenceId; }
    public void setReferenceId(Long referenceId) { this.referenceId = referenceId; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }

    public LocalDate getActivityDate() { return activityDate; }
    public void setActivityDate(LocalDate activityDate) { this.activityDate = activityDate; }

    public String getUserTimezone() { return userTimezone; }
    public void setUserTimezone(String userTimezone) { this.userTimezone = userTimezone; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
