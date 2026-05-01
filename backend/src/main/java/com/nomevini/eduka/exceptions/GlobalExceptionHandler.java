package com.nomevini.eduka.exceptions;

import com.nomevini.eduka.auth.AuthException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ApiError> handleAuthException(
            AuthException ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiError(
                        Instant.now(),
                        HttpStatus.UNAUTHORIZED.value(),
                        "Unauthorized",
                        ex.getMessage(),
                        request.getRequestURI()
                ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(
            MethodArgumentNotValidException ex, HttpServletRequest request) {

        Map<String, String> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fe -> fe.getDefaultMessage() != null
                                ? fe.getDefaultMessage()
                                : "Valor inválido",
                        (a, b) -> a
                ));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiError(
                        Instant.now(),
                        HttpStatus.BAD_REQUEST.value(),
                        "Validation failed",
                        "Um ou mais campos são inválidos",
                        request.getRequestURI(),
                        fieldErrors
                ));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ApiError(
                        Instant.now(),
                        HttpStatus.NOT_FOUND.value(),
                        "Not Found",
                        ex.getMessage(),
                        request.getRequestURI()
                ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneric(
            Exception ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiError(
                        Instant.now(),
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "Internal Server Error",
                        "Ocorreu um erro inesperado",
                        request.getRequestURI()
                ));
    }
}