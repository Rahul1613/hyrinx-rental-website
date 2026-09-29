'use client';

import React from 'react';
import { useTrip } from '../lib/tripStore';
import { TripConfig } from '../lib/types';
import { X, Calendar, MapPin, Trash2, Copy, Play, ArrowRight, Bookmark } from 'lucide-react';

interface MyTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyTripsModal({ isOpen, onClose }: MyTripsModalProps) {
  const { savedTrips, loadTrip, deleteSavedTrip, duplicateSavedTrip, setExperienceMode } = useTrip();

  if (!isOpen) return null;

  const handleOpenTrip = (trip: TripConfig) => {
    loadTrip(trip);
    onClose();
  };

  const handleExperienceTrip = (trip: TripConfig) => {
    loadTrip(trip);
    onClose();
    setExperienceMode(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[88vh] bg-[#0c1018] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080b12]">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-xl font-bold text-white">Saved Journeys</h3>
            <span className="text-xs text-white/50 font-light">({savedTrips.length} saved)</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          {savedTrips.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Bookmark className="w-12 h-12 text-white/20 mx-auto" />
              <div className="font-serif text-xl font-bold text-white">No Saved Journeys Yet</div>
              <p className="text-xs text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                Customize your dream destination and click the "Save" button in the top navigation to store your itineraries here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="rounded-2xl border border-white/10 bg-[#111724] p-5 flex flex-col justify-between space-y-4 group hover:border-amber-400/40 transition-all shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
                        {trip.destinationName} • {trip.totalDays} Days
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white mt-1 leading-snug">
                        {trip.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-white/50 mt-1 font-light">
                        <Calendar className="w-3.5 h-3.5 text-white/40" />
                        <span>Departs {trip.startDate}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteSavedTrip(trip.id)}
                      className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                      title="Delete saved journey"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <button
                      onClick={() => duplicateSavedTrip(trip.id)}
                      className="text-white/50 hover:text-white flex items-center gap-1 transition-colors"
                      title="Duplicate itinerary"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExperienceTrip(trip)}
                        className="px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 transition-colors flex items-center gap-1 font-medium"
                      >
                        <Play className="w-3 h-3 fill-amber-300" />
                        <span>Film</span>
                      </button>
                      <button
                        onClick={() => handleOpenTrip(trip)}
                        className="px-3.5 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-amber-300 transition-colors flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
