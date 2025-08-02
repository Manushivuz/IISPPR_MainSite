import React, { useEffect, useState } from "react";
import GoToProjectsButton from "../../components/projects/GoToProjectsButton";

const Section = ({ title, children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <section
      style={{
        maxWidth: "960px",
        width: "100%",
        background:
          "linear-gradient(135deg, #e0f0fa 0%, #d3eafc 100%)",
        borderRadius: "16px",
        padding: "32px 36px",
        boxShadow: "0 10px 24px rgba(14, 102, 194, 0.15)",
        marginBottom: "42px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        boxSizing: "border-box",
      }}
      aria-labelledby={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`}
    >
      <h2
        id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`}
        style={{
          fontSize: "1.8rem",
          fontWeight: "700",
          color: "#0c4a6e",
          marginBottom: "24px",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span role="img" aria-hidden="true" style={{ fontSize: "1.9rem" }}>
          📢
        </span>
        {title}
      </h2>
      <div style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#334155" }}>
        {children}
      </div>
    </section>
  );
};

export default function ProjectPage3() {
  return (
    <>
      <GoToProjectsButton />
      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "3.5rem 5vw 5rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          color: "#0c4a6e",
          background:
            "linear-gradient(180deg, #e0f0fa 0%, #ffffff 80%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "text",
          boxSizing: "border-box",
          overflowX: "hidden",
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
            boxShadow: "0 20px 70px rgba(12, 74, 110, 0.15)",
            marginBottom: "4.5rem",
            textAlign: "center",
            opacity: 0,
            animation: "fadeSlideIn 0.9s forwards",
            animationDelay: "0.15s",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: "3.4rem",
              fontWeight: "900",
              lineHeight: 1.1,
              marginBottom: "1rem",
              color: "#0c4a6e",
              userSelect: "text",
            }}
          >
            RTI Advocacy: Empowering Villages Through Information
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              color: "#2563eb",
              marginBottom: "1.25rem",
              fontStyle: "italic",
            }}
          >
            Ask. Know. Act.
          </p>
        </section>

        {/* Description Section */}
        <Section title="Project Description" delay={350}>
          <p>
            The Right to Information (RTI) Act is one of India’s most powerful democratic tools but in many rural areas, it remains unused, misunderstood, or feared. This project aims to change that.
          </p>
          <p>
            RTI Advocacy: Empowering Villages Through Information is a grassroots initiative designed to educate, train, and support rural citizens in using the RTI Act to demand accountability from local government bodies. From ensuring fair distribution of ration cards, pensions, and job cards under MNREGA, to tracking development funds and school schemes, this project brings the power of questioning back to the people.
          </p>
          <p>
            The initiative begins by working directly with panchayats, self-help groups, youth clubs, and local schools, conducting interactive RTI literacy workshops in regional languages. These are not one-time sessions but part of a deeper engagement process that builds confidence, legal awareness, and practical skills. Participants learn how to draft RTI applications, track timelines, interpret responses, and take further action through appeals if needed.
          </p>
          <p>
            Beyond legal training, the project also creates safe spaces for collective learning — including RTI Help Circles, Village RTI Libraries, and local campaigns demystifying governance processes. We use real-life success stories to inspire action, and visual, audio, and theatre-based tools to make complex laws accessible to those with limited formal education.
          </p>
          <p>
            A key pillar of the project is building community-based support networks and training a new cadre of RTI Fellows and Village Info Leaders who act as first responders and local guides. These leaders become bridges between citizens and institutions, helping communities stay informed, organized, and fearless in their pursuit of transparency.
          </p>
          <p>
            This initiative is not about legal paperwork alone. It’s about shifting the rural narrative from helplessness to agency. RTI is not just a law, it's a mindset: the belief that ordinary people have the right to ask questions and expect answers.
          </p>
          <p>
            Through this project, we aim to cultivate that mindset — village by village, voice by voice.
          </p>
        </Section>

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
            boxSizing: "border-box",
          }}
        >
          © 2025 RTI Advocacy Initiative. All rights reserved.
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
