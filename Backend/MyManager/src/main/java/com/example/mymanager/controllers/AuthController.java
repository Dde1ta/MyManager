package com.example.mymanager.controllers;

import com.example.mymanager.dto.AuthResponse;
import com.example.mymanager.dto.LoginRequest;
import com.example.mymanager.dto.RegisterRequest;
import com.example.mymanager.entities.User;
import com.example.mymanager.security.JwtUtil;
import com.example.mymanager.services.UserDetailsServiceImpl;
import com.example.mymanager.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * POST /api/auth/login
     * Authenticates a user and returns a JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        // This runs the "login brain" from SecurityConfig to validate credentials
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get the UserDetails principal
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Generate the token
        String jwt = jwtUtil.generateToken(userDetails);

        // Return the response DTO
        return ResponseEntity.ok(new AuthResponse(jwt, userDetails));
    }

    /**
     * POST /api/auth/register
     * Registers a new user and immediately logs them in, returning a JWT.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {

        User newUser = new User(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                registerRequest.getPassword() // Service will hash this
        );

        try {
            userService.registerUser(newUser);
        } catch (RuntimeException e) {
            // Catches "username taken" or "email taken" errors
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        // --- Auto-login the user after registration ---

        // Load the new user's details
        UserDetails userDetails = userDetailsService.loadUserByUsername(newUser.getEmail());

        // Generate the token
        String jwt = jwtUtil.generateToken(userDetails);

        // Return the response DTO
        return ResponseEntity.ok(new AuthResponse(jwt, userDetails));
    }
}