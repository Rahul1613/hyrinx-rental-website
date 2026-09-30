'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProject } from '@/lib/projectStore';
import {
  Plane,
  Cpu,
  Layers,
  Activity,
  Compass,
  Sliders,
  PlaySquare,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Download,
  Share2,
  ExternalLink,
  Zap,
} from 'lucide-react';

export default function AppNav() {
  const { currentProject, savedProjects, loadPreset, switchProject } = useProject();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '/#overview' },
    { label: 'Airframe & Material', href: '/#material' },
    { label: 'Exploded Hardware', href: '/#hardware' },
    { label: 'Signal Flow', href: '/#architecture' },
    { label: 'Modular Sensors', href: '/#sensors' },
    { label: 'Performance Lab', href: '/#performance' },
    { label: 'Build Stages', href: '/#timeline' },
  ];

  return (
    <>
      {/* Top Aerospace Telemetry Ticker */}
      <div className="bg-[#030508] border-b border-cyan-900/30 text-[10px] font-mono py-1 px-4 text-slate-400 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold tracking-wider">HUD_SYS_V4.2 // TELEMETRY LINK ESTABLISHED</span>
          </div>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">SYS_ID: <span className="text-amber-400 font-bold">{currentProject.id.toUpperCase()}</span></span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:inline text-slate-400">BRANCH: <span className="text-cyan-300 font-semibold">{currentProject.branch}</span></span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED RIGOR
            </span>
            <span>•</span>
            <span className="text-slate-400">MATERIAL: <span className="text-slate-200">{currentProject.material}</span></span>
          </div>
          <div className="text-cyan-400/80 font-mono">
            PORT_ADDR: 3005 // LOC_SYS
          </div>
        </div>
      </div>

      {/* Main Mission Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#05070b]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/40'
            : 'bg-[#05070b]/75 backdrop-blur-sm border-b border-cyan-900/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Project Title */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
                <div className="w-full h-full bg-[#070b12] rounded-[7px] flex items-center justify-center">
                  <Plane className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-base font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                    PROJECT<span className="text-cyan-400 font-black">X</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-700/50 rounded font-semibold">
                    AERO_EXP
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px] sm:max-w-[240px]">
                  {currentProject.modelName}
                </span>
              </div>
            </Link>

            {/* Project Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0b1320] border border-cyan-800/40 text-[11px] font-mono text-cyan-300 hover:border-cyan-400 hover:text-white transition-colors"
                title="Switch Engineering Demo"
              >
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>Switch Project</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-80 bg-[#070e1a] border border-cyan-500/30 rounded-lg shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-cyan-950 mb-1 flex justify-between">
                    <span>Available Presets</span>
                    <span className="text-cyan-400">ENGINEERING SUITE</span>
                  </div>
                  {savedProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        switchProject(p.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded text-xs flex flex-col gap-0.5 transition-colors ${
                        currentProject.id === p.id
                          ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-200'
                          : 'hover:bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="truncate">{p.modelName}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                          {p.branch}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono truncate">{p.title}</span>
                    </button>
                  ))}
                  <div className="pt-2 border-t border-cyan-950 mt-1 flex justify-between px-1">
                    <Link
                      href="/explore"
                      onClick={() => setDropdownOpen(false)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                    >
                      Explore All Disciplines →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 rounded transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/explore"
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-[#0e1726] border border-slate-700/50 hover:border-cyan-500/40 rounded transition-all"
            >
              All Branches
            </Link>

            <Link
              href="/presentation"
              className="px-3 py-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 bg-amber-950/20 border border-amber-500/30 hover:border-amber-400/60 rounded flex items-center gap-1.5 transition-all shadow-sm"
              title="Fullscreen Slide Deck for Faculty / Jury"
            >
              <PlaySquare className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Viva Deck</span>
            </Link>

            <Link
              href="/builder"
              className="px-3.5 py-1.5 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
            >
              <Sliders className="w-3.5 h-3.5 text-black" />
              <span>Project Builder</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-cyan-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070c16] border-b border-cyan-900/40 px-4 pt-3 pb-6 space-y-3 font-mono">
            <div className="flex flex-col gap-1 pb-3 border-b border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Active Project:</span>
              <span className="text-sm text-cyan-300 font-bold">{currentProject.modelName}</span>
              <span className="text-xs text-slate-400">{currentProject.title}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs text-slate-300 hover:text-cyan-300 bg-slate-900/60 rounded border border-slate-800/80"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/builder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-bold text-black bg-cyan-400 rounded flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4" />
                Launch Live Builder
              </Link>
              <Link
                href="/presentation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-500/40 rounded flex items-center justify-center gap-2"
              >
                <PlaySquare className="w-4 h-4" />
                Viva Defense Mode
              </Link>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded"
              >
                Explore Other Engineering Branches
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
