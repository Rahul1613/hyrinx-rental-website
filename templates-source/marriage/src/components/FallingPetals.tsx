"use client";

import { useEffect, useState } from "react";

interface DivinePetal {
  id: number;
  leftPercent: number;
  delaySec: number;
  durationSec: number;
  sizePx: number;
  type: "rose" | "marigold" | "jasmine" | "gold";
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<DivinePetal[]>([]);

  useEffect(() => {
    const items: DivinePetal[] = [];
    const types: DivinePetal["type"][] = ["rose", "marigold", "jasmine", "gold"];

    for (let i = 0; i < 24; i++) {
      items.push({
        id: i,
        leftPercent: Math.random() * 96 + 2,
        delaySec: Math.random() * 8,
        durationSec: Math.random() * 5 + 8,
        sizePx: Math.random() * 10 + 16,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    setPetals(items);
  }, []);

  const getStyleForType = (type: DivinePetal["type"]) => {
    switch (type) {
      case "marigold": // Auspicious Genda phool
        return "bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-[0_2px_8px_rgba(245,158,11,0.3)]";
      case "jasmine": // Mogra sacred white blossom
        return "bg-gradient-to-br from-amber-50 to-amber-100 rounded-full border border-amber-200/50 shadow-sm";
      case "gold": // Golden divine blessing speck
        return "bg-gradient-to-tr from-yellow-300 to-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.6)]";
      case "rose": // Sacred Gulab petal
      default:
        return "bg-gradient-to-br from-rose-400 to-red-600 rounded-[50%_0%_50%_0%] shadow-sm";
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.leftPercent}%`,
            width: `${p.sizePx}px`,
            height: `${p.sizePx * (p.type === "rose" ? 1.3 : 1)}px`,
            animationDelay: `${p.delaySec}s`,
            animationDuration: `${p.durationSec}s`,
          }}
          className={`absolute -top-10 opacity-85 animate-petal ${getStyleForType(p.type)}`}
        />
      ))}
    </div>
  );
}
