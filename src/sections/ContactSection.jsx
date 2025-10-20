// src/sections/ContactSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { Send, Github, Linkedin, Copy, FileText } from "lucide-react"; // + FileText
import { Link } from "react-router-dom";                               // + Link
import ConfettiBurst from "../components/ConfettiBurst";
import { contactSchema } from "../lib/contactSchema";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [contactStep, setContactStep] = useState("message"); // 'message' | 'email' | 'subject'
  const [hideForm, setHideForm] = useState(true);
  const [input, setInput] = useState({ message: "", email: "", subject: "" });
  const [zodErrors, setZodErrors] = useState({ message: "", email: "", subject: "" });
  const [contactResponse, setContactResponse] = useState("");
  const [shouldFireConfetti, setShouldFireConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const honeypotRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleChange = (e) => setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
  const stepIndex = contactStep === "message" ? 1 : contactStep === "email" ? 2 : 3;

  const handleFormSubmit = async () => {
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_TO_ME = import.meta.env.VITE_EMAILJS_TMPL_TO_ME;
    const TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TMPL_AUTOREPLY;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      // 1) send to you
      const r1 = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_TO_ME,
        {
          from_email: input.email,
          subject: input.subject.trim(),
          message: input.message.trim(),
        },
        { publicKey: PUBLIC_KEY }
      );

      // 2) auto-reply (optional)
      if (r1.status === 200) {
        emailjs
          .send(
            SERVICE_ID,
            TEMPLATE_AUTOREPLY,
            {
              from_email: input.email,
            },
            { publicKey: PUBLIC_KEY }
          )
          .catch(() => {});
      }

      setShouldFireConfetti(true);
      setContactResponse("Thanks! I got your message and will get back to you soon.");
      setHideForm(true);
      setInput({ message: "", email: "", subject: "" });
      setContactStep("message");
      setTimeout(() => setShouldFireConfetti(false), 3500);
    } catch (err) {
      console.error("EmailJS error", err);
      setContactResponse("Oops, something went wrong...");
    }
  };

  const handleNext = async () => {
    if (contactStep === "message") {
      const r = contactSchema.pick({ message: true }).safeParse({ message: input.message });
      if (!r.success) {
        const err = r.error.issues.find((i) => i.path[0] === "message")?.message;
        setZodErrors((p) => ({ ...p, message: err || "" }));
        return;
      }
      setZodErrors((p) => ({ ...p, message: "" }));
      setContactStep("email");
      return;
    }

    if (contactStep === "email") {
      const r = contactSchema.pick({ email: true }).safeParse({ email: input.email });
      if (!r.success) {
        const err = r.error.issues.find((i) => i.path[0] === "email")?.message;
        setZodErrors((p) => ({ ...p, email: err || "" }));
        return;
      }
      setZodErrors((p) => ({ ...p, email: "" }));
      setContactStep("subject");
      return;
    }

    if (contactStep === "subject") {
      const r = contactSchema.pick({ subject: true }).safeParse({ subject: input.subject });
      if (!r.success) {
        const err = r.error.issues.find((i) => i.path[0] === "subject")?.message;
        setZodErrors((p) => ({ ...p, subject: err || "" }));
        return;
      }
      setZodErrors((p) => ({ ...p, subject: "" }));
      await handleFormSubmit();
    }
  };

  const handleBack = () => {
    if (contactStep === "message") setHideForm(true);
    else if (contactStep === "email") setContactStep("message");
    else if (contactStep === "subject") setContactStep("email");
  };

  const onKeyDownAdvance = (e) => {
    // Enter advances; Shift+Enter inserts newline in the textarea step
    if (e.key === "Enter") {
      if (contactStep === "message" && !e.shiftKey) {
        e.preventDefault();
        handleNext();
      } else if (contactStep !== "message") {
        e.preventDefault();
        handleNext();
      }
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contactrmsanali@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="scroll-mt-28 min-h-[80vh] bg-[#0b1220] relative flex items-center justify-center px-4"
      aria-labelledby="contact-heading"
    >
      {/* Confetti behind, non-interactive */}
      <ConfettiBurst shouldFire={shouldFireConfetti} className="absolute inset-0 pointer-events-none z-[500]" />

      {/* Foreground content */}
      <div className="w-[min(92vw,900px)] text-center space-y-6 relative z-[1001] pointer-events-auto">
        <h2 id="contact-heading" className="text-white font-heading text-3xl md:text-5xl font-semibold">
          Thanks for scrolling! Want to get in touch?
        </h2>
        <h3 className="text-white/90 text-lg md:text-2xl">Drop me a message below or reach me on GitHub/LinkedIn.</h3>

        <div className="mx-auto w-[120px] h-[120px] overflow-hidden rounded-full ring-2 ring-white/20">
          <img src="/headshot.png" alt="Profile headshot" className="w-full h-full object-cover scale-125" loading="lazy" />
        </div>

        {/* Primary & secondary CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            style={{ display: isMobile && !hideForm ? "none" : "inline-flex" }}
            onClick={() => setHideForm(false)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Open contact form"
          >
            <Send size={20} className="text-[#2e54d1]" aria-hidden />
            Message
          </button>

          <a
            href="https://www.github.com/RMSSanali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Open GitHub profile"
          >
            <Github size={20} className="text-[#2e54d1]" aria-hidden />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/rmsanali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Open LinkedIn profile"
          >
            <Linkedin size={20} className="text-[#2e54d1]" aria-hidden />
            LinkedIn
          </a>

          {/* CV button → /resume route */}
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#2e54d1] font-bold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Go to CV page"
          >
            <FileText size={20} className="text-[#2e54d1]" aria-hidden />
            CV
          </Link>
        </div>

        {/* Optional: email fallback row (kept commented) */}
        {/*
        <div className="flex items-center justify-center gap-3 text-sm text-white/80">
          <a href="mailto:contactrmsanali@gmail.com" className="underline">
            contactrmsanali@gmail.com
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white/90 hover:bg-white/15 transition-colors"
            aria-label="Copy email to clipboard"
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        */}

        {contactResponse && <p className="text-white/90">{contactResponse}</p>}

        {/* Stepped form */}
        {!hideForm && (
          <div className="flex justify-center">
            <form className="flex flex-col gap-2 items-center" onSubmit={(e) => e.preventDefault()} onKeyDown={onKeyDownAdvance}>
              {/* Honeypot (hidden to users) */}
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="text-white/70 text-sm mb-1">Step {stepIndex}/3</div>

              {contactStep === "message" ? (
                <>
                  {zodErrors.message && <p className="text-red-300 text-sm">*{zodErrors.message}</p>}
                  <label htmlFor="message" className="text-white/90">
                    Message
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={input.message}
                    style={{ width: isMobile ? 300 : 700 }}
                    name="message"
                    id="message"
                    className="rounded-md bg-white/10 text-white p-3 outline-none focus:ring-2 focus:ring-white/30"
                    maxLength={500}
                    placeholder="Say hello and whatever is on your mind"
                    autoFocus
                  />
                </>
              ) : contactStep === "email" ? (
                <>
                  {zodErrors.email && <p className="text-red-300 text-sm">*{zodErrors.email}</p>}
                  <label htmlFor="email" className="text-white/90">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.email}
                    type="email"
                    name="email"
                    id="email"
                    className="rounded-md bg-white/10 text-white p-3 outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="contactrmsanali@gmail.com"
                    autoFocus
                  />
                </>
              ) : (
                contactStep === "subject" && (
                  <>
                    {zodErrors.subject && <p className="text-red-300 text-sm">*{zodErrors.subject}</p>}
                    <label htmlFor="subject" className="text-white/90">
                      Subject
                    </label>
                    <input
                      onChange={handleChange}
                      value={input.subject}
                      type="text"
                      name="subject"
                      id="subject"
                      className="rounded-md bg-white/10 text-white p-3 outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="This email is about..."
                      autoFocus
                    />
                  </>
                )
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white text-[#2e54d1] px-4 py-2 rounded-full font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-white text-[#2e54d1] px-4 py-2 rounded-full font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
