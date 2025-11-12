package com.example.mymanager.dto;

// This DTO carries the *full* content of a single note for the editor
public class NoteDetailDto {

    private Long id;
    private String title;
    private String cueContent;
    private String noteContent;
    private String summaryContent;

    // --- Constructors ---
    public NoteDetailDto() {
    }

    public NoteDetailDto(Long id, String title, String cueContent, String noteContent, String summaryContent) {
        this.id = id;
        this.title = title;
        this.cueContent = cueContent;
        this.noteContent = noteContent;
        this.summaryContent = summaryContent;
    }

    // --- Getters and Setters ---
    // (Add all getters and setters here...)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCueContent() { return cueContent; }
    public void setCueContent(String cueContent) { this.cueContent = cueContent; }
    public String getNoteContent() { return noteContent; }
    public void setNoteContent(String noteContent) { this.noteContent = noteContent; }
    public String getSummaryContent() { return summaryContent; }
    public void setSummaryContent(String summaryContent) { this.summaryContent = summaryContent; }
}