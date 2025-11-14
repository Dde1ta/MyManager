import React, { useState, useEffect } from 'react';
import NotesNode from '../components/notesZone/notesNode';
import NewNote from '../components/notesZone/newNote';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import apiClient from '../api/apiClient'; // Import API client

// --- Mock Data ---
// const notesData = [ ... ]; // <-- MOCK DATA REMOVED

// --- Reusable Components (from Homepage) ---
// ... (BackIcon component remains the same) ...
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);


// --- Main Page Component ---
 
export default function NotesPage({ folderTitle = "Notes" }) { // Default title
  const navigate = useNavigate();
  const { folderId } = useParams(); // <-- Get folderId from URL
  const [notes, setNotes] = useState([]); // <-- Start with empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // We'd also fetch the folder details to get its title, but let's skip for now

  // --- ADDED: Fetch notes for this folder ---
  useEffect(() => {
    if (!folderId) return; // Don't fetch if no folderId
    
    const fetchNotes = async () => {
      try {
        setError('');
        setIsLoading(true);
        // Call backend: GET /api/folders/{folderId}/notes
        const response = await apiClient.get(`/folders/${folderId}/notes`);
        setNotes(response.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
        setError("Could not load notes for this folder.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [folderId]); // Re-run if folderId changes

  const handleBackClick = () => {
    navigate('/notes/folders');
  };

  const handleNoteClick = (noteId) => {
    navigate(`/notes/view/${noteId}`);
  };

  const handleNewNoteClick = async () => {
    // --- ADDED: Create a new note ---
    try {
      const newNote = {
        title: "Untitled Note",
        cueContent: "",
        noteContent: "",
        summaryContent: ""
      };
      // Call backend: POST /api/folders/{folderId}/notes
      const response = await apiClient.post(`/folders/${folderId}/notes`, newNote);
      // Navigate to the new note's page
      navigate(`/notes/view/${response.data.id}`);
    } catch (err) {
      console.error("Failed to create note:", err);
      setError("Could not create a new note.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ... (Header and BackButton remain the same) ... */}
        <div className="mb-8">
          <button onClick={handleBackClick} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4">
            <BackIcon />
            <span>Back to all folders</span>
          </button>
          
          <h1 className="text-4xl font-bold">{folderTitle}</h1>
        </div>
        
        {/* --- ADDED: Loading and Error States --- */}
        {isLoading && <p className="text-center text-zinc-400">Loading notes...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* --- Notes Grid --- */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {notes.map((note) => (
              <NotesNode 
                key={note.id} 
                title={note.title} // <-- Use DTO properties
                // DTO doesn't have these, so we'll pass placeholders
                category={folderTitle}
                subtitle="Click to open note"
                pages="" // DTO doesn't have page count
                onClick={() => handleNoteClick(note.id)}
              />
            ))}

            {/* "Add New Note" card */}
            <div onClick={handleNewNoteClick}>
              <NewNote />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}