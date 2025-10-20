// src/sections/LiaIntro.jsx
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LiaIntro() {
  const el = useRef(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      // base state
      gsap.set([".lia-line-1", ".lia-line-2", ".lia-line-3"], {
        opacity: prefersReduced ? 1 : 0,
        y: prefersReduced ? 0 : 48,
        filter: prefersReduced ? "none" : "blur(2px)",
        willChange: "transform, opacity, filter",
      });

      if (prefersReduced) return;

      // smoother, slower sequence
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: el.current,
            start: "top 75%",
            once: true, // play once
          },
        })
        .to(".lia-line-1", { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 })
        .to(".lia-line-2", { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 }, "+=0.20")
        .to(".lia-line-3", { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 }, "+=0.20");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lia-intro"
      ref={el}
      className="
        relative min-h-[70vh] md:min-h-[80vh] bg-bgdark text-main
        flex items-center justify-center text-center
        overflow-hidden px-4
      "
      style={{ transform: "translateZ(0)", contain: "layout paint" }}
    >
      <div className="w-[min(92vw,1100px)] mx-auto">
        <h1 className="lia-line-1 font-extrabold text-[9vw] sm:text-[7vw] md:text-[5vw] leading-tight">
          Looking&nbsp;for&nbsp;LIA&nbsp;help?
        </h1>
        <h2 className="lia-line-2 font-extrabold text-[7.5vw] sm:text-[6vw] md:text-[4.2vw] mt-3 leading-tight text-main/90">
          Plan&nbsp;small&nbsp;→&nbsp;ship&nbsp;steady
        </h2>
        <h3 className="lia-line-3 font-extrabold text-[6.5vw] sm:text-[5.2vw] md:text-[3.6vw] mt-3 leading-tight text-main/80">
          Available&nbsp;Nov&nbsp;2025
        </h3>
      </div>
    </section>
  );
}
