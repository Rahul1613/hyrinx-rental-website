'use client';

import React, { useState } from 'react';
import { useTrip } from '@/lib/tripStore';
import { DESTINATIONS } from '@/lib/destinations';
import { Sparkles, Compass, ArrowRight, Check } from 'lucide-react';

export default function MoodDiscoverySection() {
  const { selectDestination } = useTrip();

  const [activeMood, setActiveMood] = useState<string>('I want good food');

  const moods = [
    { label: 'I want good food', recommended: 'japan', persona: 'The Epicurean', traits: 'Street counter obsession, seasonal kaiseki dining, markets at sunrise, and Michelin-rated omakase.' },
    { label: 'I want mountains', recommended: 'switzerland', persona: 'The Alpine Wanderer', traits: 'Crisp glacial peaks, cogwheel railways, fondue chalets, and high-altitude solitude.' },
    { label: 'I want to disappear', recommended: 'bali', persona: 'The Sanctuary Seeker', traits: 'Tranquil river villas, incense rituals, bamboo shalas, and mindful wellness.' },
    { label: 'I want culture & art', recommended: 'italy', persona: 'The Renaissance Soul', traits: 'Centuries-old cobblestones, marble sculptures, Tuscan Chianti vineyards, and classical opera.' },
    { label: 'I want epic adventure', recommended: 'new-zealand', persona: 'The Wild Explorer', traits: 'Fjord navigation, glacial heli-hiking, alpine passes, and untouched coastal trails.' },
    { label: 'I want romance & elegance', recommended: 'paris', persona: 'The Flâneur', traits: 'Sunset on the Pont Neuf, private museum corridors, warm pain au chocolat, and haute couture.' },
  ];

  const currentMoodObj = moods.find((m) => m.label === activeMood) || moods[0];
  const recommendedDest = DESTINATIONS.find((d) => d.id === currentMoodObj.recommended) || DESTINATIONS[0];

  const handleApply = () => {
    selectDestination(recommendedDest.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover by Atmosphere</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
            What Kind of Journey Do You Crave?
          </h2>
          <p className="mt-3 text-white/65 text-sm sm:text-base font-light leading-relaxed">
            Select what you are feeling. ROAM pairs your current state of mind with an ideal destination, route pacing, and signature moments.
          </p>
        </div>

        {/* Mood Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-16">
          {moods.map((m) => {
            const isSelected = activeMood === m.label;
            return (
              <button
                key={m.label}
                onClick={() => setActiveMood(m.label)}
                className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-[#0e131d] text-white/70 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                "{m.label}"
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommendation Card */}
        <div className="max-w-4xl mx-auto bg-[#0d121c] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden group">
              <img
                src={recommendedDest.heroImage}
                alt={recommendedDest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs text-amber-300 font-medium uppercase tracking-wider">
                  Recommended Destination
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-0.5">
                  {recommendedDest.name}
                </h3>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-xs font-medium">
                {currentMoodObj.persona}
              </div>

              <h4 className="font-serif text-2xl font-bold text-white">
                {recommendedDest.tagline}
              </h4>

              <p className="text-white/70 text-sm leading-relaxed font-light">
                {currentMoodObj.traits}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-white/40 block font-light">CURATED DURATION</span>
                  <span className="text-white font-semibold text-sm">
                    {recommendedDest.defaultDays} Days overland
                  </span>
                </div>

                <button
                  onClick={handleApply}
                  className="px-6 py-3 rounded-full bg-white hover:bg-amber-300 text-black font-semibold text-xs transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Explore {recommendedDest.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
