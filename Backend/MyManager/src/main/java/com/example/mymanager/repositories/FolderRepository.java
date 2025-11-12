package com.example.mymanager.repositories;

import com.example.mymanager.entities.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    // This is the custom query we need for the "My Notes" page:
    // "Find all folders that belong to a specific user"
    List<Folder> findByUserId(Long userId);
}