import React, { useState, useEffect } from 'react';
import NotesNode from '../components/notesZone/notesNode';
import NewNote from '../components/notesZone/newNote';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export default function NotesPage() {
  const navigate = useNavigate();
  const { folderId } = useParams();
  
  const [notes, setNotes] = useState([]);
  const [folderTitle, setFolderTitle] = useState("Notes"); // State for title
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!folderId) return;
    
    const fetchData = async () => {
      try {
        setError('');
        setIsLoading(true);
        
        // 1. Fetch Notes
        const notesRes = await apiClient.get(`/folders/${folderId}/notes`);
        setNotes(notesRes.data);

        // 2. Fetch Folder Details (for the Title)
        const folderRes = await apiClient.get(`/folders/${folderId}`);
        setFolderTitle(folderRes.data.title);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not load content.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [folderId]);

  const handleNewNoteClick = async () => {
    try {
      const newNote = { title: "Untitled Note", cueContent: "", noteContent: "", summaryContent: "" };
      const response = await apiClient.post(`/folders/${folderId}/notes`, newNote);
      navigate(`/notes/view/${response.data.id}`);
    } catch (err) {
      console.error(err);
      setError("Could not create note.");
    }
  };

  // --- Added Delete Handler ---
  const handleDeleteNote = async (e, noteId) => {
    e.stopPropagation(); // Prevent opening the note when clicking delete
    if(!window.confirm("Delete this note?")) return;

    try {
      await apiClient.delete(`/notes/${noteId}`);
      setNotes(notes.filter(n => n.id !== noteId)); // Remove from UI
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button onClick={() => navigate('/notes/folders')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4">
            <BackIcon />
            <span>Back to folders</span>
          </button>
          <h1 className="text-4xl font-bold">{folderTitle}</h1>
        </div>
        
        {isLoading && <p className="text-center text-zinc-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NotesNode 
                key={note.id} 
                title={note.title}
                category={folderTitle}
                subtitle="Click to open"
                onClick={() => navigate(`/notes/view/${note.id}`)}
                onDelete={(e) => handleDeleteNote(e, note.id)} // Pass delete handler
              />
            ))}
            <div onClick={handleNewNoteClick}><NewNote /></div>
          </div>
        )}
      </div>
    </div>
  );
}