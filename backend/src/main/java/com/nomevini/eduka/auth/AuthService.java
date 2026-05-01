package com.nomevini.eduka.auth;

import com.nomevini.eduka.auth.dto.LoginRequest;
import com.nomevini.eduka.auth.dto.AuthResponse;
import com.nomevini.eduka.config.JwtService;
import com.nomevini.eduka.enums.Role;
import com.nomevini.eduka.user.User;
import com.nomevini.eduka.user.UserRepository;
import com.nomevini.eduka.auth.dto.RegisterRequest;
import com.nomevini.eduka.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest dto) {

        return userRepository.findByEmail(dto.email())
                .filter(u -> passwordEncoder.matches(dto.password(), u.getPassword()))
                .map(user -> new AuthResponse(jwtService.generateToken(user), "Bearer", jwtService.getExpiration(), new UserResponse(user)))
                .orElseThrow(() -> new AuthException("Email ou senha inválidos"));
    }


    public void register(RegisterRequest dto){

        userRepository.findByEmail(dto.email())
                .ifPresent(user -> {
                    throw new AuthException("Email já cadastrado");
                });

        User user = User.builder()
                .name(dto.name())
                .email(dto.email())
                .password(passwordEncoder.encode(dto.password()))
                .enabled(true)
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }
}