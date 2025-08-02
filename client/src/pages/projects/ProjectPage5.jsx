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
          "linear-gradient(135deg, #fff7fa 0%, #f3e8ef 100%)",
        borderRadius: "16px",
        padding: "32px 36px",
        boxShadow: "0 10px 24px rgba(171, 53, 120, 0.15)",
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
          color: "#922b58",
          marginBottom: "24px",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span role="img" aria-hidden="true" style={{ fontSize: "1.9rem" }}>
          🌾
        </span>
        {title}
      </h2>
      <div style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#2d2d2d" }}>
        {children}
      </div>
    </section>
  );
};

export default function ProjectPage5() {
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
          background:
            "linear-gradient(180deg, #fff7fa 0%, #ffffff 85%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <section
          style={{
            maxWidth: "960px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "3.5rem 3rem 3rem",
            boxShadow: "0 20px 70px rgba(171, 53, 120, 0.15)",
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
              color: "#922b58",
              userSelect: "text",
            }}
          >
            Nari Parcham: Grassroots Women’s Leadership Initiative
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              color: "#e91e63",
              marginBottom: "1.25rem",
              fontStyle: "italic",
            }}
          >
            From Margin to Mandate
          </p>
        </section>

        {/* Description */}
        <Section title="Project Description" delay={350}>
          <p>
            Nari Parcham is a bold grassroots initiative to identify, train, and empower local women leaders who can influence decision-making, challenge gender inequality, and shape the future of their communities. Rooted in the belief that every woman carries leadership potential, this program nurtures leadership not from the top down, but from the soil up.
          </p>
          <p>
            Across rural India, women lead silently every day—managing homes, caregiving, running small businesses, organizing self-help groups. Yet they remain excluded from public leadership spaces, often unheard in panchayat meetings, local committees, or policy forums. Nari Parcham exists to change that—by turning everyday resilience into recognized leadership.
          </p>

          <h3 style={{ marginTop: "24px", color: "#922b58" }}>How It Works:</h3>

          <ul style={{ paddingLeft: "1.3rem", color: "#2d2d2d", marginBottom: "24px", listStyle: "none" }}>
            <li>
              <strong style={{ color: "#c2185b" }}>🟣 Leadership Labs:</strong> Women join hands-on, village-level learning sessions focused on public speaking, negotiation, rights awareness, and leadership practice. These are designed as safe, inclusive spaces where women gain not just knowledge, but voice.
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong style={{ color: "#c2185b" }}>🟣 Civic & Policy Education:</strong> Participants learn how local governance works—how to access schemes like MGNREGA, how to file RTIs, how budgets flow—and how to intervene when rights are denied.
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong style={{ color: "#c2185b" }}>🟣 Action Projects:</strong> Each woman identifies a local issue—be it water scarcity, school dropout, or domestic violence—and leads a small community project to address it, backed by mentorship and peer support.
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong style={{ color: "#c2185b" }}>🟣 Sisterhood Circles:</strong> The program creates long-term support networks where women can grow together, share strategies, and respond to challenges as a collective force.
            </li>
            <li style={{ marginTop: "1rem" }}>
              <strong style={{ color: "#c2185b" }}>🟣 Public Visibility:</strong> Stories of success, courage, and change are shared through community events and local media—because when one woman rises, many follow.
            </li>
          </ul>

          <p>
            Nari Parcham is not about building individual champions. It is about reclaiming space, voice, and power—and creating a ripple effect where more women take their place at the table, in the Gram Sabha, in public institutions, and in the collective imagination of what leadership looks like.
          </p>
          <p>
            Because when Nari holds the Parcham, change is not just possible—it’s unstoppable.
          </p>
        </Section>

        {/* Footer */}
        <footer
          style={{
            marginTop: "auto",
            paddingTop: "4rem",
            fontSize: "0.9rem",
            color: "#c88aa1",
            userSelect: "none",
            textAlign: "center",
            maxWidth: "960px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          © 2025 Nari Parcham Initiative. All rights reserved.
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
