import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link className="mt-4 inline-block text-blue-600 hover:underline" to="/">Go Home</Link>
    </div>
  );
}
