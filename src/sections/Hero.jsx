
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger, ScrambleTextPlugin } from "gsap/all";
import { useEffect } from "react";
//import globals from "../styles/globals.scss";

gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin);

export default function Hero() {
  useGSAP(() => {
    // --- Split text into words and lines ---
    const titleSplit = SplitText.create(".hero-caption", { type: "words, lines" });
    const cloudSplit = SplitText.create(".cloud-text", { type: "chars" });

    const tl = gsap.timeline();

    // Fade words in one by one
    tl.from(titleSplit.words, {
      ease: "power1.inOut",
      stagger: 0.03,
      opacity: 0,
      duration: 1,
      y: 40,
    })
      // Gibberish effect (Azure magic)
      .to(
        ".gibberish",
        {
          opacity: 1,
          scrambleText: {
            text: "{original}",
            chars: "lowerCase",
          },
          duration: 5, // slower, so visible
        },
        "-=0.5"
      )
      // --- Animate clouds one by one ---
      gsap.from(".cloud-icon", {
        opacity: 0,
        scale: 0,
        y: 30,
        stagger: 0.4, // delay between clouds
        delay: 3,     // start after gibberish finishes
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
    // --- Parallax tilt with scroll ---
    {/*gsap.to(".hero-section", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      rotate: 6,
      scale: 0.9,
      yPercent: 15,
      ease: "power1.inOut",
    });*/}
  });

  return (
    <section
      id="home"
      className="hero-section relative w-full h-screen overflow-hidden bg-bgdark flex items-center justify-between pt-16 md:pt-24"
    >
      {/* Left Side - Image */}
      <div className="w-3/5 h-full">
        <img
          src="/myphoto.jpg"
          alt="Hero background"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Right Side - Text */}
         <div className="w-2/5 h-full flex flex-col justify-center px-12 text-main relative z-10 bg-black/70 translate-y-6 md:translate-y-10">
        <h1 className="hero-text text-[3.1rem] md:text-[3.8rem] lg:text-[4.1rem] font-bold leading-snug tracking-tight">
          I turn{" "}
          <span className="text-highlight gibberish opacity-1">
            Azure <img src="/azure-blue.svg" alt="Azure Logo" className="azure-logo h-20 w-20" /> 
           </span>{" "}           
          and <span className="text-highlight gibberish opacity-1">code</span>{" "}
          into things that make businesses fly in the{" "}
          <span className="text-highlight gibberish opacity-1">cloud</span>
          <span className="inline-flex items-center gap-4 ml-2">
            <img
              src="/cloud-dark-blue.svg"
              alt="Cloud Logo"
              className="cloud-icon h-14 w-14 md:h-16 md:w-16"
            />
            <img
              src="/cloud-dark-blue.svg"
              alt="Cloud Logo"
              className="cloud-icon h-14 w-14 md:h-16 md:w-16"
            />
            <img
              src="/cloud-dark-blue.svg"
              alt="Cloud Logo"
              className="cloud-icon h-14 w-14 md:h-16 md:w-16"
            />
          </span>
        </h1>

        <p className="mt-5 text-lg md:text-xl lg:text-2xl text-main/90 leading-relaxed tracking-wide">
          Sanali Sewwandi — Cloud & Software Developer
        </p>
      </div>

    </section>
  );
}
