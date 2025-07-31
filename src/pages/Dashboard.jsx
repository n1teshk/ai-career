// src/pages/Dashboard.jsx
import React, { useEffect } from 'react'; // Added useEffect for potential side effects if needed
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link

export default function Dashboard() {
  const { user, loading, logout } = useAuth(); // Get user, loading state, and logout function
  const navigate = useNavigate();

  // Redirect if not authenticated and not loading
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-700 font-sans p-6">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
        <p className="text-xl text-gray-600">Loading your personalized dashboard...</p>
      </div>
    );
  }

  // If loading is false and user is null, the useEffect hook will handle the redirection.
  // This return null prevents rendering content before redirection or if no user is present.
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 lg:p-12 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-md">
          Welcome, {user?.displayName || user?.email?.split('@')[0] || 'AI Navigator'}!
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed">
          Your personalized hub for tracking progress, managing projects, and discovering new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* My Learning Path Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-7 rounded-xl shadow-lg border border-purple-500 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                </svg>
                My Learning Path
              </h2>
              <p className="text-indigo-100 leading-relaxed text-base">
                Continue your journey: Next module on Machine Learning Fundamentals. Explore new courses and track your progress.
              </p>
            </div>
            <Link to="/learning" className="mt-6 self-start bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-300 shadow-md">
              Continue Learning
            </Link>
          </div>

          {/* Saved Projects Card */}
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-7 rounded-xl shadow-lg border border-emerald-500 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                My Projects
              </h2>
              <p className="text-teal-100 leading-relaxed text-base">
                View and manage your saved portfolio projects. Build impressive AI solutions.
              </p>
            </div>
            <Link to="/projects" className="mt-6 self-start bg-white text-teal-700 px-6 py-3 rounded-full font-semibold hover:bg-teal-50 transition-colors duration-300 shadow-md">
              View Projects
            </Link>
          </div>
        </div>

        {/* Action Buttons / Profile Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            onClick={logout}
            className="bg-red-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75"
          >
            Logout
          </button>
          {/* Example of another button for future expansion */}
          <button className="bg-gray-200 text-gray-800 py-3 px-8 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-75">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
