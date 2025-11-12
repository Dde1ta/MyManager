package com.example.mymanager.dto;

import java.time.LocalDate;

public class AlertDto {

    private Long id;
    private String title;
    private LocalDate date;
    private String priority;

    // --- Constructors ---
    public AlertDto() {
    }

    public AlertDto(Long id, String title, LocalDate date, String priority) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.priority = priority;
    }

    // --- Getters and Setters ---
    // (Add all getters and setters here...)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}