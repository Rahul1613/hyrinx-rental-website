'use client';

import React, { useState, useEffect } from 'react';
import { useTrip } from '../lib/tripStore';
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  Share2,
  Bookmark,
  Play,
  SlidersHorizontal,
  Menu,
  X,
  Check,
} from 'lucide-react';

interface AppNavProps {
  onOpenMyTrips: () => void;
  onOpenShare: () => void;
  onOpenCustomizer: () => void;
}

export default function AppNav({ onOpenMyTrips, onOpenShare, onOpenCustomizer }: AppNavProps) {
  const {
    currentTrip,
    activeDayNumber,
    setIsPlanningModalOpen,
    setExperienceMode,
    saveCurrentTrip,
    savedTrips,
  } = useTrip();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSave = () => {
    saveCurrentTrip();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const navLinks = [
    { label: 'The Route', href: '#route-overview' },
    { label: 'Daily Story', href: '#daily-itinerary' },
    { label: 'Stays', href: '#stays-section' },
    { label: 'Tasting', href: '#food-section' },
    { label: 'Experiences', href: '#experiences-section' },
    { label: 'Budget', href: '#budget-section' },
    { label: 'Destinations', href: '#destinations-gallery' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Destination Pill */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                ROAM
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/15 text-xs text-white/70">
              <span className="text-amber-300 font-semibold tracking-wide">
                {currentTrip.destinationName}
              </span>
              <span className="text-white/30">•</span>
              <span>{currentTrip.totalDays} Days</span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">Day {activeDayNumber} Active</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Hub */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Customizer */}
            <button
              onClick={onOpenCustomizer}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
              title="Customize Trip Parameters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={onOpenShare}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
              title="Share Trip Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* My Trips */}
            <button
              onClick={onOpenMyTrips}
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
              title="Saved Journeys"
            >
              <Bookmark className="w-4 h-4" />
              {savedTrips.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedTrips.length}
                </span>
              )}
            </button>

            {/* Save Trip Button */}
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition-all flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-300" />
              <span>Save</span>
            </button>

            {/* Experience Trip Mode */}
            <button
              onClick={() => setExperienceMode(true)}
              className="px-3.5 py-1.5 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/30 text-xs font-medium text-amber-200 transition-all flex items-center gap-1.5 backdrop-blur-md"
              title="Fullscreen Travel Film"
            >
              <Play className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>Experience Film</span>
            </button>

            {/* Plan My Trip Primary CTA */}
            <button
              onClick={() => setIsPlanningModalOpen(true)}
              className="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-amber-200 transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Plan Trip
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsPlanningModalOpen(true)}
              className="px-3 py-1 rounded-full bg-white text-black font-semibold text-xs"
            >
              Plan
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#0a0d14]/95 border-b border-white/10 px-6 py-6 space-y-4 text-sm animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-amber-300 font-semibold">{currentTrip.destinationName} ({currentTrip.totalDays} Days)</span>
              <button
                onClick={() => {
                  setExperienceMode(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs bg-amber-400/20 text-amber-200 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-amber-300 text-amber-300" /> Experience Film
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-white/80 hover:text-white text-xs"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  onOpenMyTrips();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 text-center text-xs bg-white/10 rounded-xl text-white font-medium"
              >
                My Saved Trips ({savedTrips.length})
              </button>
              <button
                onClick={() => {
                  handleSave();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 text-center text-xs bg-amber-400 text-black rounded-xl font-bold"
              >
                Save Current Trip
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Saved Notification Toast */}
      {savedToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-400/40 text-emerald-100 text-xs font-medium flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Trip saved to your offline journeys collection.</span>
        </div>
      )}
    </>
  );
}
