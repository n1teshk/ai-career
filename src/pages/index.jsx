// src/pages/index.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white flex flex-col">
      {/* Hero Section */}
      <section
        aria-label="Hero Section"
        className="relative flex flex-col justify-center items-center text-center px-6 pt-20 pb-32 md:pt-32 md:pb-40 lg:pb-48 max-w-7xl mx-auto"
      >
        {/* Background abstract gradient shapes */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-pink-400 opacity-30 rounded-full blur-3xl mix-blend-multiply animate-slow-rotate"></div>
          <div className="absolute -bottom-32 -right-16 w-[450px] h-[450px] bg-indigo-400 opacity-25 rounded-full blur-3xl mix-blend-multiply animate-slow-rotate-reverse"></div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold max-w-4xl leading-tight drop-shadow-lg">
          Empowering Your AI Career Journey
        </h1>
        <h2 className="mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light text-indigo-200 drop-shadow-sm">
          Discover personalized AI career paths, expert learning resources, and
          cutting-edge job matching.
        </h2>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link // Changed from <a>
            to="/signup" // Changed from href
            className="inline-block rounded-md bg-white text-indigo-700 font-semibold px-8 py-3 shadow-lg hover:bg-indigo-100 transition"
          >
            Get Started
          </Link>
          <Link // Changed from <a>
            to="/career-strategy" // Changed from href, assuming this leads to a page listing roles
            className="inline-block rounded-md border border-white border-opacity-70 px-8 py-3 font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Explore Roles
          </Link>
        </div>
      </section>

      {/* About / Intro Section */}
      <section
        aria-label="About Section"
        className="bg-white text-indigo-900 py-20 px-6 md:px-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Why Choose AI Career Navigator?</h3>
          <p className="text-lg leading-relaxed">
            We help you unlock your potential in the AI industry by guiding you
            through tailored career strategies, hands-on projects, and up-to-date
            learning paths — all powered by the latest AI insights and technology.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section
        aria-label="Core Features"
        className="py-20 px-6 md:px-16 bg-indigo-50 text-indigo-900"
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-14 text-center">
            Explore Our Core Offerings
          </h3>
          <div className="grid gap-10 md:grid-cols-4">
            {/* Feature Card 1 */}
            <article className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
              <div
                aria-hidden="true"
                className="mb-4 w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold select-none"
              >
                {/* Placeholder Icon */}
                🎯
              </div>
              <h4 className="font-semibold text-lg mb-2">Personalized Career Paths</h4>
              <p className="text-gray-600 text-sm">
                Tailored AI role recommendations based on your unique skillset.
              </p>
            </article>
            {/* Feature Card 2 */}
            <article className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
              <div
                aria-hidden="true"
                className="mb-4 w-14 h-14 bg-gradient-to-tr from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold select-none"
              >
                {/* Placeholder Icon */}
                📚
              </div>
              <h4 className="font-semibold text-lg mb-2">Learning Resources</h4>
              <p className="text-gray-600 text-sm">
                Access curated courses and modules for practical AI skill growth.
              </p>
            </article>
            {/* Feature Card 3 */}
            <article className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
              <div
                aria-hidden="true"
                className="mb-4 w-14 h-14 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold select-none"
              >
                {/* Placeholder Icon */}
                💼
              </div>
              <h4 className="font-semibold text-lg mb-2">AI Job Matching</h4>
              <p className="text-gray-600 text-sm">
                Find your ideal job role with our AI-powered matching technology.
              </p>
            </article>
            {/* Feature Card 4 */}
            <article className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
              <div
                aria-hidden="true"
                className="mb-4 w-14 h-14 bg-gradient-to-tr from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold select-none"
              >
                {/* Placeholder Icon */}
                📝
              </div>
              <h4 className="font-semibold text-lg mb-2">Insightful Blog & Community</h4>
              <p className="text-gray-600 text-sm">
                Stay updated with expert articles and community-driven discussions.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        aria-label="Call To Action"
        className="bg-indigo-700 text-white py-16 px-6 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-extrabold max-w-3xl mx-auto mb-6 drop-shadow-lg">
          Ready to Transform Your AI Career?
        </h3>
        <Link // Changed from <a>
          to="/signup" // Changed from href
          className="inline-block bg-white text-indigo-700 font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:bg-indigo-100 transition"
        >
          Join Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-300 py-6 px-6 text-center text-sm select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p>© 2025 AI Career Navigator. All rights reserved.</p>
          <nav className="flex gap-6 text-indigo-400 hover:text-indigo-200 justify-center">
            <Link to="/about-us" className="hover:underline"> {/* Changed from <a> */}
              About Us
            </Link>
            <Link to="/blog" className="hover:underline"> {/* Changed from <a> */}
              Blog
            </Link>
            <Link to="/learning" className="hover:underline"> {/* Changed from <a> */}
              Learning
            </Link>
            <Link to="/projects" className="hover:underline"> {/* Changed from <a> */}
              Projects
            </Link>
            <Link to="/career-strategy" className="hover:underline"> {/* Changed from <a> */}
              Career Strategy
            </Link>
          </nav>
        </div>
      </footer>

      {/* NOTE: The <style> block for animations is placed here for direct copy-paste.
        For larger projects, consider moving these @keyframes rules to your main
        CSS file (e.g., src/index.css or a dedicated animations.css) for better
        separation of concerns.
      */}
      <style>
        {`
          @keyframes slow-rotate {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          @keyframes slow-rotate-reverse {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(-360deg);}
          }
          .animate-slow-rotate {
            animation: slow-rotate 60s linear infinite;
          }
          .animate-slow-rotate-reverse {
            animation: slow-rotate-reverse 80s linear infinite;
          }
        `}
      </style>
    </main>
  );
}
