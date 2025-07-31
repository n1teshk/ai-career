// src/pages/Dashboard.jsx
import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard!</h1>
        <p className="text-gray-600">
          This is a placeholder for your user dashboard. You can add personalized content,
          learning progress, saved projects, and more here.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">My Learning Path</h2>
            <p className="text-gray-700">Continue your journey: Next module on Machine Learning Fundamentals.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Saved Projects</h2>
            <p className="text-gray-700">View and manage your saved portfolio projects.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
