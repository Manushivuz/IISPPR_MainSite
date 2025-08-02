import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchNotFound = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold text-[#17594A] mb-4">No Results Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            We couldn't find any results for "{searchQuery}"
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-gray-500 mb-8">
            Try different keywords or check your spelling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#17594A] hover:bg-[#1a6a58] transition-colors duration-300"
            >
              Go Home
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#17594A] text-base font-medium rounded-md text-[#17594A] bg-transparent hover:bg-[#17594A] hover:text-white transition-colors duration-300"
            >
              View All Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchNotFound; 