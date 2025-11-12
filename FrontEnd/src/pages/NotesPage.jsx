import React from 'react';
import NotesNode from '../components/notesZone/notesNode';
import NewNote from '../components/notesZone/newNote';
import { useNavigate } from 'react-router-dom';
// --- Mock Data ---
// In a real app, you'd fetch notes based on the folderId
const notesData = [
  { 
    id: 1,
    category: "Formal Language and Automata Theory", 
    title: "Lecture 1: Intro", 
    subtitle: "Finite Automata and Regular Expressions", 
    pages: "10 Pages" 
  },
  { 
    id: 2,
    category: "Formal Language and Automata Theory", 
    title: "Lecture 2: Pumping Lemma", 
    subtitle: "Proving languages are not regular", 
    pages: "5 Pages" 
  },
  { 
    id: 3,
    category: "Formal Language and Automata Theory", 
    title: "Lecture 3: CFGs", 
    subtitle: "Context-Free Grammars and Pushdown Automata", 
    pages: "12 Pages" 
  },
];

// --- Reusable Components (from Homepage) ---

// --- SVG Icon for "Back" Button ---
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);


// --- Main Page Component ---
 
// In a real app, this component would accept props like `folderTitle`
export default function NotesPage({ folderTitle = "Formal Language" }) {
   const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/notes/folders');
    };

    const handleNoteClick = (noteId) => {
        navigate(`/notes/view/${noteId}`);
    };


  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-8">
          {/* "Back" button to return to folders page */}
          <button onClick={handleBackClick} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4">
            <BackIcon />
            <span>Back to all folders</span>
          </button>
          
          <h1 className="text-4xl font-bold">{folderTitle}</h1>
        </div>
        
        {/* --- Notes Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Map over the notes data */}
          {notesData.map((note) => (
            <NotesNode 
              key={note.id} 
              {...note} 
              onClick={() => handleNoteClick(note.id)}
            />
          ))}

          {/* "Add New Note" card */}
          <NewNote />

        </div>
      </div>
    </div>
  );
}