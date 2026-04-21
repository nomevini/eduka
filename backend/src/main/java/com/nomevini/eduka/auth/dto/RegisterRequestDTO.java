package com.nomevini.eduka.auth.dto;

public record RegisterRequestDTO(
        String name,
        String email,
        String password
) {
}
