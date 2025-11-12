package com.example.mymanager.dto;

// This is a plain class, NOT an entity
public class FolderDto {

    private Long id;
    private String title;
    private String color;

    // --- Constructors ---
    public FolderDto() {
    }

    public FolderDto(Long id, String title, String color) {
        this.id = id;
        this.title = title;
        this.color = color;
    }

    // --- Getters and Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}