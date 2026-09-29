"use client";

import React from "react";
import FallingPetals from "./components/FallingPetals";
import WeddingHero from "./components/WeddingHero";
import InteractiveWeddingInvite from "./components/InteractiveWeddingInvite";
import SevenSacredVows from "./components/SevenSacredVows";
import LoveStoryScrollytelling from "./components/LoveStoryScrollytelling";
import WeddingEventsSchedule from "./components/WeddingEventsSchedule";
import CinematicVideoReel from "./components/CinematicVideoReel";
import GuestBlessingsWall from "./components/GuestBlessingsWall";
import FloatingLoveBar from "./components/FloatingLoveBar";

export default function MarriageDemo() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B1F1D] relative pb-28 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Auspicious Falling Marigold, Jasmine & Rose Petals */}
      <FallingPetals />

      {/* Divine Royal Wedding Hero with Ganesha Invocation, Calligraphy & Shehnai Player */}
      <WeddingHero />

      {/* Royal 3D Wax-Sealed Wedding Patrika (Gilded Scroll Invite) */}
      <InteractiveWeddingInvite />

      {/* The 7 Sacred Vows (Saat Phere / Saptapadi) around the Holy Agni Kund */}
      <SevenSacredVows />

      {/* The 4-Chapter Love Story Scrollytelling Experience */}
      <LoveStoryScrollytelling />

      {/* Auspicious Wedding Events & Ceremony Passes */}
      <WeddingEventsSchedule />

      {/* Couple Cinema Video Reel Player */}
      <CinematicVideoReel />

      {/* Sacred Aashirwaad & Blessings Guest Registry */}
      <GuestBlessingsWall />

      {/* Sticky Bottom Floating Divine Blessing Emojis */}
      <FloatingLoveBar />

      {/* Sacred Royal Wedding Footer */}
      <footer className="mt-20 border-t-2 border-amber-300/80 bg-gradient-to-b from-amber-50/50 to-amber-100/60 py-16 text-center text-xs text-[#5C3D1B]">
        <div className="font-serif font-bold text-amber-900 text-sm tracking-widest uppercase mb-1">
          ॥ ॐ श्री वरप्रदाय नमः ॥
        </div>
        <div className="font-calligraphy text-6xl text-[#841926] my-2 select-none">
          Rhea & Kabir
        </div>
        <p className="font-serif italic text-base text-[#6E4924] max-w-md mx-auto mb-3">
          &ldquo;मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः।<br />मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥&rdquo;
        </p>
        <p className="font-serif text-sm font-semibold text-amber-950">
          Saturday, December 12, 2026 • The Riverbank Sacred Pavilion, Pune
        </p>
      </footer>
    </div>
  );
}
