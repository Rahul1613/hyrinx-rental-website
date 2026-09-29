'use client';

import React from 'react';
import { useTrip } from '../lib/tripStore';
import { DESTINATIONS } from '../lib/destinations';
import { Compass, ArrowUpRight, Sparkles, MapPin } from 'lucide-react';

export default function DestinationGallery() {
  const { selectDestination } = useTrip();

  const handleSelect = (destId: string) => {
    selectDestination(destId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="destinations-gallery" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#07090e] border-t border-white/10 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-amber-300 text-xs font-medium mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Worldwide Portfolio</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
              Curated Destinations
            </h2>
            <p className="mt-3 text-white/65 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Every country in the ROAM collection has been handcrafted around distinct emotional rhythms, culinary highlights, and authentic local sanctuaries.
            </p>
          </div>

          <div className="text-right text-xs text-white/60">
            <span>Showing {DESTINATIONS.length} Signature Expeditions</span>
          </div>
        </div>

        {/* Large Editorial Destination Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleSelect(dest.id)}
              className="group relative h-[480px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/50 transition-all duration-500 shadow-2xl flex flex-col justify-between p-8"
            >
              {/* Background Image with Slow Zoom on Hover */}
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 group-hover:via-black/30 transition-all" />

              {/* Top Tag & Action */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-medium">
                  {dest.defaultDays} Days • {dest.country}
                </span>

                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Editorial Content */}
              <div className="relative z-10 space-y-2">
                <div className="text-xs text-amber-300/90 font-medium uppercase tracking-wider">
                  {dest.stops.map((s) => s.name).join(' → ')}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight group-hover:text-amber-200 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-light pt-1">
                  {dest.tagline}
                </p>

                <div className="pt-4 flex items-center justify-between text-xs text-white/60 border-t border-white/15">
                  <span>Est. ${dest.sampleBudget.moderate} / person</span>
                  <span className="text-amber-300 font-medium group-hover:underline">Explore Itinerary →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
