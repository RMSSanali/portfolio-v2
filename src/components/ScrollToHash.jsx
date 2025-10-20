// src/components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    // wait a tick so the page content is rendered
    const id = location.hash?.slice(1);
    if (id) {
      // decode in case your id has spaces etc.
      const target = document.getElementById(decodeURIComponent(id));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    // no hash → default to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
}
