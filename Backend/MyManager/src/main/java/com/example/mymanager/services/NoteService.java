package com.example.mymanager.services;

import com.example.mymanager.entities.Folder;
import com.example.mymanager.entities.Note;
import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.NoteRepository;
import com.example.mymanager.repositories.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private FolderRepository folderRepository; // We need this to check permissions

    public List<Note> getNotesForFolder(Long folderId, User user) {
        // Check if the user owns this folder
        Optional<Folder> folder = folderRepository.findById(folderId);
        if (folder.isEmpty() || !folder.get().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Error: Folder not found or access denied.");
        }

        return noteRepository.findByFolderId(folderId);
    }

    public Optional<Note> getNoteById(Long noteId) {
        // We'd add a permission check here too in a real app
        return noteRepository.findById(noteId);
    }

    public Note createNote(Note newNote, Folder folder) {
        // Associate the note with the folder
        newNote.setFolder(folder);
        return noteRepository.save(newNote);
    }

    public Note updateNote(Long noteId, Note updatedNoteData) {
        // Find the existing note
        Optional<Note> optionalNote = noteRepository.findById(noteId);
        if (optionalNote.isEmpty()) {
            throw new RuntimeException("Error: Note not found.");
        }

        Note existingNote = optionalNote.get();

        // We'd add permission checks here

        // Update the fields
        existingNote.setTitle(updatedNoteData.getTitle());
        existingNote.setCueContent(updatedNoteData.getCueContent());
        existingNote.setNoteContent(updatedNoteData.getNoteContent());
        existingNote.setSummaryContent(updatedNoteData.getSummaryContent());

        return noteRepository.save(existingNote);
    }

    public void deleteNote(Long noteId) {
        // We'd add permission checks here
        noteRepository.deleteById(noteId);
    }
}