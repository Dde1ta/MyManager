import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Import the rich text editor
import ReactQuill from 'react-quill';
// Import the CSS for the editor
import 'react-quill/dist/quill.snow.css';

// --- SVG Icons ---
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

// --- Mock Data (to start with) ---
const initialNoteData = {
  title: "Lecture 2: Pumping Lemma",
  cueContent: `
    <ul>
      <li>What is the Pumping Lemma?</li>
      <li>Why is it used?</li>
      <li>What are the conditions (x, y, z)?</li>
    </ul>
  `,
  noteContent: `
    <h2>The Pumping Lemma for Regular Languages</h2>
    <p>The Pumping Lemma is a tool used to prove that a language is <strong>not regular</strong>.</p>
  `,
  summaryContent: `
    <p>The Pumping Lemma is a key tool for proving a language is not regular.</p>
  `
};

// --- Editor Configuration ---
// These are the "buttons" that will appear on the editor's toolbar
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
  const { noteId } = useParams();
  
  // Use state to hold the content. Start with the initial data.
  const [title, setTitle] = useState(initialNoteData.title);
  const [cueContent, setCueContent] = useState(initialNoteData.cueContent);
  const [noteContent, setNoteContent] = useState(initialNoteData.noteContent);
  const [summaryContent, setSummaryContent] = useState(initialNoteData.summaryContent);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page (NotesPage)
  };

  const handleSave = () => {
    // In a real app, you'd send this data to your API/database
    console.log("Saving data for note ID:", noteId, {
      title,
      cueContent,
      noteContent,
      summaryContent
    });
    alert("Note saved! (Check the console for the data)");
  };

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
          
          {/* Editable Title */}
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
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>

      {/* --- Main Content Area (Cues + Notes) --- */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Cues Column (Editable) */}
        <div className="w-full md:w-1/4 bg-zinc-800 rounded-lg p-6 flex flex-col overflow-hidden">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Cues & Questions</h2>
          <ReactQuill
            theme="snow"
            value={cueContent}
            onChange={setCueContent}
            modules={simpleToolbar}
            className="flex-1 overflow-auto text-white" // Custom class to style it
          />
        </div>
 
        {/* Notes Column (Editable) */}
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