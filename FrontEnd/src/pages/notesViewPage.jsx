import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiClient from '../api/apiClient'; // Import API client

// --- SVG Icons ---
// ... (BackIcon component remains the same) ...
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);


// --- Mock Data (to start with) ---
// const initialNoteData = { ... }; // <-- MOCK DATA REMOVED

// --- Editor Configuration ---
// ... (simpleToolbar and mainToolbar remain the same) ...
const simpleToolbar = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
  ],
};
const mainToolbar = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link'],
    ['clean']
  ],
};


// --- Main Page Component ---

export default function NoteViewPage() {
  const navigate = useNavigate();
  const { noteId } = useParams(); // Get noteId from URL
  
  // State for the note content
  const [title, setTitle] = useState("");
  const [cueContent, setCueContent] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [summaryContent, setSummaryContent] = useState("");

  // State for API feedback
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // --- ADDED: Fetch the note data on load ---
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setError('');
        setIsLoading(true);
        // Call backend: GET /api/notes/{noteId}
        const response = await apiClient.get(`/notes/${noteId}`);
        const note = response.data;
        
        // Populate the state with fetched data
        setTitle(note.title);
        setCueContent(note.cueContent || "");
        setNoteContent(note.noteContent || "");
        setSummaryContent(note.summaryContent || "");
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Could not load the note.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [noteId]); // Re-run if noteId changes

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page (NotesPage)
  };

  // --- UPDATED: Save the note to the backend ---
  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      const updatedNote = {
        title,
        cueContent,
        noteContent,
        summaryContent
      };
      // Call backend: PUT /api/notes/{noteId}
      await apiClient.put(`/notes/${noteId}`, updatedNote);
      // We could show a "Saved!" message here
    } catch (err) {
      console.error("Failed to save note:", err);
      setError("Could not save the note.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8 flex items-center justify-center">
        <p className="text-2xl text-zinc-400">Loading Note...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="min-h-screen bg-zinc-900 text-white p-8 flex flex-col items-center justify-center">
        <p className="text-2xl text-red-500">{error}</p>
        <button 
          onClick={handleBackClick}
          className="mt-4 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <BackIcon />
          <span>Back</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 flex flex-col">
      
      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button 
            onClick={handleBackClick}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
          >
            <BackIcon />
            <span>Back to folder</span>
          </button>
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold bg-transparent border-b border-zinc-700 focus:border-blue-500 outline-none"
            placeholder="Untitled Note"
          />
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-zinc-500"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* --- Main Content Area (Cues + Notes) --- */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        <div className="w-full md:w-1/4 bg-zinc-800 rounded-lg p-6 flex flex-col overflow-hidden">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Cues & Questions</h2>
          <ReactQuill
            theme="snow"
            value={cueContent}
            onChange={setCueContent}
            modules={simpleToolbar}
            className="flex-1 overflow-auto text-white"
          />
        </div>
 
        <div className="flex-1 bg-zinc-800 rounded-lg p-6 flex flex-col overflow-hidden">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Notes</h2>
          <ReactQuill
            theme="snow"
            value={noteContent}
            onChange={setNoteContent}
            modules={mainToolbar}
            className="flex-1 overflow-auto text-white"
          />
        </div>

      </div>

      {/* --- Summary Area (Editable) --- */}
      <div className="mt-6 bg-zinc-800 rounded-lg p-6 flex flex-col min-h-[250px]">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Summary</h2>
        <ReactQuill
          theme="snow"
          value={summaryContent}
          onChange={setSummaryContent}
          modules={simpleToolbar}
          className="flex-1 overflow-auto text-white"
        />
      </div>
    </div>
  );
}