// src/pages/PostView.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // Ensure this path is correct
import ReactMarkdown from "react-markdown"; // Ensure this import is present

export default function PostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const q = query(
          collection(db, "posts"),
          where("slug", "==", slug),
          limit(1)
        );
        const snap = await getDocs(q);
        if (snap.empty) {
          setError("Post not found.");
        } else {
          setPost(snap.docs[0].data());
        }
      } catch (e) {
        console.error("Error loading post:", e); // Log error for debugging
        setError("Error loading post. Please check console for details.");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]); // Rerun when slug changes

  if (loading) return <div className="text-center">Loading post...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!post) return <div className="text-center text-gray-600">Post data is empty.</div>; // Fallback if post is null but no error

  // Ensure publishedAt is a Firebase Timestamp for consistent date conversion
  const publishedDate = post.publishedAt?.seconds
    ? new Date(post.publishedAt.seconds * 1000).toLocaleDateString()
    : 'N/A';

  return (
    <article className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow"> {/* Added padding and background for better look */}
      <img
        src={post.coverImage}
        alt={post.title}
        className="rounded mb-4 w-full object-cover h-60"
      />
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-gray-500 text-sm mb-6">
        By {post.author || 'Unknown'} &middot; {publishedDate}
        <span className="ml-2">
          {post.tags && post.tags.map(tag => (
            <span key={tag} className="inline-block bg-gray-200 text-xs rounded px-2 py-0.5 mr-2">#{tag}</span>
          ))}
        </span>
      </div>
      <div className="prose sm:prose-lg mb-8">
        {/* The 'prose' class from @tailwindcss/typography enhances Markdown rendering */}
        <ReactMarkdown>
          {post.content}
        </ReactMarkdown>
      </div>
      <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
    </article>
  );
}
