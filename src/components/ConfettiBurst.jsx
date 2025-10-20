// src/components/ConfettiBurst.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

export default function ConfettiBurst({ shouldFire, className = "" }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  // draw loop
  const render = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    rafRef.current = requestAnimationFrame(render);
  };

  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const numParticles = 100;
    const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];

    for (let i = 0; i < numParticles; i++) {
      const p = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
      };

      particlesRef.current.push(p);

      gsap.to(p, {
        duration: 3,
        physics2D: {
          angle: Math.random() * 360,
          velocity: Math.random() * 500 + 200,
          gravity: 800,
        },
        rotation: `+=${Math.random() * 720}`,
        onComplete: () => {
          particlesRef.current = particlesRef.current.filter((it) => it !== p);
          gsap.killTweensOf(p);
        },
      });
    }
  };

  // init + resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    ctxRef.current = canvas.getContext("2d");

    render(); // start loop

    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // kill any leftover tweens
      particlesRef.current.forEach((p) => gsap.killTweensOf(p));
      particlesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // respond to shouldFire changes
  useEffect(() => {
    if (shouldFire) fireConfetti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFire]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 999,
        }}
      />
    </div>
  );
}
