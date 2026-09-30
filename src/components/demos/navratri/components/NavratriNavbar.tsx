"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Music, VolumeX, Menu, X, Flame, Calendar, Ticket, BookOpen, Image as ImageIcon } from "lucide-react";
import { navratriAudio } from '@/lib/audio/navratriAudio';

export default function NavratriNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      navratriAudio.stopMusic();
      setIsMusicPlaying(false);
    } else {
      navratriAudio.playGarbaRhythm();
      setIsMusicPlaying(true);
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero", icon: "🛕" },
    { label: "9 Days & Colors", href: "#nine-days", icon: "🌸" },
    { label: "Virtual Aarti", href: "#aarti", icon: "🪔" },
    { label: "Garba Pass", href: "#garba-pass", icon: "🎟️" },
    { label: "Fasting & Rituals", href: "#vrat-guide", icon: "📜" },
    { label: "Moments", href: "#gallery", icon: "📸" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-amber-300/80 py-2.5"
          : "bg-[#FAF7F2] border-b border-amber-200/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#7F1D1D] flex items-center justify-center text-amber-200 text-sm font-bold">
              ॐ
            </div>
          </div>
          <div>
            <span className="font-['Rozha_One'] text-lg sm:text-xl font-bold text-[#7F1D1D] tracking-wide block leading-none">
              शुभ नवरात्रि
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B45309]">
              Navratri Mahotsav 2026
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-white/80 p-1.5 rounded-full border border-amber-300/60 shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#451A03] hover:text-[#7F1D1D] hover:bg-amber-100/60 transition-all flex items-center gap-1.5"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Audio Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          {/* Music Button */}
          <button
            onClick={toggleMusic}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              isMusicPlaying
                ? "bg-[#7F1D1D] text-amber-200 shadow-md animate-pulse"
                : "bg-amber-100/80 hover:bg-amber-200 text-[#7F1D1D] border border-amber-300"
            }`}
            title="Toggle Festive Music"
          >
            {isMusicPlaying ? <Music className="w-3.5 h-3.5 animate-spin" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMusicPlaying ? "Music Playing" : "Play Music"}</span>
          </button>

          {/* Quick Garba Pass CTA */}
          <a
            href="#garba-pass"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-[#991B1B] to-[#B45309] text-white text-xs font-bold shadow-sm hover:shadow hover:scale-105 transition-all"
          >
            Get Garba Pass
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-amber-100/60 text-[#7F1D1D] hover:bg-amber-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-amber-300 px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-[#451A03] hover:bg-amber-100 transition-colors"
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#garba-pass"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl bg-[#7F1D1D] text-white font-bold text-sm shadow-sm"
            >
              🎟️ Get Free Garba Pass
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
