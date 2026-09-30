"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Volume2, VolumeX, Compass } from "lucide-react";
import { festAudio } from "@/lib/festAudio";

export default function FestNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const state = festAudio.toggleMalharAmbience();
    setIsAudioOn(state);
  };

  const navLinks = [
    { label: "THE REALM", href: "#realm" },
    { label: "DEPARTMENTS", href: "#tracks" },
    { label: "AMPHITHEATRE", href: "#pronites" },
    { label: "CHRONICLES", href: "#schedule" },
    { label: "CONCLAVE", href: "#conclave" },
    { label: "CAMPUS FAQS", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#060407]/90 backdrop-blur-xl border-[#d9a94e]/30 shadow-2xl shadow-black/80"
          : "bg-transparent border-[#d9a94e]/15"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Crest */}
        <a href="#realm" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full border border-[#d9a94e]/60 bg-gradient-to-br from-[#1d1226] to-[#0a060e] flex items-center justify-center shadow-lg shadow-[#d9a94e]/10 group-hover:border-[#f7e3ab] group-hover:scale-105 transition-all">
            <span className="font-cinzel-dec font-bold text-lg text-[#d9a94e] group-hover:text-[#f7e3ab]">
              M
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#f7e3ab] group-hover:text-white transition-colors">
                MALHAR
              </span>
              <span className="text-xs font-montserrat font-bold px-1.5 py-0.5 rounded-full border border-[#f405f9]/40 bg-[#f405f9]/10 text-[#f405f9] tracking-wider">
                2026
              </span>
            </div>
            <span className="text-[10px] tracking-[0.22em] text-[#d9a94e]/70 font-montserrat uppercase hidden sm:block">
              St. Xavier's College • Mumbai
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 font-cinzel text-xs tracking-[0.16em] text-[#f4ead8]/80 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => festAudio.playMonsoonDrop()}
              className="hover:text-[#f7e3ab] transition-all relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d9a94e] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA & Sound */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Audio toggle: Raag Malhar Ambience */}
          <button
            onClick={handleToggleAudio}
            className={`px-3 py-1.5 rounded-full text-xs font-montserrat font-medium border transition-all flex items-center gap-2 ${
              isAudioOn
                ? "bg-[#d9a94e]/20 text-[#f7e3ab] border-[#d9a94e] shadow-md shadow-[#d9a94e]/20 animate-pulse"
                : "bg-transparent text-[#f4ead8]/60 border-[#d9a94e]/30 hover:border-[#d9a94e]/70 hover:text-[#f7e3ab]"
            }`}
            title="Toggle Raag Malhar Monsoon Ambience"
          >
            {isAudioOn ? (
              <Volume2 className="w-3.5 h-3.5 text-[#d9a94e]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden md:inline">
              {isAudioOn ? "RAAG MALHAR" : "SOUND: OFF"}
            </span>
          </button>

          {/* Chunky Malhar Gilded Button Header */}
          <a
            href="#passport"
            onClick={() => festAudio.playGildedChime()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d9a94e] bg-gradient-to-r from-[#8a5a1d]/60 via-[#d9a94e]/30 to-[#8a5a1d]/60 hover:from-[#d9a94e] hover:to-[#f7e3ab] hover:text-[#060407] text-[#f7e3ab] font-cinzel text-xs font-bold tracking-widest shadow-lg shadow-[#d9a94e]/15 transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f7e3ab]" />
            <span>FEST PASS</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#f7e3ab] border border-[#d9a94e]/30 rounded-lg hover:bg-[#d9a94e]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060407]/98 border-b border-[#d9a94e]/30 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <div className="text-[11px] font-montserrat text-[#d9a94e] uppercase tracking-widest border-b border-[#d9a94e]/20 pb-2">
            St. Xavier's College Mumbai • Malhar 2026
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  festAudio.playMonsoonDrop();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg border border-[#d9a94e]/20 bg-[#160f20]/60 font-cinzel text-xs tracking-wider text-[#f4ead8] hover:border-[#d9a94e] hover:text-[#f7e3ab]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#passport"
              onClick={() => {
                festAudio.playGildedChime();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-[#d9a94e] bg-gradient-to-r from-[#d9a94e] to-[#f7e3ab] text-[#060407] font-cinzel text-xs font-bold tracking-widest"
            >
              <Sparkles className="w-4 h-4 text-[#060407]" />
              <span>CLAIM FESTIVAL PASSPORT</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
