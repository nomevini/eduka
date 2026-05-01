package com.nomevini.eduka.exceptions;

import java.time.Instant;
import java.util.Map;

public record ApiError(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        Map<String, String> fieldErrors
) {
    public ApiError(Instant timestamp, int status, String error,
                    String message, String path) {
        this(timestamp, status, error, message, path, null);
    }
}