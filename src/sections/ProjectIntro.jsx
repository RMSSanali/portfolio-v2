// src/sections/ProjectIntro.jsx
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectIntro() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(titleRef.current, { scale: 1 });
        return;
      }

      // Use a slightly smaller start scale on narrow screens
      const startScale = window.innerWidth < 768 ? 7 : 10;

      gsap.set(titleRef.current, {
        scale: startScale,
        transformOrigin: "center center",
        willChange: "transform",
      });

      gsap.to(titleRef.current, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 90%",
          end: "top 40%",
          scrub: true,
          // markers: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="project-intro"
      ref={rootRef}
      className="
        relative
        min-h-screen
        flex flex-col justify-center items-center
        bg-bgdark text-main
        pb-32 md:pb-48
        overflow-hidden
      "
      style={{
        transform: "translateZ(0)", // anti-hairline
        contain: "layout paint",     // helps prevent overflow artifacts during scaling
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <div
          ref={titleRef}
          className="will-change-transform flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-snug">
            From Concept to Cloud
          </h2>
          <h3 className="text-xl md:text-2xl text-main mt-4 max-w-3xl mx-auto">
            A collection of academic projects built at JENSEN Yrkeshögskola — turning ideas into working cloud-based solutions.
          </h3>
        </div>
      </div>
    </section>
  );
}
