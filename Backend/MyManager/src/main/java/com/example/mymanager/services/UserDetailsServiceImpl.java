package com.example.mymanager.services;

import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.UserRepository;
import com.example.mymanager.security.UserDetailsImpl; // Import our bridge
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Good to add

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Find the user by their email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // 2. Use the new static "build" method to create the safe UserDetails object
        return UserDetailsImpl.build(user); // <-- This is the change
    }
}