// src/pages/Projects.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import ProjectCard from "../components/ProjectCard";

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
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Project Ideas</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <input
          type="text"
          placeholder="Search by title, memo, skills, or tech stack..."
          className="border border-gray-300 px-4 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          {ROLE_OPTIONS.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value="">All Levels</option>
          {DIFFICULTY.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading projects...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : displayed.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          No projects found matching your criteria. Try adjusting the filters.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map(project => (
            <ProjectCard key={project.projectId} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
