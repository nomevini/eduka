package com.nomevini.eduka.auth.dto;

import com.nomevini.eduka.user.dto.UserResponse;

public record AuthResponse(
        String token,
        String type,       // "Bearer"
        long expiresAt,    // timestamp em ms
        UserResponse user
) {
    public static AuthResponse of(String token, long expiresAt, UserResponse user) {
        return new AuthResponse(token, "Bearer", expiresAt, user);
    }
}