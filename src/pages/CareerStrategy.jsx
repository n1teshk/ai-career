// src/pages/CareerStrategy.jsx
import { useEffect, useState } from "react";
import aiRoles from "../data/ai-roles-dataset.json"; // Place the dataset in src/data/
import { useAuth } from "../hooks/useAuth.jsx"; // Ensure .jsx extension
import { db } from "../firebase/config";
import { doc, setDoc, getDocs, collection, where, query, serverTimestamp } from "firebase/firestore"; // Import serverTimestamp
import CourseCard from "../components/CourseCard"; // Ensure this path is correct

export default function CareerStrategy() {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [parsedSkills, setParsedSkills] = useState([]);
  const [roleMatches, setRoleMatches] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [matchedCourses, setMatchedCourses] = useState([]);
  const [err, setErr] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false); // New loading state for courses

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
      setErr("Please enter some skills to get recommendations.");
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
    setLoadingCourses(true); // Start loading

    // Fetch courses matching roleId
    try {
      // If no role.roleId or it's empty, return early to avoid invalid query
      if (!role.roleId) {
        setErr("Invalid role selected. No courses can be loaded.");
        setLoadingCourses(false); // Stop loading
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
    } finally {
      setLoadingCourses(false); // Stop loading
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 lg:p-12 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-md">
          AI Career Blueprint: Skill Assessment
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Uncover your ideal AI career path by analyzing your current skills.
          Receive personalized role recommendations and relevant learning resources.
        </p>

        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.329 1.176l1.519 4.674c.3.921-.755 1.688-1.538 1.11L12 18.271l-4.285 3.102c-.783.57-1.838-.192-1.538-1.11l1.519-4.674a1 1 0 00-.329-1.176l-3.976-2.888c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
            </svg>
            Your Skills, Your Future
          </h2>
          <label htmlFor="skill-input" className="block mb-3 font-semibold text-gray-700">
            Enter your current skills (comma or newline separated):
          </label>
          <textarea
            id="skill-input"
            className="w-full border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-y shadow-sm"
            rows={5}
            placeholder="e.g. Python, SQL, Deep Learning, Pandas, Machine Learning, NLP, Data Visualization"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 ease-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
            onClick={handleParseSkills}
          >
            Analyze Skills & Find Roles
          </button>

          <div className="mb-4 text-sm text-gray-500 mt-4">
            <span className="text-gray-600 font-medium">Coming Soon:</span>{" "}
            <span className="text-blue-600 underline decoration-dashed hover:text-blue-700 cursor-pointer">LinkedIn CSV Upload</span>{" "}
            &bull;{" "}
            <span className="text-blue-600 underline decoration-dashed hover:text-blue-700 cursor-pointer">OAuth Skill Import</span>
          </div>
        </section>

        {err && (
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg mb-6 shadow-md flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {err}
          </div>
        )}

        {/* Display Top Recommended Roles */}
        {roleMatches.length > 0 && !selectedRole && (
          <section className="mt-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Top AI Role Recommendations
            </h2>
            <div className="grid gap-6">
              {roleMatches.map(role => (
                <article key={role.roleId} className="bg-white p-7 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 ease-out flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="font-bold text-2xl text-blue-700 mb-2">{role.roleName}</h3>
                    <p className="text-gray-700 text-lg">
                      Match: <span className="font-semibold text-green-600">{role.matchPct}%</span>
                    </p>
                    {role.missingSkills.length > 0 &&
                      <div className="mt-4">
                        <p className="font-medium text-red-600 mb-2 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Skills to Develop:
                        </p>
                        <ul className="ml-2 list-disc list-inside text-sm text-red-500 grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {role.missingSkills.map(skill => <li key={skill}>{skill}</li>)}
                        </ul>
                      </div>
                    }
                  </div>
                  <button
                    className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 ease-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
                    onClick={() => handleSelectRole(role)}
                  >
                    Explore Role & Courses
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Display Selected Role Details and Courses */}
        {selectedRole && (
          <section className="mt-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <button
              className="mb-6 px-5 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm"
              onClick={() => setSelectedRole(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Recommendations
            </button>
            <h2 className="text-3xl font-bold text-blue-700 mb-4">{selectedRole.roleName}</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">{selectedRole.description}</p>

            <div className="mb-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
              <span className="font-semibold text-gray-800 text-xl block mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Key Skills for Success:
              </span>
              <ul className="list-disc ml-6 text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4">
                {selectedRole.requiredSkills.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </div>

            <div className="mb-6 bg-purple-50 p-5 rounded-lg border border-purple-100">
              <span className="font-semibold text-gray-800 text-xl block mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9.247a8.672 8.672 0 00-1.65-.678c-.707-.233-1.488-.233-2.195 0L4 9m3.047 3.047L3 15m5.541-4.41a9.058 9.058 0 01.954-.83l1.833-1.423M12 15l3.047 3.047m-6.094 0L6 18.5m5.541-4.41a9.058 9.058 0 00.954-.83L12 12m0 0l-1.459-1.063m0 0a8.672 8.672 0 01-1.65-.678m-.206 6.549L9 16.5m2.049-5.903a8.672 8.672 0 00-1.65-.678m-.206 6.549L9 16.5m2.049-5.903a8.672 8.672 0 00-1.65-.678" />
                </svg>
                Sample Interview Questions:
              </span>
              <ul className="list-disc ml-6 text-gray-700">
                {selectedRole.interviewQuestions.map(q => <li key={q}>{q}</li>)}
              </ul>
            </div>

            <div className="mb-6 bg-green-50 p-5 rounded-lg border border-green-100">
              <span className="font-semibold text-gray-800 text-xl block mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Relevant Courses:
              </span>
              {loadingCourses ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading courses for this role...</p>
                </div>
              ) : !matchedCourses.length ? (
                <p className="text-gray-600 mt-1">No relevant courses found for this role at the moment. Check back soon!</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 mt-3">
                  {matchedCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>

            {user && (
              <div className="mt-6 p-4 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg flex items-center gap-3 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium">Your selected role match has been saved to your profile!</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
