"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, MapPin, Feather, Compass, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { festAudio } from "@/lib/festAudio";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FestHero() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 42,
    hours: 18,
    minutes: 45,
    seconds: 12,
  });

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

  const handleEnterWorld = () => {
    festAudio.playGildedChime();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#D9A94E", "#F7E3AB", "#F405F9", "#FFFFFF"],
    });

    const target = document.getElementById("tracks");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="realm" className="relative min-h-[96vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      
      {/* Background Celestial Vignettes & Radial Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#d9a94e]/12 via-[#f405f9]/6 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Heritage Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 border-y border-[#d9a94e]/20 text-xs text-[#f4ead8]/70 font-cinzel">
          <div className="flex items-center gap-2.5">
            <Feather className="w-3.5 h-3.5 text-[#d9a94e]" />
            <span className="tracking-[0.2em] uppercase font-semibold text-[#f7e3ab]">
              ESTD. 1979 • 47TH HISTORIC EDITION
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#d9a94e]">
            <span className="flex items-center gap-1.5 text-[#f4ead8]/80 font-montserrat">
              <Calendar className="w-3.5 h-3.5 text-[#d9a94e]" />
              AUGUST 14 – 16, 2026
            </span>
            <span className="text-[#d9a94e]/40">•</span>
            <span className="flex items-center gap-1.5 text-[#f4ead8]/80 font-montserrat">
              <MapPin className="w-3.5 h-3.5 text-[#d9a94e]" />
              ST. XAVIER'S CAMPUS, SOUTH MUMBAI
            </span>
          </div>
        </div>
      </div>

      {/* Center Grand Title & Emblems */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center py-10 my-auto relative z-10">
        
        {/* Heraldic Sun & Monsoon Rain Crest */}
        <div className="inline-flex items-center justify-center gap-3 mb-6 px-4 py-1.5 rounded-full border border-[#d9a94e]/40 bg-[#160e1d]/70 backdrop-blur-md shadow-lg shadow-[#d9a94e]/10">
          <Sparkles className="w-3.5 h-3.5 text-[#d9a94e]" />
          <span className="text-xs uppercase tracking-[0.25em] font-cinzel font-semibold text-[#f7e3ab]">
            St. Xavier's College Presents
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#d9a94e]" />
        </div>

        {/* Main Title: MALHAR */}
        <h1 className="font-cinzel-dec text-6xl sm:text-8xl md:text-9xl font-bold tracking-wider leading-[0.95] text-white drop-shadow-[0_10px_35px_rgba(217,169,78,0.25)]">
          <span className="gold-shimmer">MALHAR</span>
        </h1>

        {/* Edition & Roman Tag */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#d9a94e]/60" />
          <p className="font-cinzel text-lg sm:text-2xl tracking-[0.3em] uppercase text-[#f7e3ab] font-medium">
            MMXXVI • THE MONSOON SAGA
          </p>
          <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#d9a94e]/60" />
        </div>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-[#f4ead8]/80 max-w-2xl mx-auto font-montserrat font-light leading-relaxed">
          Asia’s most celebrated inter-collegiate cultural gathering. An odyssey of literature, classical & street performing arts, fine canvas expressions, and thought-provoking conclaves beneath the gothic arches.
        </p>

        {/* Iconic Malhar "ENTER WORLD" 3D Gilded Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <div className="btn-enter-wrap">
            <div className="btn-enter-glow" />
            <button
              onClick={handleEnterWorld}
              className="btn-enter-inner group"
            >
              <Compass className="w-5 h-5 text-[#f7e3ab] group-hover:rotate-45 transition-transform duration-300" />
              <span>ENTER THE REALM</span>
              <span className="text-xs text-[#d9a94e] font-montserrat font-normal tracking-normal group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <a
            href="#passport"
            onClick={() => festAudio.playSitarPluck(349.23)}
            className="px-7 py-3.5 rounded-full border border-[#d9a94e]/40 hover:border-[#f7e3ab] bg-[#140c1c]/50 hover:bg-[#1f132c] text-[#f7e3ab] font-cinzel text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2 shadow-md shadow-black"
          >
            <Award className="w-4 h-4 text-[#d9a94e]" />
            <span>COLLEGIATE PASSPORT</span>
          </a>
        </div>

        {/* Countdown to Malhar */}
        <div className="mt-12 inline-block p-4 sm:p-5 rounded-2xl border border-[#d9a94e]/25 bg-[#0e0814]/80 backdrop-blur-md shadow-2xl">
          <div className="text-[11px] font-cinzel uppercase tracking-[0.2em] text-[#d9a94e] mb-3">
            Gates Open at the Quadrangle in
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-6 font-cinzel text-center">
            <div className="bg-[#180f24] border border-[#d9a94e]/20 px-3 py-2 sm:px-4 sm:py-3 rounded-lg min-w-[65px] sm:min-w-[80px]">
              <span className="text-xl sm:text-3xl font-bold text-white block">
                {String(countdown.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-wider text-[#d9a94e] uppercase font-montserrat">Days</span>
            </div>
            <div className="bg-[#180f24] border border-[#d9a94e]/20 px-3 py-2 sm:px-4 sm:py-3 rounded-lg min-w-[65px] sm:min-w-[80px]">
              <span className="text-xl sm:text-3xl font-bold text-white block">
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-wider text-[#d9a94e] uppercase font-montserrat">Hours</span>
            </div>
            <div className="bg-[#180f24] border border-[#d9a94e]/20 px-3 py-2 sm:px-4 sm:py-3 rounded-lg min-w-[65px] sm:min-w-[80px]">
              <span className="text-xl sm:text-3xl font-bold text-white block">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-wider text-[#d9a94e] uppercase font-montserrat">Mins</span>
            </div>
            <div className="bg-[#180f24] border border-[#d9a94e]/20 px-3 py-2 sm:px-4 sm:py-3 rounded-lg min-w-[65px] sm:min-w-[80px]">
              <span className="text-xl sm:text-3xl font-bold text-[#f405f9] block">
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-wider text-[#d9a94e] uppercase font-montserrat">Secs</span>
            </div>
          </div>
        </div>

      </div>

      {/* Malhar Marquee Ribbon */}
      <div className="w-full border-y border-[#d9a94e]/25 bg-[#0a0510]/90 py-3 overflow-hidden">
        <div className="animate-malhar-marquee flex items-center font-cinzel text-xs tracking-[0.22em] text-[#d9a94e]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0 px-4">
              <span>LITERARY ARTS & DEBATES</span>
              <span className="text-[#f405f9]">✦</span>
              <span>LAPA: PERFORMING ARTS & DANCE</span>
              <span className="text-[#d9a94e]">✦</span>
              <span>FINE ARTS & CANVAS ARCHIVES</span>
              <span className="text-[#f405f9]">✦</span>
              <span>THE MALHAR CONCLAVE</span>
              <span className="text-[#d9a94e]">✦</span>
              <span>ENTERTAINMENT & THEATRICALS</span>
              <span className="text-[#f405f9]">✦</span>
              <span>ACOUSTIC SUNSET AT THE QUAD</span>
              <span className="text-[#d9a94e]">✦</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
