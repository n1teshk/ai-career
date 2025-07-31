// src/pages/AboutUs.jsx
import React from "react";
import { Link } from "react-router-dom"; // Assuming you might link to other pages

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 lg:p-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 drop-shadow-md">
          About AI Career Navigator
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center leading-relaxed max-w-3xl mx-auto">
          We are on a mission to empower individuals to thrive in the rapidly
          evolving landscape of Artificial Intelligence. Our platform provides
          personalized guidance, cutting-edge resources, and a supportive
          community to help you build a successful AI career.
        </p>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5a3 3 0 00-3-3m0 0a2 2 0 00-2 2v5m2-5a2 2 0 012 2v5m-6 0h6m-6 0v1.5m6 0V14m0 0h-6m6 0h6" />
            </svg>
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            To bridge the gap between aspiring AI professionals and the booming
            demand for AI talent. We believe that with the right tools, knowledge,
            and support, anyone can navigate and excel in this transformative field.
            We are dedicated to democratizing access to top-tier AI education and
            career opportunities.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100 flex items-start gap-4">
              <div className="flex-shrink-0 text-blue-600 text-3xl mt-1">💡</div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-800">Innovation</h3>
                <p className="text-gray-700 text-base">
                  Constantly integrating the latest AI advancements to keep our users at the forefront.
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100 flex items-start gap-4">
              <div className="flex-shrink-0 text-green-600 text-3xl mt-1">🤝</div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-800">Community</h3>
                <p className="text-gray-700 text-base">
                  Fostering a collaborative environment where knowledge and support thrive.
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-100 flex items-start gap-4">
              <div className="flex-shrink-0 text-yellow-600 text-3xl mt-1">✨</div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-800">Excellence</h3>
                <p className="text-gray-700 text-base">
                  Providing high-quality, actionable content and tools for measurable career growth.
                </p>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-100 flex items-start gap-4">
              <div className="flex-shrink-0 text-red-600 text-3xl mt-1">🔒</div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-gray-800">Trust & Transparency</h3>
                <p className="text-gray-700 text-base">
                  Building a platform founded on integrity and clear communication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action or Contact */}
        <section className="text-center pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Journey!</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Ready to shape your AI career with us? Have questions or want to
            collaborate? We'd love to hear from you.
          </p>
          <Link
            to="/signup" // Or a contact page if you have one
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Get Started Today
          </Link>
        </section>
      </div>
    </div>
  );
}
