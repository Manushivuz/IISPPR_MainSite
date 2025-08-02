import React from "react";
import { useNavigate } from "react-router-dom";

export default function GoToProjectsButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/projects")}
      aria-label="Go to Projects"
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        backgroundColor: "#059669",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(5, 150, 105, 0.6)",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        zIndex: 1000,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "#047857";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(4, 120, 87, 0.8)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = "#059669";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.6)";
      }}
    >
      ← Go to Projects
    </button>
  );
}
