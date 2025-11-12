package com.example.mymanager.security;

import com.example.mymanager.entities.User; // We don't need this anymore
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    // --- Fields copied from User entity ---
    private Long id;
    private String email;
    private String password; // This will be the HASHED password
    private Collection<? extends GrantedAuthority> authorities;
    // --- No "User" object, so no infinite loop! ---

    // Private constructor
    public UserDetailsImpl(Long id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    // --- Static "build" method ---
    // This is the new way we'll create this object
    public static UserDetailsImpl build(User user) {
        // For now, every user is just a "ROLE_USER"
        // We can add a "roles" field to your User entity later if needed
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    // --- Getter for our AuthResponse DTO ---
    public Long getId() {
        return id;
    }

    // --- UserDetails interface methods ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // We use email as the username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}