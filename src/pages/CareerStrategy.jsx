// src/pages/CareerStrategy.jsx
import { useEffect, useState } from "react";
import aiRoles from "../data/ai-roles-dataset.json"; // Place the dataset in src/data/
import { useAuth } from "../hooks/useAuth.jsx"; // Ensure .jsx extension
import { db } from "../firebase/config";
import { doc, setDoc, getDocs, collection, where, query } from "firebase/firestore";
import CourseCard from "../components/CourseCard"; // Ensure this path is correct

export default function CareerStrategy() {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [parsedSkills, setParsedSkills] = useState([]);
  const [roleMatches, setRoleMatches] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [matchedCourses, setMatchedCourses] = useState([]);
  const [err, setErr] = useState("");

  // Skill parsing and matching
  function handleParseSkills() {
    setErr(""); // Clear previous errors
    let skills = input
      .split(/,|\n/)
      .map(skill => skill.trim().toLowerCase())
      .filter(skill => skill.length > 0);
    setParsedSkills(skills);

    if (skills.length === 0) {
      setRoleMatches([]);
      setSelectedRole(null);
      setMatchedCourses([]);
      return;
    }

    // Matching
    const matches = aiRoles.map(role => {
      const reqSkills = role.requiredSkills.map(s => s.toLowerCase());
      const intersection = reqSkills.filter(s => skills.includes(s));
      const union = Array.from(new Set([...reqSkills, ...skills])); // Correct union calculation
      const matchPct = union.length === 0 ? 0 : Math.round((intersection.length / union.length) * 100);
      const missing = reqSkills.filter(s => !skills.includes(s));
      return {
        ...role,
        matchPct,
        missingSkills: missing
      };
    });
    matches.sort((a, b) => b.matchPct - a.matchPct);
    setRoleMatches(matches.slice(0, 3)); // Top 3 roles
    setSelectedRole(null); // Reset selected role when new skills are parsed
    setMatchedCourses([]); // Clear courses
  }

  // On selecting a role, show details and fetch courses
  async function handleSelectRole(role) {
    setSelectedRole(role);
    setErr(""); // Clear previous errors
    setMatchedCourses([]); // Clear courses while loading new ones

    // Fetch courses matching roleId
    try {
      // If no role.roleId or it's empty, return early to avoid invalid query
      if (!role.roleId) {
        setErr("Invalid role selected. No courses can be loaded.");
        return;
      }
      const q = query(collection(db, "courses"), where("roleId", "==", role.roleId));
      const snap = await getDocs(q);
      setMatchedCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Save to Firestore if user is logged in
      if (user) {
        await setDoc(
          doc(db, "users", user.uid, "selected_role"),
          {
            roleId: role.roleId,
            roleName: role.roleName, // Also save roleName for easier lookup
            matchPct: role.matchPct,
            selectedAt: serverTimestamp() // Use serverTimestamp for Firestore consistency
          },
          { merge: true } // Use merge so you don't overwrite other user data
        );
        console.log("Selected role saved for user:", user.uid);
      }
    } catch (e) {
      console.error("Error loading matching courses or saving selected role:", e);
      setErr("Could not load matching courses or save your selection. Please check console for details.");
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Career Strategy: Skill Assessment</h1>
      <label htmlFor="skill-input" className="block mb-2 font-semibold text-gray-700">
        Enter your skills (comma or newline separated):
      </label>
      <textarea
        id="skill-input"
        className="w-full border border-gray-300 rounded p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="e.g. Python, SQL, Deep Learning, Pandas, Machine Learning"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
        onClick={handleParseSkills}
      >
        Parse Skills & Find Roles
      </button>

      <div className="mb-4 text-sm text-gray-500 mt-2">
        <span className="text-gray-400">Coming Soon: <u>LinkedIn CSV Upload</u> &bull; <u>OAuth Skill Import</u></span>
      </div>

      {err && <div className="text-red-500 bg-red-100 p-3 rounded mt-4">{err}</div>}

      {/* Display Top Recommended Roles */}
      {roleMatches.length > 0 && !selectedRole && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Top Recommended AI Roles</h2>
          <div className="grid gap-4">
            {roleMatches.map(role => (
              <div key={role.roleId} className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-blue-700">{role.roleName}</h3>
                    <p className="text-gray-700 mt-1">Match: <span className="font-semibold text-blue-600">{role.matchPct}%</span></p>
                    {role.missingSkills.length > 0 &&
                      <div className="mt-2">
                        <p className="font-medium text-red-700">Missing Skills:</p>
                        <ul className="ml-6 list-disc text-sm text-red-600">
                          {role.missingSkills.map(skill => <li key={skill}>{skill}</li>)}
                        </ul>
                      </div>
                    }
                  </div>
                  <button
                    className="mt-4 md:mt-0 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
                    onClick={() => handleSelectRole(role)}
                  >
                    View Details & Courses
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Selected Role Details and Courses */}
      {selectedRole && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <button
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            onClick={() => setSelectedRole(null)}
          >
            ← Back to Recommendations
          </button>
          <h2 className="text-3xl font-bold mb-3 text-blue-700">{selectedRole.roleName}</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">{selectedRole.description}</p>

          <div className="mb-4">
            <span className="font-semibold text-gray-800">Required Skills:</span>
            <ul className="list-disc ml-6 mt-1 text-gray-700">
              {selectedRole.requiredSkills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>
          </div>

          <div className="mb-4">
            <span className="font-semibold text-gray-800">Sample Interview Questions:</span>
            <ul className="list-disc ml-6 mt-1 text-gray-700">
              {selectedRole.interviewQuestions.map(q => <li key={q}>{q}</li>)}
            </ul>
          </div>

          <div className="mb-6">
            <span className="font-semibold text-gray-800">Relevant Courses:</span>
            {!matchedCourses.length ? (
              <p className="text-gray-600 mt-1">No relevant courses found for this role.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-3">
                {matchedCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>

          {user && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded-md">
              <p>Your selected role match has been saved to your profile!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
