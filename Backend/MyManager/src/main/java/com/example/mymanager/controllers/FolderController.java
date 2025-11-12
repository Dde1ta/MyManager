package com.example.mymanager.controllers;

import com.example.mymanager.dto.FolderDto;
import com.example.mymanager.entities.Folder;
import com.example.mymanager.entities.User;
// REMOVE: import com.example.mymanager.repositories.UserRepository;
import com.example.mymanager.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/folders")
public class FolderController extends BaseController { // <-- EXTEND HERE

    @Autowired
    private FolderService folderService;

    // --- TEMPORARY USER CODE IS GONE ---

    // GET /api/folders
    @GetMapping
    public List<FolderDto> getFoldersForUser() {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD
        List<Folder> folders = folderService.getFoldersForUser(user);

        return folders.stream()
                .map(folder -> new FolderDto(folder.getId(), folder.getTitle(), folder.getColor()))
                .collect(Collectors.toList());
    }

    // POST /api/folders
    @PostMapping
    public FolderDto createFolder(@RequestBody Folder folder) {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD
        Folder createdFolder = folderService.createFolder(folder, user);

        return new FolderDto(createdFolder.getId(), createdFolder.getTitle(), createdFolder.getColor());
    }

    // DELETE /api/folders/{folderId}
    @DeleteMapping("/{folderId}")
    public ResponseEntity<?> deleteFolder(@PathVariable Long folderId) {
        User user = getAuthenticatedUser(); // <-- USE NEW METHOD
        folderService.deleteFolder(folderId, user);

        return ResponseEntity.ok().build();
    }
}