package com.example.mymanager.controllers;

import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.UserRepository;
import com.example.mymanager.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

// This is a base class, so we don't add @RestController here
public abstract class BaseController {

    // We inject UserRepository here so all child controllers can use it
    @Autowired
    private UserRepository userRepository;

    /**
     * Gets the currently authenticated User entity from the Security Context.
     * @return The fully hydrated User entity from the database.
     */
    protected User getAuthenticatedUser() {
        // 1. Get the Authentication object from the SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated.");
        }

        // 2. Get the principal, which is our UserDetailsImpl object
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();

        // 3. Find the User entity in the database using the ID
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found in database with ID: " + userId));
    }
}