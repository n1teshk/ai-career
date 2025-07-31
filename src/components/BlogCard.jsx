// src/components/BlogCard.jsx
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  // Ensure post.publishedAt is a Firebase Timestamp for consistent date conversion
  const publishedDate = post.publishedAt?.seconds
    ? new Date(post.publishedAt.seconds * 1000).toLocaleDateString()
    : 'N/A'; // Handle cases where publishedAt might be missing or not a timestamp

  // Safely access content and truncate
  const displayContent = post.content
    ? (post.content.length > 140
        ? post.content.slice(0, 140) + "..."
        : post.content)
    : ''; // Default to empty string if content is missing

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden flex flex-col">
      <Link to={`/blog/${post.slug}`}>
        <img src={post.coverImage} alt={post.title}
             className="w-full h-48 object-cover"/>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">{post.title}</h2>
        </Link>
        <p className="text-sm text-gray-500 mb-2">
          By {post.author || 'Unknown'} &ndash; {publishedDate}
        </p>
        <p className="text-gray-700 flex-1 mb-2">
          {displayContent}
        </p>
        <div className="mt-2">
          {post.tags && post.tags.map(tag =>
            <span key={tag} className="inline-block bg-gray-200 text-gray-600 rounded px-2 py-0.5 mr-2 text-xs">
              #{tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
