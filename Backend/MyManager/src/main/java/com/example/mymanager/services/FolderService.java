package com.example.mymanager.services;

import com.example.mymanager.entities.Folder;
import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FolderService {

    @Autowired
    private FolderRepository folderRepository;

    public List<Folder> getFoldersForUser(User user) {
        return folderRepository.findByUserId(user.getId());
    }

    public Folder createFolder(Folder newFolder, User user) {
        // Associate the folder with the correct user
        newFolder.setUser(user);
        return folderRepository.save(newFolder);
    }

    public Optional<Folder> getFolderById(Long id) {
        return folderRepository.findById(id);
    }

    public void deleteFolder(Long folderId, User user) {
        // Find the folder first to make sure it belongs to this user
        Optional<Folder> folder = folderRepository.findById(folderId);
        if (folder.isPresent() && folder.get().getUser().getId().equals(user.getId())) {
            folderRepository.deleteById(folderId);
        } else {
            // Later, we'll replace this with proper access denied exception
            throw new RuntimeException("Error: Folder not found or access denied.");
        }
    }
}