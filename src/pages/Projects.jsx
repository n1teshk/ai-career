// src/pages/Projects.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import ProjectCard from "../components/ProjectCard"; // Assume ProjectCard is designed to fit the new aesthetic

const DIFFICULTY = ["Beginner", "Intermediate", "Advanced"];
const ROLE_OPTIONS = [
  { id: "", name: "All Roles" },
  { id: "data-scientist", name: "Data Scientist" },
  { id: "ml-engineer", name: "ML Engineer" },
  { id: "nlp-engineer", name: "NLP Engineer" },
  { id: "ai-product-manager", name: "AI Product Manager" },
  { id: "prompt-engineer", name: "Prompt Engineer" }
];

export default function Projects() {
  const [projects, setProjects] = useState([]); // All projects from Firestore
  const [displayed, setDisplayed] = useState([]); // Projects after filtering/searching
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial fetch (load all projects once)
  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const snap = await getDocs(collection(db, "projects"));
        const fetchedProjects = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(fetchedProjects);
        // setDisplayed will be handled by the filtering useEffect
      } catch (e) {
        console.error("Error fetching projects:", e);
        setError("Could not load project ideas. Please check console for details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []); // Empty dependency array means this runs once on mount

  // Search & filter logic (client-side)
  useEffect(() => {
    let filtered = projects; // Start with the full list of projects

    if (role) {
      filtered = filtered.filter(p => p.roleId === role);
    }
    if (difficulty) {
      filtered = filtered.filter(p => p.difficulty === difficulty);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        p =>
          (p.title && p.title.toLowerCase().includes(s)) || // Check if title exists before converting to lowercase
          (p.memo && p.memo.toLowerCase().includes(s)) ||   // Check if memo exists
          (p.skillsDemonstrated && Array.isArray(p.skillsDemonstrated) && p.skillsDemonstrated.some(skill => skill.toLowerCase().includes(s))) ||
          (p.techStack && Array.isArray(p.techStack) && p.techStack.some(tech => tech.toLowerCase().includes(s)))
      );
    }
    setDisplayed(filtered);
  }, [search, role, difficulty, projects]); // Re-run when filters or original projects change

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 lg:p-12 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-md">
          Hands-On AI Projects
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform theory into practice with real-world AI projects. Filter by
          role, difficulty, or search for specific technologies to find your next challenge.
        </p>

        {/* Filter & Search Section */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6m3 10V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V6" />
            </svg>
            Find Your Next Project
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search Input */}
            <div className="flex-grow w-full">
              <label htmlFor="search-input" className="sr-only">Search Projects</label>
              <input
                id="search-input"
                type="text"
                placeholder="Search by title, skills, or tech stack..."
                className="w-full bg-gray-50 border border-gray-300 px-5 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <div className="w-full md:w-auto flex-shrink-0">
              <label htmlFor="role-select" className="sr-only">Filter by Role</label>
              <div className="relative">
                <select
                  id="role-select"
                  className="block w-full px-5 py-3 pr-10 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none transition-all duration-200 shadow-sm"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  {ROLE_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="w-full md:w-auto flex-shrink-0">
              <label htmlFor="difficulty-select" className="sr-only">Filter by Difficulty</label>
              <div className="relative">
                <select
                  id="difficulty-select"
                  className="block w-full px-5 py-3 pr-10 rounded-full border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none transition-all duration-200 shadow-sm"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                >
                  <option value="">All Levels</option>
                  {DIFFICULTY.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project List Display */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading innovative projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-xl text-red-600 bg-red-50 p-6 rounded-lg border border-red-200 shadow-md">
              Error: {error}
            </p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-16 border border-dashed border-gray-300 rounded-2xl bg-white shadow-lg">
            No projects found matching your criteria. Try adjusting the filters or search terms.
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map(project => (
              // Assuming ProjectCard needs a 'key' prop, use project.id if available from Firestore
              <ProjectCard key={project.id || project.projectId} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
