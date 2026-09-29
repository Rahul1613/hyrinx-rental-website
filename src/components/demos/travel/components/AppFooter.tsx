'use client';

import React from 'react';
import { useTrip } from '../lib/tripStore';
import { Compass, Sparkles, Heart } from 'lucide-react';

export default function AppFooter() {
  const { setIsPlanningModalOpen, setExperienceMode } = useTrip();

  return (
    <footer className="relative bg-[#05070b] border-t border-white/10 pt-24 pb-16 px-6 sm:px-12 lg:px-20 z-20 text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Call to Action */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Horizon Awaits</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight">
            Where will you go next?
          </h2>

          <p className="text-white/65 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Every great journey begins with a moment of quiet yearning. Create your personalized itinerary in under two minutes.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsPlanningModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-amber-200 text-black font-semibold text-sm transition-all shadow-xl"
            >
              Plan Your Journey
            </button>
            <button
              onClick={() => setExperienceMode(true)}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20"
            >
              Experience Film Mode
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif font-bold tracking-wider text-sm">ROAM</span>
            <span className="text-white/30">•</span>
            <span className="text-white/40">Intelligent Travel Planning</span>
          </div>

          <div className="text-white/40 font-light">
            Pure client-side itinerary engine & offline journey storage
          </div>

          <div className="flex items-center gap-1 text-white/40">
            <span>© 2026 ROAM. Designed for authentic journeys.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
