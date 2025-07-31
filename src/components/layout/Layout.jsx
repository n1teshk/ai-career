// src/components/layout/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "@src/hooks/useAuth.jsx"; // Import useAuth using the alias

export default function Layout() {
  const { user, signOut } = useAuth(); // Get user from auth context and signOut function

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
        {/* Main Navigation Links - Left side */}
        <nav className="flex space-x-4">
          <Link className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" to="/">Home</Link>

          {/* Dashboard link (only shows if user is logged in) */}
          {user && (
            <Link className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" to="/dashboard">Dashboard</Link>
          )}

          <Link className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" to="/learning">Learning</Link>
          <Link className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" to="/career-strategy">Career Strategy</Link>
          <Link className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" to="/projects">Projects</Link>
          <Link className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" to="/blog">Blog</Link>
          <Link className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200" to="/about-us">About Us</Link>
        </nav>

        {/* Sign In / Sign Out button - Right corner */}
        <div>
          {user ? (
            <button
              onClick={signOut} // Use the actual signOut function from useAuth
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Sign In
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        © 2025 AI Career Services. All rights reserved.
      </footer>
    </div>
  );
}
