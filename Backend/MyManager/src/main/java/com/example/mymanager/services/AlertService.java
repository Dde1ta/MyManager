package com.example.mymanager.services;

import com.example.mymanager.entities.Alert;
import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    public List<Alert> getAlertsForUser(User user) {
        return alertRepository.findByUserId(user.getId());
    }

    public Alert createAlert(Alert newAlert, User user) {
        newAlert.setUser(user);
        return alertRepository.save(newAlert);
    }

    public Alert updateAlert(Long alertId, Alert updatedAlertData, User user) {
        Optional<Alert> optionalAlert = alertRepository.findById(alertId);
        if (optionalAlert.isEmpty() || !optionalAlert.get().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Error: Alert not found or access denied.");
        }

        Alert existingAlert = optionalAlert.get();
        existingAlert.setTitle(updatedAlertData.getTitle());
        existingAlert.setDate(updatedAlertData.getDate());
        existingAlert.setPriority(updatedAlertData.getPriority());

        return alertRepository.save(existingAlert);
    }

    public void deleteAlert(Long alertId, User user) {
        Optional<Alert> alert = alertRepository.findById(alertId);
        if (alert.isPresent() && alert.get().getUser().getId().equals(user.getId())) {
            alertRepository.deleteById(alertId);
        } else {
            throw new RuntimeException("Error: Alert not found or access denied.");
        }
    }
}