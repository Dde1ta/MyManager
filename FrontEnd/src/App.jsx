import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import TodayPage from './pages/TodayPage.jsx';
import WeeklyPage from './pages/WeeklyPage.jsx';
import NotesFolderPage from './pages/NotesFolderPage.jsx';
import NotesPage from './pages/NotesPage.jsx';
import NoteViewPage from './pages/notesViewPage.jsx';
import AlertsPage from './pages/AlertPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './context/useAuth.js';

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public route - Login page */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/home" replace /> : <AuthPage />} 
      />
      
      {/* Protected routes - Require authentication */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/today" 
        element={
          <ProtectedRoute>
            <TodayPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/weekly" 
        element={
          <ProtectedRoute>
            <WeeklyPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notes/folders" 
        element={
          <ProtectedRoute>
            <NotesFolderPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notes/folder/:folderId" 
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notes/view/:noteId" 
        element={
          <ProtectedRoute>
            <NoteViewPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/alerts" 
        element={
          <ProtectedRoute>
            <AlertsPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all - redirect to home/login based on auth status */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />} />
    </Routes>
  );
}
