import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/backbutton';
import AddFolderCard from '../components/folders/addNode';
import FolderNode from '../components/folders/folderNode';
import AddFolderModal from '../components/folders/addFolderModal';
// --- Mock Data (to start) ---
const initialFolders = [
  { id: 1, title: "Formal Language", color: 'blue' },
  { id: 2, title: "Machine Learning", color: 'green' },
  { id: 3, title: "Competitive Coding", color: 'orange' },
];

// --- Main Page Component ---

export default function NotesFolderPage() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState(initialFolders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateFolder = (newFolder) => {
    setFolders([...folders, newFolder]);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Map over the user's folders */}
          {folders.map((folder) => (
            <FolderNode
              key={folder.id}
              name={folder.title}
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
          onCreate={handleCreateFolder}
        />
      )}
    </div>
  );
}