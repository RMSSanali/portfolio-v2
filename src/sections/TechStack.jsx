// src/sections/TechStack.jsx
import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ==== Tunables ==== */
const REDUCED_GRAVITY_Y = 0.28;     // slower fall so users can read items
const ARM_AFTER_MS = 1000;          // wait before considering overflow (unless mouse moves)
const REQUIRE_MOUSE_MOVE = true;    // arm immediately on first mouse move
const OVERFLOW_SUSTAIN_FRAMES = 36; // ~0.6s at 60fps with 2 plates near bottom
const BANNER_SHOW_MS = 2200;        // show the two lines before auto-scroll
const BOTTOM_BAND = 0.6;            // 0.5–0.7; larger = needs to be further down the screen

/* ==== Your tech stack ==== */
const techStack = [
  { name: "C#", color: "#178600" },
  { name: ".NET / ASP.NET Core", color: "#512BD4" },
  { name: "Web API (REST)", color: "#6E57E0" },
  { name: "Entity Framework Core", color: "#68217A" },
  { name: "Dapper", color: "#F37726" },
  { name: "LINQ", color: "#5A2CA0" },
  { name: "SQL Server", color: "#CC2927" },
  { name: "Azure App Service", color: "#0078D7" },
  { name: "Azure Functions", color: "#F2C811" },
  { name: "Storage Account", color: "#0078D4" },
  { name: "Key Vault", color: "#5C2D91" },
  { name: "Azure SQL / Cosmos DB", color: "#00BCF2" },
  { name: "Application Insights", color: "#7FBA00" },
  { name: "Managed Identity", color: "#107C10" },
  { name: "GitHub Actions", color: "#181717" },
  { name: "Azure DevOps", color: "#0078D7" },
  { name: "Agile", color: "#0ea5e9" },
  { name: "Swagger / OpenAPI", color: "#85EA2D" },
  { name: "MSTest", color: "#0063B1" },
  { name: "Postman", color: "#FF6C37" },
  { name: "React", color: "#61DAFB" },
  { name: "Tailwind", color: "#38BDF8" },
  { name: "GSAP", color: "#88CE02" },
];

export default function TechStack() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const rafRef = useRef(null);
  const bodiesRef = useRef([]); // [{ body, el, w, h }]
  const hasStarted = useRef(false);

  // Flow/state flags
  const armedRef = useRef(false);
  const armTimerRef = useRef(null);
  const overflowedRef = useRef(false);
  const playingRef = useRef(true);
  const userScrolledRef = useRef(false);
  const sustainFramesRef = useRef(0);
  const bannerTimerRef = useRef(null);
  const scrollBoundRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Bind wheel/touch when in section (scroll → go to contact)
  const bindScrollShortcuts = () => {
    if (scrollBoundRef.current) return () => {};
    scrollBoundRef.current = true;

    const onWheel = (e) => {
      if (!playingRef.current) return;
      userScrolledRef.current = true;
      e.preventDefault();
      scrollToContact();
    };

    let touchStartY = 0;
    const onTouchStart = (e) => { touchStartY = e.touches?.[0]?.clientY ?? 0; };
    const onTouchMove = (e) => {
      const y = e.touches?.[0]?.clientY ?? 0;
      if (Math.abs(y - touchStartY) > 8) {
        if (!playingRef.current) return;
        userScrolledRef.current = true;
        e.preventDefault();
        scrollToContact();
      }
    };

    const node = containerRef.current;
    node?.addEventListener("wheel", onWheel, { passive: false });
    node?.addEventListener("touchstart", onTouchStart, { passive: true });
    node?.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      node?.removeEventListener("wheel", onWheel);
      node?.removeEventListener("touchstart", onTouchStart);
      node?.removeEventListener("touchmove", onTouchMove);
      scrollBoundRef.current = false;
    };
  };

  const showBannerThenScroll = () => {
    setShowBanner(true);
    gsap.to(".tech-plate", { opacity: 0.18, filter: "blur(0.5px)", duration: 0.4, ease: "power2.out" });
    if (engineRef.current) engineRef.current.timing.timeScale = 0;

    bannerTimerRef.current = window.setTimeout(() => {
      if (!userScrolledRef.current) scrollToContact();
    }, BANNER_SHOW_MS);
  };

  useEffect(() => {
    const startPhysics = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      // Reset flow each time we enter the section
      armedRef.current = !REQUIRE_MOUSE_MOVE; // if false, first mouse move will arm
      overflowedRef.current = false;
      playingRef.current = true;
      userScrolledRef.current = false;
      sustainFramesRef.current = 0;
      setShowBanner(false);
      if (bannerTimerRef.current) { clearTimeout(bannerTimerRef.current); bannerTimerRef.current = null; }
      if (armTimerRef.current) { clearTimeout(armTimerRef.current); armTimerRef.current = null; }

      const container = containerRef.current;
      if (!container) return;

      const offScroll = bindScrollShortcuts();

      const engine = Matter.Engine.create();
      engine.world.gravity.y = REDUCED_GRAVITY_Y; // slower fall
      const world = engine.world;
      engineRef.current = engine;

      const { width, height } = container.getBoundingClientRect();

      // Walls
      const wallT = 100;
      Matter.World.add(world, [
        Matter.Bodies.rectangle(width / 2, -wallT / 2, width, wallT, { isStatic: true }),
        Matter.Bodies.rectangle(width / 2, height + wallT / 2, width, wallT, { isStatic: true }),
        Matter.Bodies.rectangle(-wallT / 2, height / 2, wallT, height, { isStatic: true }),
        Matter.Bodies.rectangle(width + wallT / 2, height / 2, wallT, height, { isStatic: true }),
      ]);

      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      const plateH = mobile ? 40 : 50;
      const plateW = mobile ? 120 : 300;
      const spacing = 10;

      // Multi-column layout so everything fits
      const usableHeight = Math.max(0, height - 160);
      const rowsPerCol = Math.max(1, Math.floor(usableHeight / (plateH + spacing)));
      const numCols = Math.max(1, Math.ceil(techStack.length / rowsPerCol));
      const colX = (idx) => {
        const margin = plateW * 0.6;
        const available = Math.max(0, width - margin * 2);
        return margin + available * ((idx + 0.5) / numCols);
      };

      const bodies = techStack.map((item, i) => {
        const col = Math.floor(i / rowsPerCol);
        const row = i % rowsPerCol;
        const x = colX(col);
        const y = 60 + row * (plateH + spacing);

        const el = document.createElement("div");
        el.className = "tech-plate";
        el.innerText = item.name;
        el.style.cssText = `
          width:${plateW}px;height:${plateH}px;
          border:2px solid ${item.color || "#c4b9a5"};
          color:#eae5d9;
          display:flex;align-items:center;justify-content:center;
          border-radius:30px;position:absolute;top:0;left:0;
          font-weight:600;user-select:none;z-index:5;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(2px);
          white-space:nowrap;
          pointer-events:none; /* <-- let mousemove reach container */
        `;
        container.appendChild(el);

        const body = Matter.Bodies.rectangle(x, y, plateW, plateH, {
          restitution: 0.5,
          friction: 0.2,
          density: 0.002,
        });
        Matter.World.add(world, body);
        return { body, el, w: plateW, h: plateH };
      });
      bodiesRef.current = bodies;

      // Arm check after delay (if not already armed by mouse)
      armTimerRef.current = window.setTimeout(() => { armedRef.current = true; }, ARM_AFTER_MS);

      const render = () => {
        Matter.Engine.update(engine);
        bodies.forEach(({ body, el, w, h }) => {
          el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
        });

        // Only consider overflow once "armed"
        if (playingRef.current && !overflowedRef.current && armedRef.current) {
          // PROPORTIONAL threshold (e.g., 0.6 of height down the screen)
          const thresholdY = height * BOTTOM_BAND;
          // require at least TWO plates near the bottom band
          const hits = bodies.reduce((n, { body }) => n + (body.position.y > thresholdY ? 1 : 0), 0);
          const bottomHit = hits >= 2;

          if (bottomHit) {
            sustainFramesRef.current += 1;
            if (sustainFramesRef.current >= OVERFLOW_SUSTAIN_FRAMES) {
              overflowedRef.current = true;
              playingRef.current = false;
              if (!userScrolledRef.current) showBannerThenScroll();
            }
          } else {
            sustainFramesRef.current = 0; // reset if condition not met
          }
        }

        rafRef.current = requestAnimationFrame(render);
      };

      render();

      // cleanup for this entry
      return () => {
        offScroll && offScroll();
      };
    };

    const cleanupPhysics = () => {
      // clear timers
      if (bannerTimerRef.current) { clearTimeout(bannerTimerRef.current); bannerTimerRef.current = null; }
      if (armTimerRef.current) { clearTimeout(armTimerRef.current); armTimerRef.current = null; }

      // reset flags
      playingRef.current = false;
      overflowedRef.current = false;
      userScrolledRef.current = false;
      sustainFramesRef.current = 0;
      setShowBanner(false);

      // remove plate elements
      bodiesRef.current.forEach(({ el }) => { try { el.remove(); } catch {} });
      bodiesRef.current = [];

      // kill engine + RAF
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      hasStarted.current = false;
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom top",
      onEnter: startPhysics,
      onEnterBack: startPhysics, // “new game” when scrolling back up
      onLeave: cleanupPhysics,
      onLeaveBack: cleanupPhysics,
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      cleanupPhysics();
      trigger.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Mouse repel — also arms overflow immediately on first move (if enabled)
  const handleMouseMove = (e) => {
    if (REQUIRE_MOUSE_MOVE && !armedRef.current) armedRef.current = true;
    if (!playingRef.current || showBanner) return;

    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const maxDist = 300;
    const forceMultiplier = 10;

    bodiesRef.current.forEach(({ body }) => {
      const dx = body.position.x - mouseX;
      const dy = body.position.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist && dist > 0.0001) {
        const force = (1 - dist / maxDist) * forceMultiplier;
        Matter.Body.applyForce(body, body.position, { x: (dx / dist) * force, y: (dy / dist) * force });
      }
    });
  };

  return (
    <section
      id="techstack"
      ref={containerRef}
      onMouseMove={handleMouseMove}            //{/* <-- moved here */}
      className="relative min-h-[90vh] overflow-hidden scroll-mt-28"
      style={{ backgroundColor: "#2e54d1" }}
    >
      {/* physics area filler to claim height; plates are appended to the section */}
      <div
        style={{
          width: "100vw",
          height: isMobile ? "90vh" : "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      />

      {/* heading */}
      <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto w-[min(92vw,1100px)] text-center">
        <p className="section-title-sm text-white/80">TECH STACK</p>
        <h2 className="section-heading mt-2 text-white">Tools I Use</h2>
      </div>

      {/* banner shown AFTER mouse-only overflow, with grace + sustain */}
      {showBanner && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ zIndex: 20 }}
        >
          <h2 className="text-white font-heading text-2xl md:text-5xl font-semibold">
            Looks like you overflowed my tech stack...
          </h2>
          <h3 className="text-white/95 text-xl md:text-3xl mt-4">
            Okay that was lame, but feel free to say hi.
          </h3>
        </div>
      )}
    </section>
  );
}
