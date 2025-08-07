import React, { useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    }
  }, [token])


  return (
    <div className="min-h-screen flex flex-col">
      <AdminDashboard />
      <main className="flex-1 bg-gray-50">
        <Outlet />  {/* This renders the child (Ads/Report/etc) page */}
      </main>
    </div>
  );
}
