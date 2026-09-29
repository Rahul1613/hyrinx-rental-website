"use client";

import { useState } from "react";
import { divineAudio } from "@/lib/weddingAudio";

interface FloatingItem {
  id: number;
  emoji: string;
  leftPercent: number;
}

const EMOJIS = ["🪔", "🌸", "卐", "💍", "🥥", "🕊️", "✨", "🥂"];

export default function FloatingLoveBar() {
  const [activeItems, setActiveItems] = useState<FloatingItem[]>([]);

  const handleSendLove = (emoji: string) => {
    divineAudio.playAkshatShower();
    const newId = Date.now() + Math.random();
    const randomLeft = Math.floor(Math.random() * 80) + 10;

    setActiveItems((prev) => [...prev, { id: newId, emoji, leftPercent: randomLeft }]);

    setTimeout(() => {
      setActiveItems((prev) => prev.filter((item) => item.id !== newId));
    }, 4000);
  };

  return (
    <>
      {/* Floating upward elements */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {activeItems.map((item) => (
          <div
            key={item.id}
            style={{ left: `${item.leftPercent}%`, bottom: "75px" }}
            className="absolute text-4xl select-none animate-float-up pointer-events-none drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Floating Bottom Bar */}
      <aside aria-label="Divine wedding celebration reactions" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-white/95 backdrop-blur-xl border-2 border-amber-400 p-2 shadow-[0_12px_35px_rgba(180,130,50,0.25)]">
          <span className="hidden sm:inline-block text-xs font-serif font-bold tracking-wider text-amber-900 pl-3 pr-1">
            Send Aashirwaad:
          </span>

          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleSendLove(emoji)}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-amber-50 hover:bg-amber-100 active:scale-125 text-xl sm:text-2xl transition-all shadow-xs border border-amber-200"
              title={`Send ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
