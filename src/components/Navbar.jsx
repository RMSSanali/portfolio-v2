'use client';
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", id: "home", type: "section" },
    { label: "About", id: "about", type: "section" },
    { label: "Projects", id: "projects", type: "section" },
    { label: "Timeline", id: "timeline", type: "section" },
    { label: "Skills", id: "techstack", type: "section" },
    { label: "Contact", id: "contact", type: "section" },
    { label: "CV", id: "/resume", type: "route" },
  ];

  const smoothScrollToId = (id) => {
    const el = document.getElementById(id);
    const headerH = headerRef.current?.offsetHeight ?? 80;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();

    if (item.type === "route") {
      navigate(item.id);
      setMenuOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/#${item.id}`);
      setMenuOpen(false);
      return;
    }

    // already on home
    const el = document.getElementById(item.id);
    if (el) smoothScrollToId(item.id);
    else navigate(`/#${item.id}`);

    setMenuOpen(false);
  };

  // Auto-close on route/hash change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpen]);

  // Close on Esc + on desktop resize
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-md py-6"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        <Link
          to="/#home"
          onClick={(e) => handleNavClick(e, { id: "home", type: "section" })}
          className="flex items-center gap-2 text-2xl font-bold text-main"
        >
          <span className="text-highlight">Sanali</span> Dev
        </Link>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative w-8 h-6 focus:outline-none group"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`absolute left-0 w-full h-[2px] bg-white rounded transition-all duration-300 ease-in-out shadow-[0_0_6px_#ffffff] ${menuOpen ? "rotate-45 top-1/2" : "top-0"}`} />
          <span className={`absolute left-0 w-full h-[2px] bg-white rounded transition-all duration-300 ease-in-out shadow-[0_0_6px_#ffffff] ${menuOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"}`} />
          <span className={`absolute left-0 w-full h-[2px] bg-white rounded transition-all duration-300 ease-in-out shadow-[0_0_6px_#ffffff] ${menuOpen ? "-rotate-45 top-1/2" : "bottom-0"}`} />
        </button>
      </div>

      <nav
        className={`absolute top-full left-0 w-full text-center overflow-hidden transition-all duration-700 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100 backdrop-blur-lg bg-black/80" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-6 text-xl text-main py-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.type === "route" ? item.id : `/#${item.id}`}
                onClick={(e) => handleNavClick(e, item)}
                className="hover:text-highlight cursor-pointer transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
