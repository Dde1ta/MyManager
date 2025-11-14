import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Import our API client
// --- FIX: Import from the correct file in /context ---
import { useAuth } from '../context/useAuth.js'; 
// --- SVG Icons for inputs ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-400">
    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.99 9.99 0 0010 12c-2.31 0-4.438.784-6.131 2.095z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-400">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-400">
    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
  </svg>
);

/** Reusable Input Field Component */
const InputField = ({ icon, type, placeholder, value, onChange, disabled }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required // Add browser-side validation
      className="w-full bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    />
  </div>
);


// --- Main Auth Page Component ---

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  // State for both forms
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for API feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Call the backend /api/auth/login endpoint
      const response = await apiClient.post('/auth/login', { email, password });
      
      // Separate token from user data (email, id)
      const { token, ...userData } = response.data;
      
      // Call the context 'login' function to save data and token
      login(userData, token);
      
      // Redirect to the homepage
      navigate('/home'); 
    } catch (err) {
      setError('Failed to log in. Please check your email and password.');
      console.error(err);
      setIsLoading(false);
    }
    // No need to setIsLoading(false) on success, as we are navigating away
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    try {
      // Call the backend /api/auth/register endpoint
      const response = await apiClient.post('/auth/register', { username, email, password });
      
      // Separate token from user data
      const { token, ...userData } = response.data;
      
      // Log the user in immediately after registering
      login(userData, token); 
      
      // Redirect to the homepage
      navigate('/home');
    } catch (err) {
      setError('Failed to register. Email or username may already be taken.');
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-zinc-800 rounded-2xl shadow-2xl p-8">
        
        {/* --- Header --- */}
        <h1 className="text-4xl font-bold text-center mb-2">
          {isLoginView ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-zinc-400 text-center mb-8">
          {isLoginView ? "Sign in to continue" : "Get started with your new account"}
        </p>
        
        {/* --- Form --- */}
        <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-5">
          
          {/* Username (Register only) */}
          {!isLoginView && (
            <InputField
              icon={<UserIcon />}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          )}

          {/* Email */}
          <InputField
            icon={<EmailIcon />}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          {/* Password */}
          <InputField
            icon={<LockIcon />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          {/* Confirm Password (Register only) */}
          {!isLoginView && (
            <InputField
              icon={<LockIcon />}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          )}
          
          {/* Error Message Display */}
          {error && (
            <p className="text-red-500 text-sm text-center pt-2">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-500 transition-colors duration-200 disabled:bg-zinc-500"
          >
            {isLoading
              ? (isLoginView ? 'Logging in...' : 'Creating account...')
              : (isLoginView ? 'Login' : 'Create Account')
            }
          </button>
        </form>

        {/* --- View Toggle --- */}
        <p className="text-center text-zinc-400 mt-8">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLoginView(!isLoginView);
              setError(''); // Clear errors when switching views
            }}
            disabled={isLoading}
            className="font-medium text-blue-400 hover:text-blue-300 ml-2 disabled:opacity-50"
          >
            {isLoginView ? "Sign Up" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}