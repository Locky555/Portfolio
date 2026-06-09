import Link from "next/link";

const projects = [
  {
    title: "Course Planner Web App",
    blurb:
      "Full-stack course discovery platform with search, filters, and article pages.",
    tags: ["Next.js", "MongoDB", "TypeScript", "NestJS"],
    href: "https://github.com/yourname/course-planner",
    status: "GitHub",
  },
  {
    title: "AI Chatbot — Ollama Deepseek + RAG",
    blurb:
      "FAISS vector store with PDF ingestion, a Flask API backend, and local LLM inference via Ollama.",
    tags: ["Python", "FAISS", "Flask", "Ollama"],
    href: "https://github.com/yourname/rag-bcis-bot",
    status: "GitHub",
  },
  {
    title: "Jeff the Shark",
    blurb:
      "A 3D-printed animatronic shark with Arduino-powered MP3 audio and servo control.",
    tags: ["Arduino", "3D Printing", "Physical Computing"],
    href: null,
    status: "Physical",
  },
  {
    title: "Māori Language App — Figma Demo",
    blurb:
      "A high-fidelity Figma prototype for a Te Reo Māori learning app, exploring gamification and cultural UX.",
    tags: ["Figma", "UI/UX Design", "Prototyping"],
    href: null,
    status: "Design",
  },
];

const statusColors: Record<string, string> = {
  GitHub: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  Physical: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Design: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

export default function Page() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

        :root {
          --bg: #0D1117;
          --surface: #161B22;
          --border: #21262D;
          --text: #E8EDF2;
          --muted: #8B949E;
          --accent: #00C2B3;
          --accent-dim: rgba(0,194,179,0.12);
        }

        html, body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          margin: 0;
        }

        h1, h2, h3, h4 {
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Grid texture for hero */
        .hero-grid {
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center;
        }

        /* Project card hover effect */
        .project-card {
          position: relative;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          background: var(--surface);
          transition: border-color 0.2s, box-shadow 0.2s;
          overflow: hidden;
          text-decoration: none;
          color: var(--text);
          display: block;
        }
        .project-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.25s ease;
          border-radius: 3px 0 0 3px;
        }
        .project-card:hover {
          border-color: rgba(0,194,179,0.35);
          box-shadow: 0 0 20px rgba(0,194,179,0.07);
        }
        .project-card:hover::before {
          transform: scaleY(1);
        }
        .project-card-static {
          cursor: default;
        }
        .project-card-static:hover {
          border-color: rgba(139,148,158,0.35);
          box-shadow: none;
        }
        .project-card-static::before {
          background: var(--muted);
        }

        .tag {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--bg);
          font-family: 'Inter', sans-serif;
        }

        .status-badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 500;
          letter-spacing: 0.04em;
        }

        .btn-outline {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px 20px;
          color: var(--text);
          text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline:hover {
          border-color: var(--accent);
          background: var(--accent-dim);
        }

        .btn-primary {
          border-radius: 10px;
          padding: 10px 20px;
          background: var(--accent);
          color: #0D1117;
          text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.85;
        }

        .section-label {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0;
        }

        a.inline-link {
          color: var(--accent);
          text-decoration: none;
        }
        a.inline-link:hover {
          text-decoration: underline;
        }

        @media (prefers-reduced-motion: reduce) {
          .project-card::before,
          .project-card,
          .btn-outline,
          .btn-primary { transition: none; }
        }
      `}</style>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>

        {/* Nav */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 0",
          borderBottom: "1px solid var(--border)",
          marginBottom: 64,
        }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 16, color: "var(--text)" }}>
            LM
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Projects", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{ color: "var(--muted)", fontSize: 14, textDecoration: "none", fontFamily: "'Inter'" }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section style={{ marginBottom: 80 }}>
          <div
            className="hero-grid"
            style={{
              borderRadius: 16,
              border: "1px solid var(--border)",
              padding: "48px 40px",
              marginBottom: 40,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Teal glow */}
            <div style={{
              position: "absolute", bottom: -60, right: -60,
              width: 200, height: 200,
              background: "radial-gradient(circle, rgba(0,194,179,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <p className="section-label">Creative Portfolio</p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: "var(--text)" }}>
              Kia ora — I'm{" "}
              <span style={{ color: "var(--accent)" }}>Lachlan McCreanney</span>
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 480 }}>
              AUT student building interactive apps at the intersection of{" "}
              <span style={{ color: "var(--text)" }}>AI</span>,{" "}
              <span style={{ color: "var(--text)" }}>physical computing</span>, and{" "}
              <span style={{ color: "var(--text)" }}>creative design</span>.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#projects" className="btn-outline">View Projects</a>
              <a href="mailto:lachlanmccreanney@gmail.com" className="btn-primary">Contact Me</a>
            </div>
          </div>
        </section>

        <hr className="divider" style={{ marginBottom: 64 }} />

        {/* Projects */}
        <section id="projects" style={{ marginBottom: 80 }}>
          <p className="section-label">Work</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 32px", color: "var(--text)" }}>
            Selected Projects
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {projects.map((p) => {
              const cardClass = `project-card${p.href ? "" : " project-card-static"}`;
              const inner = (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{p.title}</h3>
                    <span className={`status-badge ${statusColors[p.status]}`}>{p.status}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, margin: "0 0 16px" }}>{p.blurb}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  {p.href && (
                    <p style={{ fontSize: 12, color: "var(--accent)", margin: "14px 0 0", fontFamily: "'Space Grotesk'" }}>
                      View on GitHub →
                    </p>
                  )}
                </>
              );
              return p.href ? (
                <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                  {inner}
                </a>
              ) : (
                <div key={p.title} className={cardClass}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        <hr className="divider" style={{ marginBottom: 64 }} />

        {/* About */}
        <section id="about" style={{ marginBottom: 80 }}>
          <p className="section-label">Background</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px", color: "var(--text)" }}>About</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15 }}>
            I'm studying Software Development at{" "}
            <span style={{ color: "var(--text)" }}>Auckland University of Technology (AUT)</span>{" "}
            for a Bachelor of Computer and Information Sciences, with minors in Creative Technology and Digital Communications.
            My focus is building interactive, engaging applications — with a particular interest in{" "}
            <span style={{ color: "var(--text)" }}>AI</span>,{" "}
            <span style={{ color: "var(--text)" }}>physical computing</span>, and{" "}
            <span style={{ color: "var(--text)" }}>VFX / 3D modelling</span>.
          </p>
        </section>

        <hr className="divider" style={{ marginBottom: 64 }} />

        {/* Contact */}
        <section id="contact" style={{ marginBottom: 80 }}>
          <p className="section-label">Get in Touch</p>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 16px", color: "var(--text)" }}>Contact</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15 }}>
            Feel free to reach out via{" "}
            <a className="inline-link" href="mailto:lachlanmccreanney@gmail.com">lachlanmccreanney@gmail.com</a>{" "}
            or connect on{" "}
            <a className="inline-link" href="https://www.linkedin.com/in/lmccreanney" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
          </p>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 24,
          paddingBottom: 48,
          fontSize: 13,
          color: "var(--muted)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <span>© {new Date().getFullYear()} Lachlan McCreanney</span>
          <span>Built with Next.js · Deployed on Vercel</span>
        </footer>

      </main>
    </>
  );
}