import React from "react";
import FestNavbar from "@/components/FestNavbar";
import FestHero from "@/components/FestHero";
import EventsTracksArena from "@/components/EventsTracksArena";
import ProNiteShowcase from "@/components/ProNiteShowcase";
import InteractiveSchedule from "@/components/InteractiveSchedule";
import DelegatePassGenerator from "@/components/DelegatePassGenerator";
import CampusLeaderboard from "@/components/CampusLeaderboard";
import CampusFaqMap from "@/components/CampusFaqMap";
import CampusDJBar from "@/components/CampusDJBar";

export default function CollegeFestHomePage() {
  return (
    <main className="min-h-screen bg-[#060407] text-[#f4ead8] relative">
      {/* 1. Malhar Gilded Fixed Navbar with Raag Ambience Toggle */}
      <FestNavbar />

      {/* 2. Malhar Grand Hero with 3D Gilded Enter World CTA & Countdown */}
      <FestHero />

      {/* 3. Cultural Kingdoms: LAPA, LIT, FA, ETC, & The Conclave */}
      <EventsTracksArena />

      {/* 4. Malhar Twilight Evenings & Amphitheatre Serenades */}
      <ProNiteShowcase />

      {/* 5. 3-Day Festival Itinerary & Chronology under Xavier's Arches */}
      <InteractiveSchedule />

      {/* 6. St. Xavier's Delegate Passport & Crimson Wax Seal Generator */}
      <DelegatePassGenerator />

      {/* 7. The Malhar Rolling Shield Inter-Collegiate Standings */}
      <CampusLeaderboard />

      {/* 8. Campus Quadrants Map & Festival Lore */}
      <CampusFaqMap />

      {/* 9. Floating Malhar Acoustic Raga Dock */}
      <CampusDJBar />

      {/* 10. Malhar Heritage Footer */}
      <footer className="py-20 px-4 bg-[#040205] border-t border-[#d9a94e]/20 text-center relative z-10 pb-32">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#d9a94e] bg-[#1a0f24] flex items-center justify-center">
              <span className="font-cinzel-dec font-bold text-sm text-[#d9a94e]">M</span>
            </div>
            <span className="font-cinzel font-bold text-2xl tracking-widest text-[#f7e3ab]">
              MALHAR 2026
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#f4ead8]/70 max-w-lg mx-auto font-montserrat font-light leading-relaxed">
            St. Xavier's College (Autonomous), 5 Mahapalika Marg, Mumbai 400 001. Organized by the Malhar Organizing Committee • Founded 1979 • All Rights Reserved.
          </p>

          <div className="pt-6 border-t border-[#d9a94e]/15 flex flex-wrap items-center justify-center gap-6 text-xs text-[#d9a94e] font-cinzel tracking-wider">
            <span>✦ 47TH MONSOON EDITION</span>
            <span>✦ 6 CULTURAL DEPARTMENTS</span>
            <span>✦ 120+ UNIVERSITIES</span>
            <span>✦ THE ROLLING SHIELD</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
