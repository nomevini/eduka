package com.nomevini.eduka.auth;

import com.nomevini.eduka.auth.dto.LoginRequestDTO;
import com.nomevini.eduka.auth.dto.RegisterRequestDTO;
import com.nomevini.eduka.auth.dto.TokenDTO;
import com.nomevini.eduka.config.JwtService;
import com.nomevini.eduka.user.User;
import com.nomevini.eduka.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public TokenDTO login(LoginRequestDTO dto) {

        return userRepository.findByEmail(dto.email())
                .filter(u -> passwordEncoder.matches(dto.password(), u.getPassword()))
                .map(user -> new TokenDTO(jwtService.generateToken(user)))
                .orElseThrow(() -> new AuthException("Email ou senha inválidos"));
    }

    public void register(RegisterRequestDTO dto){

        userRepository.findByEmail(dto.email())
                .ifPresent(user -> {
                    throw new AuthException("Email já cadastrado");
                });

        User user = new User();
        user.setName(dto.name());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));

        userRepository.save(user);
    }
}