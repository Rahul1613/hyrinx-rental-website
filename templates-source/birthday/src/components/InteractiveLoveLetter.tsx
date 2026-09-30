"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { celebrationAudio } from "@/lib/celebrationAudio";
import { Mail, Sparkles, Heart, Feather, RefreshCw } from "lucide-react";

interface InteractiveLoveLetterProps {
  name: string;
  age: number;
}

const LETTER_STYLES = [
  {
    id: "heartfelt",
    title: "Heartfelt & Deep",
    badge: "Most Emotional ❤️",
    text: (name: string, age: number) =>
      `Dear ${name},\n\nWatching you grow into the person you are at ${age} has been one of the greatest privileges of our lives. You bring a warmth into every room that cannot be fabricated, a kindness that asks for nothing in return, and a laugh that is impossible to resist.\n\nThank you for every late night conversation, every memory that still makes our sides hurt from laughing, and for simply being yourself. On your birthday and every day after: may you be surrounded by peace, wild happiness, and people who recognize how truly irreplaceable you are.\n\nWith all our love and biggest hugs,`,
  },
  {
    id: "funny",
    title: "Bro / Bestie Roast",
    badge: "Fun & Savage 🤪",
    text: (name: string, age: number) =>
      `Hey ${name},\n\nCongratulations on turning ${age}! You are officially one year closer to complaining about your lower back and asking people to turn the music down. But somehow, you still manage to look like the coolest person in the room (don't let this inflate your ego too much).\n\nHere’s to another 365 days of bad decisions made together, terrible singing in the car, and laughing at jokes only we understand. Happy Birthday, legend. Don't worry, the drinks are on us tonight!\n\nYour Partner-in-Crime,`,
  },
  {
    id: "poetic",
    title: "Poetic & Inspiring",
    badge: "Inspirational ✨",
    text: (name: string, age: number) =>
      `To our dearest ${name},\n\nLike the brightest constellation in a restless night sky, your spirit guides, comforts, and inspires everyone fortunate enough to walk alongside you. ${age} years of chapters written, and yet the sweetest, grandest adventures are only just unfolding before your feet.\n\nKeep dreaming unapologetically. Keep trusting your own rhythm. The world is vastly more beautiful because you are in it.\n\nForever cheering for you,`,
  },
];

export default function InteractiveLoveLetter({ name, age }: InteractiveLoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStyleIdx, setCurrentStyleIdx] = useState(0);

  const activeStyle = LETTER_STYLES[currentStyleIdx];

  const handleToggleLetter = () => {
    if (!isOpen) {
      celebrationAudio.playMagicChime();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleNextStyle = (e: React.MouseEvent) => {
    e.stopPropagation();
    celebrationAudio.playMagicChime();
    setCurrentStyleIdx((prev) => (prev + 1) % LETTER_STYLES.length);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-300 mb-4 backdrop-blur-md">
          <Mail className="h-4 w-4" />
          <span>Handwritten Birthday Letter</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          A Sealed Letter For {name} 💌
        </h2>
        <p className="mt-2 text-slate-300 text-base sm:text-lg max-w-lg mx-auto">
          Every milestone deserves words that come straight from the heart. Tap the wax seal to unfold.
        </p>

        {/* Envelope & Unfolded Card */}
        <div className="relative mt-12 flex flex-col items-center justify-center">
          {!isOpen ? (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleToggleLetter}
              className="cursor-pointer group relative flex flex-col items-center select-none"
            >
              {/* Envelope Body */}
              <div className="relative w-80 sm:w-96 h-52 sm:h-60 rounded-2xl bg-gradient-to-br from-[#2D1B36] via-[#1B1224] to-[#120B1A] border-2 border-amber-400/40 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
                {/* Envelope Flap visual */}
                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#3E244A] to-transparent clip-triangle border-b border-amber-400/20" />

                <div className="relative z-10 flex justify-between items-center text-xs text-amber-300/80 font-mono">
                  <span>CONFIDENTIAL & SPECIAL</span>
                  <span>DELIVERED WITH LOVE</span>
                </div>

                {/* Big Wax Seal in the center */}
                <div className="relative z-20 mx-auto my-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-rose-600 to-amber-500 shadow-xl shadow-rose-900/60 border-2 border-amber-200 group-hover:scale-110 transition-transform">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/60 bg-rose-700/80">
                    <Heart className="h-6 w-6 fill-amber-300 text-amber-300" />
                  </div>
                </div>

                <div className="relative z-10 text-center font-display text-sm font-semibold text-slate-300">
                  Tap to break the seal & read 💌
                </div>
              </div>

              {/* Pulsing Button Below */}
              <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 px-5 py-2 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Personal Letter Inside</span>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl rounded-3xl bg-[#FAF7F0] text-slate-900 p-8 sm:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.6)] border-4 border-amber-300/70 text-left relative overflow-hidden"
              >
                {/* Vintage paper texture lines */}
                <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,#000,#000_1px,transparent_1px,transparent_28px)] pointer-events-none" />

                {/* Top letter controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-amber-900/15">
                  <div className="flex items-center gap-2">
                    <Feather className="h-5 w-5 text-amber-700" />
                    <span className="font-display font-bold text-amber-900 text-sm">
                      {activeStyle.title}
                    </span>
                    <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                      {activeStyle.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleNextStyle}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-amber-900/20 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 text-xs font-bold text-amber-950 transition-colors"
                      title="Switch Tone (Roast, Poetic, Emotional)"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Switch Letter Tone</span>
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg bg-amber-900/10 hover:bg-amber-900/20 px-3 py-1.5 text-xs font-bold text-amber-950 transition-colors"
                    >
                      Close Letter
                    </button>
                  </div>
                </div>

                {/* Handwritten Letter Content */}
                <div className="mt-8 font-handwriting text-2xl sm:text-3xl text-slate-800 leading-relaxed whitespace-pre-line">
                  {activeStyle.text(name, age)}
                </div>

                {/* Sign-off & Stamp */}
                <div className="mt-8 pt-6 border-t border-amber-900/15 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-rose-600 font-display font-bold text-sm">
                    <Heart className="h-5 w-5 fill-rose-600" />
                    <span>Stamped with Love on Your Birthday</span>
                  </div>

                  <div className="font-display font-black text-xl text-amber-800 tracking-wider">
                    ★ HAPPY BIRTHDAY ★
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
