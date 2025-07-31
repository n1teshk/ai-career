// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Dashboard() {
  const { user, loading, logout } = useAuth(); // Get user, loading state, and logout function
  const navigate = useNavigate();

  // Redirect if not authenticated and not loading
  if (!loading && !user) {
    navigate('/login');
    return null; // Don't render anything while redirecting
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user?.displayName || user?.email || 'User'}!
        </h1>
        <p className="text-gray-600">
          This is your personalized dashboard. You can add personalized content,
          learning progress, saved projects, and more here.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">My Learning Path</h2>
            <p className="text-gray-700">Continue your journey: Next module on Machine Learning Fundamentals.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Saved Projects</h2>
            <p className="text-gray-700">View and manage your saved portfolio projects.</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
