import React, { useEffect, useState } from "react";
import GoToProjectsButton from "../../components/projects/GoToProjectsButton";

const SDGItem = ({ number, title }) => (
  <div
    tabIndex={0}
    role="button"
    aria-label={`Sustainable Development Goal ${number}: ${title}`}
    style={{
      backgroundColor: "#22c55e",
      color: "white",
      padding: "6px 18px",
      borderRadius: "9999px",
      fontWeight: "600",
      fontSize: "1rem",
      marginRight: "14px",
      marginBottom: "14px",
      boxShadow: "0 2px 10px rgba(34, 197, 94, 0.5)",
      userSelect: "none",
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#16a34a";
      e.currentTarget.style.transform = "scale(1.07)";
      e.currentTarget.style.boxShadow = "0 5px 15px rgba(22, 163, 74, 0.7)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#22c55e";
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 2px 10px rgba(34, 197, 94, 0.5)";
    }}
    onFocus={(e) => {
      e.currentTarget.style.backgroundColor = "#16a34a";
      e.currentTarget.style.boxShadow = "0 5px 15px rgba(22, 163, 74, 0.7)";
    }}
    onBlur={(e) => {
      e.currentTarget.style.backgroundColor = "#22c55e";
      e.currentTarget.style.boxShadow = "0 2px 10px rgba(34, 197, 94, 0.5)";
    }}
  >
    SDG {number}: {title}
  </div>
);

const PhaseItem = ({ children }) => (
  <li
    style={{
      marginBottom: "14px",
      lineHeight: 1.7,
      color: "#374151",
      fontSize: "1.05rem",
      position: "relative",
      paddingLeft: "22px",
      cursor: "default",
      userSelect: "text",
    }}
  >
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: "0.7em",
        width: "12px",
        height: "12px",
        backgroundColor: "#22c55e",
        borderRadius: "50%",
        boxShadow: "0 0 8px #22c55e66",
      }}
    />
    {children}
  </li>
);

const PhaseSection = ({ title, yearRange, points }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #e6f4ea 0%, #d1eadd 100%)",
        borderRadius: "16px",
        padding: "32px 36px",
        boxShadow: "0 10px 24px rgba(34, 197, 94, 0.15)",
        marginBottom: "42px",
        flex: 1,
        minWidth: "320px",
        maxWidth: "480px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#065f46",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          userSelect: "none",
        }}
      >
        <span role="img" aria-label="calendar" style={{ fontSize: "1.7rem" }}>
          📅
        </span>
        {title}
        <span
          style={{
            marginLeft: "auto",
            fontWeight: "500",
            fontSize: "1.05rem",
            color: "#047857",
            fontStyle: "italic",
          }}
        >
          {yearRange}
        </span>
      </h3>
      <ul style={{ paddingLeft: "20px", margin: 0 }}>
        {points.map((point, i) => (
          <PhaseItem key={i}>{point}</PhaseItem>
        ))}
      </ul>
    </section>
  );
};

export default function ProjectPage1() {
  const projectTitle = "Democratising Public Policy Education";
  const vision =
    "To make public policy education easy to understand and available to everyone, especially students, young professionals, and grassroots communities, by 2030.";

  const sdgs = [
    { number: 4, title: "Quality Education" },
    { number: 10, title: "Reduced Inequalities" },
    { number: 16, title: "Peace, Justice, and Strong Institutions" },
    { number: 17, title: "Partnerships for the Goals" },
  ];

  const phase1Points = [
    "Reach 10,000+ learners via open-access content: videos, infographics, webinars",
    "Launch 3 certificate courses (2 in English, 1 in a regional language)",
    "Build an active online learning community of 1,000+ members",
    "Translate key content into 3 Indian languages",
    'Run "Policy for All" Literacy Campaigns in 5 rural or semi-urban districts',
    "Partner with 25+ colleges and local NGOs for offline sessions and outreach",
    "Train 1,500+ students and professionals in short-term programs",
  ];

  const phase2Points = [
    "Develop a mobile-first platform for low-bandwidth, rural learners",
    "Translate content into 5 more languages, expanding regional access",
    "Establish Policy Clubs in 100+ schools and colleges",
    "Publish 1 open-source guidebook on public policy and Indian laws",
    "Launch a Public Policy Fellowship for 100 underrepresented youth",
    "Create interactive tools and simulations for learning policy (youth-focused)",
    "Reach 1 lakh (100,000) learners cumulatively by 2028",
    "Build a National Coalition for policy education and organize India’s 1st People's Policy Hackathon",
    "Support community-led policy research in 20+ districts",
    "Reach a total of 500,000 learners by 2030",
    "Expand globally by partnering with 3 Global South countries",
    "Publish a People’s Public Policy Charter co-created with citizens",
    "Make all content freely available under a Creative Commons license",
  ];

  return (
    <>
      <GoToProjectsButton />
      <main
        style={{
          width: "100%",  // changed from 100vw to 100% to avoid horizontal overflow
          minHeight: "100vh",
          padding: "3.5rem 5vw 5rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          color: "#064e3b",
          background: "linear-gradient(180deg, #e6f4ea 0%, #ffffff 80%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "text",
          overflowX: "hidden", // extra safeguard to prevent horizontal scroll
          boxSizing: "border-box",
        }}
      >
        {/* Header Section */}
        <section
          style={{
            maxWidth: "960px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "3.5rem 3rem 3rem",
            boxShadow: "0 20px 70px rgba(6, 95, 70, 0.15)",
            marginBottom: "4.5rem",
            textAlign: "center",
            opacity: 0,
            animation: "fadeSlideIn 0.9s forwards",
            animationDelay: "0.15s",
          }}
        >
          <h1
            style={{
              fontSize: "3.4rem",
              fontWeight: "900",
              lineHeight: 1.1,
              marginBottom: "1rem",
              color: "#065f46",
              userSelect: "text",
            }}
          >
            {projectTitle}
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              color: "#155e4e",
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            {vision}
          </p>
        </section>

        {/* SDG Alignment Section */}
        <section
          style={{
            maxWidth: "960px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "2.5rem 3rem 3rem",
            boxShadow: "0 18px 60px rgba(5, 150, 105, 0.12)",
            marginBottom: "5rem",
            opacity: 0,
            animation: "fadeSlideIn 0.9s forwards",
            animationDelay: "0.35s",
          }}
        >
          <h2
            style={{
              fontSize: "2.1rem",
              fontWeight: "700",
              color: "#059669",
              marginBottom: "1.6rem",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span role="img" aria-label="target" style={{ fontSize: "1.9rem" }}>
              🎯
            </span>
            SDG Alignment
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
              justifyContent: "center",
            }}
          >
            {sdgs.map((sdg, i) => (
              <SDGItem key={i} number={sdg.number} title={sdg.title} />
            ))}
          </div>
        </section>

        {/* Phases Section */}
        <section
          style={{
            maxWidth: "960px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
            justifyContent: "center",
            marginBottom: "5rem",
            boxSizing: "border-box",
          }}
          aria-label="Project Phases"
        >
          <PhaseSection title="Phase 1" yearRange="2024-2025" points={phase1Points} />
          <PhaseSection title="Phase 2" yearRange="2026-2030" points={phase2Points} />
        </section>

        {/* Footer note or blank space */}
        <footer
          style={{
            marginTop: "auto",
            paddingTop: "4rem",
            fontSize: "0.9rem",
            color: "#94a3b8",
            userSelect: "none",
            textAlign: "center",
            maxWidth: "960px",
            width: "100%",
          }}
        >
          © 2024 Policy Project Initiative. All rights reserved.
        </footer>
      </main>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
