"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Megaphone,
  Bot,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";
import { soundFX } from "./soundFx";

interface PillarData {
  step: string;
  name: string;
  codename: string;
  tagline: string;
  desc: string;
  metrics: string;
  icon: typeof Code;
  color: string;
  border: string;
  glow: string;
}

const PILLARS: PillarData[] = [
  {
    step: "01",
    name: "BUILD",
    codename: "HYPER-INFRASTRUCTURE",
    tagline: "Sub-Second Digital Real Estate",
    desc: "Next.js 14 App Router, modern Tailwind v4 design tokens, global edge caching, and conversion-optimized architectures.",
    metrics: "99/100 CWV // <1.0s LOAD",
    icon: Code,
    color: "text-blue-400",
    border: "border-blue-500/40",
    glow: "rgba(59, 130, 246, 0.4)"
  },
  {
    step: "02",
    name: "MARKET",
    codename: "PERFORMANCE ACQUISITION",
    tagline: "Algorithmic Precision Funnels",
    desc: "Organic search domination, localized Google Maps optimization, viral video engines, and hyper-targeted conversion funnels.",
    metrics: "HIGH RETENTION // SEARCH SEO",
    icon: Megaphone,
    color: "text-pink-400",
    border: "border-pink-500/40",
    glow: "rgba(236, 72, 153, 0.4)"
  },
  {
    step: "03",
    name: "AUTOMATE",
    codename: "NEURAL OPERATIONS",
    tagline: "WhatsApp AI & Self-Driving Workflows",
    desc: "24/7 intelligent conversational booking bots, automated CRM leads sync, instant digital catalogs, and zero-effort customer routing.",
    metrics: "24/7 LIVE // META OFFICIAL API",
    icon: Bot,
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    glow: "rgba(16, 185, 129, 0.4)"
  },
  {
    step: "04",
    name: "PROTECT",
    codename: "ZERO-TRUST DEFENSE",
    tagline: "Hardened Security & Threat Audits",
    desc: "Defensive vulnerability audits, Cloudflare edge WAF rules, Linux server port lockdown, and proactive breach prevention.",
    metrics: "ZERO-TRUST // OWASP TOP 10",
    icon: ShieldCheck,
    color: "text-purple-400",
    border: "border-purple-500/40",
    glow: "rgba(168, 85, 247, 0.4)"
  },
  {
    step: "05",
    name: "MANAGE",
    codename: "EXECUTIVE COMMAND",
    tagline: "Turnkey Continuous Hands-Off Ops",
    desc: "You run the business. Hyrinx manages the digital side. Weekly design updates, speed maintenance, uptime monitoring, and zero lock-in.",
    metrics: "99.9% UPTIME // 100% OWNERSHIP",
    icon: Zap,
    color: "text-cyan-400",
    border: "border-cyan-500/40",
    glow: "rgba(6, 182, 212, 0.4)"
  }
];

export default function CinematicEnergyPillars() {
  const [activePillar, setActivePillar] = useState<number>(0);

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-10 select-none">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold tracking-wider shadow-lg shadow-cyan-950/50">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>THE UNIFIED METHODOLOGY &bull; 5 QUANTUM CORES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          The 5 Pillars of Digital Supremacy
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Traditional businesses lose money coordinating between 5 separate disconnected vendors. Hyrinx unites your code, marketing, automation, security, and management into one synchronized reactor.
        </p>
      </div>

      {/* Horizontal Energy Conduit Line */}
      <div className="relative hidden lg:block w-full h-1 bg-slate-900 overflow-hidden rounded-full">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
        />
      </div>

      {/* 5 Monolithic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {PILLARS.map((p, idx) => {
          const Icon = p.icon;
          const isSelected = activePillar === idx;
          return (
            <motion.div
              key={p.step}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onMouseEnter={() => soundFX.playUiHover()}
              onClick={() => {
                soundFX.playUiSelect();
                setActivePillar(idx);
              }}
              className={`cursor-pointer p-6 rounded-2xl bg-gradient-to-b from-[#030612] via-[#020409] to-black border-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? `${p.border} shadow-[0_0_40px_${p.glow}] scale-[1.02]`
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Pillar Corner Accents */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-white/20" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-white/20" />

              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-slate-400 font-black">
                    CORE // {p.step}
                  </span>
                  <div className="p-2 rounded-xl bg-black/60 border border-white/10">
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                </div>

                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold block mb-1">
                  {p.codename}
                </span>

                <h3 className="text-xl font-black text-white tracking-wide mb-2">
                  {p.name}
                </h3>

                <p className="text-xs text-slate-200 leading-relaxed font-normal mb-4">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-emerald-400 font-bold bg-black/60 p-2 rounded-lg border border-white/10 text-center">
                  {p.metrics}
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SYNCHRONIZED</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
