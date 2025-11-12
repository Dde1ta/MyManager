package com.example.mymanager.repositories;

import com.example.mymanager.entities.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

    // This is for the "Manage Alerts" page:
    // "Find all alerts that belong to a specific user"
    List<Alert> findByUserId(Long userId);
}