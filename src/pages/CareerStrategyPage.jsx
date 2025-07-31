import React from 'react';
import { Link } from 'react-router-dom';
import aiRolesData from '@src/data/ai-roles-data.json'; // Adjust path if needed

export default function CareerStrategyPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
          Explore AI Career Roles
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Discover a wide range of AI-related career paths, each with detailed insights into responsibilities, skills, and learning resources.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiRolesData.map((role) => (
          <div key={role.career_info.slug} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                {role.role_name}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {role.career_info.tagline}
              </p>
              <ul className="text-gray-700 text-sm space-y-1 mb-4">
                <li><strong>Salary Range:</strong> {role.career_info.average_salary_range.mid_level} (Mid-Level)</li>
                <li><strong>Job Growth:</strong> {role.career_info.market_data.job_growth_rate}</li>
                <li><strong>Competition:</strong> {role.career_info.market_data.competition_level}</li>
              </ul>
              <Link
                to={`/career-strategy/${role.career_info.slug}`}
                className="inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
