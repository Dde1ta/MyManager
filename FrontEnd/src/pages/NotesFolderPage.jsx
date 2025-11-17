import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import AddFolderCard from '../components/folders/addNode';
import FolderNode from '../components/folders/folderNode';
import AddFolderModal from '../components/folders/addFolderModal';
import apiClient from '../api/apiClient'; // <-- Import API client

// --- Mock Data (to start) ---
// const initialFolders = [ ... ]; // <-- REMOVE MOCK DATA

// --- Main Page Component ---

export default function NotesFolderPage() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]); // <-- Start with empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  // --- ADDED: Fetch folders from backend on page load ---
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setError('');
        const response = await apiClient.get('/folders');
        setFolders(response.data);
      } catch (err) {
        console.error("Failed to fetch folders:", err);
        setError('Could not load your folders.');
        // If it's an auth error, you could redirect to login here
      }
    };
    fetchFolders();
  }, []); // The empty array [] means this runs once when the page loads

  // --- UPDATED: Send new folder to the backend ---
  const handleCreateFolder = async (newFolderData) => {
    // Note: The modal's data is { title, color }
    try {
      setError('');
      // Send the new folder to the backend
      const response = await apiClient.post('/folders', newFolderData);
      
      // Add the new folder (returned from DB with a real ID) to our state
      setFolders([...folders, response.data]);
      setIsModalOpen(false); // Close modal
    } catch (err) {
      console.error("Failed to create folder:", err);
      setError('Could not create the folder.');
    }
  };

  const handleFolderClick = (folderId) => {
    navigate(`/notes/folder/${folderId}`);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Notes</h1>
          <BackButton to="/" />
        </div>

        {/* --- ADDED: Error Display --- */}
        {error && (
          <div className="bg-red-800 text-white p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* This will now be empty at first, then show real data */}
          {folders.map((folder) => (
            <FolderNode
              key={folder.id}
              name={folder.title} // Backend DTO uses 'title'
              color={folder.color}
              onClick={() => handleFolderClick(folder.id)}
            />
          ))}
          
          {/* "Add New" button */}
          <AddFolderCard onClick={() => setIsModalOpen(true)} />

        </div>
      </div>

      {/* Render the modal (popup) if isModalOpen is true */}
      {isModalOpen && (
        <AddFolderModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateFolder} // <-- Now calls our async function
        />
      )}
    </div>
  );
}