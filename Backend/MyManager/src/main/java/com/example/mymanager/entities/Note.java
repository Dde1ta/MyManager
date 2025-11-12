package com.example.mymanager.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob // "Large Object" for long text
    @Column(columnDefinition = "TEXT")
    private String cueContent;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String noteContent;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String summaryContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id", nullable = false)
    private Folder folder;

    // --- Constructors ---
    public Note() {
    }

    public Note(String title, String cueContent, String noteContent, String summaryContent, Folder folder) {
        this.title = title;
        this.cueContent = cueContent;
        this.noteContent = noteContent;
        this.summaryContent = summaryContent;
        this.folder = folder;
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

    public String getCueContent() {
        return cueContent;
    }

    public void setCueContent(String cueContent) {
        this.cueContent = cueContent;
    }

    public String getNoteContent() {
        return noteContent;
    }

    public void setNoteContent(String noteContent) {
        this.noteContent = noteContent;
    }

    public String getSummaryContent() {
        return summaryContent;
    }

    public void setSummaryContent(String summaryContent) {
        this.summaryContent = summaryContent;
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }
}