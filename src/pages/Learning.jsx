// src/pages/Learning.jsx
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // Ensure this path is correct
import CourseCard from "../components/CourseCard"; // Ensure this path is correct

// Helper arrays for UI
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const ROLES = [
  { id: "", name: "All Roles" },
  { id: "ai-generalist", name: "AI Generalist" },
  { id: "data-scientist", name: "Data Scientist" },
  { id: "ml-engineer", name: "ML Engineer" },
  { id: "nlp-engineer", name: "NLP Engineer" },
  { id: "product-manager", name: "Product Manager" },
  { id: "researcher", name: "Researcher" },
  { id: "ethics-analyst", name: "Ethics Analyst" },
  { id: "data-engineer", name: "Data Engineer" },
  { id: "prompt-engineer", name: "Prompt Engineer" }
];

export default function Learning() {
  const [courses, setCourses] = useState([]);
  const [level, setLevel] = useState(""); // Default to empty string for "All Levels"
  const [roleId, setRoleId] = useState(""); // Default to empty string for "All Roles"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        let qRef = collection(db, "courses"); // Start with base collection ref
        let queryConstraints = []; // Array to hold 'where' clauses

        if (level) {
          queryConstraints.push(where("level", "==", level));
        }
        if (roleId) {
          queryConstraints.push(where("roleId", "==", roleId));
        }

        // Apply all query constraints if any exist
        const finalQuery = queryConstraints.length > 0
          ? query(qRef, ...queryConstraints)
          : qRef; // If no constraints, just use the base collection reference

        const snap = await getDocs(finalQuery);
        setCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.error("Error fetching courses:", e);
        setError("Could not load courses. Please check console for details.");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [level, roleId]); // Re-fetch whenever level or roleId changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 lg:p-12 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-md">
          Deep Dive into AI Learning Paths
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Unlock new skills and knowledge with our curated courses. Filter by
          difficulty or desired AI role to find your perfect learning journey.
        </p>

        {/* Filters Section */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1v-10zm10 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" />
            </svg>
            Filter Your Courses
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Level Filter */}
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Difficulty Level:
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setLevel("")}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-md
                    ${level === "" ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  All Levels
                </button>
                {LEVELS.map(l => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-md
                      ${level === l ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Filter */}
            <div className="flex-1 md:ml-6">
              <label htmlFor="role-select" className="block text-gray-700 text-sm font-semibold mb-2">
                AI Role:
              </label>
              <div className="relative">
                <select
                  id="role-select"
                  className="block w-full px-4 py-2 pr-8 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200 shadow-md"
                  value={roleId}
                  onChange={e => setRoleId(e.target.value)}
                >
                  {ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Display */}
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading courses, empowering your future...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-xl text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 shadow-md">
              Error: {error}
            </p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-md">
              No courses found for the selected filters. Try adjusting your selections!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        )}
      </div>
    </div>
  );
}
