package com.example.mymanager.controllers;

import com.example.mymanager.dto.AlertDto;
import com.example.mymanager.entities.Alert;
import com.example.mymanager.entities.User;
// REMOVE: import com.example.mymanager.repositories.UserRepository;
import com.example.mymanager.services.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alerts")
public class AlertController extends BaseController { // <-- EXTEND HERE

    @Autowired
    private AlertService alertService;

    // --- TEMPORARY USER CODE IS GONE ---

    // GET /api/alerts
    @GetMapping
    public List<AlertDto> getAlertsForUser() {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD
        List<Alert> alerts = alertService.getAlertsForUser(user);

        return alerts.stream()
                .map(alert -> new AlertDto(alert.getId(), alert.getTitle(), alert.getDate(), alert.getPriority()))
                .collect(Collectors.toList());
    }

    // POST /api/alerts
    @PostMapping
    public AlertDto createAlert(@RequestBody Alert newAlert) {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD
        Alert createdAlert = alertService.createAlert(newAlert, user);

        return new AlertDto(
                createdAlert.getId(),
                createdAlert.getTitle(),
                createdAlert.getDate(),
                createdAlert.getPriority()
        );
    }

    // PUT /api/alerts/{alertId}
    @PutMapping("/{alertId}")
    public AlertDto updateAlert(@PathVariable Long alertId, @RequestBody Alert updatedAlertData) {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD
        Alert updatedAlert = alertService.updateAlert(alertId, updatedAlertData, user);

        return new AlertDto(
                updatedAlert.getId(),
                updatedAlert.getTitle(),
                updatedAlert.getDate(),
                updatedAlert.getPriority()
        );
    }

    // DELETE /api/alerts/{alertId}
    @DeleteMapping("/{alertId}")
    public ResponseEntity<?> deleteAlert(@PathVariable Long alertId) {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD
        alertService.deleteAlert(alertId, user);
        return ResponseEntity.ok().build();
    }
}