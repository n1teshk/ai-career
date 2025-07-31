// src/components/ProjectCard.jsx
import { useAuth } from "../hooks/useAuth.jsx";
import { db } from "../firebase/config";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore"; // Import getDoc
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProjectCard({ project }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false); // State to track if project is saved

  // Check if the project is already saved by the current user when the component mounts or user changes
  useEffect(() => {
    async function checkIfSaved() {
      if (user && project?.projectId) { // Ensure user and projectId exist
        try {
          const userProjectRef = doc(db, "users", user.uid, "saved_projects", project.projectId);
          const userProjectSnap = await getDoc(userProjectRef);
          setSaved(userProjectSnap.exists());
        } catch (error) {
          console.error("Error checking if project is saved:", error);
          // Don't block UI on this error, but log it.
        }
      } else {
        setSaved(false); // Not logged in or no project ID, so not saved
      }
    }
    checkIfSaved();
  }, [user, project?.projectId]); // Re-run when user or project ID changes

  const handleSave = async (e) => {
    e.stopPropagation(); // Prevent card click from navigating
    if (!user) {
      alert("Please log in to save this project.");
      navigate("/login"); // Redirect to login page
      return;
    }

    if (saved) { // Prevent saving again if already saved
      alert("This project is already saved to your dashboard!");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", user.uid, "saved_projects", project.projectId),
        {
          projectId: project.projectId,
          title: project.title || "Untitled Project", // Add fallback for title
          imageUrl: project.imageUrl || "", // Add fallback for imageUrl
          savedAt: serverTimestamp()
        },
        { merge: true }
      );
      setSaved(true); // Update state to reflect it's saved
      alert("Project saved to your dashboard!"); // User feedback
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden group"
      onClick={() => navigate(`/projects/${project.projectId}`)}
    >
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-bold text-lg text-gray-800">{project.title}</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase font-medium">
            {project.difficulty}
          </span>
        </div>
        <div className="text-sm text-gray-500 mb-2 capitalize">
          Role: {project.roleId ? project.roleId.replace(/-/g, " ") : "N/A"} {/* Added check for roleId */}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Est. Time: {project.timeEstimate}
        </div>
        <button
          className={`mt-auto px-4 py-2 rounded-lg transition-colors duration-200 shadow-md ${
            saved
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          onClick={handleSave}
          disabled={saved} // Disable button if already saved
        >
          {saved ? "Saved to Dashboard" : "Save to Dashboard"}
        </button>
      </div>
    </div>
  );
}
