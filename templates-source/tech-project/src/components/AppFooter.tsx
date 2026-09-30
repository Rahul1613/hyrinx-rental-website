'use client';

import React from 'react';
import Link from 'next/link';
import { useProject } from '@/lib/projectStore';
import { Plane, ShieldAlert, Cpu, Terminal, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function AppFooter() {
  const { currentProject } = useProject();

  return (
    <footer className="bg-[#03060a] border-t border-cyan-900/30 text-slate-400 font-mono text-xs pt-12 pb-8 relative z-20 overflow-hidden">
      {/* Laser grid top line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand & Mission Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Plane className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold text-white tracking-widest">
                PROJECT<span className="text-cyan-400">X</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              The premier interactive engineering project showcase platform. Transforming senior capstone, laboratory, and research engineering projects into cinema-grade digital technical dossiers.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-mono">SPEC_V4 // ACADEMIC STANDARDS ALIGNED</span>
            </div>
          </div>

          {/* Active Airframe / Project Dossier */}
          <div className="space-y-3">
            <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Current System Specs
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">PROJECT:</span>
                <span className="text-cyan-200 font-semibold">{currentProject.modelName}</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">DISCIPLINE:</span>
                <span className="text-slate-300">{currentProject.branch}</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">MATERIAL:</span>
                <span className="text-slate-300">{currentProject.material}</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">TEAM LEAD:</span>
                <span className="text-slate-300">{currentProject.team[0]?.name || 'Rahul Sisode'}</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span className="text-slate-500">FACULTY GUIDE:</span>
                <span className="text-slate-300">{currentProject.guideName}</span>
              </li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Engineering Suite
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>→</span> Interactive Project Dossier
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-cyan-400 font-semibold">
                  <span>→</span> Live Project Builder & Editor
                </Link>
              </li>
              <li>
                <Link href="/presentation" className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-amber-400">
                  <span>→</span> Viva / Jury Defense Deck
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>→</span> Multi-Branch Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Scientific Rigor & Data Integrity */}
          <div className="space-y-3">
            <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Rigor Protocol
            </div>
            <div className="p-3 rounded bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-200/80 leading-relaxed font-sans">
              <strong>Zero Data Fabrication:</strong> Experimental flight benchmarks (speed, thrust, endurance, glide ratio) require physical validation and are displayed as <code className="bg-amber-900/40 text-amber-300 px-1 py-0.5 rounded font-mono">[Add Data]</code> until field log entry.
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Designed for final year B.Tech, M.Tech & Aerospace engineering evaluation.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <span>© 2026 PROJECTX Engineering Suite.</span>
            <span>•</span>
            <span className="text-slate-400">RC Aircraft Remote Control Research Group</span>
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span className="text-cyan-400">STANDALONE FRONTEND SYSTEM</span>
            <span>•</span>
            <span>NEXT.JS // TAILWIND CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
