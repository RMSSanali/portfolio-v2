// src/pages/ResumePage.jsx
import { Link } from "react-router-dom";
import ResumeSection from "../sections/ResumeSection";

export default function ResumePage() {
  return (
    <>
      {/* full-bleed solid background sitting under everything */}
      <div className="fixed inset-0 -z-10 bg-black" />

      <ResumeSection />

      {/* Floating CTA – contained so it can't create a paint overflow */}
      <Link
        to="/#home"
        className="fixed bottom-6 right-6 z-[1100] inline-flex items-center
                   bg-white text-black px-4 py-2 rounded-full font-semibold
                   shadow-lg border border-white/20 hover:bg-black hover:text-white
                   transition-colors"
        style={{ contain: "layout paint", maxWidth: "calc(100vw - 3rem)" }}
        aria-label="Back to home"
      >
        Take me home!
      </Link>
    </>
  );
}
