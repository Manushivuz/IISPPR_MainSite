import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

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

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-7 py-2 h-16">
      <div className="flex items-center">
        <span className="text-blue-700 font-bold text-lg select-none">Admin Portal</span>
      </div>

      <div className="flex items-center space-x-8">
        {/* Ads: Megaphone Icon */}
        <Link to="/admin/ads" className="flex items-center text-gray-700 hover:text-blue-700 font-medium opacity-70 hover:opacity-100 transition">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M3 10v4a2 2 0 0 0 2 2h2l5 3V5l-5 3H5a2 2 0 0 0-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 10v4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 9v6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Ads
        </Link>
        {/* Report: Bar Chart Icon */}
        <Link to="/admin/report" className="flex items-center text-gray-700 hover:text-blue-700 font-medium opacity-70 hover:opacity-100 transition">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <rect x="3" y="10" width="4" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="9" y="6" width="4" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="15" y="13" width="4" height="5" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Report
        </Link>
        {/* Articles */}
        <Link to="/admin/articles" className="flex items-center text-gray-700 hover:text-blue-700 font-medium opacity-70 hover:opacity-100 transition">
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 8h8M8 12h8M8 16h2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Articles
        </Link>
        {/* Testimonials */}
        <Link to="/admin/testimonials" className="flex items-center text-gray-700 hover:text-blue-700 font-medium opacity-70 hover:opacity-100 transition">
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>
          </svg>
          Testimonials
        </Link>
      </div>

      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setDropdownOpen(d => !d)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-base font-semibold">A</span>
          <span className="text-gray-800 font-medium">Admin</span>
          <svg className={`w-5 h-5 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
               fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.25 8.29a.75.75 0 0 1-.02-1.08z" clipRule="evenodd"/>
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
    </nav>
  );
}
