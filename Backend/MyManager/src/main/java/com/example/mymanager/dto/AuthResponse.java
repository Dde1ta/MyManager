package com.example.mymanager.dto;

import org.springframework.security.core.userdetails.UserDetails;

// This response will be sent back on successful login/registration
public class AuthResponse {
    private String token;
    private String email;
    private Long id;

    public AuthResponse(String token, UserDetails userDetails) {
        this.token = token;
        this.email = userDetails.getUsername(); // Which is our email
        // We need to cast to get our custom ID
        if (userDetails instanceof com.example.mymanager.security.UserDetailsImpl) {
            this.id = ((com.example.mymanager.security.UserDetailsImpl) userDetails).getId();
        }
    }

    // --- Getters ---
    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }
}