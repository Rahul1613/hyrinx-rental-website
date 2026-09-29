"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Palette,
  Megaphone,
  Clapperboard,
  Bot,
  Cpu,
  ShoppingBag,
  QrCode,
  ShieldCheck,
  ShieldAlert,
  Terminal,
  Sparkles,
  Box,
  ArrowRight,
  Zap,
  Activity,
  Search,
  ExternalLink,
  Layers,
  Radio,
  CheckCircle2
} from "lucide-react";
import { HYRINX_SERVICE_CATEGORIES, ServiceCategory } from "./servicesData";
import { soundFX } from "./soundFx";

interface CommandMatrixNavProps {
  activeCategory: ServiceCategory | null;
  onSelectCategory: (category: ServiceCategory) => void;
  onQuickInquiry: (serviceTitle: string) => void;
}

export default function CommandMatrixNav({
  activeCategory,
  onSelectCategory,
  onQuickInquiry
}: CommandMatrixNavProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  const tags = [
    "ALL",
    "BUILD",
    "DESIGN",
    "MARKET",
    "CREATE",
    "AUTOMATE",
    "SOFTWARE",
    "COMMERCE",
    "DIGITALIZE",
    "MANAGE",
    "PROTECT",
    "LEARN",
    "FUTURE LAB",
    "ORIGINALS"
  ];

  const filteredCategories = HYRINX_SERVICE_CATEGORIES.filter((cat) => {
    const matchesTag = selectedTag === "ALL" || cat.tag === selectedTag;
    const matchesSearch =
      cat.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      cat.shortDesc.toLowerCase().includes(filterQuery.toLowerCase()) ||
      cat.tag.toLowerCase().includes(filterQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code": return Code;
      case "Palette": return Palette;
      case "Megaphone": return Megaphone;
      case "Clapperboard": return Clapperboard;
      case "Bot": return Bot;
      case "Cpu": return Cpu;
      case "ShoppingBag": return ShoppingBag;
      case "QrCode": return QrCode;
      case "ShieldCheck": return ShieldCheck;
      case "ShieldAlert": return ShieldAlert;
      case "Terminal": return Terminal;
      case "Sparkles": return Sparkles;
      case "Box": return Box;
      default: return Layers;
    }
  };

  return (
    <section id="command-matrix" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      {/* Central Matrix Command Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 font-mono text-xs tracking-wider shadow-lg shadow-cyan-950/50">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>HYRINX DIGITAL COMMAND MATRIX &bull; 13 OPERATIONAL DIVISIONS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Enter The Hyrinx Universe
        </h2>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Select any division below to inspect real-time architecture, interactive workflow engines, proven commercial outcomes, and turnkey deliverables.
        </p>

        {/* Live HUD telemetry bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-500 pt-2">
          <span className="flex items-center gap-1.5 text-emerald-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            CORE ACTIVE // 13/13 ONLINE
          </span>
          <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 text-cyan-400">
            LATENCY: 12MS
          </span>
          <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 text-purple-400">
            SEC: ZERO-TRUST
          </span>
        </div>
      </div>

      {/* Filter & Search Bar with HUD Styling */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
        {/* Horizontal Scrollable Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 no-scrollbar text-xs font-mono">
          {tags.map((tag) => (
            <button
              key={tag}
              onMouseEnter={() => soundFX.playUiHover()}
              onClick={() => {
                soundFX.playUiSelect();
                setSelectedTag(tag);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 ${
                selectedTag === tag
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25 border border-cyan-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-cyan-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search division / capability..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid of 13 Divisions with High-Tech Holographic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredCategories.map((cat) => {
          const Icon = getCategoryIcon(cat.iconName);
          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onMouseEnter={() => soundFX.playUiHover()}
              onClick={() => {
                soundFX.playUiSelect();
                onSelectCategory(cat);
              }}
              className="group cursor-pointer rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black border border-slate-800 hover:border-cyan-500/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_35px_rgba(6,182,212,0.15)] relative overflow-hidden"
            >
              {/* Sci-Fi HUD Corner Brackets */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-cyan-500/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-cyan-500/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-cyan-500/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-cyan-500/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />

              {/* Ambient color bloom */}
              <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${cat.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-80 transition-opacity pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-colors shadow-inner">
                      <Icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        {cat.tag}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors font-bold">
                    DIVISION // #{cat.number}
                  </span>
                </div>

                {cat.badge && (
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-semibold">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>{cat.badge}</span>
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors tracking-tight">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-5">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-cyan-400 group-hover:underline flex items-center gap-1 font-semibold">
                  Inspect Specification
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playUiSelect();
                    onQuickInquiry(cat.title);
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-cyan-500 hover:text-black border border-slate-800 text-slate-300 font-medium text-[11px] transition-all"
                >
                  Deploy
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
