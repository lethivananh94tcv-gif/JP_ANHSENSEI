package com.anhsensei.identity.domain;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "role_name", nullable = false, unique = true, length = 30)
    private String roleName;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    public Role() {}

    public Role(Long roleId, String roleName, String description, OffsetDateTime createdAt) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.description = description;
        this.createdAt = createdAt;
    }

    public static RoleBuilder builder() {
        return new RoleBuilder();
    }

    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public static class RoleBuilder {
        private Long roleId;
        private String roleName;
        private String description;
        private OffsetDateTime createdAt;

        public RoleBuilder roleId(Long roleId) { this.roleId = roleId; return this; }
        public RoleBuilder roleName(String roleName) { this.roleName = roleName; return this; }
        public RoleBuilder description(String description) { this.description = description; return this; }
        public RoleBuilder createdAt(OffsetDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Role build() {
            return new Role(roleId, roleName, description, createdAt);
        }
    }
}
