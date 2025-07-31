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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Find Your Next Step in AI</h1>

      {/* Level Filter */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => setLevel("")}
          className={`px-4 py-2 rounded ${level === "" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          All Levels
        </button>
        {LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-4 py-2 rounded ${level === l ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Role Filter */}
      <div className="mb-6">
        <select
          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roleId}
          onChange={e => setRoleId(e.target.value)}
        >
          {ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      {/* Content Display */}
      {loading ? (
        <p className="text-center text-gray-600">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-600">No courses found for the selected filters.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
