// src/sections/Timeline.jsx
import React, { useEffect, useRef } from "react";
import { MENULINKS, TIMELINE } from "../constants";

// Fallback-friendly image cell
const ImageCell = ({ src, alt }) =>
  !src ? null : (
    <img
      src={src}
      alt={alt}
      className="w-full rounded-xl border border-white/10 bg-black/20 object-cover aspect-video"
      loading="lazy"
      onError={(e) => (e.currentTarget.style.display = "none")}
    />
  );

// Extract year: prefer item.year; otherwise find a 4-digit year in subtitle
const getYear = (item) => {
  if (item?.year) return item.year;
  const m = (item?.subtitle || "").match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "";
};

export default function Timeline() {
  const sectionRef = useRef(null);

  const items = Array.isArray(TIMELINE)
    ? TIMELINE.filter((n) => n?.type === "CHECKPOINT")
    : [];

  useEffect(() => {
    // console.log("[Timeline] items:", items.length);
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full select-none section-container bg-bgdark text-main py-16 sm:py-20"
      id={MENULINKS?.[3]?.ref || "timeline"}
      style={{ isolation: "isolate" }}
    >
      {/* header */}
      <div className="mx-auto max-w-5xl px-4">
        <p className="section-title-sm">JOURNEY</p>
        <h1 className="section-heading mt-2">Timeline</h1>
        <h2 className="text-2xl md:max-w-2xl w-full mt-2 text-white/80">
          Steps Along the Way
        </h2>
        <h3 className="text-lg md:text-xl md:max-w-2xl w-full mt-1 text-white/70">
          Moments that shaped my path
        </h3>
      </div>

      {/* wrapper: more left padding to fit spine + big year */}
      <div className="relative mx-auto mt-12 max-w-5xl px-4 pl-24 md:pl-40">
        {/* LEFT spine (straight) */}
        <div className="pointer-events-none absolute inset-y-0 left-6 md:left-12 w-px md:w-[2px]">
          <div className="absolute inset-0 bg-white/30" />
        </div>

        {/* Cards */}
        <div className="space-y-8 md:space-y-10">
          {items.map((item, idx) => {
            const images = Array.isArray(item.images)
              ? item.images
              : item.image
              ? [item.image]
              : [];

            return (
              <article
                key={`${item.title || "item"}-${idx}`}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm shadow-xl hover:border-white/20 hover:bg-white/10 transition-colors tl-card"
              >
                {/* connector to spine */}
                <div className="hidden md:block absolute top-8 -left-12 h-0.5 w-12 bg-white/20" />
                <div className="md:hidden absolute top-8 -left-10 h-0.5 w-10 bg-white/20" />

                {/* dot on spine */}
                <div className="hidden md:block absolute top-7 -left-[60px] h-3 w-3 rounded-full bg-white ring-4 ring-black/60" />
                <div className="md:hidden absolute top-7 -left-[44px] h-3 w-3 rounded-full bg-white ring-4 ring-black/60" />

                {/* BIG YEAR next to the dot */}
                <div className="hidden md:block absolute top-2 -left-[165px] text-4xl font-extrabold tracking-tight text-white/85">
                  {getYear(item)}
                </div>
                <div className="md:hidden absolute top-1 -left-[112px] text-2xl font-extrabold tracking-tight text-white/85">
                  {getYear(item)}
                </div>

                {/* content layout: text left, image(s) right (stack on small) */}
                <div className="md:grid md:grid-cols-[1fr,280px] md:gap-5 items-start">
                  {/* LEFT: text */}
                  <div>
                    {/* badge + date */}
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
                      {item.badge && (
                        <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/70">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-white/60">
                        {item.subtitle || item.date || ""}
                      </span>
                    </div>

                    {/* title */}
                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                      <span className="mr-2 select-none">{item.icon ?? "•"}</span>
                      {item.title || "Untitled"}
                    </h3>

                    {/* details (optional) */}
                    {item.details && (
                      <p className="mt-1 text-sm text-white/70">{item.details}</p>
                    )}
                  </div>

                  {/* RIGHT: image(s) */}
                  {images.length > 0 && (
                    <div className="mt-4 md:mt-0">
                      {images.length === 1 ? (
                        <ImageCell
                          src={images[0]}
                          alt={`${item.title || "Timeline"} - 1`}
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {images.map((src, i) => (
                            <ImageCell
                              key={i}
                              src={src}
                              alt={`${item.title || "Timeline"} - ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
