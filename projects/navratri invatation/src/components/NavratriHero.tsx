"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Sparkles, Bell, Calendar, ChevronDown, Check, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { navratriAudio } from "@/lib/navratriAudio";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function NavratriHero() {
  const [isDiyaLit, setIsDiyaLit] = useState(true);
  const [diyaPulse, setDiyaPulse] = useState(false);
  const [flowerCount, setFlowerCount] = useState(12840);
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 4,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  // Countdown timer to Ghatasthapana
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOfferFlowers = () => {
    navratriAudio.playAartiChime();
    setFlowerCount((c) => c + 1);
    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.4 },
      colors: ["#D97706", "#DC2626", "#F59E0B", "#FEF08A", "#FB7185"],
      shapes: ["circle"],
      scalar: 1.4,
    });
  };

  const handleLightDiya = () => {
    navratriAudio.playAartiChime();
    setDiyaPulse(true);
    setTimeout(() => setDiyaPulse(false), 2000);
  };

  const handleBlowShankh = () => {
    navratriAudio.playShankh();
    handleOfferFlowers();
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#F5EEDB] text-[#2E1508] pt-6 pb-12">
      
      {/* Background Soft Temple Halo Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-300/25 via-orange-200/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center text-center space-y-8 my-auto">
        
        {/* Sacred Sanskrit Invocation Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border border-amber-300 shadow-xs text-amber-900 text-xs sm:text-sm font-semibold tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>॥ जय माँ अम्बे भवानी • सर्व मंगल मांगल्ये ॥</span>
        </motion.div>

        {/* Grand Headline */}
        <div className="space-y-3 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-['Rozha_One'] text-[#7F1D1D] tracking-tight leading-tight"
          >
            शुभ नवरात्रि महोत्सव
          </motion.h1>

          <p className="text-lg sm:text-2xl font-bold font-serif text-[#B45309]">
            Navratri Mahotsav 2026 • 9 Divine Days & Dandiya Raas
          </p>

          <p className="text-sm sm:text-base text-stone-700 max-w-2xl mx-auto font-normal leading-relaxed">
            Welcome to the sacred celebration of Maa Durga. Discover the 9 avatars, sacred daily colors, authentic fasting guide, live Aarti ceremony, and get your free digital Garba pass.
          </p>
        </div>

        {/* Central Divine Darshan Shrine (Maa Durga Idol + Akhand Diya) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative flex flex-col items-center"
        >
          {/* Ornate Arch Frame with Soft Gold Border */}
          <div className="relative w-64 h-80 sm:w-76 sm:h-96 rounded-[4.5rem_4.5rem_2rem_2rem] p-3 bg-gradient-to-b from-[#FDE68A] via-[#F59E0B] to-[#B45309] shadow-2xl">
            <div className="relative w-full h-full rounded-[4rem_4rem_1.5rem_1.5rem] overflow-hidden bg-stone-900 border-2 border-white shadow-inner">
              <Image
                src="/maa_durga.jpg"
                alt="Maa Durga Divine Idol"
                fill
                priority
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-0 right-0 text-center text-white px-2">
                <span className="text-[11px] uppercase font-bold tracking-widest text-amber-300 block">
                  ॥ माँ जगदम्बा दर्शन ॥
                </span>
                <p className="text-[11px] text-stone-300 font-serif">
                  Showering Health, Peace & Courage
                </p>
              </div>
            </div>

            {/* Glowing Akhand Diya at Shrine Base */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-6 h-10 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-[50%_50%_20%_20%/70%_70%_30%_30%] animate-akhand-jyot transition-all duration-500 ${
                    diyaPulse ? "scale-130 shadow-[0_0_35px_#f59e0b]" : "shadow-[0_0_20px_#f59e0b]"
                  }`}
                />
                <div className="w-18 h-5 rounded-full bg-gradient-to-r from-amber-700 via-yellow-400 to-amber-800 border border-white shadow-md flex items-center justify-center text-[9px] font-extrabold text-amber-950 uppercase">
                  अखण्ड ज्योति
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Quick Interactive Devotional Actions (Easy For Anyone To Use) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* 1. Flower Rain Button */}
          <button
            onClick={handleOfferFlowers}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-amber-50 text-[#7F1D1D] font-bold text-sm border-2 border-amber-300 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="text-xl">🌺</span>
            <span>Offer Flowers ({flowerCount.toLocaleString()})</span>
          </button>

          {/* 2. Light Diya Button */}
          <button
            onClick={handleLightDiya}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#991B1B] to-[#B45309] text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Brighten Akhand Diya</span>
          </button>

          {/* 3. Blow Sacred Shankh */}
          <button
            onClick={handleBlowShankh}
            className="px-5 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-[#7F1D1D] font-bold text-sm border border-amber-300/80 shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="text-lg">🐚</span>
            <span>Blow Conch (शंखनाद)</span>
          </button>
        </motion.div>

        {/* Ghatasthapana Countdown Clock (Clean & Easy To Read) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-amber-300 shadow-md max-w-lg w-full"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#7F1D1D]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ghatasthapana Muhurat Countdown</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: "Days", val: countdown.days },
              { label: "Hours", val: countdown.hours },
              { label: "Mins", val: countdown.minutes },
              { label: "Secs", val: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="p-2 sm:p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="block text-xl sm:text-2xl font-extrabold text-[#7F1D1D] font-mono">
                  {String(item.val).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Jump Buttons to Primary Sections */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-amber-950">
          <a
            href="#nine-days"
            className="px-4 py-2 rounded-full bg-white hover:bg-amber-100 border border-amber-300 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <span>🌸</span>
            <span>Check 9 Days & Colors</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-700" />
          </a>
          <a
            href="#garba-pass"
            className="px-4 py-2 rounded-full bg-white hover:bg-amber-100 border border-amber-300 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <span>🎟️</span>
            <span>Get Free Dandiya Pass</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-700" />
          </a>
        </div>

      </div>

      {/* Subtle Marigold Bottom Divider */}
      <div className="w-full mt-10 py-1.5 bg-[#7F1D1D] text-amber-200 text-center text-xs font-bold tracking-widest uppercase">
        <span>🌼 शुभ शारदीय नवरात्रि • 9 दिव्य स्वरूप • अखण्ड माँ कृपा 🌼</span>
      </div>
    </section>
  );
}
