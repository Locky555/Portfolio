import Link from "next/link";

const projects = [
  {
    title: "Course Planner Web App",
    blurb: "Next.js + NestJS + MongoDB. Search, filters, and article pages.",
    tags: ["Next.js", "MongoDB", "TypeScript"],
    href: "https://github.com/yourname/course-planner",
  },
  {
    title: "AI Chatbot (Ollama Deepseek + RAG)",
    blurb: "FAISS vector store + PDF ingestion, Flask API, ",
    tags: ["Python", "FAISS", "Flask"],
    href: "https://github.com/yourname/rag-bcis-bot",
  },

  {
  title: "Jeff the Shark",
  blurb: "A 3D printed model with Arduino Mp4 Audio Functions",
  tags: ["Arduino", "3d Print", "Physical Computing"]

},

{
  title: "Maori Language App Figma Demo",
  blurb: "A prototype made in figma for a potential Te Reo Learning App",
  tags: ["Figma", "UI/UX Design", "Prototyping"]
}
];

export default function Page() {
  return (
    <main className="space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Kia ora, Welcome to my Creative Portfolio <span className="underline decoration-4 decoration-blue-500/60"></span>.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Software Development Student 
        </p>
        <div className="flex gap-3">
          <Link
            href="#projects"
            className="rounded-2xl px-5 py-2.5 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            View Projects
          </Link>
          <a
            href="lachlanmccreanney@gmail.com"
            className="rounded-2xl px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="space-y-6">
        <h2 className="text-2xl font-semibold">Selected Projects</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow"
            >
              <h3 className="text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full border border-gray-300 dark:border-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="space-y-3">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="text-gray-700 dark:text-gray-300">
          I am currently a student in Auckland University of Technology (AUT) majoring in Software Development for a Bachelors of Computer and Information Sciences
          with minors in Creative Technology and Digital Communications.
          My focus is creating interactive, fun, applications with an interest in A.I, Physical Computing and VFX/3D Modelling/Design
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="space-y-3">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Best way: <a className="underline" href="mailto:you@example.com">you@example.com</a> or{" "}
          <a className="underline" href="https://www.linkedin.com/in/your-handle" target="_blank">LinkedIn</a>.
        </p>
      </section>

      {/* Footer */}
      <footer className="pt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Lachlan McCreanney — Built with Next.js on Vercel.
      </footer>
    </main>
  );
}
