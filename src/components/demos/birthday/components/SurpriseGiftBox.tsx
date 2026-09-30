"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { celebrationAudio } from '@/lib/audio/celebrationAudio';
import { Gift, Award, Sparkles, X, Heart, Star } from "lucide-react";

interface SurpriseGiftBoxProps {
  name: string;
  age: number;
}

export default function SurpriseGiftBox({ name, age }: SurpriseGiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      celebrationAudio.playFanfare();
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 },
        colors: ["#FBBF24", "#EC4899", "#8B5CF6", "#3B82F6", "#10B981"],
      });
      setIsOpen(true);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 mb-4 backdrop-blur-md">
          <Gift className="h-4 w-4" />
          <span>Interactive Mystery Surprise</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          A Special Mystery Gift For You 🎁
        </h2>
        <p className="mt-2 text-slate-300 text-base sm:text-lg max-w-lg mx-auto">
          Someone wrapped something unforgettable just for {name}. Tap the box to unwrap it!
        </p>

        {/* 3D Gift Box Interactive Area */}
        <div className="relative mt-12 flex justify-center items-center">
          {!isOpen ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="cursor-pointer group flex flex-col items-center select-none"
            >
              {/* Floating Gift Box */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/30 to-purple-600/30 blur-2xl rounded-full group-hover:scale-125 transition-transform" />

                {/* Box Lid */}
                <div className="relative z-20 mx-auto w-52 sm:w-60 h-14 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-t-2xl shadow-2xl border-t border-rose-300 flex items-center justify-center">
                  {/* Big Golden Bow on top */}
                  <div className="absolute -top-7 flex items-center justify-center">
                    <div className="w-9 h-7 bg-amber-400 rounded-full border-2 border-amber-200 rotate-[-30deg] shadow-lg" />
                    <div className="w-9 h-7 bg-amber-400 rounded-full border-2 border-amber-200 rotate-[30deg] shadow-lg -ml-2" />
                    <div className="absolute w-5 h-5 bg-amber-300 rounded-full shadow-md border border-amber-100" />
                  </div>

                  {/* Vertical Ribbon across lid */}
                  <div className="w-8 h-full bg-amber-400 shadow-md" />
                </div>

                {/* Box Main Body */}
                <div className="relative z-10 w-48 sm:w-56 h-36 sm:h-44 mx-auto bg-gradient-to-b from-purple-700 via-indigo-800 to-slate-900 rounded-b-2xl shadow-2xl border-x border-b border-purple-500/30 flex justify-center overflow-hidden">
                  {/* Vertical Ribbon */}
                  <div className="w-8 h-full bg-amber-400 shadow-lg" />

                  {/* Horizontal Ribbon */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-amber-400 shadow-md" />

                  {/* Shimmer Glint */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                </div>
              </div>

              {/* Pulsing prompt */}
              <div className="mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-display font-bold px-6 py-2.5 shadow-xl shadow-pink-500/20 group-hover:scale-105 transition-transform text-sm sm:text-base">
                <Sparkles className="h-4 w-4" />
                <span>Tap to Unwrap Surprise!</span>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#1E1638] via-slate-900 to-[#120F24] border-2 border-amber-400/50 p-6 sm:p-10 shadow-2xl text-left"
              >
                {/* Close Button to wrap it back */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 text-slate-300 hover:text-white transition-colors"
                  title="Wrap back"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Surprise Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30">
                    <Award className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
                      Official Birthday Proclamation
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      The Golden Birthday Trophy 🏆
                    </h3>
                  </div>
                </div>

                {/* Certificate / Special Pass Card */}
                <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 border border-amber-400/30 p-6 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-2 right-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="font-display text-xl sm:text-2xl font-bold text-amber-300">
                    Awarded to {name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    Certificate ID: BD-{age}-UNSTOPPABLE-LEGEND
                  </p>

                  <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed">
                    For being an incredible human being who brings infectious energy, unmatched loyalty, and constant smiles wherever they go. On this special day, all worries are cancelled, your favorite food is on order, and you are officially declared the MVP of the year!
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-pink-400">
                      <Heart className="h-4 w-4 fill-pink-500" />
                      <span className="text-xs font-semibold">100% Genuine Certified Love</span>
                    </div>
                    <span className="font-handwriting text-2xl text-amber-300">
                      ~ From Your Besties & Crew
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      celebrationAudio.playFanfare();
                      confetti({ particleCount: 100, spread: 80 });
                    }}
                    className="rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-display font-bold px-6 py-2.5 text-sm hover:scale-105 transition-transform"
                  >
                    🎉 Celebrate Again!
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-slate-400 hover:text-white underline transition-colors"
                  >
                    Wrap gift box back
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
