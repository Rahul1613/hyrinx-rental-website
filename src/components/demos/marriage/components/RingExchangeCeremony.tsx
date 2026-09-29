"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { weddingAudio } from "@/lib/weddingAudio";

export default function RingExchangeCeremony() {
  const [vowsExchanged, setVowsExchanged] = useState(false);

  const handleTouchRings = () => {
    weddingAudio.playRingShimmer();
    setVowsExchanged(!vowsExchanged);
  };

  return (
    <section id="vows-ceremony" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-xs font-serif font-semibold text-rose-300 mb-4 backdrop-blur-md">
          <Heart className="h-3.5 w-3.5 fill-rose-400" />
          <span>Sacred Vows & Eternal Promise</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
          The Two Rings 💍
        </h2>
        <p className="mt-3 text-[#CBBFB0] text-base sm:text-lg max-w-lg mx-auto font-light">
          Touch the interlocking diamond rings below to exchange the sacred vows written for one another.
        </p>

        {/* 3D Interlocking Rings Interaction */}
        <div className="relative mt-12 mb-8 flex justify-center items-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTouchRings}
            className="cursor-pointer relative flex items-center justify-center p-8 select-none group"
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 blur-2xl rounded-full group-hover:scale-125 transition-transform" />

            {/* Left Ring (Groom's Band) */}
            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[7px] sm:border-[9px] border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.6)] flex items-center justify-center bg-transparent group-hover:rotate-6 transition-transform duration-500">
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] -mt-14" />
            </div>

            {/* Right Ring (Bride's Diamond Solitaire) */}
            <div className="relative z-20 -ml-10 sm:-ml-14 w-28 h-28 sm:w-36 sm:h-36 rounded-full border-[7px] sm:border-[9px] border-rose-200 shadow-[0_0_25px_rgba(253,164,175,0.6)] flex items-center justify-center bg-transparent group-hover:-rotate-6 transition-transform duration-500">
              {/* Brilliant cut diamond gem on top */}
              <div className="absolute -top-4 sm:-top-5 flex items-center justify-center">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rotate-45 bg-gradient-to-tr from-cyan-100 via-white to-pink-200 shadow-[0_0_15px_#ffffff] border border-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <button
          onClick={handleTouchRings}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-rose-400 px-6 py-2.5 text-xs sm:text-sm font-serif font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-transform"
        >
          <Sparkles className="h-4 w-4" />
          <span>{vowsExchanged ? "Hide Vows" : "Touch Rings to Read Our Vows 💍"}</span>
        </button>

        {/* Revealed Vows Grid */}
        <AnimatePresence>
          {vowsExchanged && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
            >
              {/* Kabir's Vow to Rhea */}
              <div className="royal-card rounded-3xl p-8 sm:p-10 border border-amber-400/30 relative">
                <span className="font-calligraphy text-4xl text-amber-300 block mb-1">
                  Kabir to Rhea
                </span>
                <span className="text-[11px] font-mono tracking-widest text-[#B4A795] uppercase block mb-4">
                  The Architect's Promise
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-[#EDE2D4] leading-relaxed">
                  &ldquo;I promise to keep pouring you black tea on rainy afternoons. I promise to listen to your book theories at 2 AM, to be your quiet anchor whenever the world gets noisy, and to build a home with you where every door is open to laughter, family, and boundless dreams.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-2 text-amber-400 font-serif text-sm">
                  <Heart className="h-4 w-4 fill-amber-400" />
                  <span>Forever & Always, Kabir</span>
                </div>
              </div>

              {/* Rhea's Vow to Kabir */}
              <div className="royal-card rounded-3xl p-8 sm:p-10 border border-rose-400/30 relative">
                <span className="font-calligraphy text-4xl text-rose-300 block mb-1">
                  Rhea to Kabir
                </span>
                <span className="text-[11px] font-mono tracking-widest text-[#B4A795] uppercase block mb-4">
                  The Storyteller's Promise
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-[#EDE2D4] leading-relaxed">
                  &ldquo;I promise to never let routine dull our wonder. I promise to ride shotgun on every stalled mountain jeep, to remind you of your strength when you doubt it, and to love you fiercely across every season, every city, and every chapter we will write together.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-2 text-rose-400 font-serif text-sm">
                  <Heart className="h-4 w-4 fill-rose-400" />
                  <span>With My Entire Heart, Rhea</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
