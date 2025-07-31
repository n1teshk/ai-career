// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import BlogCard from "../components/BlogCard";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(
          collection(db, "blog"),
          orderBy("publishedAt", "desc"),
          limit(10)
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

  if (loading) return <div className="text-center">Loading posts...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (posts.length === 0 && !loading && !error) return <div className="text-center text-gray-600">No blog posts found yet.</div>;


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Career Insights Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map(post => <BlogCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
