// src/pages/RoleDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import aiRolesData from '@src/data/ai-roles-data.json'; // Adjust path if needed

export default function RoleDetails() {
  const { roleSlug } = useParams(); // This will get the 'machine-learning-engineer' part from the URL
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Find the role in your imported dataset based on the URL slug
    const foundRole = aiRolesData.find(
      (r) => r.career_info.slug === roleSlug
    );
    setRole(foundRole);
    setLoading(false);
  }, [roleSlug]); // Re-run effect if roleSlug changes

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p>Loading role details...</p></div>;
  }

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <h1 className="text-2xl font-bold mb-4">Role Not Found</h1>
        <p className="mb-6">The career role you're looking for doesn't exist.</p>
        <Link to="/career-strategy" className="text-indigo-600 hover:underline">
          Go back to Career Strategy
        </Link>
      </div>
    );
  }

  // Destructure data for easier access
  const { career_info, blog_posts, learning_resources } = role;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">
          {role.role_name}
        </h1>
        <p className="text-xl text-gray-700">{career_info.tagline}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{career_info.description}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {/* Responsibilities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {career_info.key_responsibilities.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>
        </div>

        {/* Salary Range */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Average Salary (USD/Year)</h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong className="font-medium">Junior:</strong> {career_info.average_salary_range.junior}</li>
            <li><strong className="font-medium">Mid-Level:</strong> {career_info.average_salary_range.mid_level}</li>
            <li><strong className="font-medium">Senior:</strong> {career_info.average_salary_range.senior}</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            Note: Salaries vary significantly by location, company size, and experience.
          </p>
        </div>

        {/* Soft Skills */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Soft Skills</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {career_info.required_skills.soft_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expanded Skills Section */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills Deep Dive</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Core Technical Skills</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {career_info.required_skills.core_technical_skills.map((s, idx) => (
                <li key={idx}><strong>{s.skill}</strong> ({s.proficiency_level} proficiency, {s.importance} importance)</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Emerging & Nice-to-Have Skills</h3>
            <p className="font-medium text-gray-800 mb-1">Emerging:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {career_info.required_skills.emerging_skills.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
            <p className="font-medium text-gray-800 mb-1">Nice-to-Have:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {career_info.required_skills.nice_to_have.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Industry Trends & Market Data */}
      <section className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Industry Insights & Market Outlook</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Industry Trends Impact</h3>
            <p className="text-gray-700 leading-relaxed">{career_info.industry_trends_impact}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Market Data</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong className="font-medium">Job Growth Rate:</strong> {career_info.market_data.job_growth_rate}</li>
              <li><strong className="font-medium">Total Job Openings (2025 est.):</strong> {career_info.market_data.total_job_openings}</li>
              <li><strong className="font-medium">Remote Work Availability:</strong> {career_info.market_data.remote_work_availability}</li>
              <li><strong className="font-medium">Top Hiring Industries:</strong> {career_info.market_data.top_hiring_industries.join(', ')}</li>
              <li><strong className="font-medium">Geographic Hotspots:</strong> {career_info.market_data.geographic_hotspots.join(', ')}</li>
              <li><strong className="font-medium">Competition Level:</strong> {career_info.market_data.competition_level}</li>
              <li><strong className="font-medium">Entry Barrier:</strong> {career_info.market_data.entry_barrier}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Portfolio Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {career_info.portfolio_projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{project.project_type}</h3>
              <p className="text-gray-700 mb-3">{project.description}</p>
              <p className="text-gray-600 text-sm">
                <strong className="font-medium">Technologies:</strong> {project.key_technologies.join(', ')}
              </p>
              <p className="text-gray-600 text-sm">
                <strong className="font-medium">Complexity:</strong> {project.complexity_level}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interview Preparation */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview Preparation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Common Questions & Assessments</h3>
            <p className="font-medium text-gray-800 mb-1">Common Questions:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {career_info.interview_preparation.common_questions.map((q, idx) => <li key={idx}>{q}</li>)}
            </ul>
            <p className="font-medium text-gray-800 mb-1">Technical Assessments:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {career_info.interview_preparation.technical_assessments.map((t, idx) => <li key={idx}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Preparation Resources</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {career_info.interview_preparation.preparation_resources.map((res, idx) => (
                <li key={idx}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {res.resource}
                  </a> ({res.type}) - {res.focus}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Path</h2>
        <div className="space-y-8">
          {/* Beginner Path */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Beginner Path ({learning_resources.beginner_path.duration})</h3>
            <p className="font-medium text-gray-800 mb-2">Free Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.beginner_path.free_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Paid Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.beginner_path.paid_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration}, Certificate: {course.offers_certificate ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Project Milestones:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {learning_resources.beginner_path.project_milestones.map((milestone, idx) => <li key={idx}>{milestone}</li>)}
            </ul>
          </div>

          {/* Intermediate Path */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Intermediate Path ({learning_resources.intermediate_path.duration})</h3>
            <p className="text-gray-600 mb-2">Prerequisites: {learning_resources.intermediate_path.prerequisites.join(', ')}</p>
            <p className="font-medium text-gray-800 mb-2">Free Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.intermediate_path.free_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Paid Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.intermediate_path.paid_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration}, Certificate: {course.offers_certificate ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Project Milestones:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {learning_resources.intermediate_path.project_milestones && learning_resources.intermediate_path.project_milestones.map((milestone, idx) => <li key={idx}>{milestone}</li>)}
            </ul>
          </div>

          {/* Advanced Path */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Advanced Path ({learning_resources.advanced_path.duration})</h3>
            <p className="text-gray-600 mb-2">Prerequisites: {learning_resources.advanced_path.prerequisites.join(', ')}</p>
            <p className="font-medium text-gray-800 mb-2">Free Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.advanced_path.free_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Paid Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.advanced_path.paid_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration}, Certificate: {course.offers_certificate ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* High Quality Videos */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">High-Quality Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learning_resources.high_quality_videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{video.platform}</p>
              <p className="text-gray-700 text-sm line-clamp-3 mb-3">{video.description}</p>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">
                Watch Video
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications & Credentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learning_resources.certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{cert.name}</h3>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Provider:</strong> {cert.provider}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Cost:</strong> {cert.cost}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Validity:</strong> {cert.validity}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Recognition:</strong> {cert.industry_recognition}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Preparation Time:</strong> {cert.preparation_time}</p>
              <p className="text-gray-700"><strong className="font-medium">Prerequisite Experience:</strong> {cert.prerequisite_experience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog_posts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{post.summary}</p>
              <Link to={`/blog/${post.slug}`} className="text-indigo-600 hover:underline text-sm">
                Read Article
              </Link>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import aiRolesData from '@src/data/ai-roles-data.json'; // Adjust path if needed based on your project structure

export default function RoleDetails() {
  const { roleSlug } = useParams(); // This will get the 'machine-learning-engineer' part from the URL
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Find the role in your imported dataset based on the URL slug
    const foundRole = aiRolesData.find(
      (r) => r.career_info.slug === roleSlug
    );
    setRole(foundRole);
    setLoading(false);
  }, [roleSlug]); // Re-run effect if roleSlug changes

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p>Loading role details...</p></div>;
  }

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <h1 className="text-2xl font-bold mb-4">Role Not Found</h1>
        <p className="mb-6">The career role you're looking for doesn't exist.</p>
        <Link to="/career-strategy" className="text-indigo-600 hover:underline">
          Go back to Career Strategy
        </Link>
      </div>
    );
  }

  // Destructure data for easier access
  const { career_info, blog_posts, learning_resources } = role;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">
          {role.role_name}
        </h1>
        <p className="text-xl text-gray-700">{career_info.tagline}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{career_info.description}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
        {/* Responsibilities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {career_info.key_responsibilities.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>
        </div>

        {/* Salary Range */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Average Salary (USD/Year)</h3>
          <ul className="text-gray-700 space-y-2">
            <li><strong className="font-medium">Junior:</strong> {career_info.average_salary_range.junior}</li>
            <li><strong className="font-medium">Mid-Level:</strong> {career_info.average_salary_range.mid_level}</li>
            <li><strong className="font-medium">Senior:</strong> {career_info.average_salary_range.senior}</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            Note: Salaries vary significantly by location, company size, and experience.
          </p>
        </div>

        {/* Soft Skills */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Soft Skills</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {career_info.required_skills.soft_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expanded Skills Section */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills Deep Dive</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Core Technical Skills</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {career_info.required_skills.core_technical_skills.map((s, idx) => (
                <li key={idx}><strong>{s.skill}</strong> ({s.proficiency_level} proficiency, {s.importance} importance)</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Emerging & Nice-to-Have Skills</h3>
            <p className="font-medium text-gray-800 mb-1">Emerging:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {career_info.required_skills.emerging_skills.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
            <p className="font-medium text-gray-800 mb-1">Nice-to-Have:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {career_info.required_skills.nice_to_have.map((s, idx) => <li key={idx}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Industry Trends & Market Data */}
      <section className="mb-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Industry Insights & Market Outlook</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Industry Trends Impact</h3>
            <p className="text-gray-700 leading-relaxed">{career_info.industry_trends_impact}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Market Data</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong className="font-medium">Job Growth Rate:</strong> {career_info.market_data.job_growth_rate}</li>
              <li><strong className="font-medium">Total Job Openings (2025 est.):</strong> {career_info.market_data.total_job_openings}</li>
              <li><strong className="font-medium">Remote Work Availability:</strong> {career_info.market_data.remote_work_availability}</li>
              <li><strong className="font-medium">Top Hiring Industries:</strong> {career_info.market_data.top_hiring_industries.join(', ')}</li>
              <li><strong className="font-medium">Geographic Hotspots:</strong> {career_info.market_data.geographic_hotspots.join(', ')}</li>
              <li><strong className="font-medium">Competition Level:</strong> {career_info.market_data.competition_level}</li>
              <li><strong className="font-medium">Entry Barrier:</strong> {career_info.market_data.entry_barrier}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Portfolio Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {career_info.portfolio_projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{project.project_type}</h3>
              <p className="text-gray-700 mb-3">{project.description}</p>
              <p className="text-gray-600 text-sm">
                <strong className="font-medium">Technologies:</strong> {project.key_technologies.join(', ')}
              </p>
              <p className="text-gray-600 text-sm">
                <strong className="font-medium">Complexity:</strong> {project.complexity_level}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interview Preparation */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview Preparation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Common Questions & Assessments</h3>
            <p className="font-medium text-gray-800 mb-1">Common Questions:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {career_info.interview_preparation.common_questions.map((q, idx) => <li key={idx}>{q}</li>)}
            </ul>
            <p className="font-medium text-gray-800 mb-1">Technical Assessments:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {career_info.interview_preparation.technical_assessments.map((t, idx) => <li key={idx}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Preparation Resources</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {career_info.interview_preparation.preparation_resources.map((res, idx) => (
                <li key={idx}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {res.resource}
                  </a> ({res.type}) {res.focus && `- ${res.focus}`} {/* Added focus if present */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Path</h2>
        <div className="space-y-8">
          {/* Beginner Path */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Beginner Path ({learning_resources.beginner_path.duration})</h3>
            {learning_resources.beginner_path.prerequisites && (
              <p className="text-gray-600 mb-2">Prerequisites: {learning_resources.beginner_path.prerequisites.join(', ')}</p>
            )}
            <p className="font-medium text-gray-800 mb-2">Free Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.beginner_path.free_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Paid Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.beginner_path.paid_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration}, Certificate: {course.offers_certificate ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Project Milestones:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {learning_resources.beginner_path.project_milestones.map((milestone, idx) => <li key={idx}>{milestone}</li>)}
            </ul>
          </div>

          {/* Intermediate Path */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Intermediate Path ({learning_resources.intermediate_path.duration})</h3>
            {learning_resources.intermediate_path.prerequisites && (
              <p className="text-gray-600 mb-2">Prerequisites: {learning_resources.intermediate_path.prerequisites.join(', ')}</p>
            )}
            <p className="font-medium text-gray-800 mb-2">Free Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.intermediate_path.free_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Paid Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.intermediate_path.paid_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration}, Certificate: {course.offers_certificate ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Project Milestones:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {learning_resources.intermediate_path.project_milestones && learning_resources.intermediate_path.project_milestones.map((milestone, idx) => <li key={idx}>{milestone}</li>)}
            </ul>
          </div>

          {/* Advanced Path */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Advanced Path ({learning_resources.advanced_path.duration})</h3>
            {learning_resources.advanced_path.prerequisites && (
              <p className="text-gray-600 mb-2">Prerequisites: {learning_resources.advanced_path.prerequisites.join(', ')}</p>
            )}
            <p className="font-medium text-gray-800 mb-2">Free Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.advanced_path.free_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration})
                </li>
              ))}
            </ul>
            <p className="font-medium text-gray-800 mb-2">Paid Courses:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {learning_resources.advanced_path.paid_courses.map((course, idx) => (
                <li key={idx}>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                    {course.title}
                  </a> ({course.platform}) - {course.impact_summary} (Duration: {course.duration}, Certificate: {course.offers_certificate ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* High Quality Videos */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">High-Quality Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learning_resources.high_quality_videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{video.platform}</p>
              <p className="text-gray-700 text-sm line-clamp-3 mb-3">{video.description}</p>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">
                Watch Video
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications & Credentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learning_resources.certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{cert.name}</h3>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Provider:</strong> {cert.provider}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Cost:</strong> {cert.cost}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Validity:</strong> {cert.validity}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Recognition:</strong> {cert.industry_recognition}</p>
              <p className="text-gray-700 mb-1"><strong className="font-medium">Preparation Time:</strong> {cert.preparation_time}</p>
              <p className="text-gray-700"><strong className="font-medium">Prerequisite Experience:</strong> {cert.prerequisite_experience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mb-10 bg-indigo-50 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog_posts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{post.summary}</p>
              <Link to={`/blog/${post.slug}`} className="text-indigo-600 hover:underline text-sm">
                Read Article
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
