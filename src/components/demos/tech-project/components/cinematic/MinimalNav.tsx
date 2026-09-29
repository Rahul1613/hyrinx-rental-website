'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProject } from '../../lib/projectStore';
import { Plane, Sliders, PlaySquare, ChevronRight } from 'lucide-react';

export default function MinimalNav() {
  const { currentProject } = useProject();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('takeoff');

  const navItems = [
    { id: 'takeoff', num: '00', label: 'Takeoff' },
    { id: 'idea', num: '01', label: 'Concept' },
    { id: 'design', num: '02', label: 'Design' },
    { id: 'build', num: '03', label: 'Build' },
    { id: 'system', num: '04', label: 'System' },
    { id: 'control', num: '05', label: 'Control' },
    { id: 'flight', num: '06', label: 'Flight' },
    { id: 'performance', num: '07', label: 'Performance' },
    { id: 'future', num: '08', label: 'Future' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-full px-4 select-none">
      <div className="bg-[#030712]/85 backdrop-blur-xl border border-cyan-500/30 rounded-full px-3 py-2 shadow-2xl shadow-cyan-950/80 flex items-center gap-2 sm:gap-4 font-mono text-[11px]">
        {/* Brand Link */}
        <a href="#takeoff" className="flex items-center gap-1.5 pl-2 pr-1 group">
          <Plane className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-white tracking-widest text-xs hidden sm:inline">
            PROJECT<span className="text-cyan-400">X</span>
          </span>
        </a>

        {/* Section Pill Links */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[50vw] sm:max-w-none scrollbar-none py-0.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-2 py-1 rounded-full whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="opacity-70 mr-1 hidden md:inline">{item.num}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Progress Bar & Actions */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
          {/* Circular/Pill Scroll Progress */}
          <div className="hidden lg:flex items-center gap-1 text-[10px] text-cyan-400 font-bold px-1.5">
            <span>{Math.round(scrollProgress)}%</span>
          </div>

          <Link
            href="/builder"
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200 border border-cyan-800/60 text-[10px] font-bold flex items-center gap-1 transition-colors"
            title="Open Live Project Builder"
          >
            <Sliders className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Builder</span>
          </Link>

          <Link
            href="/presentation"
            className="px-2.5 py-1 rounded-full bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1 transition-colors"
            title="Open Viva Defense Deck"
          >
            <PlaySquare className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Viva</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
