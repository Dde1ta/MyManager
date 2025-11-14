import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; // Import the context

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error is helpful if you forget to wrap a component in AuthProvider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};