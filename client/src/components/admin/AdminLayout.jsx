import React from "react";
import AdminDashboard from "./AdminDashboard";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminDashboard />
      <main className="flex-1 bg-gray-50">
        <Outlet />  {/* This renders the child (Ads/Report/etc) page */}
      </main>
    </div>
  );
}
