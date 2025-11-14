import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// --- FIX: Import from the correct file ---
import { AuthProvider } from './context/AuthProvider.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* <-- This will now work */}
      <App />
    </AuthProvider>
  </StrictMode>,
)