'use client';

import React from 'react';
import { useTrip } from '../lib/tripStore';
import { X, SlidersHorizontal, Check, Calendar, Users, Wallet, Sparkles } from 'lucide-react';

interface TripCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TripCustomizerModal({ isOpen, onClose }: TripCustomizerModalProps) {
  const { currentTrip, updateTripDetails } = useTrip();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c1018] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080b12]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-white">Customize Journey</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-sm max-h-[80vh] overflow-y-auto">
          {/* Trip Title */}
          <div>
            <label className="block text-xs text-white/60 mb-2 uppercase font-medium">Custom Journey Title</label>
            <input
              type="text"
              value={currentTrip.title}
              onChange={(e) => updateTripDetails({ title: e.target.value })}
              className="w-full bg-[#121824] border border-white/15 rounded-2xl px-4 py-2.5 text-white font-serif text-base focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Dates & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-2 uppercase font-medium">Departure Date</label>
              <input
                type="date"
                value={currentTrip.startDate}
                onChange={(e) => updateTripDetails({ startDate: e.target.value })}
                className="w-full bg-[#121824] border border-white/15 rounded-2xl p-2.5 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-2 uppercase font-medium">Total Days ({currentTrip.totalDays} Days)</label>
              <div className="flex items-center gap-2">
                {[5, 7, 10, 14].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => updateTripDetails({ totalDays: d })}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      currentTrip.totalDays === d
                        ? 'bg-amber-400 text-black border-amber-300 shadow-sm'
                        : 'bg-[#121824] text-white/70 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {d}D
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-xs text-white/60 mb-2 uppercase font-medium">Adult Travelers</label>
            <div className="flex items-center gap-4 bg-[#121824] border border-white/10 p-3 rounded-2xl">
              <span className="text-white text-xs font-medium flex-1">Number of adults traveling:</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateTripDetails({
                      travelers: {
                        ...currentTrip.travelers,
                        adults: Math.max(1, currentTrip.travelers.adults - 1),
                      },
                    })
                  }
                  className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20"
                >
                  -
                </button>
                <span className="font-bold text-white text-base px-1">
                  {currentTrip.travelers.adults}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateTripDetails({
                      travelers: {
                        ...currentTrip.travelers,
                        adults: currentTrip.travelers.adults + 1,
                      },
                    })
                  }
                  className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Done CTA */}
          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-amber-300 transition-colors"
            >
              Apply Updates
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
