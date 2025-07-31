// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import the custom hook

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Added for completeness, though not used in Firebase auth directly
  const { signupWithEmail, signInWithGoogle, error, loading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    await signupWithEmail(email, password);
    // The useEffect above will handle navigation on successful signup
  };

  const handleGoogleSignup = async () => {
    await signInWithGoogle();
    // The useEffect above will handle navigation on successful signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleEmailSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Create Account'}
          </button>
        </form>
        <div className="my-6 flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center"
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.27c-.2-.72-.73-2.02-1.92-2.02-1.63 0-2.83 1.55-2.83 3.32s1.2 3.32 2.83 3.32c1.23 0 1.95-.74 2.16-1.48h-2.16v-1.12h4.5c.06.33.1.68.1 1.05 0 2.76-1.91 4.79-4.76 4.79-2.92 0-5.26-2.39-5.26-5.26s2.34-5.26 5.26-5.26c1.55 0 2.59.66 3.2 1.25l1.9-1.85c-1.15-1.07-2.6-1.7-5.1-1.7-4.13 0-7.5 3.37-7.5 7.5s3.37 7.5 7.5 7.5c4.02 0 7.23-2.9 7.23-7.23 0-.47-.05-.93-.13-1.37h-7.1z"/>
          </svg>
          {loading ? 'Signing Up...' : 'Sign Up with Google'}
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
