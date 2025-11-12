package com.example.mymanager.controllers;

import com.example.mymanager.dto.NoteDetailDto;
import com.example.mymanager.dto.NoteDto;
import com.example.mymanager.entities.Folder;
import com.example.mymanager.entities.Note;
import com.example.mymanager.entities.User;
// REMOVE: import com.example.mymanager.repositories.UserRepository;
import com.example.mymanager.services.FolderService;
import com.example.mymanager.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class NoteController extends BaseController { // <-- EXTEND HERE

    @Autowired
    private NoteService noteService;

    @Autowired
    private FolderService folderService;

    // --- TEMPORARY USER CODE IS GONE ---

    // GET /api/folders/{folderId}/notes
    @GetMapping("/folders/{folderId}/notes")
    public List<NoteDto> getNotesForFolder(@PathVariable Long folderId) {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD

        // Note: The noteService.getNotesForFolder method already
        // checks if the user owns the folder
        List<Note> notes = noteService.getNotesForFolder(folderId, user);

        return notes.stream()
                .map(note -> new NoteDto(note.getId(), note.getTitle()))
                .collect(Collectors.toList());
    }

    // GET /api/notes/{noteId}
    @GetMapping("/notes/{noteId}")
    public NoteDetailDto getNoteById(@PathVariable Long noteId) {
        User user = getAuthenticatedUser();
        Note note = noteService.getNoteById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found!"));

        // --- ADDED SECURITY CHECK ---
        if (!note.getFolder().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied: You do not own this note.");
        }

        return new NoteDetailDto(
                note.getId(),
                note.getTitle(),
                note.getCueContent(),
                note.getNoteContent(),
                note.getSummaryContent()
        );
    }

    // POST /api/folders/{folderId}/notes
    @PostMapping("/folders/{folderId}/notes")
    public NoteDetailDto createNote(@PathVariable Long folderId, @RequestBody Note newNote) {
        User user = getAuthenticatedUser();
        Folder folder = folderService.getFolderById(folderId)
                .orElseThrow(() -> new RuntimeException("Folder not found!"));

        // --- ADDED SECURITY CHECK ---
        if (!folder.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied: You do not own this folder.");
        }

        Note createdNote = noteService.createNote(newNote, folder);

        return new NoteDetailDto(
                createdNote.getId(),
                createdNote.getTitle(),
                createdNote.getCueContent(),
                createdNote.getNoteContent(),
                createdNote.getSummaryContent()
        );
    }

    // PUT /api/notes/{noteId}
    @PutMapping("/notes/{noteId}")
    public NoteDetailDto updateNote(@PathVariable Long noteId, @RequestBody Note updatedNoteData) {
        User user = getAuthenticatedUser();

        // First, check if the user is allowed to edit this note
        Note existingNote = noteService.getNoteById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found!"));

        // --- ADDED SECURITY CHECK ---
        if (!existingNote.getFolder().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied: You do not own this note.");
        }

        // If the check passes, proceed with the update
        Note updatedNote = noteService.updateNote(noteId, updatedNoteData);

        return new NoteDetailDto(
                updatedNote.getId(),
                updatedNote.getTitle(),
                updatedNote.getCueContent(),
                updatedNote.getNoteContent(),
                updatedNote.getSummaryContent()
        );
    }

    // DELETE /api/notes/{noteId}
    @DeleteMapping("/notes/{noteId}")
    public ResponseEntity<?> deleteNote(@PathVariable Long noteId) {
        User user = getAuthenticatedUser();

        // --- ADDED SECURITY CHECK ---
        Note note = noteService.getNoteById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found!"));

        if (!note.getFolder().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied: You do not own this note.");
        }

        noteService.deleteNote(noteId);
        return ResponseEntity.ok().build();
    }
}