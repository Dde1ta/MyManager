import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import TodayPage from './pages/TodayPage.jsx';
import WeeklyPage from './pages/WeeklyPage.jsx';
import NotesFolderPage from './pages/NotesFolderPage.jsx';
import NotesPage from './pages/NotesPage.jsx';
import NoteViewPage from './pages/notesViewPage.jsx';
import AlertsPage from './pages/AlertPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/oauth" element={<AuthPage />}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/weekly" element={<WeeklyPage />} />
        <Route path="/notes/folders" element={<NotesFolderPage />} />
        <Route path="/notes/folder/:folderId" element={<NotesPage/>} />
        <Route path="/notes/view/:noteId" element={<NoteViewPage/>} />
        <Route path="/alerts" element={<AlertsPage/>}/>
      </Routes>
    </Router>
  );
}
