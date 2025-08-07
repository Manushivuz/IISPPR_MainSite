import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setNavCollapsed(location.pathname !== "/admin");
  }, [location.pathname]);

  const handleLogout = () => navigate("/login");
  const handleCollapse = () => setNavCollapsed(true);

  return (
    <>
      <AnimatePresence>
        {navCollapsed && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 sm:px-8 flex items-center justify-between shadow z-50"
          >
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/admin")}
                className="text-xl font-bold text-blue-500 hover:underline"
              >
                Admin Portal
              </button>

              <div className="hidden md:flex gap-4">
                {navLinks(location.pathname, handleCollapse)}
              </div>
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setDropdownOpen((d) => !d)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-semibold">
                  A
                </span>
                <span className="text-white font-medium hidden sm:block hover:text-blue-700">
                  Admin
                </span>
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
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-700 transition rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!navCollapsed && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pt-20 text-center px-4"
          >
            <motion.h1
              className="text-4xl font-bold text-blue-700 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Welcome to the Admin Portal
            </motion.h1>
            <motion.p
              className="text-gray-600 max-w-2xl mb-8 text-sm sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Easily manage ads, reports, articles, and testimonials in one
              place.
            </motion.p>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {navLinks(location.pathname, handleCollapse, true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function navLinks(currentPath, onClick, isCentered = false) {
  const baseStyle =
    "flex items-center gap-2 justify-center rounded-lg px-3 py-2 text-sm font-medium transition";
  const activeStyle = "text-white bg-blue-600 shadow-md hover:text-white hover:underline";
  const inactiveStyle = "text-gray-700 hover:bg-blue-100 ";

  const links = [
    { to: "/admin/ads", label: "Ads", icon: <MegaphoneIcon /> },
    { to: "/admin/report", label: "Report", icon: <ChartIcon /> },
    { to: "/admin/articles", label: "Articles", icon: <ArticleIcon /> },
    {
      to: "/admin/testimonials",
      label: "Testimonials",
      icon: <TestimonialIcon />,
    },
  ];

  return links.map(({ to, label, icon }) => (
    <Link
      key={to}
      to={to}
      onClick={onClick}
      className={`${baseStyle} ${
        currentPath === to ? activeStyle : inactiveStyle
      }`}
    >
      {icon}
      {label}
    </Link>
  ));
}

// Icons
const MegaphoneIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      d="M3 10v4a2 2 0 002 2h2l5 3V5l-5 3H5a2 2 0 00-2 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M16 10v4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 9v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChartIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="3" y="10" width="4" height="8" rx="1" />
    <rect x="9" y="6" width="4" height="12" rx="1" />
    <rect x="15" y="13" width="4" height="5" rx="1" />
  </svg>
);
const ArticleIcon = () => (
  <svg
    className="h-5 w-5"
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
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" />
  </svg>
);
