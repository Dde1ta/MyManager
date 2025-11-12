package com.example.mymanager.dto;

public class NoteDto {

    private Long id;
    private String title;
    // We can add other fields here if the "card view" needs them
    // private String subtitle;

    // --- Constructors ---
    public NoteDto() {
    }

    public NoteDto(Long id, String title) {
        this.id = id;
        this.title = title;
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
}