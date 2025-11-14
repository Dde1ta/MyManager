import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx'; // <-- Import the context

export const AuthProvider = ({ children }) => {
  // Use a function for initial state to safely parse from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      // Only parse if it's a non-empty string
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('user'); // Clear corrupted data
      return null;
    }
  });
  
  const navigate = useNavigate();

  const login = (userData, userToken) => {
    try {
      localStorage.setItem('token', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(userToken);
      setUser(userData);
    } catch (e) {
      console.error("Failed to save auth data to localStorage", e);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/oauth'); // Redirect to login page on logout
  };
  
  // Optional: Add a listener to sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        setToken(e.newValue);
      }
      if (e.key === 'user') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (err) { // <-- FIX: Use the 'err' variable
          console.error("Failed to parse user from storage event", err);
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};