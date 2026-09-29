"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Bell, Heart, RotateCw, Music, Check, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { navratriAudio } from "@/lib/navratriAudio";

const AARTI_VERSES = [
  {
    hindi: "जय अम्बे गौरी, मैया जय श्यामा गौरी।\nतुमको निशिदिन ध्यावत, हरि ब्रह्मा शिवरी॥\nॐ जय अम्बे गौरी...",
    translit: "Jai Ambe Gauri, Maiya Jai Shyama Gauri,\nTumko Nishidin Dhyavat, Hari Brahma Shivri,\nOm Jai Ambe Gauri...",
    meaning: "Glory to You, Divine Mother Ambe! Lord Vishnu, Brahma, and Shiva constantly meditate upon Your boundless grace.",
  },
  {
    hindi: "मांग सिन्दूर विराजत, टीको मृगमद को।\nउज्ज्वल से दोउ नैना, चन्द्रवदन नीको॥\nॐ जय अम्बे गौरी...",
    translit: "Maang Sindoor Virajat, Teeko Mrigmad Ko,\nUjjwal Se Dou Naina, Chandravadan Neeko,\nOm Jai Ambe Gauri...",
    meaning: "Sacred vermilion and musk tilak adorn Your radiant forehead. Your eyes shine pure and lovely as the full moon.",
  },
  {
    hindi: "कनक समान कलेवर, रक्ताम्बर राजै।\nरक्तपुष्प गल माला, कण्ठन पर साजै॥\nॐ जय अम्बे गौरी...",
    translit: "Kanak Samaan Kalevar, Raktambar Raaje,\nRaktapushpa Gal Maala, Kanthana Par Saaje,\nOm Jai Ambe Gauri...",
    meaning: "Your golden form is robed in sacred crimson silks, adorned with an auspicious garland of blooming red flowers.",
  },
  {
    hindi: "केहरि वाहन राजत, खड्ग खप्पर धारी।\nसुर-नर-मुनिजन सेवत, तिनके दुखहारी॥\nॐ जय अम्बे गौरी...",
    translit: "Kehari Vaahan Raajat, Khadag Khappar Dhaari,\nSur-Nar-Munijan Sevat, Tinake Dukhahari,\nOm Jai Ambe Gauri...",
    meaning: "Riding upon a royal lion, wielding the divine trident and sword, You effortlessly remove the suffering of all who take refuge.",
  }
];

export default function InteractiveAarti() {
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [offeringCount, setOfferingCount] = useState(15420);
  const [activeVerse, setActiveVerse] = useState(0);
  const [kapurBright, setKapurBright] = useState(false);
  const [hasOffered, setHasOffered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRotating) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 2.5) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRotating]);

  const toggleAartiRotation = () => {
    const nextState = !isRotating;
    setIsRotating(nextState);
    if (nextState) {
      navratriAudio.playAartiChime();
    }
  };

  const handleRingBell = () => {
    navratriAudio.playAartiChime();
  };

  const handleFlowerOffering = () => {
    navratriAudio.playAartiChime();
    setOfferingCount((c) => c + 1);
    setHasOffered(true);

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#D97706", "#DC2626", "#F59E0B", "#FEF08A"],
      shapes: ["circle"],
      scalar: 1.4,
    });
  };

  const handleCamphorAarti = () => {
    setKapurBright(true);
    navratriAudio.playAartiChime();
    setTimeout(() => setKapurBright(false), 2500);
  };

  return (
    <section id="aarti" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FFFDF9] to-[#FAF7F2] text-[#2E1508] border-b border-amber-200">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            Virtual Temple Sanctum
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-['Rozha_One'] text-[#7F1D1D] tracking-tight">
            अखण्ड ज्योति एवं पावन आरती दर्शन
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
            Participate in the sacred Aarti from your home. Rotate the brass thali, ring temple bells, offer fresh flowers, and sing the divine verses of Jai Ambe Gauri.
          </p>
        </div>

        {/* Shrine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Polished Brass Thali */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center">
              
              {/* Outer Glow Halo */}
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${
                  kapurBright 
                    ? "bg-amber-400/40 shadow-[0_0_80px_rgba(245,158,11,0.5)]" 
                    : isRotating 
                    ? "bg-amber-300/25 shadow-[0_0_50px_rgba(217,119,6,0.3)]" 
                    : "bg-amber-200/20"
                }`} 
              />

              {/* Decorative Marigold Ring */}
              <div className="absolute inset-1 rounded-full border-2 border-dashed border-amber-400/60 pointer-events-none" />

              {/* The Brass Thali */}
              <motion.div
                style={{ rotate: rotationAngle }}
                className="relative w-[88%] h-[88%] rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-2.5 shadow-2xl border-4 border-yellow-100 cursor-pointer select-none"
                onClick={toggleAartiRotation}
                title="Click to start/pause Aarti rotation"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-b from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center relative overflow-hidden border border-yellow-200 shadow-inner">
                  
                  {/* Subtle Etched Swastik */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-red-700 font-serif text-6xl">
                    卐
                  </div>

                  {/* Top: Kumkum & Chandan Vati */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-600 border border-white shadow-xs flex items-center justify-center text-[9px] text-white font-bold">
                      रोली
                    </div>
                    <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-400 shadow-xs flex items-center justify-center text-[9px] text-amber-950 font-bold">
                      चन्दन
                    </div>
                  </div>

                  {/* Left: Flowers */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-amber-300 shadow-xs flex items-center justify-center text-sm border border-white">
                      🌼
                    </div>
                    <div className="w-8 h-8 rounded-full bg-red-600 shadow-xs flex items-center justify-center text-sm border border-white">
                      🌺
                    </div>
                  </div>

                  {/* Right: Akshat & Bhog */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-sm border border-amber-300" title="Akshat">
                      🍚
                    </div>
                    <div className="w-8 h-8 rounded-full bg-amber-300 shadow-xs flex items-center justify-center text-sm border border-white" title="Naivedya">
                      🍬
                    </div>
                  </div>

                  {/* Center: The Sacred Brass Panch-Aarti Diya */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-18 h-18 rounded-full bg-gradient-to-b from-yellow-100 via-amber-300 to-amber-700 flex items-center justify-center shadow-lg border-2 border-white">
                      
                      {/* Central Camphor Flame */}
                      <motion.div
                        animate={{ scale: kapurBright ? 1.4 : 1 }}
                        className="relative flex flex-col items-center -mt-7"
                      >
                        <div className="w-5 h-9 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-[50%_50%_20%_20%/70%_70%_30%_30%] animate-akhand-jyot shadow-[0_0_20px_#f59e0b]" />
                        <div className="w-1.5 h-3 bg-black/60 rounded-full" />
                      </motion.div>

                      <span className="text-[9px] font-extrabold text-amber-950 uppercase tracking-wider mt-3">
                        महादीप
                      </span>
                    </div>

                    {/* Corner Wicks */}
                    <div className="absolute -top-2.5 w-3 h-4 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full blur-[0.5px] animate-pulse" />
                    <div className="absolute -bottom-2.5 w-3 h-4 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full blur-[0.5px] animate-pulse" />
                    <div className="absolute -left-2.5 w-4 h-3 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full blur-[0.5px] animate-pulse" />
                    <div className="absolute -right-2.5 w-4 h-3 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full blur-[0.5px] animate-pulse" />
                  </div>

                  {/* Bottom: Kapoor Aarti */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white/80 border border-white text-[10px] font-bold text-amber-950">
                    कपूर आरती
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Thali Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={toggleAartiRotation}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs ${
                  isRotating
                    ? "bg-[#7F1D1D] text-white shadow-md animate-pulse"
                    : "bg-white border-2 border-amber-300 text-[#7F1D1D] hover:bg-amber-50"
                }`}
              >
                <RotateCw className={`w-4 h-4 ${isRotating ? "animate-spin" : ""}`} />
                <span>{isRotating ? "Pause Aarti" : "Rotate Aarti (परिक्रमा)"}</span>
              </button>

              <button
                onClick={handleRingBell}
                className="px-4 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-stone-800 hover:bg-amber-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs hover:scale-105 active:scale-95"
              >
                <Bell className="w-4 h-4 text-amber-600" />
                <span>Ring Bell (घंटी)</span>
              </button>

              <button
                onClick={handleFlowerOffering}
                className="px-4 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-stone-800 hover:bg-amber-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs hover:scale-105 active:scale-95"
              >
                <span>🌺</span>
                <span>Offer Flower</span>
              </button>

              <button
                onClick={handleCamphorAarti}
                className="px-4 py-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 hover:bg-amber-200 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs hover:scale-105 active:scale-95"
              >
                <span>🔥</span>
                <span>Brighten Kapoor</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sacred Aarti Lyrics & Devotional Player */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#7F1D1D]" />
                  <h4 className="font-bold text-[#7F1D1D] text-sm">
                    आरती श्री अम्बा जी की (Jai Ambe Gauri)
                  </h4>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Verse {activeVerse + 1} of {AARTI_VERSES.length}
                </span>
              </div>

              {/* Active Verse Lyrics */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-amber-200/80 text-center space-y-2">
                <p className="font-['Rozha_One'] text-base sm:text-lg text-[#7F1D1D] font-bold leading-relaxed whitespace-pre-line">
                  {AARTI_VERSES[activeVerse].hindi}
                </p>
                <p className="text-xs font-mono text-stone-600 italic whitespace-pre-line">
                  {AARTI_VERSES[activeVerse].translit}
                </p>
                <p className="text-xs text-stone-700 pt-2 border-t border-amber-200 leading-normal">
                  {AARTI_VERSES[activeVerse].meaning}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setActiveVerse((v) => (v > 0 ? v - 1 : AARTI_VERSES.length - 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-[#7F1D1D] text-xs font-bold transition-colors"
                >
                  ← Previous Verse
                </button>

                <div className="flex gap-1.5">
                  {AARTI_VERSES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveVerse(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeVerse === i ? "bg-[#7F1D1D] w-5" : "bg-amber-200"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveVerse((v) => (v < AARTI_VERSES.length - 1 ? v + 1 : 0))}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-[#7F1D1D] text-xs font-bold transition-colors"
                >
                  Next Verse →
                </button>
              </div>

            </div>

            {/* Devotees Count */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs">
              <span className="text-stone-600 font-medium">
                Devotees Offered Flowers Today:
              </span>
              <span className="font-mono font-bold text-[#7F1D1D] text-sm">
                {offeringCount.toLocaleString()} 🌺
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
