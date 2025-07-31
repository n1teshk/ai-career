// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import BlogCard from "../components/BlogCard"; // Assume BlogCard is designed to fit the new aesthetic

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const q = query(
          collection(db, "blog"),
          orderBy("publishedAt", "desc"),
          limit(10) // Limiting to 10 for initial load, can add pagination later
        );
        const snap = await getDocs(q);
        setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.error("Error fetching posts:", e);
        setError("Could not load blog posts. Please check console for details.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 lg:p-12 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-md">
          AI Career Insights Blog
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Stay ahead in the AI world with expert articles, in-depth analyses,
          and the latest trends shaping the future of work.
        </p>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading insightful articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-xl text-red-600 bg-red-50 p-6 rounded-lg border border-red-200 shadow-md">
              Error: {error}
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-16 border border-dashed border-gray-300 rounded-2xl bg-white shadow-lg">
            No blog posts found yet. Check back soon for new content!
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              // Assuming BlogCard takes 'post' and has a 'key' prop based on post.id or post.slug
              <BlogCard key={post.id || post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
