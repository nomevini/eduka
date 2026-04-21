package com.nomevini.eduka.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    @Transactional(readOnly = true)
    public List<UserDTO> findAll(){
        return repository.findAll()
                .stream()
                .map(UserDTO::new)
                .toList();
    }
}