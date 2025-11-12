package com.example.mymanager.services;

import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
// Import the encoder
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // --- ADD THIS ---
    @Autowired
    private PasswordEncoder passwordEncoder;
    // --- END ADD ---

    public User registerUser(User newUser) {
        if (userRepository.existsByUsername(newUser.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // --- UPDATE THIS ---
        // Hash the password before saving!
        newUser.setPassword(
                passwordEncoder.encode(newUser.getPassword())
        );
        // --- END UPDATE ---

        return userRepository.save(newUser);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}