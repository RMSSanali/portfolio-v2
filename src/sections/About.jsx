import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function About() {
  useGSAP(() => {
    // Split sentences into words
    const lines = [".about-line1", ".about-line2", ".about-line3"];
    lines.forEach((line, index) => {
      const split = SplitText.create(line, { type: "words" });

      gsap.to(split.words, {
        color: "#2e54d1", // highlight color
        ease: "power1.inOut",
        stagger: 0.3,
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
          end: "bottom 50%",
          scrub: true,
        },
      });
    });

    // Add slight rotation & parallax on scroll
    gsap.to(".about-section", {
      rotate: 4,
      scale: 0.96,
      yPercent: 10,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      id="about"
      class="min-h-screen flex flex-col items-center bg-bgdark text-main px-4 md:px-6 pt-20 md:pt-24 pb-20 md:pb-32"
      //className="about-section min-h-screen flex flex-col justify-center items-center bg-bgdark px-6 pt-20 pb-32 text-main relative z-10"
    >
      <div className="mmax-w-2xl md:max-w-3xl text-center space-y-10"> {/* max-w-5xl text-center space-y-16 */}
        <h2 className="text-5xl md:text-6xl font-bold text-highlight mb-10">
          {/* About Me */}
        </h2>

        <p className="about-line1 text-[2.4rem] md:text-[2.8rem] font-hero leading-snug md:leading-normal">
          Hello, I’m{" "}
          <span className="text-highlight font-semibold">Sanali Sewwandi</span>,
          a developer living in{" "}
          <span className="text-highlight">Stockholm, Sweden</span>, where
          technology and creativity inspire my every day.
        </p>

        <p className="about-line2 text-[2.4rem] md:text-[2.8rem] font-hero leading-snug md:leading-normal">
          My journey began with a love for solving problems and a fascination
          for how small ideas can grow into something meaningful. That passion
          shaped me into a{" "}
          <span className="text-highlight">cloud and software developer</span>{" "}
          who enjoys building modern web applications that are simple, scalable,
          and delightful to use.
        </p>

        <p className="about-line3 italic text-[2.4rem] md:text-[2.8rem] font-hero leading-snug md:leading-normal text-highlight/90">
          For me, great software isn’t just about code — it’s about people,
          purpose, and design that connects the two.
        </p>
      </div>
    </section>
  );
}
