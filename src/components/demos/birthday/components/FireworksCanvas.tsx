"use client";

import { useEffect, useRef } from "react";

interface FireworksProps {
  isActive: boolean;
  onClose?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

export default function FireworksCanvas({ isActive, onClose }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#F43F5E", "#EC4899", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#FBBF24", "#FFFFFF"];
    const particles: Particle[] = [];

    const createExplosion = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const count = 70;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.5 + 1.5,
          decay: Math.random() * 0.015 + 0.01,
        });
      }
    };

    // Auto launch fireworks at intervals
    let lastLaunch = 0;
    const render = (time: number) => {
      ctx.fillStyle = "rgba(5, 7, 14, 0.25)";
      ctx.fillRect(0, 0, width, height);

      if (time - lastLaunch > 450) {
        lastLaunch = time;
        const launchX = Math.random() * (width * 0.8) + width * 0.1;
        const launchY = Math.random() * (height * 0.5) + height * 0.15;
        createExplosion(launchX, launchY);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-6 right-6 pointer-events-auto">
        <button
          onClick={onClose}
          className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white border border-white/20 transition-all shadow-xl"
        >
          ✕ Close Fireworks
        </button>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-auto">
        <span className="inline-block bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-amber-400/30 text-amber-300 font-display text-lg animate-pulse">
          ✨ Grand Birthday Fireworks Show in Full Swing! ✨
        </span>
      </div>
    </div>
  );
}
