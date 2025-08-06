import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.pathname === "/admin") {
      setNavCollapsed(false);
    } else {
      setNavCollapsed(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleCollapse = () => {
    setNavCollapsed(true);
  };

  return (
    <>
      {/* Navbar (appears with slide down) */}
      <AnimatePresence>
        {navCollapsed && (
          <motion.nav
            key="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-7 py-2 h-16 z-50 shadow"
          >
            <div className="flex items-center">
              <button
                onClick={() => navigate("/admin")}
                className="text-blue-700 font-bold text-lg select-none hover:underline"
              >
                Admin Portal
              </button>
            </div>

            <div className="flex items-center space-x-8">
              {navLinks(handleCollapse)}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setDropdownOpen((d) => !d)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-base font-semibold">
                  A
                </span>
                <span className="text-gray-800 font-medium">Admin</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.25 8.29a.75.75 0 0 1-.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Landing View (centered welcome + buttons) */}
      <AnimatePresence>
        {!navCollapsed && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center px-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-blue-700 mb-4"
            >
              Welcome to the Admin Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 max-w-xl mb-8"
            >
              This dashboard allows you to manage Ads, Review Reports, Publish
              Articles, and Curate Testimonials efficiently.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {navLinks(handleCollapse, true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Extracted links
function navLinks(onClick, isCentered = false) {
  const baseStyle =
    "flex items-center text-gray-700 hover:text-blue-700 font-medium opacity-70 hover:opacity-100 transition px-4 py-2";
  const wrapStyle = isCentered ? "flex-col items-center space-y-4" : "";

  return (
    <>
      <Link
        to="/admin/ads"
        className={`${baseStyle} ${wrapStyle}`}
        onClick={onClick}
      >
        <MegaphoneIcon />
        Ads
      </Link>
      <Link
        to="/admin/report"
        className={`${baseStyle} ${wrapStyle}`}
        onClick={onClick}
      >
        <ChartIcon />
        Report
      </Link>
      <Link
        to="/admin/articles"
        className={`${baseStyle} ${wrapStyle}`}
        onClick={onClick}
      >
        <ArticleIcon />
        Articles
      </Link>
      <Link
        to="/admin/testimonials"
        className={`${baseStyle} ${wrapStyle}`}
        onClick={onClick}
      >
        <TestimonialIcon />
        Testimonials
      </Link>
    </>
  );
}

// Icons
const MegaphoneIcon = () => (
  <svg
    className="h-5 w-5 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      d="M3 10v4a2 2 0 0 0 2 2h2l5 3V5l-5 3H5a2 2 0 0 0-2 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M16 10v4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 9v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChartIcon = () => (
  <svg
    className="h-5 w-5 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      x="3"
      y="10"
      width="4"
      height="8"
      rx="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="9"
      y="6"
      width="4"
      height="12"
      rx="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="15"
      y="13"
      width="4"
      height="5"
      rx="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ArticleIcon = () => (
  <svg
    className="h-5 w-5 mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path
      d="M8 8h8M8 12h8M8 16h2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TestimonialIcon = () => (
  <svg
    className="h-5 w-5 mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
  </svg>
);
