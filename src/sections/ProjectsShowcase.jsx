// src/sections/ProjectsShowcase.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    name: "Car Driving Simulator",
    image: "/projects/car.png",
    description: "MVC app simulating driver behavior with unit tests and Azure CI/CD.",
    gradient: ["#20002c", "#cbb4d4"],
    tech: ["ASP.NET", "MSTest", "Azure DevOps"],
    url: "https://github.com/RMSSanali/CarDrivingSimulator",
  },
  {
    name: "TomatoPizza API",
    image: "/projects/tomatopizza-swagger.png",
    description:
      "REST API for pizza ordering — dishes, ingredients, orders, and admin endpoints. Deployed on Azure with Swagger docs.",
    gradient: ["#8E2DE2", "#4A00E0"],
    tech: ["C#", "ASP.NET", "SQL", "Swagger", "Azure"],
    url: "https://github.com/RMSSanali/tomatopizza-api",
  },
  {
    name: "Cloud CRM System",
    image: "/projects/cloudcrm.png",
    description: "Azure-hosted CRM system using Minimal API, Cosmos DB, and Functions.",
    gradient: ["#283E51", "#485563"],
    tech: ["Azure", "Cosmos DB", "Functions", "SendGrid"],
    url: "https://github.com/RMSSanali/CosmoCRM.git",
  },
  {
    name: "Cloud Infrastructure & Deployment",
    image: "/projects/cloud-infra.png", // add a 16:9-ish screenshot here
    description:
      "Deployed REST APIs to Azure App Service via GitHub Actions; hosted an API on an Azure VM with NSG & IAM; wired up Application Insights and secured secrets with Key Vault.",
    gradient: ["#0f2027", "#2c5364"], // deep teal/blue
    tech: ["Azure App Service", "Azure VM", "GitHub Actions", "App Insights", "Key Vault", "NSG", "IAM"],
    url: "https://github.com/RMSSanali/cua24s_gamestore.git",
  },
  {
    name: "Weather App",
    image: "/projects/weather.png",
    description: "Responsive weather app with live updates using OpenWeather API.",
    gradient: ["#56CCF2", "#2F80ED"],
    tech: ["React", "API", "CSS"],
    url: "https://github.com/RMSSanali/weather-forecast-app.git",
  },
  {
    name: "Community Blog Web API",
    image: "/projects/blog.png",
    description: "Secure RESTful API for blogging with JWT auth & CRUD for posts/comments.",
    gradient: ["#1F6582", "#1ABCFE"],
    tech: ["C#", "ASP.NET", "SQL", "JWT"],
    url: "https://github.com/RMSSanali/CommunityBlogAPI",
  },
  {
    name: "Banking Web API",
    image: "/projects/banking.png",
    description: "API for banking operations — accounts, transactions, and loans.",
    gradient: ["#4E54C8", "#8F94FB"],
    tech: ["C#", "ASP.NET", "SQL"],
    url: "https://github.com/RMSSanali/BankingWebAPI",
  },
  {
    name: "Online Auction System",
    image: "/projects/auction.png",
    description: "Real-time bidding platform with JWT authentication and Swagger docs.",
    gradient: ["#16222A", "#3A6073"],
    tech: ["C#", "ASP.NET", "SQL", "Trello"],
    url: "https://github.com/RMSSanali/OnlineAuctionSystem",
  },
];

export default function ProjectsShowcase() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [index, setIndex] = useState(0);
  const [cardSize, setCardSize] = useState({ width: 0, gap: 24 });
  const [perView, setPerView] = useState(1);
  const items = useMemo(() => projects, []);
  const maxIndex = Math.max(0, items.length - perView);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const pv = w >= 1280 ? 3 : w >= 1024 ? 2 : 1;
      setPerView(pv);

      const first = cardRefs.current[0];
      const width = first ? first.getBoundingClientRect().width : 360;
      setCardSize({ width, gap: 24 });

      const max = Math.max(0, items.length - pv);
      setIndex((i) => Math.min(i, max));
    };

    calc();
    const ro = new ResizeObserver(calc);
    cardRefs.current.forEach((c) => c && ro.observe(c));
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [items.length]);

  const go = (dir) => setIndex((i) => Math.min(maxIndex, Math.max(0, i + dir)));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maxIndex, perView]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0, dx = 0;
    const onStart = (e) => { startX = (e.touches ? e.touches[0].clientX : e.clientX); dx = 0; };
    const onMove  = (e) => { const x = (e.touches ? e.touches[0].clientX : e.clientX); dx = x - startX; };
    const onEnd   = () => { const t = 60; if (dx > t) go(-1); if (dx < -t) go(1); startX = 0; dx = 0; };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("mousedown", onStart);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mousedown", onStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
    };
  }, []);

  const translate = -(index * (cardSize.width + cardSize.gap));

  return (
    <section id="projects" className="relative isolate bg-bgdark text-main pt-32 md:pt-40 pb-20 overflow-x-hidden">
      <div className="mb-10 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-highlight">From Concept to Cloud ☁️</h2>
        <p className="text-lg text-main/80 mt-4 max-w-2xl mx-auto">
          A showcase of my academic and cloud-based projects, blending creativity and technical precision.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-nowrap items-stretch gap-6 will-change-transform transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${translate}px)` }}
            aria-live="polite"
          >
            {items.map((project, idx) => (
              <a
                key={idx}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex-none focus:outline-none focus:ring-2 focus:ring-white/40 rounded-xl"
                ref={(el) => (cardRefs.current[idx] = el)}
                /* fixed width per breakpoint so width never changes */
                style={{}}
              >
                <div
                  className="
                    flex-none
                    w-[86vw] sm:w-[68vw] md:w-[46vw] lg:w-[32vw] xl:w-[28vw]
                    h-[480px] md:h-[520px]                 /* unified height */
                    rounded-2xl overflow-hidden shadow-lg transition-transform duration-300
                    hover:scale-[1.03] hover:shadow-2xl
                    flex flex-col
                  "
                  style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
                >
                  {/* Media area (fixed) */}
                  <div className="relative w-full h-[220px] md:h-[260px]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>

                  {/* Content (fills remaining space) */}
                  <div className="flex flex-col justify-between gap-3 p-5 md:p-6 text-white flex-1">
                    <div>
                      <h3 className="font-semibold text-xl md:text-2xl mb-2 line-clamp-2 break-words">
                        {project.name}
                      </h3>
                      <p className="text-sm md:text-base opacity-90 line-clamp-2 break-words">
                        {project.description}
                      </p>
                    </div>

                    {/* Chips (cap height so it never grows card) */}
                    <div className="flex flex-wrap gap-2 overflow-hidden max-h-10 md:max-h-12">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="bg-black/40 text-xs md:text-sm px-2 py-1 rounded-full border border-white/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 text-black shadow hover:bg-white disabled:opacity-50"
          aria-label="Previous project"
          title="Previous (←)"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => go(1)}
          disabled={index === maxIndex}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 text-black shadow hover:bg-white disabled:opacity-50"
          aria-label="Next project"
          title="Next (→)"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
