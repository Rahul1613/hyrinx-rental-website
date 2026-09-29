'use client';

import React, { useState } from 'react';
import { useTrip } from '../lib/tripStore';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Play,
  Calendar,
  ChevronDown,
} from 'lucide-react';

interface CinematicHeroProps {
  onExploreClick: () => void;
}

export default function CinematicHero({ onExploreClick }: CinematicHeroProps) {
  const { currentTrip, selectedDestination, setIsPlanningModalOpen, setExperienceMode } = useTrip();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden select-none"
    >
      {/* 1. Cinematic Background Layer with Smooth Parallax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform scale-105"
        style={{
          backgroundImage: `url(${selectedDestination.heroImage})`,
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0px) scale(1.05)`,
        }}
      >
        {/* Soft Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/45 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/75 via-transparent to-[#07090e]/50" />
      </div>

      {/* 2. Delicate Animated Ambient Dash Line */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
        <svg viewBox="0 0 1440 900" className="w-full h-full fill-none overflow-visible">
          <path
            d="M 120,680 Q 420,380 720,440 T 1320,260"
            stroke="#dfb15b"
            strokeWidth="2"
            strokeDasharray="6,6"
            className="animate-route-flow"
          />
        </svg>
      </div>

      {/* 3. Top Destination Pill Badge */}
      <div className="relative z-20 flex flex-wrap items-center justify-between text-xs text-white/70 pt-2 gap-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-medium tracking-wide">Featured Journey — {selectedDestination.name}</span>
        </div>

        <div className="hidden md:flex items-center gap-5 text-white/75 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{selectedDestination.stops.map((s) => s.name).join(' → ')}</span>
          </span>
          <span className="text-white/30">•</span>
          <span>{selectedDestination.defaultDays} Curated Days</span>
        </div>
      </div>

      {/* 4. Elegant Hero Content */}
      <div className="relative z-20 max-w-4xl my-auto py-12">
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.05] drop-shadow-2xl">
          Go somewhere <br />
          <span className="italic font-serif text-amber-200 font-normal">extraordinary.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-2xl text-white/85 max-w-2xl font-light leading-relaxed">
          Intelligently planned around the places, moments, and rituals you care about. Authentic stays, sacred trails, and unhurried days.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsPlanningModalOpen(true)}
            className="px-8 py-4 rounded-full bg-white hover:bg-amber-200 text-black font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-xl hover:shadow-amber-300/20 transform hover:-translate-y-0.5"
          >
            <span>Plan Your Journey</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <button
            onClick={() => setExperienceMode(true)}
            className="px-7 py-4 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/30 text-amber-200 text-sm sm:text-base font-medium transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <Play className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Experience Film</span>
          </button>

          <button
            onClick={onExploreClick}
            className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm sm:text-base transition-all"
          >
            Explore Destinations
          </button>
        </div>
      </div>

      {/* 5. Bottom Hero Bar */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-white/70 gap-4 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">{selectedDestination.name}</span>
          <span className="text-white/30">•</span>
          <span className="italic font-serif text-amber-200/90">{selectedDestination.tagline}</span>
        </div>

        <a
          href="#route-overview"
          className="flex items-center gap-2 text-amber-300 hover:text-white transition-colors"
        >
          <span>Explore the itinerary</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
