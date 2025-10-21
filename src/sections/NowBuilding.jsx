// src/sections/NowBuilding.jsx
import React from "react";

const items = [
  {
    title: "Portfolio v2 Enhancements",
    summary:
      "Performance & accessibility pass, dedicated Resume page + email capture (EmailJS), nav routing, GSAP polish, and project cards with fixed sizing.",
    tech: [
      "React",
      "Vite",
      "Tailwind",
      "GSAP",
      "React Router",
      "EmailJS",
      "Azure Functions (optional)",
      "GitHub Actions"
    ],
    progress: 90,
    status: "Wrapping up",
    updated: "Oct 13, 2025",
    links: {
      repo: "https://github.com/RMSSanali/portfolio-v2.git",   // <- update if different
      demo: "https://portfolio-v2-ol2u.vercel.app/"                     // <- update if you have one
    },
    goals: ["Lighthouse 95+", "A11y pass", "Stable project carousel"],
    next: ["MDX blog scaffold", "Dark-mode fine tune", "RSS seed"],
    gradient: ["#1f4037", "#99f2c8"]
  },

  {
    title: "Containers with Docker Compose (Assignment)",
    summary:
      "Multi-container web app: React client + ASP.NET Core Web API + SQL DB, orchestrated via Docker Compose. Stretch goals: deploy on Azure Container Instances and manage secrets via Key Vault + App Configuration.",
    tech: [
      "Docker",
      "Docker Compose",
      "ASP.NET Core Web API",
      ".NET",
      "React",
      "SQL Server",
      "Azure Container Instances",
      "Azure Key Vault",
      "Azure App Configuration"
    ],
    progress: 30,                 // set whatever is true for you
    status: "Designing",
    updated: "Oct 13, 2025",
    links: {
      repo: "https://github.com/RMSSanali/compose-assignment", // placeholder
      demo: null
    },
    goals: [
      "Client+API+DB in Compose",
      "Swagger + health checks",
      "Local dev parity"
    ],
    next: ["Push to ACR & run on ACI", "Wire Key Vault secrets"],
    gradient: ["#0F2027", "#203A43", "#2C5364"]
  },
  {
  title: "AZ-104: Microsoft Azure Administrator (Prep)",
  summary:
    "Hands-on prep for AZ-104 focusing on identity, governance, storage, compute, networking, and monitoring. Lab-first approach with Azure Portal + CLI.",
  tech: [
    "Azure AD / Entra ID",
    "RBAC & Policy",
    "ARM/Bicep",
    "VMs & Scale Sets",
    "Storage (Blob/Files)",
    "VNets, NSGs, VPN",
    "Load Balancer/App GW",
    "Backup & Site Recovery",
    "Monitor/Log Analytics",
    "Azure CLI/PowerShell"
  ],
  progress: 55,                // set your real % here
  status: "In progress",
  updated: "Oct 13, 2025",
  links: {
    repo: null,                // if you keep notes in a repo, add it
    demo: "https://learn.microsoft.com/certifications/exams/az-104/"
  },
  goals: [
    "Complete MS Learn paths",
    "Build repeatable lab env with Bicep",
    "80%+ on practice tests"
  ],
  next: [
    "HA networking lab (LB + NAT + NSG)",
    "Backup/Restore + ASR drill",
    "Mock exam & review weak areas"
  ],
  gradient: ["#0f0c29", "#302b63"] // deep indigo vibes
}
];

export default function NowBuilding() {
  return (
    <section
      id="now-building"
      className="bg-bgdark text-main isolate pt-24 md:pt-28 pb-24"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-highlight">
          Now Building 🚧
        </h2>
        <p className="text-main/80 mt-3">
          A peek at what I’m actively working on. Small, focused, and shipped in slices.
        </p>
      </div>

      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="mt-10 px-6">
        <div className="flex gap-6 overflow-x-hidden no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {items.map((p, i) => (
            <article
              key={i}
              className="flex-shrink-0 md:flex-shrink rounded-2xl border border-white/10 shadow-lg w-[85vw] sm:w-[70vw] md:w-auto"
              style={{
                background: `linear-gradient(135deg, ${p.gradient.join(",")})`,
              }}
            >
              <div className="p-5 text-white">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/20">
                    {p.status}
                  </span>
                </div>

                <p className="text-sm opacity-90 mt-2">{p.summary}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="text-xs mb-1 opacity-90">
                    Progress • {p.progress}%
                  </div>
                  <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/80"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold mb-1">Goals</div>
                    <ul className="list-disc list-inside opacity-90 space-y-0.5">
                      {p.goals.map((g, gi) => (
                        <li key={gi}>{g}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Next</div>
                    <ul className="list-disc list-inside opacity-90 space-y-0.5">
                      {p.next.map((n, ni) => (
                        <li key={ni}>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs opacity-85">
                  <span>Updated {p.updated}</span>
                  <div className="flex items-center gap-3">
                    {p.links.repo && (
                      <a
                        className="underline hover:opacity-70"
                        href={p.links.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Repo
                      </a>
                    )}
                    {p.links.demo && (
                      <a
                        className="underline hover:opacity-70"
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 text-main/80">
          <span className="text-sm">
            Want details? Ping me and I’ll walk you through the roadmap.
          </span>
        </div>
      </div>
    </section>
  );
}
