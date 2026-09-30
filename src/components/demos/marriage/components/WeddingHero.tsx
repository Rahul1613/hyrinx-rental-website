"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Flower2, Scroll, HeartHandshake, Sparkles, MapPin, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import { divineAudio } from '@/lib/audio/weddingAudio';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function WeddingHero() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 76, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const targetDate = new Date("2026-12-12T10:30:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (isPlayingMusic) {
      divineAudio.stopMusic();
      setIsPlayingMusic(false);
    } else {
      divineAudio.playDivineMelody();
      setIsPlayingMusic(true);
    }
  };

  const handleShowerAkshat = () => {
    divineAudio.playAkshatShower();
    confetti({
      particleCount: 80,
      spread: 95,
      origin: { y: 0.4 },
      colors: ["#F59E0B", "#FBBF24", "#DC2626", "#F43F5E", "#FEF08A"],
    });
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-20 overflow-hidden">
      {/* Golden divine aura light rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-r from-amber-200/40 via-yellow-100/50 to-orange-200/30 blur-3xl pointer-events-none rounded-full" />

      {/* Top Floating Action Header (Bell sound completely removed) */}
      <header className="fixed top-4 inset-x-0 px-4 sm:px-10 flex items-center justify-between z-40 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md border border-amber-300/80 px-4 py-1.5 shadow-xs text-xs font-serif font-bold text-amber-900">
          <span>॥ शुभ विवाह ॥</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Shower Akshat & Flowers */}
          <button
            onClick={handleShowerAkshat}
            className="flex items-center gap-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-300 px-4 py-1.5 text-xs font-serif font-bold text-red-900 shadow-xs transition-transform active:scale-95"
            title="Shower Sacred Akshat & Flowers"
          >
            <Flower2 className="h-3.5 w-3.5 text-red-600" />
            <span className="hidden sm:inline">Shower Flowers 🌸</span>
          </button>

          {/* Divine Melody Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-serif font-bold shadow-xs transition-all border ${
              isPlayingMusic
                ? "bg-amber-500 text-white border-amber-600 shadow-amber-500/25 animate-pulse"
                : "bg-white/95 text-amber-900 border-amber-300 hover:bg-amber-50"
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="h-3.5 w-3.5" />
                <span>Playing Shehnai 🎶</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-amber-700" />
                <span>Play Shehnai 🎵</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Sacred Invocations */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/10 border border-amber-400/60 text-amber-900 font-serif font-bold text-sm sm:text-base tracking-widest shadow-xs mb-3">
            <span className="text-amber-600 font-bold">卐</span>
            <span>॥ श्री गणेशाय नमः ॥</span>
            <span className="text-amber-600 font-bold">卐</span>
          </div>

          <p className="font-serif italic text-xs sm:text-sm text-amber-900/80 tracking-wider">
            &ldquo;मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः । मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः ॥&rdquo;
          </p>
        </motion.div>

        {/* Blessed Couple Introduction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-sm sm:text-base uppercase tracking-[0.25em] text-[#8C6D38] font-semibold mb-2"
        >
          With the Divine Grace of the Almighty & Elders
        </motion.p>

        {/* Couple Names in Grand Calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="font-calligraphy text-7xl sm:text-9xl md:text-[10.5rem] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-[#A65B1D] via-[#D4892A] to-[#801323] drop-shadow-[0_10px_25px_rgba(212,175,55,0.3)] select-none">
            Rhea & Kabir
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-600" />
            <span className="font-serif text-xl sm:text-2xl tracking-[0.3em] text-[#7A212E] font-medium uppercase">
              SHUBH VIVAAH • शुभ विवाह
            </span>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-600" />
          </div>
        </motion.div>

        {/* Central Royal Wedding Photo in Gilded Arch Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative mt-8 mb-6 group"
        >
          {/* Outer Marigold & Golden Glow Aura */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/30 via-orange-300/30 to-red-400/25 blur-2xl rounded-full opacity-80 group-hover:scale-105 transition-transform duration-700" />

          {/* Arched Temple Jharokha Photo Frame */}
          <div className="relative w-72 sm:w-96 md:w-[27rem] aspect-[4/5] rounded-t-[10rem] rounded-b-3xl overflow-hidden border-4 border-amber-400 shadow-[0_20px_50px_rgba(180,120,40,0.35)] bg-amber-50">
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
              alt="Rhea and Kabir in regal wedding attire"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle Divine Gradient Shimmer at Bottom of Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

            {/* Photo Bottom Tag */}
            <div className="absolute bottom-4 inset-x-4 text-center z-10">
              <span className="inline-block px-4 py-1 rounded-full bg-white/90 backdrop-blur-md border border-amber-400/60 font-serif font-bold text-xs sm:text-sm text-amber-950 shadow-sm">
                Rhea & Kabir • The Auspicious Union ✦
              </span>
            </div>
          </div>

          {/* Ornate Golden Lotus Stamp Top Crown */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-white shadow-md z-20 text-slate-950 font-serif font-bold text-lg">
            卐
          </div>
        </motion.div>

        {/* Auspicious Muhurat Stamp */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-2xl bg-amber-50/90 border border-amber-300/80 px-6 py-2.5 shadow-xs text-sm text-[#5C3D1B]"
        >
          <span className="font-serif font-bold text-amber-900 text-base">
            Auspicious Muhurat:
          </span>
          <span className="font-serif text-red-900 font-semibold text-base">
            Saturday, December 12, 2026 • 10:30 AM Lagna
          </span>
          <span className="text-amber-400">•</span>
          <span className="font-sans text-xs sm:text-sm text-[#735230]">
            The Riverbank Sacred Pavilion, Pune
          </span>
        </motion.div>

        {/* Divine Muhurat Countdown Dials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-10 grid grid-cols-4 gap-3 sm:gap-6 max-w-lg w-full"
        >
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINUTES", value: timeLeft.minutes },
            { label: "SECONDS", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="divine-card rounded-2xl p-3 sm:p-4 text-center border-2 border-amber-300/70 shadow-sm transition-transform hover:scale-105 bg-white/95"
            >
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#801826] block">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-serif font-bold tracking-widest text-[#9C7A4A] block mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Discovery Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#patrika-ceremony"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-red-700 px-6 py-3.5 text-sm sm:text-base font-serif font-bold text-white shadow-lg shadow-amber-600/25 hover:scale-105 active:scale-95 transition-transform"
          >
            <Scroll className="h-4 w-4" />
            <span>Open Wedding Patrika 📜</span>
          </a>

          <a
            href="#seven-vows-section"
            className="flex items-center gap-2 rounded-2xl border-2 border-red-700/40 bg-red-50 hover:bg-red-100 px-6 py-3.5 text-sm sm:text-base font-serif font-bold text-red-900 transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            <HeartHandshake className="h-4 w-4 text-red-700" />
            <span>The 7 Sacred Vows (Saat Phere) 🪔</span>
          </a>

          <a
            href="#story-section"
            className="flex items-center gap-2 rounded-2xl border border-amber-400 bg-white/90 hover:bg-amber-50 px-5 py-3.5 text-sm sm:text-base font-serif font-semibold text-amber-950 transition-all hover:scale-105 shadow-xs"
          >
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>Our Divine Story</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
