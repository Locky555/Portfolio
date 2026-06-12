"use client";
import { useState } from "react";

// ─── PROJECT DATA ────────────────────────────────────────────────────────────
// RULES:
//   previewImage : single string or null
//   images       : always an array (use [] if none)
//   videos       : always an array (use [] if none)
//   tags         : always an array (use [] if none)

const projects = [
  {
    id: 0,
    title: "AUT Course Planner Web App",
    blurb: "Full-stack course discovery platform with search, filters, and article pages.",
    tags: ["Next.js", "TypeScript", "NestJS"],
    href: "https://github.com/yourname/course-planner",
    status: "GitHub",
    previewImage: "/images/course-planner-preview.png",
    detail: `The course planner app was the main assignment for my Research and Development group project at AUT, in addition to my Chatbot that was implemented in later I turned our figma (interface design tool) prototype into a working User Interface. After the user inputs their degree type eg. Double Major - Compsci & Data Analysis it would generate the most optimal course plan with lists of courses per year in order to meet the requirements of 160 points to graduate and covering all prerequisites, mandatory courses and fitting in the correct semesters/time slots getting information from json files with each combination of courses. The course "blocks" could then be rearranged, deleted or swapped out to be more cuztomizable for the user. There was also a "perequisite checker" a pop up that alerted you if your edited course plan met all the requirements and what needed to be changed/added.`,
    images: ["/images/course-planner-1.png", "/images/course-planner-2.png"],
    videos: [],
  },
  {
    id: 1,
    title: "AI Chatbot — Ollama Deepseek + RAG",
    blurb: "FAISS vector store with PDF ingestion, Flask API backend, and local LLM inference via Ollama.",
    tags: ["Python", "FAISS", "Flask", "Ollama"],
    href: "https://github.com/yourname/rag-bcis-bot",
    status: "GitHub",
    previewImage: "/media/AI_Chatbot/chatbot1.png",
    detail: `This AI Chatbot was my major contribution to the final research and development project at AUT, as part of the Course Planner. It was my first chatbot powered by a real LLM being the deepseek-16b ollama model, run entirely locally on my own hardware. It was designed as a course and study advisor for computer science students — reading from a PDF database of AUT CompSci courses and responding to prompts like generating course plans, listing prerequisites, and answering general study questions.

The project came with serious challenges: hardware constraints, AI hallucinations, and a steep learning curve across many tools and frameworks. Through persistence, upskilling, and collaboration with peers, I developed guardrails to keep the model on track and produce reliable output. This experience gave me a deep understanding of how AI "thinks", how to manage it, and how to get useful results from it.

This project sparked my ongoing interest in AI integration and raised compelling ethical questions around AI use — particularly how locally-run models can be a powerful and privacy-conscious alternative to large cloud-based language models.`,
    images: ["/media/chatbot1.png", "/media/chatbot2.png", "/media/chatbot3.JPG"],
    videos: ["/media/AI_Chatbot/chatbot.mp4"],
  },
  {
    id: 2,
    title: "Jeff the Shark",
    blurb: "A 3D-printed animatronic shark with Arduino-powered MP3 audio and servo control.",
    tags: ["Arduino", "3D Printing", "Physical Computing"],
    href: null,
    status: "Physical",
    previewImage: "/media/Jeff_The_Shark/jeff1.jpg",
    detail: `Jeff the Shark was one of my most ambitious personal projects, inspired by the Marvel character of the same name. 3D printing is a hobby of mine, and I wanted to take it further by incorporating an Arduino audio controller into the base to create a talking figurine. The result is a model that plays audio on command — bringing Jeff to life.

Along the way I learned how to use Cura to prepare and edit 3D models for printing, as well as basic soldering and rudimentary circuitry to wire up the audio module. 3D printing comes with its own set of challenges — particularly the time investment and the potential for failed prints. Patience and persistence paid off, and I'm really happy with how it turned out.

(The Jeff the Shark 3D model was purchased from CGTrader.)`,
    images: ["/media/Jeff_The_Shark/jeff1.jpg", "/media/Jeff_The_Shark/jeff2.jpg"],
    videos: ["/media/Jeff_The_Shark/jeff3.mp4"],
  },
  {
    id: 3,
    title: "Māori Language App — Figma Demo",
    blurb: "A high-fidelity Figma prototype for a Te Reo Māori learning app, exploring gamification and cultural UX.",
    tags: ["Figma", "UI/UX Design", "Prototyping"],
    href: null,
    status: "Design",
    previewImage: "/media/Figma/tui.png",
    detail: `The Māori Language App was a project for my Digital Communications minor, giving me a solid grounding in UI/UX design principles — how typography, buttons, transitions, and colour can work together to create an engaging experience. It pushed me to step back from just making something functional and think carefully about how to make it feel good to use.

The prototype features lessons for all skill levels, including listening exercises, reading activities, and gamified quizzes with visual feedback. This project aligns strongly with my goal of incorporating more Māori influence into technology, and I'd love to develop the concept further into a fully working application.`,
    images: ["/media/Figma/tui.png"],
    videos: ["/media/Figma/figma1.mp4"],
  },
  {
    id: 4,
    title: "AI Language Translator",
    blurb: "A mobile app built with Expo/React Native, using ngrok + Node.js as a local server and OpenAI for translation.",
    tags: ["OpenAI", "Node.js", "Expo", "React Native"],
    href: null,
    status: "Mobile App",
    previewImage: null,
    detail: `The AI Language Translator came out of a real problem — wanting to communicate better with my Chilean-Spanish speaking friends and family. Standard translation apps struggle with Chilean dialects and slang, often producing technically correct but contextually wrong results. I wanted something smarter.

Built with Expo and React Native, the app sends translation requests to a Node.js server running locally on my laptop, tunnelled to the internet via ngrok. This was a great exercise in integrating APIs into a working mobile application and understanding how to move a project from a local prototype to something accessible over the web. It's still a work in progress and something I plan to keep developing.`,
    images: [],
    videos: [],
  },
  {
    id: 5,
    title: "Various Projects",
    blurb: "A collection of small ideas and creations from university and personal time.",
    tags: ["Blender", "Unity", "Motion Graphics"],
    href: null,
    status: "Various",
    previewImage: null,
    detail: `A mix of smaller experiments and creative projects made throughout my studies and in my own time — including motion graphics composites, Unity game prototypes, and 3D work in Blender.`,
    images: [],
    videos: [
      "/media/Various/vid1.mp4",
      "/media/Various/vid2.mp4",
      "/media/Various/vid.mp4",
    ],
  },
  {
    id: 6,
    title: "Webflow — Minty3D",
    blurb: "Web design and interactive UI experiments built in Webflow.",
    tags: ["Webflow", "UI/UX Design", "Web Design"],
    href: null,
    status: "Design",
    previewImage: "/media/Webflow/canvas.png",
    detail: `Minty3D is a conceptual 3D printing website built as part of a Digital Communications assignment to learn Webflow. I drew on my development background to push beyond the basics — implementing a YouTube video carousel scroll and other interactive features using small amounts of custom code.

The project was a great opportunity to combine programming and design thinking in a short sprint with unfamiliar software. I researched common patterns from real startup websites, critiqued what worked and what didn't, and used that to inform my own design decisions. It reinforced how much thought goes into making an interface feel polished and intuitive.`,
    images: ["/media/Webflow/canvas.png", "/media/Webflow/canvas2.png"],
    videos: ["/media/Webflow/canvas3.mp4"],
  },
];

// ─── STATUS BADGE STYLES ─────────────────────────────────────────────────────
const statusStyle: Record<string, React.CSSProperties> = {
  GitHub:       { background: "rgba(0,194,179,0.1)",   color: "#00C2B3", border: "1px solid rgba(0,194,179,0.3)" },
  Physical:     { background: "rgba(251,146,60,0.1)",  color: "#fb923c", border: "1px solid rgba(251,146,60,0.3)" },
  Design:       { background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" },
  "Mobile App": { background: "rgba(96,165,250,0.1)",  color: "#60a5fa", border: "1px solid rgba(96,165,250,0.3)" },
  Various:      { background: "rgba(251,191,36,0.1)",  color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" },
};

// ─── EXPANDED PANEL ──────────────────────────────────────────────────────────
function ExpandedPanel({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <div style={{
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
        .media-label {
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #00C2B3; font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; margin: 0 0 10px;
        }
        .media-scroll {
          display: flex; gap: 12px; overflow-x: auto;
          padding-bottom: 8px; margin-bottom: 20px;
          scrollbar-width: thin; scrollbar-color: #21262D transparent;
        }
        .media-scroll::-webkit-scrollbar { height: 4px; }
        .media-scroll::-webkit-scrollbar-thumb { background: #21262D; border-radius: 4px; }
      `}</style>

      <button onClick={onClose} aria-label="Close" style={{
        position: "absolute", top: 18, right: 18,
        background: "none", border: "none", cursor: "pointer",
        color: "#8B949E", fontSize: 20, lineHeight: 1, padding: "4px 8px", borderRadius: 6,
      }}>✕</button>

      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 16px", color: "#E8EDF2" }}>
        {project.title}
      </h3>

      <p className="detail-text">{project.detail}</p>

      {/* Videos */}
      {project.videos.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p className="media-label">Demo{project.videos.length > 1 ? "s" : ""}</p>
          <div className="media-scroll">
            {project.videos.map((src, i) => (
              <video key={i} src={src} controls style={{
                flexShrink: 0,
                width: project.videos.length === 1 ? "100%" : 360,
                maxWidth: 560,
                borderRadius: 8, border: "1px solid #21262D", background: "#0D1117",
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Images */}
      {project.images.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p className="media-label">Screenshots</p>
          <div className="media-scroll">
            {project.images.map((src, i) => (
              <div key={i} style={{
                maxWidth: 480, borderRadius: 8, overflow: "hidden", flexShrink: 0,
                background: "#0D1117", border: "1px solid #21262D",
              }}>
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  style={{ display: "block", width: "100%" }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    el.parentElement!.innerHTML = `<span style="color:#8B949E;font-size:12px;font-family:Inter,sans-serif;padding:16px;display:block">image coming soon</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags + GitHub link */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {project.tags.map((t) => (
          <span key={t} style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 999,
            border: "1px solid #21262D", color: "#8B949E", background: "#0D1117",
          }}>{t}</span>
        ))}
        {project.href && (
          <a href={project.href} target="_blank" rel="noopener noreferrer" style={{
            marginLeft: "auto", fontSize: 13, color: "#00C2B3",
            textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          }}>View on GitHub →</a>
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
      {hovered && !isOpen && project.previewImage && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
          transform: "translateX(-50%)",
          width: 220, height: 130, borderRadius: 10, overflow: "hidden",
          background: "#0D1117", border: "1px solid rgba(0,194,179,0.3)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          zIndex: 10, pointerEvents: "none", animation: "fadeUp 0.15s ease",
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
              p.style.cssText += "display:flex;align-items:center;justify-content:center;";
              p.innerHTML = `<span style="color:#8B949E;font-size:12px;font-family:Inter,sans-serif">no preview yet</span>`;
            }}
          />
        </div>
      )}

      <div style={{
        background: isOpen ? "#1C2128" : "#161B22",
        border: `1px solid ${isOpen ? "rgba(0,194,179,0.5)" : "#21262D"}`,
        borderRadius: 12, padding: "22px 22px 18px",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
        boxShadow: isOpen ? "0 0 0 1px rgba(0,194,179,0.15)" : hovered ? "0 4px 16px rgba(0,0,0,0.3)" : "none",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: "#00C2B3", borderRadius: "3px 0 0 3px",
          transform: `scaleY(${isOpen || hovered ? 1 : 0})`,
          transformOrigin: "bottom", transition: "transform 0.22s ease",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, margin: 0, color: "#E8EDF2", lineHeight: 1.4 }}>
            {project.title}
          </h3>
          <span style={{
            fontSize: 10, padding: "2px 8px", borderRadius: 999,
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, letterSpacing: "0.04em",
            flexShrink: 0, marginLeft: 8,
            ...(statusStyle[project.status] ?? statusStyle["Various"]),
          }}>{project.status}</span>
        </div>

        <p style={{ fontSize: 13, color: "#8B949E", lineHeight: 1.65, margin: "0 0 14px" }}>
          {project.blurb}
        </p>

        {project.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 999,
                border: "1px solid #21262D", color: "#8B949E", background: "#0D1117",
              }}>{t}</span>
            ))}
          </div>
        )}

        <div style={{
          fontSize: 12, color: isOpen ? "#00C2B3" : "#8B949E",
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          letterSpacing: "0.03em", transition: "color 0.2s", userSelect: "none",
        }}>
          {isOpen ? "▲ collapse" : "▼ click to see more"}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS GRID ───────────────────────────────────────────────────────────
function ProjectsGrid() {
  const [openId, setOpenId] = useState<number | null>(null);
  const COLS = 2;

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const rows: (typeof projects[0])[][] = [];
  for (let i = 0; i < projects.length; i += COLS) {
    rows.push(projects.slice(i, i + COLS));
  }

  const openIdx = openId !== null ? projects.findIndex((p) => p.id === openId) : -1;
  const openRowIndex = openIdx >= 0 ? Math.floor(openIdx / COLS) : null;
  const openProject = openIdx >= 0 ? projects[openIdx] : null;

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
        h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; }
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
          color: var(--accent); font-family: 'Space Grotesk', sans-serif;
          font-weight: 600; margin-bottom: 8px;
        }
        @media (max-width: 540px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>

        <nav style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "24px 0", borderBottom: "1px solid var(--border)", marginBottom: 64,
        }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16 }}>LM</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Projects", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        <section style={{ marginBottom: 80 }}>
          <div className="hero-grid" style={{
            borderRadius: 16, border: "1px solid var(--border)",
            padding: "48px 40px", position: "relative", overflow: "hidden",
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
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 500,
              }}>View Projects</a>
              <a href="mailto:lachlanmccreanney@gmail.com" style={{
                borderRadius: 10, padding: "10px 20px",
                background: "var(--accent)", color: "#0D1117", textDecoration: "none",
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
              }}>Contact Me</a>
            </div>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

        <section id="projects" style={{ marginBottom: 80 }}>
          <p className="section-label">Work</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>Selected Projects</h2>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: "0 0 28px" }}>
            Hover a card to preview · click to expand details
          </p>
          <ProjectsGrid />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

        <section id="about" style={{ marginBottom: 80 }}>
          <p className="section-label">Background</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px" }}>About</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15 }}>
            I majored in Software Development at{" "}
            <span style={{ color: "var(--text)" }}>Auckland University of Technology (AUT)</span>{" "}
            for a Bachelor of Computer and Information Sciences, with minors in Creative Technology and Digital Communications.
            I've used an array of tools across my projects — from Blender and Cura for 3D work,
            to web apps built with Python or Node.js and the OpenAI API.
            My focus is building interactive, engaging applications with a particular interest in{" "}
            <span style={{ color: "var(--text)" }}>AI</span>,{" "}
            <span style={{ color: "var(--text)" }}>web design</span>,{" "}
            <span style={{ color: "var(--text)" }}>physical computing</span>, and{" "}
            <span style={{ color: "var(--text)" }}>VFX / 3D modelling</span>.
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 64 }} />

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