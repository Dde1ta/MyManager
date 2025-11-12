package com.example.mymanager.repositories;

import com.example.mymanager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // Tells Spring this is a Repository bean
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Data JPA will automatically create this query for us
    // It will be used for logging in:
    Optional<User> findByEmail(String email);

    // We can also add a query to check if a username or email already exists
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}