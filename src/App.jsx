// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx"; // Correctly imports AuthProvider
import Layout from "./components/layout/Layout";
import HomePage from "./pages/index";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Blog from './pages/Blog';
import PostView from './pages/PostView';
import Learning from './pages/Learning';
import CareerStrategy from './pages/CareerStrategy';
import Projects from './pages/Projects';
import ProjectDetailView from './pages/ProjectDetailView';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useEffect } from "react";
import Cookies from "js-cookie";

// --- ADD THIS IMPORT FOR CHECKOUT PAGE (Will create in Step 4) ---
import Checkout from "./pages/Checkout";
// -----------------------------------------------------------------


function App() {
  // --- ADD THIS useEffect BLOCK ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("utm_source");
    if (ref) {
      // Store cookie 'affiliate_ref' for 30 days
      Cookies.set("affiliate_ref", ref, { expires: 30 });
    }
  }, []);
  // ---------------------------------

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<PostView />} />
            <Route path="learning" element={<Learning />} />
            <Route path="career-strategy" element={<CareerStrategy />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetailView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* --- ADD THIS ROUTE FOR CHECKOUT PAGE (Will create in Step 4) --- */}
            <Route path="/checkout" element={<Checkout />} />
            {/* --------------------------------------------------------------- */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
