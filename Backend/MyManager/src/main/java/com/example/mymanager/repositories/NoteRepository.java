package com.example.mymanager.repositories;

import com.example.mymanager.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    // This is for opening a folder to see all its notes:
    // "Find all notes that belong to a specific folder"
    List<Note> findByFolderId(Long folderId);
}
