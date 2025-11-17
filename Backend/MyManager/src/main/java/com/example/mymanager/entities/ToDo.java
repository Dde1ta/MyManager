package com.example.mymanager.entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="todo")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String category; // Fixed typo from "catagory"

    @Column
    private String description;

    @Column
    private String tag;

    @Column
    private int status; // 0 - pending (red), 1 - doing (orange), 2 - done (green)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore // Prevent infinite recursion in JSON
    private User user;

    public ToDo() {
    }

    public ToDo(String category, String description, String tag, int status, User user) {
        this.category = category;
        this.description = description;
        this.tag = tag;
        this.status = status;
        this.user = user;
    }

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}