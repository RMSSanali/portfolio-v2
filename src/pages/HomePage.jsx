// src/pages/HomePage.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../sections/Hero";
import About from "../sections/About";
import ProjectIntro from "../sections/ProjectIntro";
import ProjectsShowcase from "../sections/ProjectsShowcase";
import NowBuilding from "../sections/NowBuilding";
import Timeline from "../sections/Timeline";
import LiaIntro from "../sections/LiaIntro";
import TechStack from "../sections/TechStack";
import ContactSection from "../sections/ContactSection";

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    let rafId;
    let timeoutId;
    let tries = 0;
    const MAX_TRIES = 20;        // ~400–600ms of retries
    const TRY_EVERY_MS = 30;

    const getHeaderHeight = () =>
      (document.querySelector("header")?.offsetHeight ?? 80) + 8;

    const attemptScroll = () => {
      const id = hash.replace("#", "");
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const el = document.getElementById(id);
      if (el) {
        const headerOffset = getHeaderHeight();
        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        rafId = requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: "smooth" });
        });
      } else if (tries < MAX_TRIES) {
        tries += 1;
        timeoutId = window.setTimeout(attemptScroll, TRY_EVERY_MS);
      }
    };

    // wait one frame so layout is painted
    rafId = requestAnimationFrame(attemptScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hash]);

  return (
    <>
      {/* Make sure each section component renders the correct id:
          Hero -> id="home"
          About -> id="about"
          ProjectsShowcase -> id="projects"
          Timeline -> id="timeline"
          TechStack -> id="techstack"
          ContactSection -> id="contact"
      */}
      <Hero />
      <About />
      <ProjectIntro />
      <ProjectsShowcase />
      <NowBuilding />
      <Timeline />
      <LiaIntro />
      <TechStack />
      <ContactSection />
    </>
  );
}
