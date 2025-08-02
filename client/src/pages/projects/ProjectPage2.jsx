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
          "linear-gradient(135deg, #e6f4ea 0%, #d1eadd 100%)",
        borderRadius: "16px",
        padding: "32px 36px",
        boxShadow: "0 10px 24px rgba(34, 197, 94, 0.15)",
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
          color: "#065f46",
          marginBottom: "24px",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span role="img" aria-hidden="true" style={{ fontSize: "1.9rem" }}>
          🧩
        </span>
        {title}
      </h2>
      <div style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#374151" }}>
        {children}
      </div>
    </section>
  );
};

export default function ProjectPage2() {
  return (
    <>
      <GoToProjectsButton />
      <main
        style={{
          width: "100%",             // changed from 100vw to 100%
          minHeight: "100vh",
          padding: "3.5rem 5vw 5rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          color: "#064e3b",
          background:
            "linear-gradient(180deg, #e6f4ea 0%, #ffffff 80%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "text",
          boxSizing: "border-box",  // add this to contain padding properly
          overflowX: "hidden",      // explicit overflow-x hidden for safety
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
            boxSizing: "border-box",
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
            Grassroot Research: Problem-Led Inquiry
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              color: "#155e4e",
              marginBottom: "1.25rem",
              fontStyle: "italic",
            }}
          >
            Think. Feel. Solve.
          </p>
        </section>

        {/* Description Section */}
        <Section title="Project Description" delay={350}>
          <p>
            Grassroot Research: Problem-Led Inquiry is a bold shift in how we understand, approach, and apply research. Traditional academic and policy research often begins with pre-defined hypotheses, theoretical models, or datasets. In this process, communities become “subjects” rather than co-creators of knowledge. This project challenges that model.
          </p>
          <p>
            Instead of starting with data, we begin with real-life problems as experienced by local communities in villages, urban slums, small towns, or marginalized social groups. These problems may relate to livelihoods, education, health access, gender inequity, caste-based exclusion, environmental stress, or digital divides. But what sets this project apart is its bottom-up approach: problems are not “defined” for the community; they are voiced by the community.
          </p>
          <p>
            Once the problem is identified, the research process becomes a space for listening, witnessing, and feeling — not just measuring. This is where “Think. Feel. Solve.” comes alive. We bring together diverse knowledge systems: lived experience, indigenous insight, local narratives, and yes, structured data but used in service of solution-making, not just problem-proving.
          </p>
          <p>
            Rather than merely diagnosing what is wrong, the project aims to work collaboratively with affected groups to imagine and pilot locally-relevant, actionable solutions. It blends qualitative and quantitative methods with participatory tools, storytelling, ethnographic listening, and policy analysis. Researchers are trained not only to gather evidence but to hold space for complexity, contradiction, and community wisdom.
          </p>
          <p>
            This is not about research for the sake of research. It is about grounded knowledge that can influence real change. By bridging the gap between data and dignity, analysis and action, this project reclaims research as a tool of empowerment, not abstraction.
          </p>
          <p>
            Whether it's designing better public services, reforming local institutions, or advocating for policy shifts the goal is the same: let research rise from the ground, shaped by those who stand on it.
          </p>
        </Section>

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
            boxSizing: "border-box",
          }}
        >
          © 2025 Grassroot Research Initiative. All rights reserved.
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
