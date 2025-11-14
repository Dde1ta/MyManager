import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// --- FIX: Import from the correct file ---
import { AuthProvider } from './context/AuthProvider.jsx' 
import { BrowserRouter as Router } from 'react-router-dom'; // <-- 1. Import Router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* <-- 2. Wrap everything in Router */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
)