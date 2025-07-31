// src/pages/ProjectDetailView.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth.jsx";
import ReactMarkdown from "react-markdown";

export default function ProjectDetailView() {
  const { id } = useParams(); // Get the projectId from the URL
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle, saving, saved, error

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setSaveStatus("idle"); // Reset save status on project load
      try {
        const ref = doc(db, "projects", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProject(snap.data());
          // Check if currently logged in user has saved this project
          if (user) {
            const userProjectRef = doc(db, "users", user.uid, "saved_projects", id);
            const userProjectSnap = await getDoc(userProjectRef);
            if (userProjectSnap.exists()) {
              setSaveStatus("saved");
            }
          }
        } else {
          setProject(null); // Project not found
        }
      } catch (e) {
        console.error("Error fetching project:", e);
        setProject(null); // Ensure project is null on error
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id, user]); // Re-fetch if ID or user changes

  const handleSave = async () => {
    if (!user) {
      alert("Please log in to save this project.");
      navigate("/login");
      return;
    }
    setSaveStatus("saving");
    try {
      await setDoc(
        doc(db, "users", user.uid, "saved_projects", id),
        { projectId: id, savedAt: serverTimestamp(), title: project.title, imageUrl: project.imageUrl },
        { merge: true }
      );
      setSaveStatus("saved");
      alert("Project saved to your dashboard!");
    } catch (error) {
      console.error("Error saving project from detail view:", error);
      setSaveStatus("error");
      alert("Failed to save project. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-8">Loading project details...</p>;
  if (!project) return <p className="text-center text-red-500 mt-8">Project not found.</p>;

  const saveButtonText =
    saveStatus === "saved"
      ? "Saved to Dashboard!"
      : saveStatus === "saving"
      ? "Saving..."
      : "Save to Dashboard";

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-xl p-8">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        ← Back to Project Ideas
      </button>

      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="mb-6 w-full object-cover h-64 rounded-lg shadow-inner"/>
      )}

      <h1 className="text-3xl font-bold mb-3 text-blue-700">{project.title}</h1>

      <div className="flex flex-wrap gap-2 mb-4 text-sm font-medium">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{project.difficulty}</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full capitalize">
          Role: {project.roleId.replace(/-/g, " ")}
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          Est. Time: {project.timeEstimate}
        </span>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-800">Skills Demonstrated:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.skillsDemonstrated && project.skillsDemonstrated.map(skill => (
            <span key={skill} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full border border-gray-300">{skill}</span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <span className="font-semibold text-gray-800">Tech Stack:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.techStack && project.techStack.map(tech => (
            <span key={tech} className="text-sm bg-gray-300 text-gray-800 px-3 py-1 rounded-full border border-gray-400">{tech}</span>
          ))}
        </div>
      </div>

      <div className="prose prose-blue max-w-none mb-8 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Project Outline:</h2>
        <ReactMarkdown>{project.memo}</ReactMarkdown>
      </div>

      <button
        className={`w-full px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${
          saveStatus === "saved"
            ? "bg-gray-400 text-white cursor-not-allowed"
            : saveStatus === "saving"
            ? "bg-blue-400 text-white cursor-wait"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
        onClick={handleSave}
        disabled={saveStatus === "saved" || saveStatus === "saving"}
      >
        {saveButtonText}
      </button>

      {saveStatus === "error" && (
        <p className="text-red-500 text-center mt-3">Error saving project.</p>
      )}
    </div>
  );
}
