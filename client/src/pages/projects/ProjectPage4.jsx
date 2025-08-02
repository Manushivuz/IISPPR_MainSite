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
          "linear-gradient(135deg, #f0f7f9 0%, #d6e8f0 100%)",
        borderRadius: "16px",
        padding: "32px 36px",
        boxShadow: "0 10px 24px rgba(9, 57, 99, 0.15)",
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
          color: "#0b3c6b",
          marginBottom: "24px",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span role="img" aria-hidden="true" style={{ fontSize: "1.9rem" }}>
          🛠️
        </span>
        {title}
      </h2>
      <div style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#2c3e50" }}>
        {children}
      </div>
    </section>
  );
};

export default function ProjectPage4() {
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
          color: "#0b3c6b",
          background:
            "linear-gradient(180deg, #f0f7f9 0%, #ffffff 80%)",
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
            boxShadow: "0 20px 70px rgba(11, 60, 107, 0.15)",
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
              color: "#0b3c6b",
              userSelect: "text",
            }}
          >
            Kaam Ka Haq: Labor Rights for Every Worker
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              color: "#1e90ff",
              marginBottom: "1.25rem",
              fontStyle: "italic",
            }}
          >
            Work with Dignity. Rights with Clarity.
          </p>
        </section>

        {/* Description Section */}
        <Section title="Project Description" delay={350}>
          <p>
            Kaam Ka Haq is a grassroots labor rights and legal awareness initiative that aims to educate, organize, and empower workers—especially those in informal, unregulated, and rural employment sectors. India’s labor force is overwhelmingly informal, and millions of workers remain unaware of their basic rights under law: fair wages, safe working conditions, maternity benefits, equal pay, and protection from exploitation. This project seeks to bridge that gap.
          </p>
          <p>
            Rather than approaching labor as a legal subject alone, Kaam Ka Haq frames it as a human and civic right—linking dignity, safety, and justice with every form of work, be it domestic work, construction, agriculture, gig work, or factory labor.
          </p>
          <p>
            The project operates in three core areas:
          </p>

          <h3 style={{ fontWeight: "700", marginTop: "24px", marginBottom: "16px", color: "#0b3c6b" }}>
            1. Legal Literacy & Awareness
          </h3>
          <p>
            We organize interactive workshops, street plays, and audio-visual sessions in local languages to break down complex labor laws into accessible, relatable knowledge. Workers are taught about:
          </p>
          <ul style={{ paddingLeft: "1.3rem", color: "#2c3e50", marginBottom: "24px" }}>
            <li>Minimum Wages Act</li>
            <li>Unorganized Workers’ Social Security Act</li>
            <li>Maternity Benefit Act</li>
            <li>Inter-State Migrant Workers Act</li>
            <li>Occupational Safety, Health & Working Conditions Code</li>
            <li>Legal protections for domestic, agricultural, and construction workers</li>
          </ul>
          <p>
            Printed visual guides, mobile audio clips, and local helpline posters are distributed widely to reach even illiterate or semi-literate populations.
          </p>

          <h3 style={{ fontWeight: "700", marginTop: "24px", marginBottom: "16px", color: "#0b3c6b" }}>
            2. Worker Support Systems
          </h3>
          <p>
            We set up Labor Rights Help Desks in partnership with local panchayats, trade unions, and civil society groups. These act as first-response legal support centers, where workers can:
          </p>
          <ul style={{ paddingLeft: "1.3rem", color: "#2c3e50", marginBottom: "24px" }}>
            <li>File complaints or report abuse</li>
            <li>Get help with wage theft or contract fraud</li>
            <li>Access compensation or social security schemes</li>
            <li>Learn how to document evidence and seek redress</li>
            <li>Special support for migrant workers, women workers, and young laborers facing layered vulnerabilities</li>
          </ul>

          <h3 style={{ fontWeight: "700", marginTop: "24px", marginBottom: "16px", color: "#0b3c6b" }}>
            3. Leadership & Local Advocacy
          </h3>
          <p>
            The heart of Kaam Ka Haq is building a network of worker leaders and paralegal volunteers. These community champions are trained to:
          </p>
          <ul style={{ paddingLeft: "1.3rem", color: "#2c3e50", marginBottom: "24px" }}>
            <li>Facilitate legal aid referrals</li>
            <li>Hold dialogue with local employers</li>
            <li>Mobilize collective bargaining</li>
            <li>Engage with labor departments</li>
            <li>Conduct local campaigns on safe workplaces and fair wages</li>
          </ul>
          <p>
            By placing leadership directly in the hands of workers, we aim to shift the power balance from top-down reform to bottom-up accountability.
          </p>
          <p>
            This project does not simply aim to enforce laws—it seeks to reclaim dignity in labor. It challenges the silence around exploitation and builds a culture where every worker knows: “Mera kaam, mera haq.” (My work, my right.)
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
          © 2025 Kaam Ka Haq Initiative. All rights reserved.
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
