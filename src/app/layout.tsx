"use client";
import { useState } from "react";

// ─── PROJECT DATA ────────────────────────────────────────────────────────────
// Fill in `detail`, `images`, and optionally `video` for each project.
// Drop image files in public/images/ and video files in public/videos/
const projects = [
  {
    id: 0,
    title: "Course Planner Web App",
    blurb: "Full-stack course discovery platform with search, filters, and article pages.",
    tags: ["Next.js", "MongoDB", "TypeScript", "NestJS"],
    href: "https://github.com/yourname/course-planner",
    status: "GitHub",
    previewImage: "/images/course-planner-preview.png",
    detail: `[Replace this with your own description]

This project is a full-stack web application for browsing and planning university courses. 
Built with Next.js on the frontend and a NestJS REST API connected to MongoDB Atlas, 
it features keyword search, tag-based filtering, and individual article-style pages per course.

What I learned: [add what you learned here]
Challenges: [add any challenges you faced]`,
    images: ["/images/course-planner-1.png", "/images/course-planner-2.png"],
    video: null,
  },
  {
    id: 1,
    title: "AI Chatbot — Ollama Deepseek + RAG",
    blurb: "FAISS vector store with PDF ingestion, a Flask API backend, and local LLM inference via Ollama.",
    tags: ["Python", "FAISS", "Flask", "Ollama"],
    href: "https://github.com/yourname/rag-bcis-bot",
    status: "GitHub",
    previewImage: "/images/chatbot-preview.png",
    detail: `[Replace this with your own description]

A retrieval-augmented generation (RAG) chatbot that ingests PDF documents into a FAISS 
vector store and answers questions using a locally-running Deepseek model via Ollama. 
Flask handles the API layer between the frontend and the model.

What I learned: [add what you learned here]
Challenges: [add any challenges you faced]`,
    images: ["/images/chatbot-1.png", "/images/chatbot-2.png"],
    video: null,
  },
  {
    id: 2,
    title: "Jeff the Shark",
    blurb: "A 3D-printed animatronic shark with Arduino-powered MP3 audio and servo control.",
    tags: ["Arduino", "3D Printing", "Physical Computing"],
    href: null,
    status: "Physical",
    previewImage: "/media/Jeff_The_Shark/jeff1.jpg",
    detail: `[Replace this with your own description]

Jeff is a 3D-printed great white shark with a DFPlayer Mini MP3 module and a servo motor 
controlled by an Arduino Uno. Press a button and Jeff snaps his jaw and plays a sound effect. 
Designed in Blender and sliced with Cura.

What I learned: [add what you learned here]
Challenges: [add any challenges you faced]`,
    images: ["/media/Jeff_The_Shark/jeff2.jpg"],
    video: "/media/Jeff_The_Shark/jeff.mp4", // e.g. "/videos/jeff-demo.mp4"
  },
  {
    id: 3,
    title: "Māori Language App — Figma Demo",
    blurb: "A high-fidelity Figma prototype for a Te Reo Māori learning app, exploring gamification and cultural UX.",
    tags: ["Figma", "UI/UX Design", "Prototyping"],
    href: null,
    status: "Design",
    previewImage: "/media/Figma/tui.png",
    detail: `[Replace this with your own description]

A prototype designed in Figma for a gamified Te Reo Māori learning app. 
Focused on cultural authenticity, accessibility, and an engaging progression system 
inspired by language-learning research and feedback from Māori community members.

What I learned: [add what you learned here]
Challenges: [add any challenges you faced]`,
    images: ["/media/Figma/tui.png"],
    video: "/media/Figma/figma1.mp4",
  },
  {
    id: 4,
    title: "AI Language Translator",
    blurb: "A mobile app built with Expo/React Native, using ngrok + Node.js as a local server and OpenAI for translation.",
    tags: ["OpenAI", "Node.js", "Expo", "React Native"],
    href: null,
    status: "Mobile App",
    previewImage: "/images/translator-preview.png",
    detail: `[Replace this with your own description]

A mobile application built with Expo and React Native that translates text between languages 
using the OpenAI API. The phone connects to a Node.js server running locally on my laptop, 
tunnelled via ngrok — making it accessible from the mobile device without deploying to the cloud.

What I learned: [add what you learned here]
Challenges: [add any challenges you faced]`,
    images: ["/images/translator-1.png", "/images/translator-2.png"],
    video: null,
  },
];

const statusStyle: Record<string, React.CSSProperties> = {
  GitHub:     { background: "rgba(0,194,179,0.1)",   color: "#00C2B3", border: "1px solid rgba(0,194,179,0.3)" },
  Physical:   { background: "rgba(251,146,60,0.1)",  color: "#fb923c", border: "1px solid rgba(251,146,60,0.3)" },
  Design:     { background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" },
  "Mobile App": { background: "rgba(96,165,250,0.1)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.3)" },
};

// ─── EXPANDED PANEL ──────────────────────────────────────────────────────────
function ExpandedPanel({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <div style={{
      gridColumn: "1 / -1",
      background: "#161B22",
      border: "1px solid rgba(0,194,179,0.35)",
      borderRadius: 14,
      padding: "28px 28px 24px",
      animation: "slideDown 0.22s ease",
      position: "relative",
    }}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .detail-text {
          white-space: pre-line;
          color: #8B949E;
          font-size: 14px;
          line-height: 1.8;
          margin: 0 0 24px;
          max-width: 600px;
        }
        .detail-text strong { color: #E8EDF2; }
        .media-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 20px;
          scrollbar-width: thin;
          scrollbar-color: #21262D transparent;
        }
        .media-scroll::-webkit-scrollbar { height: 4px; }
        .media-scroll::-webkit-scrollbar-track { background: transparent; }
        .media-scroll::-webkit-scrollbar-thumb { background: #21262D; border-radius: 4px; }
      `}</style>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 18, right: 18,
          background: "none", border: "none", cursor: "pointer",
          color: "#8B949E", fontSize: 20, lineHeight: 1,
          padding: "4px 8px", borderRadius: 6,
        }}
        aria-label="Close"
      >✕</button>

      <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 700, margin: "0 0 16px", color: "#E8EDF2" }}>
        {project.title}
      </h3>

      {/* Detailed description */}
      <p className="detail-text">{project.detail}</p>

      {/* Video (if present) */}
      {project.video && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00C2B3", fontFamily: "'Space Grotesk'", fontWeight: 600, marginBottom: 10 }}>
            Demo
          </p>
          <video
            src={project.video}
            controls
            style={{
              width: "100%", maxWidth: 560,
              borderRadius: 8, border: "1px solid #21262D",
              background: "#0D1117",
            }}
          />
        </div>
      )}

      {/* Images */}
      {project.images.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00C2B3", fontFamily: "'Space Grotesk'", fontWeight: 600, marginBottom: 10 }}>
            Screenshots
          </p>
          <div className="media-scroll">
            {project.images.map((src, i) => (
              <div key={i} style={{
                width: 240, height: 150, borderRadius: 8, overflow: "hidden", flexShrink: 0,
                background: "#0D1117", border: "1px solid #21262D",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    el.parentElement!.innerHTML = `<span style="color:#8B949E;font-size:12px;font-family:Inter,sans-serif">image coming soon</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer: tags + github link */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {project.tags.map((t) => (
          <span key={t} style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 999,
            border: "1px solid #21262D", color: "#8B949E", background: "#0D1117",
          }}>{t}</span>
        ))}
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "auto", fontSize: 13, color: "#00C2B3",
              textDecoration: "none", fontFamily: "'Space Grotesk'", fontWeight: 600,
            }}
          >View on GitHub →</a>
        )}
      </div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({ project, isOpen, onToggle }: {
  project: typeof projects[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
    >
      {/* Hover preview image */}
      {hovered && !isOpen && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: 220, height: 130,
          borderRadius: 10, overflow: "hidden",
          background: "#0D1117",
          border: "1px solid rgba(0,194,179,0.3)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          zIndex: 10, pointerEvents: "none",
          animation: "fadeUp 0.15s ease",
        }}>
          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateX(-50%) translateY(4px); }
              to   { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `}</style>
          <img
            src={project.previewImage}
            alt={`${project.title} preview`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              const p = el.parentElement!;
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
              p.innerHTML = `<span style="color:#8B949E;font-size:12px;font-family:Inter,sans-serif">no preview yet</span>`;
            }}
          />
        </div>
      )}

      {/* Card body */}
      <div style={{
        background: isOpen ? "#1C2128" : "#161B22",
        border: `1px solid ${isOpen ? "rgba(0,194,179,0.5)" : "#21262D"}`,
        borderRadius: 12,
        padding: "22px 22px 18px",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
        boxShadow: isOpen
          ? "0 0 0 1px rgba(0,194,179,0.15)"
          : hovered ? "0 4px 16px rgba(0,0,0,0.3)" : "none",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Accent left bar */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: "#00C2B3",
          borderRadius: "3px 0 0 3px",
          transform: `scaleY(${isOpen || hovered ? 1 : 0})`,
          transformOrigin: "bottom",
          transition: "transform 0.22s ease",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 15, fontWeight: 600, margin: 0, color: "#E8EDF2", lineHeight: 1.4 }}>
            {project.title}
          </h3>
          <span style={{
            fontSize: 10, padding: "2px 8px", borderRadius: 999,
            fontFamily: "'Space Grotesk'", fontWeight: 500, letterSpacing: "0.04em",
            flexShrink: 0, marginLeft: 8,
            ...statusStyle[project.status],
          }}>{project.status}</span>
        </div>

        <p style={{ fontSize: 13, color: "#8B949E", lineHeight: 1.65, margin: "0 0 14px" }}>
          {project.blurb}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {project.tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 999,
              border: "1px solid #21262D", color: "#8B949E", background: "#0D1117",
            }}>{t}</span>
          ))}
        </div>

        <div style={{
          fontSize: 12, color: isOpen ? "#00C2B3" : "#8B949E",
          fontFamily: "'Space Grotesk'", fontWeight: 600,
          letterSpacing: "0.03em", transition: "color 0.2s", userSelect: "none",
        }}>
          {isOpen ? "▲ collapse" : "▼ click to see more"}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS GRID ───────────────────────────────────────────────────────────
// Injects the expanded panel directly after the row containing the open card.
function ProjectsGrid() {
  const [openId, setOpenId] = useState<number | null>(null);
  const COLS = 2;

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const rows: (typeof projects[0])[][] = [];
  for (let i = 0; i < projects.length; i += COLS) {
    rows.push(projects.slice(i, i + COLS));
  }

  const openRowIndex = openId !== null ? Math.floor(openId / COLS) : null;
  const openProject = openId !== null ? projects.find((p) => p.id === openId)! : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {row.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                isOpen={openId === p.id}
                onToggle={() => toggle(p.id)}
              />
            ))}
            {row.length < COLS && <div />}
          </div>
          {openRowIndex === rowIdx && openProject && (
            <ExpandedPanel
              key={openProject.id}
              project={openProject}
              onClose={() => setOpenId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
        :root {
          --bg: #0D1117; --surface: #161B22; --border: #21262D;
          --text: #E8EDF2; --muted: #8B949E;
          --accent: #00C2B3; --accent-dim: rgba(0,194,179,0.12);
        }
        *, *::before, *::after { box-sizing: border-box; }
        html, body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; margin: 0; }
        h1,h2,h3,h4 { font-family: 'Space Grotesk', sans-serif; }
        .hero-grid {
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        a.inline-link { color: var(--accent); text-decoration: none; }
        a.inline-link:hover { text-decoration: underline; }
        .section-label {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent); font-family: 'Space Grotesk'; font-weight: 600; margin-bottom: 8px;
        }
        @media (max-width: 540px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>

        {/* Nav */}
        <nav style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 0", borderBottom: "1px solid var(--border)", marginBottom: 64,
        }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 16 }}>LM</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Projects", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section style={{ marginBottom: 80 }}>
          <div className="hero-grid" style={{
            borderRadius: 16, border: "1px solid var(--border)",
            padding: "48px 40px", marginBottom: 40, position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", bottom: -60, right: -60, width: 200, height: 200,
              background: "radial-gradient(circle, rgba(0,194,179,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <p className="section-label">Creative Portfolio</p>
            <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px" }}>
              Kia ora — I'm <span style={{ color: "var(--accent)" }}>Lachlan McCreanney</span>
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 520 }}>
              AUT graduate with a passion for{" "}
              <span style={{ color: "var(--text)" }}>physical computing</span>,{" "}
              <span style={{ color: "var(--text)" }}>creative design</span>, and building web applications
              with a heavy focus around <span style={{ color: "var(--text)" }}>AI</span>.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#projects" style={{
                border: "1px solid var(--border)", borderRadius: 10, padding: "10px 20px",
                color: "var(--text)", textDecoration: "none",
                fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 500,
              }}>View Projects</a>
              <a href="mailto:lachlanmccreanney@gmail.com" style={{
                borderRadius: 10, padding: "10px 20px",
                background: "var(--accent)", color: "#0D1117",
                textDecoration: "none", fontFamily: "'Space Grotesk'",
                fontSize: 14, fontWeight: 600,
              }}>Contact Me</a>
            </div>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

        {/* Projects */}
        <section id="projects" style={{ marginBottom: 80 }}>
          <p className="section-label">Work</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>Selected Projects</h2>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 28px" }}>
            Hover a card to preview · click to expand details
          </p>
          <ProjectsGrid />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

        {/* About */}
        <section id="about" style={{ marginBottom: 80 }}>
          <p className="section-label">Background</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px" }}>About</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15 }}>
            I majored in Software Development at{" "}
            <span style={{ color: "var(--text)" }}>Auckland University of Technology (AUT)</span>{" "}
            for a Bachelor of Computer and Information Sciences, with minors in Creative Technology and Digital Communications.
            I've used an array of tools and skills across my projects — from Blender and Cura for 3D work,
            to web apps built with Python or Node.js and the OpenAI API.
            My focus is building interactive, engaging applications with a particular interest in{" "}
            <span style={{ color: "var(--text)" }}>AI</span>,{" "}
            <span style={{ color: "var(--text)" }}>web design</span>,{" "}
            <span style={{ color: "var(--text)" }}>physical computing</span>, and{" "}
            <span style={{ color: "var(--text)" }}>VFX / 3D modelling</span>.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

        {/* Contact */}
        <section id="contact" style={{ marginBottom: 80 }}>
          <p className="section-label">Get in Touch</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px" }}>Contact</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15 }}>
            Feel free to reach out via{" "}
            <a className="inline-link" href="mailto:lachlanmccreanney@gmail.com">lachlanmccreanney@gmail.com</a>{" "}
            or connect on{" "}
            <a className="inline-link" href="https://www.linkedin.com/in/lmccreanney" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
          </p>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid var(--border)", paddingTop: 24, paddingBottom: 48,
          fontSize: 13, color: "var(--muted)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
        }}>
          <span>© {new Date().getFullYear()} Lachlan McCreanney</span>
          <span>Built with Next.js · Deployed on Vercel</span>
        </footer>

      </main>
    </>
  );
}