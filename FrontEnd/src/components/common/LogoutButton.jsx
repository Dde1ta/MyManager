import React from 'react';
import { useAuth } from '../../context/useAuth';

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout(); // This will clear the token and redirect to "/" automatically
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-600/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-red-900/20 font-medium"
    >
      <LogoutIcon />
      <span>Logout</span>
    </button>
  );
}