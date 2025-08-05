import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign up logic here
      console.log("🔐 Signing Up with:", formData);
      // Optionally navigate after sign up
      // navigate('/admin/ads');
    } else {
      // Handle sign in logic here
      console.log("🔓 Signing In with:", formData);
      if (formData.email && formData.password) {
        // On successful sign in, redirect to admin dashboard
        navigate('/admin/ads');
      } else {
        alert("Please fill in both email and password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignUp ? 'Create Account' : 'Login to Your Account'}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className={`w-full py-3 mt-2 rounded-lg font-semibold text-white ${
              isSignUp ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-200`}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-purple-600 hover:underline font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
