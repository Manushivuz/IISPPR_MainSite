import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const errorType = searchParams.get('type');
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    // Redirect to appropriate error page based on error type
    if (errorType === 'search' && searchQuery) {
      navigate(`/search-not-found?q=${encodeURIComponent(searchQuery)}`);
    } else if (errorType === '404') {
      navigate('/not-found');
    }
  }, [errorType, searchQuery, navigate]);

  return null; // This component will redirect, so no need to render anything
};

export default Error; 