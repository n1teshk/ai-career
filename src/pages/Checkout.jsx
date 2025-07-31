// src/pages/Checkout.jsx
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Add Link

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const success = params.get("success");
  const canceled = params.get("canceled");
  const sessionId = params.get("session_id"); // Capture session ID if needed

  useEffect(() => {
    if (success) {
      console.log("Payment successful! Session ID:", sessionId);
      // Optional: You could fetch more details about the session from your backend here
      // using the sessionId if needed for more robust confirmation.

      // Redirect to dashboard after a delay
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 5000); // Redirect after 5 seconds
      return () => clearTimeout(timer);
    } else if (canceled) {
      console.log("Payment canceled.");
      // No automatic redirect for canceled, user can decide to go back or try again
    }
  }, [success, canceled, sessionId, navigate]); // Add sessionId to dependencies

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center border border-gray-200">
        {success && (
          <>
            <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-gray-700 text-lg mb-6">
              Thank you for your purchase. You will be redirected to your Dashboard shortly.
            </p>
            <Link to="/dashboard" className="text-blue-600 hover:underline font-medium">
              Go to Dashboard now
            </Link>
          </>
        )}
        {canceled && (
          <>
            <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Canceled</h1>
            <p className="text-gray-700 text-lg mb-6">
              You have canceled the payment process. Your order was not completed.
            </p>
            <p className="text-gray-600 mb-4">
              You can always try again or explore more options:
            </p>
            <div className="flex flex-col space-y-3">
              <Link to="/learning" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Browse Courses
              </Link>
              <Link to="/dashboard" className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                Go to Dashboard
              </Link>
            </div>
          </>
        )}
        {!success && !canceled && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Processing Payment...</h1>
            <p className="text-gray-600">Please do not close this window.</p>
          </>
        )}
      </div>
    </div>
  );
}
