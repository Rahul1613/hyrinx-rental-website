"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CinematicCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "interactive">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an element with data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "VIEW";
        setCursorText(text);
        setCursorVariant("interactive");
      } else {
        const isClickable = target?.closest("button, a, input, [role='button']");
        if (isClickable) {
          setCursorText("");
          setCursorVariant("hover");
        } else {
          setCursorText("");
          setCursorVariant("default");
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Precision Core Dot */}
      <motion.div
        animate={{
          x: mousePosition.x - (cursorVariant === "interactive" ? 28 : cursorVariant === "hover" ? 14 : 4),
          y: mousePosition.y - (cursorVariant === "interactive" ? 28 : cursorVariant === "hover" ? 14 : 4),
          width: cursorVariant === "interactive" ? 56 : cursorVariant === "hover" ? 28 : 8,
          height: cursorVariant === "interactive" ? 56 : cursorVariant === "hover" ? 28 : 8,
          backgroundColor: cursorVariant === "interactive" ? "rgba(6, 182, 212, 0.15)" : cursorVariant === "hover" ? "rgba(255, 255, 255, 0.2)" : "#06b6d4"
        }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.4 }}
        className="rounded-full border border-cyan-400/60 backdrop-blur-[2px] flex items-center justify-center text-[10px] font-mono font-black text-white tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)]"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] text-cyan-300 font-bold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
