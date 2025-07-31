// src/components/CourseCard.jsx
import { useAuth } from "@src/hooks/useAuth.jsx"; // Ensure @src alias
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@src/firebase/config"; // Ensure @src alias

export default function CourseCard({ course }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleCheckout() {
    if (!user) {
      alert("Please log in to enroll.");
      navigate("/login");
      return;
    }

    // Fetch user's referrerId if any (from their Firestore user document)
    let referrerId = "";
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        referrerId = userDoc.data()?.referrerId || "";
      }
    } catch (error) {
      console.error("Error fetching referrerId:", error);
      // Continue without referrerId if there's an error
    }

    try {
      // Call your Firebase Cloud Function to create a Stripe Checkout Session
      // This path needs to match your deployed function's URL (relative to your app)
      const response = await fetch(
        "/createStripeCheckoutSession", // This should point to your deployed function's endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId: course.id || course.courseId, // Ensure you send the correct ID
            referrerId: referrerId, // Pass the captured referrerId
            userId: user.uid // Pass the authenticated user's UID
          })
        }
      );
      const data = await response.json();
      if (data.url) {
        // Redirect to Stripe Checkout page
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout session. Please try again.");
        console.error("Checkout session creation failed:", data);
      }
    } catch (error) {
      console.error("An error occurred during checkout:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // Important: Ensure your course object has 'title' and 'cost' fields
  // This is a minimal example, adjust your card structure as needed.
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between h-full">
      {/* Example Course Image (optional) */}
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-xl mb-2">{course.title || "Course Title"}</h3>
        <p className="text-gray-700 text-sm mb-2">{course.description || "A comprehensive course."}</p>
        <p className="text-blue-600 font-semibold text-lg">
          ${(course.cost || 0).toFixed(2)}
        </p>
      </div>
      <div className="p-4 bg-gray-50 border-t">
        {/* Conditional display of affiliate link or Enroll & Pay button */}
        {course.courseAffiliateLink ? (
          <a
            href={course.courseAffiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
          >
            Go to Course Provider
          </a>
        ) : (
          <button
            onClick={handleCheckout}
            className="inline-block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Enroll & Pay
          </button>
        )}
      </div>
    </div>
  );
}
