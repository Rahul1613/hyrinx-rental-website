"use client";

import React from "react";
import NavratriNavbar from "./components/NavratriNavbar";
import NavratriHero from "./components/NavratriHero";
import NineDaysColors from "./components/NineDaysColors";
import InteractiveAarti from "./components/InteractiveAarti";
import GarbaDandiyaNights from "./components/GarbaDandiyaNights";
import RitualsAndFastingGuide from "./components/RitualsAndFastingGuide";
import NavratriVideoReel from "./components/NavratriVideoReel";
import PrasadBlessingsWall from "./components/PrasadBlessingsWall";

export default function NavratriDemo() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2E1508] selection:bg-[#D97706] selection:text-white relative">
      {/* 1. Sticky Navigation Bar */}
      <NavratriNavbar />

      {/* 2. Grand Divine Hero with Shrine, Akhand Diya & Devotional Actions */}
      <NavratriHero />

      {/* 3. 9 Days & 9 Sacred Colors Dress & Avatar Guide */}
      <NineDaysColors />

      {/* 4. Interactive Virtual Aarti & Sacred Lyrics */}
      <InteractiveAarti />

      {/* 5. Garba & Dandiya Raas Invitation & Digital Pass */}
      <GarbaDandiyaNights />

      {/* 6. Fasting Rules & Vedic Rituals Guide */}
      <RitualsAndFastingGuide />

      {/* 7. Celebration Highlights & Photo Moments */}
      <NavratriVideoReel />

      {/* 8. Devotee Prayer Wall & 108 Mantra Counter */}
      <PrasadBlessingsWall />

      {/* Sacred Traditional Footer */}
      <footer className="py-14 px-4 bg-[#FAF5EB] border-t border-amber-300 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-3xl select-none">🌼 🪔 🚩 🪘 🚩 🪔 🌼</div>
          
          <p className="font-['Rozha_One'] text-xl sm:text-2xl text-[#7F1D1D] tracking-wide font-extrabold leading-relaxed">
            &ldquo;सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।<br />
            शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥&rdquo;
          </p>
          
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-normal">
            May the supreme divine mother Maa Jagadamba shower endless health, joy, spiritual peace, and auspicious victory upon you and your family.
          </p>

          <div className="pt-4 border-t border-amber-200/80 flex flex-wrap items-center justify-center gap-4 text-xs text-amber-900 font-bold uppercase tracking-wider">
            <span>✦ Navratri Mahotsav 2026</span>
            <span>✦ Shubh Sharadiya Navratri</span>
            <span>✦ Jai Mata Di</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
