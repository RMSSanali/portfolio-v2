// src/sections/ResumeSection.jsx
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    period: "Academic & Personal Projects — 2024–2025",
    title: "Cloud & Software Developer (Student)",
    body:
      "Building full-stack solutions across Azure + .NET + React. Focused on clean APIs, CI/CD, and observable, production-minded code. Highlights include REST APIs with ASP.NET, Azure App Service/Functions, SQL/Cosmos DB, and animated front-ends with React/GSAP.",
  },
];

const education = [
  {
    period: "JENSEN Yrkeshögskola — Cloudutvecklare, Azure • 2024–2026",
    title: "Higher Vocational Education (HVE) — Cloud Development on Azure",
    body:
      "Practical, project-driven training in Azure services (App Service, Functions, Key Vault, Storage, Managed Identity, Application Insights), .NET/ASP.NET, modern frontend (React/Tailwind/GSAP), DevOps (GitHub Actions/Azure DevOps), testing and Agile ways of working.",
  },
];

const stacks = [
  { heading: "Languages & Frameworks", lines: ["C#, JavaScript/TypeScript, SQL", ".NET, ASP.NET Core, Entity Framework, LINQ", "React, Tailwind, GSAP"] },
  { heading: "Azure & Data", lines: ["App Service, Functions, Storage, Key Vault", "Azure SQL, Cosmos DB", "Application Insights, Managed Identity"] },
  { heading: "DevOps & Tooling", lines: ["GitHub Actions, Azure DevOps", "Swagger/OpenAPI, Postman, Dapper", "MSTest, Agile (Scrum/Kanban)"] },
  { heading: "Focus Areas", lines: ["Clean Web APIs (REST)", "CI/CD & Observability", "UI motion & UX details"] },
];

export default function ResumeSection() {
  const rootRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".resume-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.06,
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    setErr("");
    setSent(false);
  };

  const closeModal = () => {
    if (sending) return;
    setShowModal(false);
    setForm({ name: "", email: "" });
    setErr("");
    setSent(false);
  };

  const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  // EXACTLY like ContactSection: use TEMPLATE_TO_ME and pass from_email
  const handleSendOnly = async () => {
    setErr("");

    const from_email = form.email.trim();
    const from_name = (form.name || "").trim();

    if (!isEmailValid(from_email)) {
      setErr("Please enter a valid email address.");
      return;
    }

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_TO_ME = import.meta.env.VITE_EMAILJS_TMPL_TO_ME; // same template used in ContactSection
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_TO_ME || !PUBLIC_KEY) {
      setErr("Email is temporarily unavailable (missing configuration).");
      return;
    }

    setSending(true);
    try {
      const params = {
        // these three are what your ContactSection sends:
        from_email,                                      // <- used for Reply-To header in template
        subject: "Contact me: CV request from portfolio",
        message: "Please send your CV to the requester above.",

        // optional extras for your email body/template
        from_name: from_name || "(no name provided)",
        kind: "cv_request",
        from_page: "Resume",
        timestamp: new Date().toISOString(),
      };

      const res = await emailjs.send(SERVICE_ID, TEMPLATE_TO_ME, params, { publicKey: PUBLIC_KEY });

      if (res?.status === 200) {
        setSent(true);
      } else {
        setErr("Could not send right now. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setErr("Sorry, something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="resume"
      ref={rootRef}
      className="relative min-h-screen w-screen overflow-x-hidden bg-bgdark text-main pt-20 md:pt-24 pb-20 md:pb-32"
    >
      {/* Floating “home” button */}
      <Link
        to="/#home"
        className="fixed bottom-6 right-6 z-[60] bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full font-semibold backdrop-blur-sm hover:bg-white/15 transition"
        aria-label="Back to home"
      >
        Take me home!
      </Link>

      {/* Centered content */}
      <div className="max-w-[1100px] w-full mx-auto px-4 md:px-6">
        {/* Intro */}
        <header className="text-center mb-12 resume-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-highlight">A Journey Through Cloud & Code</h2>
          <p className="mt-4 text-main/85 max-w-3xl mx-auto">
            I’m <span className="font-semibold text-white">Sanali Sewwandi</span> — Cloud & Software Developer.
            I turn Azure and .NET into reliable backends, and React + GSAP into delightful front-ends.
            Looking for a <span className="text-white font-semibold">LIA (internship)</span> —{" "}
            <span className="text-white/90">available November 2025</span>.
          </p>
        </header>

        {/* CTAs */}
        <div className="flex justify-center gap-3 flex-wrap mb-14 resume-reveal">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Download CV
          </button>

          <a
            href="mailto:contactrmsanali@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            contactrmsanali@gmail.com
          </a>

          <a
            href="https://www.github.com/RMSSanali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Open GitHub profile"
          >
            <Github size={20} aria-hidden />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/rmsanali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Open LinkedIn profile"
          >
            <Linkedin size={20} aria-hidden />
            LinkedIn
          </a>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="resume-reveal">
            <h3 className="text-2xl font-semibold text-white mb-4">Experience</h3>
            <ol className="relative border-s border-white/15">
              {experience.map((item, idx) => (
                <li key={idx} className="mb-6 ms-4">
                  <span className="absolute w-3 h-3 bg-white/70 rounded-full mt-1.5 -start-1.5 border border-white/20" />
                  <time className="mb-1 block text-sm text-main/60">{item.period}</time>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-main/80 mt-1">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="resume-reveal">
            <h3 className="text-2xl font-semibold text-white mb-4">Education</h3>
            <ol className="relative border-s border-white/15">
              {education.map((item, idx) => (
                <li key={idx} className="mb-6 ms-4">
                  <span className="absolute w-3 h-3 bg-white/70 rounded-full mt-1.5 -start-1.5 border border-white/20" />
                  <time className="mb-1 block text-sm text-main/60">{item.period}</time>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-main/80 mt-1">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tech blocks */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stacks.map((s) => (
            <div key={s.heading} className="resume-reveal rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-lg font-semibold text-neutral-100">{s.heading}</h4>
              <p className="text-sm text-neutral-300 mt-2 space-y-1">
                {s.lines.map((line, k) => (
                  <span key={k} className="block">{line}</span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={closeModal} />
          <div className="relative z-[71] w-[min(92vw,520px)] rounded-2xl bg-[#0f1627] border border-white/10 p-5 text-white">
            <h3 className="text-xl font-semibold mb-2">Send me your email?</h3>
            <p className="text-white/80 text-sm mb-4">
              Drop your email and I’ll personally send my CV.
            </p>

            {err && <p className="text-red-300 text-sm mb-2">* {err}</p>}
            {sent && <p className="text-green-300 text-sm mb-2">Thanks! I’ll send it shortly.</p>}

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-white/85 mb-1" htmlFor="cv-name">Name (optional)</label>
                <input
                  id="cv-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md bg-white/10 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-white/25"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-white/85 mb-1" htmlFor="cv-email">Email *</label>
                <input
                  id="cv-email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md bg-white/10 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-white/25"
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                disabled={sending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendOnly}
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
