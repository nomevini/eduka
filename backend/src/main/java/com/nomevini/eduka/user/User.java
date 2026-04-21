package com.nomevini.eduka.user;

import com.nomevini.eduka.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="tb_user")
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String username;
    private String password;
    private String phone;
    private LocalDateTime passwordUpdatedAt;
    private boolean enabled;
    private boolean accountNonLocked;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private LocalDateTime lastLoginAt;
    private String resetPasswordToken;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String name, String email, String username, String password, Role role) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.enabled = true;
        this.accountNonLocked = true;
        this.lastLoginAt = LocalDateTime.now();
        this.resetPasswordToken = "";
        this.passwordUpdatedAt = LocalDateTime.now();
    }
}