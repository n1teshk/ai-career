// src/pages/index.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-900 flex flex-col font-sans overflow-hidden">
      {/* Animated Gradient Shapes Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-indigo-200 opacity-40 rounded-full blur-3xl mix-blend-multiply animate-blob-slow"></div>
        <div className="absolute -bottom-60 -right-60 w-[900px] h-[900px] bg-purple-200 opacity-30 rounded-full blur-3xl mix-blend-multiply animate-blob-medium"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-200 opacity-20 rounded-full blur-3xl mix-blend-multiply animate-blob-fast"></div>
      </div>

      {/* Hero Section */}
      <section
        aria-label="Hero Section"
        className="relative flex flex-col justify-center items-center text-center px-6 pt-24 pb-40 md:pt-32 md:pb-52 lg:pb-64 max-w-7xl mx-auto z-10"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-5xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 drop-shadow-lg animate-fade-in-up">
          Navigate Your Future in AI
        </h1>
        <h2 className="mt-8 max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl font-light text-gray-700 opacity-90 drop-shadow-sm animate-fade-in-up delay-200">
          Personalized AI career paths, cutting-edge learning, and intelligent
          job matching to propel you forward.
        </h2>
        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up delay-400">
          <Link
            to="/signup"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Get Started
          </Link>
          <Link
            to="/career-strategy"
            className="inline-block px-10 py-4 rounded-full border border-blue-400 text-blue-700 font-semibold text-lg hover:bg-blue-50 hover:border-blue-500 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Explore AI Roles
          </Link>
        </div>
      </section>

      {/* About / Intro Section */}
      <section
        aria-label="About Section"
        className="bg-white text-gray-800 py-20 px-6 md:px-16 relative z-10 shadow-inner-top-lg"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Your Dedicated AI Career Navigator
          </h3>
          <p className="text-lg leading-relaxed text-gray-700">
            We are committed to helping you unlock your full potential in the rapidly
            evolving AI industry. Through personalized strategies, immersive projects,
            and up-to-date learning paths, we empower you to confidently
            navigate your career—all backed by the latest AI insights.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section
        aria-label="Core Features"
        className="py-20 px-6 md:px-16 bg-gradient-to-b from-blue-50 to-white text-gray-800 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-16 text-center text-gray-900 leading-snug">
            What We Offer: Pathways to AI Mastery
          </h3>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature Card 1 */}
            <article className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-out border border-gray-100">
              <div
                aria-hidden="true"
                className="mb-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold select-none shadow-md"
              >
                🎯
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">Personalized Career Paths</h4>
              <p className="text-gray-600 text-base leading-relaxed">
                Receive tailored AI role recommendations that align perfectly with your unique skills and aspirations.
              </p>
            </article>
            {/* Feature Card 2 */}
            <article className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-out border border-gray-100">
              <div
                aria-hidden="true"
                className="mb-6 w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold select-none shadow-md"
              >
                📚
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">Advanced Learning Resources</h4>
              <p className="text-gray-600 text-base leading-relaxed">
                Access meticulously curated courses and modules designed for practical AI skill development.
              </p>
            </article>
            {/* Feature Card 3 */}
            <article className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-out border border-gray-100">
              <div
                aria-hidden="true"
                className="mb-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold select-none shadow-md"
              >
                💼
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">Intelligent Job Matching</h4>
              <p className="text-gray-600 text-base leading-relaxed">
                Connect with your dream AI job using our state-of-the-art, AI-powered matching technology.
              </p>
            </article>
            {/* Feature Card 4 */}
            <article className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-out border border-gray-100">
              <div
                aria-hidden="true"
                className="mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold select-none shadow-md"
              >
                📝
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-900">Insightful Blog & Community</h4>
              <p className="text-gray-600 text-base leading-relaxed">
                Stay at the forefront of AI with expert articles, trending insights, and a vibrant community.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        aria-label="Call To Action"
        className="bg-gradient-to-r from-blue-700 to-purple-800 text-white py-24 px-6 text-center relative z-10"
      >
        <h3 className="text-4xl md:text-5xl font-extrabold max-w-4xl mx-auto mb-10 leading-tight drop-shadow-xl">
          Ready to Elevate Your AI Career?
        </h3>
        <Link
          to="/signup"
          className="inline-block bg-white text-blue-700 font-bold px-12 py-5 rounded-full text-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75"
        >
          Join AI Navigator Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-6 text-center text-sm relative z-10 border-t border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} AI Career Navigator. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-gray-300">
            <Link to="/about-us" className="hover:text-white hover:underline transition-colors duration-200">
              About Us
            </Link>
            <Link to="/blog" className="hover:text-white hover:underline transition-colors duration-200">
              Blog
            </Link>
            <Link to="/learning" className="hover:text-white hover:underline transition-colors duration-200">
              Learning
            </Link>
            <Link to="/projects" className="hover:text-white hover:underline transition-colors duration-200">
              Projects
            </Link>
            <Link to="/career-strategy" className="hover:text-white hover:underline transition-colors duration-200">
              Career Strategy
            </Link>
          </nav>
        </div>
      </footer>

      {/* CSS Animations for background gradients */}
      <style jsx>{`
        @keyframes blob-slow {
          0% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          33% { transform: scale(1.1) translate(50px, -30px); opacity: 0.5; }
          66% { transform: scale(0.95) translate(-20px, 40px); opacity: 0.35; }
          100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
        }

        @keyframes blob-medium {
          0% { transform: scale(1) translate(0, 0); opacity: 0.3; }
          40% { transform: scale(1.08) translate(-40px, 60px); opacity: 0.4; }
          80% { transform: scale(0.9) translate(30px, -50px); opacity: 0.25; }
          100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
        }

        @keyframes blob-fast {
          0% { transform: scale(1) translate(0, 0); opacity: 0.2; }
          25% { transform: scale(1.05) translate(20px, 20px); opacity: 0.25; }
          50% { transform: scale(0.98) translate(-10px, -15px); opacity: 0.18; }
          75% { transform: scale(1.03) translate(15px, -10px); opacity: 0.22; }
          100% { transform: scale(1) translate(0, 0); opacity: 0.2; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in-up.delay-400 {
          animation-delay: 0.4s;
        }

        .animate-blob-slow {
          animation: blob-slow 45s ease-in-out infinite alternate;
        }
        .animate-blob-medium {
          animation: blob-medium 35s ease-in-out infinite alternate-reverse;
        }
        .animate-blob-fast {
          animation: blob-fast 25s ease-in-out infinite alternate;
        }

        .shadow-inner-top-lg {
            box-shadow: inset 0 10px 20px -5px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </main>
  );
}
