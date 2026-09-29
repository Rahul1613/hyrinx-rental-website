"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Layers,
  FileCode,
  Database,
  Rocket,
  Palette,
  Sparkles,
  Printer,
  FileText,
  Clapperboard,
  Video,
  Scissors,
  Share2,
  TrendingUp,
  AlertTriangle,
  Bot,
  MessageSquare,
  Cpu,
  UserCheck,
  CheckCircle2,
  Server,
  Smartphone,
  Shield,
  ShieldCheck,
  Lock,
  ShoppingBag,
  CreditCard,
  Truck,
  QrCode,
  Repeat,
  Star,
  Users,
  Settings,
  Terminal,
  Flag,
  Globe,
  Box,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { ServiceCategory } from "./servicesData";
import { soundFX } from "./soundFx";

interface VisualProps {
  category?: ServiceCategory;
  onExploreMore?: () => void;
  onActionClick?: (actionName: string) => void;
}

// 01. DIGITAL CONSTRUCTION (Website Development)
export function DigitalConstructionVisual({ category, onExploreMore }: VisualProps) {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    { title: "01. Structure", desc: "Semantic HTML5, routing & accessible viewport architecture", icon: Layers, tech: "Next.js 14 App Router" },
    { title: "02. UI & Motion", desc: "Tailwind v4 tokens, responsive layouts & GPU-accelerated motion", icon: Palette, tech: "Framer Motion" },
    { title: "03. Content & SEO", desc: "Conversion copywriting, Google JSON-LD schema & meta tags", icon: FileText, tech: "Rich Snippets" },
    { title: "04. Backend & API", desc: "PostgreSQL, webhooks, WhatsApp alerts & Razorpay checkout", icon: Database, tech: "Edge APIs" },
    { title: "05. Global Launch", desc: "Global edge CDN, automated SSL certificates & 99.9% uptime", icon: Rocket, tech: "Vercel / Cloudflare" },
  ];

  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-cyan-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-black uppercase tracking-wider text-cyan-300">
            Digital Construction Blueprint Engine
          </span>
        </div>
        <span className="text-xs font-mono text-slate-200">
          Core Web Vitals: <strong className="text-emerald-400 font-black">99 / 100</strong>
        </span>
      </div>

      {/* Assembly Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 my-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === activeStep;
          const isPassed = idx < activeStep;
          return (
            <button
              key={s.title}
              onClick={() => {
                soundFX.playUiSelect();
                setActiveStep(idx);
              }}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-cyan-600/30 border-cyan-400 text-white shadow-lg shadow-cyan-500/25"
                  : isPassed
                  ? "bg-slate-900 border-emerald-500/50 text-slate-200"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : isPassed ? "text-emerald-400" : "text-slate-400"}`} />
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div>
                <p className="text-xs font-black truncate text-white">{s.title}</p>
                <p className="text-[11px] font-mono text-cyan-300 mt-0.5">{s.tech}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Simulated Preview Window */}
      <div className="rounded-xl bg-[#030712] border border-slate-800 p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 text-slate-200 font-semibold">assembly-stage://{steps[activeStep].title.toLowerCase().replace(/[^a-z]/g, "")}</span>
          </div>
          <span className="text-cyan-400 font-bold">STATUS: ACTIVE COMPONENT</span>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{steps[activeStep].title}</span>
              <span className="text-xs font-mono text-cyan-400">[{steps[activeStep].tech}]</span>
            </h4>
            <span className="text-xs text-slate-200">{steps[activeStep].desc}</span>
          </div>

          {/* Construction Blueprint Graphics */}
          <div className="h-28 rounded-lg bg-slate-900 border border-cyan-500/30 p-3 flex items-center justify-center relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.4) 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />
            <div className="relative z-10 flex items-center gap-4 text-center">
              <div className="p-3 rounded-xl bg-cyan-600/30 border border-cyan-400/50">
                {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-cyan-300 animate-pulse" })}
              </div>
              <div className="text-left">
                <p className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">Hyrinx Construction Layer Active</p>
                <p className="text-xs text-white max-w-sm mt-0.5">{steps[activeStep].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 02. CREATIVE STUDIO (Branding & Design)
export function CreativeStudioVisual({ category }: VisualProps) {
  const [activeTab, setActiveTab] = useState<"sketch" | "vector" | "brandbook">("vector");

  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-purple-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
            Brand Metamorphosis Studio
          </span>
        </div>
        <div className="flex gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          {(["sketch", "vector", "brandbook"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundFX.playUiSelect();
                setActiveTab(tab);
              }}
              className={`px-3 py-1 rounded-md capitalize transition-colors ${
                activeTab === tab ? "bg-purple-600 text-white font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dynamic Canvas Area */}
        <div className="md:col-span-2 rounded-xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between min-h-[220px] relative overflow-hidden">
          {activeTab === "sketch" && (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">Stage 01 — Mindmapping & Geometry</span>
              <div className="p-4 rounded-lg border border-dashed border-purple-500/50 bg-purple-950/30 text-center">
                <p className="font-serif italic text-lg text-purple-200">"Golden Ratio Sacred Geometry &times; Modern Minimalism"</p>
                <p className="text-xs text-slate-200 mt-2">Iterative hand-drawn sketches testing silhouette balance and emotional resonance.</p>
              </div>
              <div className="flex items-center justify-center gap-3 text-xs font-mono text-purple-300">
                <span>&bull; 1.618 Proportion Curves</span>
                <span>&bull; Symmetrical Balance</span>
                <span>&bull; Silhouette Scalability</span>
              </div>
            </div>
          )}

          {activeTab === "vector" && (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">Stage 02 — Mathematical Vector Lockup</span>
              <div className="p-5 rounded-lg border border-purple-500/40 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 flex items-center justify-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/40 border border-white/20">
                  H
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">HYRINX ENTERPRISE</h3>
                  <p className="text-xs font-mono text-purple-300">CMYK: 68/0/94/0 &bull; PANTONE 2685 C</p>
                  <p className="text-xs text-slate-200 mt-1">Infinite resolution scalability from 16px favicon to 60ft outdoor billboard.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "brandbook" && (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">Stage 03 — 40+ Page Brand Bible</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="block text-[10px] font-mono text-slate-300">PRIMARY FONT</span>
                  <strong className="text-white">Plus Jakarta</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="block text-[10px] font-mono text-slate-300">ACCENT FONT</span>
                  <strong className="text-purple-300">Cinzel Serif</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="block text-[10px] font-mono text-slate-300">CLEAR SPACE</span>
                  <strong className="text-emerald-400">2.5X Height</strong>
                </div>
              </div>
              <p className="text-xs text-slate-200 text-center">Standardizing exact brand voice, photography filters, packaging blueprints, and forbidden logo orientations.</p>
            </div>
          )}
        </div>

        {/* Collateral Palette Showcase */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 flex flex-col justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-3 block font-bold">Real-World Collateral</span>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-white">Luxury Visiting Cards</span>
              <span className="text-xs font-mono text-purple-300 font-bold">450 GSM Velvet</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-white">Product Packaging</span>
              <span className="text-xs font-mono text-purple-300 font-bold">Die-Cut Vector</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-white">Storefront Signage</span>
              <span className="text-xs font-mono text-purple-300 font-bold">Acrylic 3D LED</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-white">Social Media Vault</span>
              <span className="text-xs font-mono text-purple-300 font-bold">Figma Templates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 04. CONTENT ENGINE (Video Shooting, Reels, 20K+ Target Strategy)
export function ContentEngineVisual({ category }: VisualProps) {
  const [selectedPhase, setSelectedPhase] = useState<number>(3);

  const phases = [
    { title: "Script & Hooks", desc: "Curiosity gap scripting, psychology hooks & shot list" },
    { title: "Cinema Filming", desc: "4K Sony cameras, wireless lavalier audio & studio lighting" },
    { title: "Dynamic Cut & SFX", desc: "Jump cuts, sound design, 3D typography & color grading" },
    { title: "20K+ View Strategy", desc: "Algorithm retention pacing, A/B thumbnails & search keywords" },
    { title: "Daily Publishing", desc: "Scheduled cross-posting on Instagram, YouTube Shorts & LinkedIn" },
  ];

  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
            Hyrinx Content Engine &bull; Media Production Suite
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-black border border-amber-500/50 shadow-sm">
            20K+ View Target Campaign Strategy
          </span>
        </div>
      </div>

      {/* Production Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 my-6">
        {phases.map((p, idx) => (
          <button
            key={p.title}
            onClick={() => {
              soundFX.playUiSelect();
              setSelectedPhase(idx);
            }}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedPhase === idx
                ? "bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/20"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <span className="text-xs font-mono text-amber-400 font-bold block mb-1">STAGE 0{idx + 1}</span>
            <p className="text-xs font-bold truncate text-white">{p.title}</p>
          </button>
        ))}
      </div>

      {/* Reel Player Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center rounded-xl bg-slate-900 border border-slate-800 p-5">
        <div className="relative aspect-[9/16] max-h-72 mx-auto rounded-xl overflow-hidden border-2 border-amber-400/60 bg-black flex flex-col justify-between p-3 shadow-xl">
          <div className="flex items-center justify-between text-xs text-white">
            <span className="font-mono bg-black/80 px-2 py-0.5 rounded font-bold">4K 60FPS</span>
            <span className="text-red-500 font-bold flex items-center gap-1">&bull; REC</span>
          </div>

          <div className="text-center my-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wide">
              {phases[selectedPhase].title}
            </span>
            <p className="text-xs text-slate-100 font-semibold px-2">
              &quot;{phases[selectedPhase].desc}&quot;
            </p>
          </div>

          <div className="space-y-1">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-3/4 animate-pulse" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-300 font-mono">
              <span>0:14</span>
              <span>0:30 (High Retention Cut)</span>
            </div>
          </div>
        </div>

        {/* Strategy Details */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h4 className="text-base font-bold text-white mb-1">
              {phases[selectedPhase].title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {phases[selectedPhase].desc}. Every reel is filmed with cinema-grade depth of field, balanced audio, and dynamic subtitle kinetic typography to keep viewers hooked past the 3-second drop-off mark.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-amber-300 font-bold block mb-0.5">MONTHLY VOLUME</span>
              <strong className="text-white text-sm">15 to 30 Reels / Mo</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-amber-300 font-bold block mb-0.5">EQUIPMENT STANDARD</span>
              <strong className="text-white text-sm">Cinema 4K + Studio Audio</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory Compliance Disclaimer */}
      <div className="mt-4 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 leading-relaxed flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Platform Algorithm Disclosure:</strong> Views and reach depend on platform algorithms, audience engagement, content quality, targeting, and market conditions. Hyrinx does not guarantee a specific number of views.
        </p>
      </div>
    </div>
  );
}

// 05. WHATSAPP BUSINESS INTELLIGENCE
export function WhatsAppIntelVisual({ category }: VisualProps) {
  const [activeStep, setActiveStep] = useState(0);

  const conversationSteps = [
    { sender: "customer", text: "Hi, do you have table availability for 4 guests this Saturday at 8 PM?" },
    { sender: "bot", text: "Namaste! Yes, we have 2 premium rooftop booths available for Saturday, 8:00 PM. Would you like me to reserve one?" },
    { sender: "customer", text: "Yes please, under Rahul Sisode." },
    { sender: "bot", text: "Table confirmed for Rahul Sisode (4 Guests) on Saturday at 8:00 PM! Booking ID: #HYR-8921. Sent confirmation to your WhatsApp & calendar invite." },
    { sender: "system", text: "CRM Alert: Customer added to weekend reservation list & table assigned in restaurant dashboard." }
  ];

  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-emerald-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
            Hyrinx WhatsApp Intelligence &bull; Live Simulation
          </span>
        </div>
        <span className="text-xs font-mono text-emerald-300 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
          META OFFICIAL API &bull; 24/7 ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-center">
        {/* WhatsApp Chat Device Simulation */}
        <div className="rounded-2xl bg-[#0b141a] border border-slate-700 p-4 shadow-xl space-y-3 font-sans max-w-sm mx-auto w-full">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                H
              </div>
              <div>
                <p className="font-bold">Hyrinx AI Agent</p>
                <p className="text-[10px] text-emerald-400 font-mono">Verified Business Bot</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold">99.9% Uptime</span>
          </div>

          <div className="space-y-2.5 min-h-[220px] flex flex-col justify-end">
            {conversationSteps.slice(0, activeStep + 1).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                  msg.sender === "customer"
                    ? "ml-auto bg-[#005c4b] text-white rounded-tr-none font-medium"
                    : msg.sender === "bot"
                    ? "mr-auto bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700 font-medium"
                    : "mx-auto bg-slate-900 border border-emerald-500/50 text-emerald-300 font-mono text-xs text-center w-full font-bold"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          <div className="pt-2 flex justify-between gap-2">
            <button
              onClick={() => {
                soundFX.playUiSelect();
                setActiveStep((prev) => (prev + 1) % conversationSteps.length);
              }}
              className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/30"
            >
              <span>Advance Bot Simulation Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Backend Automation Workflow */}
        <div className="space-y-3.5 text-xs">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold">What Happens In Background</span>
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Instant Natural Language Parsing</strong>
                <span className="text-slate-200">Zero rigid keyword menus. Customer types freely in English, Hindi, or Hinglish.</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
              <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Real-Time Knowledge & Calendar Check</strong>
                <span className="text-slate-200">Directly syncs with your reservation calendar, pricing rules, or product catalog.</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
              <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Automated CRM & Human Handoff</strong>
                <span className="text-slate-200">Logs lead into your spreadsheet and alerts your staff if human intervention is needed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 09. HYRINX MANAGEMENT ("You Run the Business. Hyrinx Manages the Digital Side.")
export function ManagementVisual({ category }: VisualProps) {
  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-cyan-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
            Hyrinx Management &bull; Central Digital Command
          </span>
        </div>
        <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-700">
          Executive Service Retainer
        </span>
      </div>

      <div className="my-6 space-y-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30 text-center">
          <h4 className="text-lg font-black text-white">
            &quot;You Run the Business. Hyrinx Manages the Digital Side.&quot;
          </h4>
          <p className="text-xs text-slate-200 max-w-lg mx-auto mt-1 leading-relaxed">
            Eliminate vendor fatigue. One central command team handles server uptime, domain renewals, marketing asset updates, security monitoring, and conversion enhancements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-mono text-cyan-300 font-bold block mb-1">24/7 MONITORING</span>
            <strong className="text-white block text-sm">99.9% Uptime Guarantee</strong>
            <p className="text-xs text-slate-300 mt-1">Automated health pings every 60 seconds.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-mono text-cyan-300 font-bold block mb-1">WEEKLY UPDATES</span>
            <strong className="text-white block text-sm">Fresh Assets &amp; Banners</strong>
            <p className="text-xs text-slate-300 mt-1">Keep menus, prices, and banners up to date.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-mono text-cyan-300 font-bold block mb-1">SPEED MAINTENANCE</span>
            <strong className="text-white block text-sm">Sub-Second Target</strong>
            <p className="text-xs text-slate-300 mt-1">Continuous CDN and cache optimization.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-mono text-cyan-300 font-bold block mb-1">ZERO LOCK-IN</span>
            <strong className="text-white block text-sm">Full Client Ownership</strong>
            <p className="text-xs text-slate-300 mt-1">You own 100% of your code, domains, and data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. CYBERSECURITY SHIELD
export function SecurityShieldVisual({ category }: VisualProps) {
  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-emerald-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
            Active Threat Mitigation Engine
          </span>
        </div>
        <span className="text-xs font-mono text-emerald-300 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
          ZERO-TRUST DEFENSE
        </span>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <Lock className="w-5 h-5 text-emerald-400 mb-2" />
          <strong className="text-white block text-sm">Server Hardening</strong>
          <p className="text-xs text-slate-200">Port lockdown, SSH key-only auth, and root login disabling on Linux cloud instances.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <Shield className="w-5 h-5 text-emerald-400 mb-2" />
          <strong className="text-white block text-sm">Web Application Firewall</strong>
          <p className="text-xs text-slate-200">Edge filtering against OWASP Top 10 vulnerabilities, SQL injection, and DDoS volumetric attacks.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
          <strong className="text-white block text-sm">Vulnerability Auditing</strong>
          <p className="text-xs text-slate-200">Comprehensive dependency vulnerability audits and SSL/TLS cryptographic hardening.</p>
        </div>
      </div>
    </div>
  );
}

// 11. CYBER DEFENSIVE LAB
export function CyberLabVisual({ category }: VisualProps) {
  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-sky-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-300">
            Hyrinx Cyber Lab &bull; Defensive Sandbox Environment
          </span>
        </div>
        <span className="text-xs font-mono text-sky-300 font-bold bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-700">
          AUTHORIZED VIRTUAL LABS ONLY
        </span>
      </div>

      {/* Terminal Simulator */}
      <div className="rounded-xl bg-[#030712] border border-slate-800 p-4 font-mono text-xs my-6 text-slate-200 space-y-2 shadow-inner">
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-900">
          <span>sandbox@hyrinx-cyberlab:~/ctf-training$</span>
          <span className="text-sky-400 font-bold">LINUX DEBIAN 12 &bull; ISOLATED VM</span>
        </div>
        <p className="text-emerald-400 font-bold">$ nmap -sC -sV --script vuln 10.10.14.22</p>
        <p className="text-slate-300">[+] Scanning target 10.10.14.22 (Authorized Lab Target)...</p>
        <p className="text-slate-300">[+] Port 80/tcp open: Apache 2.4.41 (Ubuntu)</p>
        <p className="text-amber-300 font-bold">[!] Vulnerability Identified: Unsanitized SQL query on parameter &apos;search&apos;</p>
        <p className="text-sky-300">[+] Lab Remediation Challenge: Implement parameterized PDO query with prepared statements</p>
        <p className="text-emerald-300 font-bold">[✓] FLAG CAPTURED: HYR&#123;s3cur3_c0d1ng_d3f3nd3r_2026&#125;</p>
      </div>

      <div className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-500/40 text-xs text-sky-200 leading-relaxed">
        <strong>Authorized Education Policy:</strong> All training takes place exclusively in isolated legal sandbox networks, CTF practice ranges, and defensive security frameworks. We do not provide or teach illegal penetration or unauthorized malicious activities.
      </div>
    </div>
  );
}

// 13. HYRINX ORIGINALS (Packaged Products)
export function OriginalsGridVisual({ category }: VisualProps) {
  const products = [
    { name: "Digital Business-in-a-Box", desc: "Turnkey website + WhatsApp bot + brand pack + Google Maps in 72h." },
    { name: "Business Digital Twin", desc: "Centralized live dashboard mirroring your physical store: sales, staff & stock." },
    { name: "Missed Customer Recovery", desc: "Automated AI callback and WhatsApp recovery for unanswered phone calls." },
    { name: "QR Smart System", desc: "Contactless table menus, digital ordering & automated Google review boosters." },
    { name: "Digital Warranty Vault", desc: "Paperless digital warranty cards linked to customer phone numbers." },
    { name: "Digital Queue & Token", desc: "Live mobile queue displays for salons, clinics and busy counters." },
    { name: "AI Business Audit", desc: "Deep digital footprint diagnostic finding high-ROI automation opportunities." },
    { name: "Website-as-a-Service", desc: "Enterprise website + hosting + unlimited updates on simple recurring plan." },
    { name: "Digital Continuity System", desc: "Encrypted centralized backup of all passwords, domains and company IP." }
  ];

  return (
    <div className="rounded-2xl bg-slate-950 border-2 border-rose-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
            Hyrinx Originals &bull; Proprietary Packaged Inventions
          </span>
        </div>
        <span className="text-xs font-mono text-rose-300 font-bold bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-800">
          9 Battle-Tested Systems
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 my-6">
        {products.map((p) => (
          <div
            key={p.name}
            onMouseEnter={() => soundFX.playUiHover()}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/60 transition-colors shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <strong className="text-sm font-bold text-white truncate">{p.name}</strong>
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Master Router for Visuals
export default function CategoryVisualRouter({ category, onExploreMore, onActionClick }: VisualProps) {
  if (!category) return null;
  switch (category.interactiveConcept) {
    case "construction":
      return <DigitalConstructionVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    case "creative":
      return <CreativeStudioVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    case "content-engine":
      return <ContentEngineVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    case "whatsapp-intel":
      return <WhatsAppIntelVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    case "management-hub":
      return <ManagementVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    case "security-shield":
      return <SecurityShieldVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    case "cyber-lab":
      return <CyberLabVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    case "originals-grid":
      return <OriginalsGridVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
    default:
      return <DigitalConstructionVisual category={category} onExploreMore={onExploreMore} onActionClick={onActionClick} />;
  }
}
