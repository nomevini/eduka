package com.nomevini.eduka.auth.dto;

public record LoginRequestDTO(
        String email,
        String password
) {
}