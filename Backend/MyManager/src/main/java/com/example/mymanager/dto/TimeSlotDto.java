package com.example.mymanager.dto;

import com.example.mymanager.entities.TimeSlot;

public class TimeSlotDto {

    private Long id;
    private String dayOfWeek;
    private String time;
    private String subject;
    private String bgColor;
    private String barColor;
    private String position;

    // --- Constructors ---

    public TimeSlotDto() {
    }

    // Constructor to map from an Entity
    public TimeSlotDto(TimeSlot entity) {
        this.id = entity.getId();
        this.dayOfWeek = entity.getDayOfWeek();
        this.time = entity.getTime();
        this.subject = entity.getSubject();
        this.bgColor = entity.getBgColor();
        this.barColor = entity.getBarColor();
        this.position = entity.getPosition();
    }

    // --- Getters and Setters ---
    // (Include all getters and setters for all fields)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBgColor() {
        return bgColor;
    }

    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }

    public String getBarColor() {
        return barColor;
    }

    public void setBarColor(String barColor) {
        this.barColor = barColor;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}