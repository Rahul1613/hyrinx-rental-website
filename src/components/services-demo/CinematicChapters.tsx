"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
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
  ChevronRight,
  Layers,
  Database,
  Rocket,
  Lock,
  MessageSquare,
  Play,
  CheckCircle2,
  ExternalLink,
  Radio,
  FileText,
  Video,
  Send,
  Truck,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { HYRINX_SERVICE_CATEGORIES, ServiceCategory } from "./servicesData";
import { soundFX } from "./soundFx";

interface CinematicChaptersProps {
  onOpenDossier: (category: ServiceCategory) => void;
  onDeploy: (serviceTitle: string) => void;
}

export default function CinematicChapters({
  onOpenDossier,
  onDeploy
}: CinematicChaptersProps) {
  // CHAPTER 01: THE ARCHITECT (Step state)
  const [architectStage, setArchitectStage] = useState(2);
  // CHAPTER 02: THE IDENTITY (Medium state)
  const [identityMedium, setIdentityMedium] = useState<"card" | "packaging" | "billboard">("packaging");
  // CHAPTER 04: THE PRODUCTION (Stage state)
  const [prodStage, setProdStage] = useState(2);
  // CHAPTER 05: THE INTELLIGENCE (Workflow step)
  const [intelStep, setIntelStep] = useState(0);
  // CHAPTER 07: THE JOURNEY (Product stage)
  const [journeyStep, setJourneyStep] = useState(2);
  // CHAPTER 08: THE TRANSFORMATION (Offline vs Connected toggle)
  const [transState, setTransState] = useState<"offline" | "connected">("connected");
  // CHAPTER 13: THE UNKNOWN (Originals revealed count)
  const [revealedCount, setRevealedCount] = useState(3);

  const getCategoryByTag = (tag: string) =>
    HYRINX_SERVICE_CATEGORIES.find((c) => c.tag === tag) || HYRINX_SERVICE_CATEGORIES[0];

  return (
    <div className="w-full space-y-32 py-16">
      {/* ============================================================== */}
      {/* CHAPTER 01: BUILD // MOVIE: THE ARCHITECT */}
      {/* ============================================================== */}
      <section id="chapter-01" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {/* Chapter Meta & Typography */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>CHAPTER 01 &bull; THE ARCHITECT</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                BUILD
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                WEB &bull; APPS &bull; DIGITAL REAL ESTATE
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                data-cursor="BLUEPRINT"
                onClick={() => onOpenDossier(getCategoryByTag("BUILD"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-cyan-400 transition"
              >
                Inspect Architecture
              </button>
              <button
                data-cursor="DEPLOY"
                onClick={() => onDeploy("Website Development")}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Build
              </button>
            </div>
          </div>

          {/* Visual Concept: The Digital City Being Constructed */}
          <div className="rounded-3xl bg-slate-950 border-2 border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Watching A Digital City Rise From Nothing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                No templates. Every platform begins with an empty canvas, forming mathematical grid lines, structural wireframes, fluid component layers, edge data pipelines, and sub-second global deployment.
              </p>
            </div>

            {/* Construction Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {[
                { label: "01. Blueprint", detail: "Semantic Grid" },
                { label: "02. Structure", detail: "Component Tree" },
                { label: "03. Interface", detail: "GPU Motion" },
                { label: "04. System", detail: "PostgreSQL & Edge" },
                { label: "05. Launch", detail: "Global CDN" }
              ].map((step, idx) => (
                <button
                  key={step.label}
                  onClick={() => setArchitectStage(idx)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    architectStage === idx
                      ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block">{step.label}</span>
                  <strong className="text-xs text-white block mt-0.5">{step.detail}</strong>
                </button>
              ))}
            </div>

            {/* The Constructed Digital Matrix Canvas */}
            <div className="h-64 sm:h-80 rounded-2xl bg-[#030612] border border-cyan-500/30 p-6 flex flex-col justify-between relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.3) 0%, transparent 70%), linear-gradient(to right, rgba(6,182,212,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.2) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 32px 32px, 32px 32px'
                }}
              />

              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-cyan-300">
                <span>STAGE // {architectStage + 1} OF 05</span>
                <span className="text-emerald-400 font-bold">LATENCY &lt; 0.8s &bull; SEO 100/100</span>
              </div>

              <div className="relative z-10 text-center my-auto space-y-3">
                <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold shadow-md">
                  {architectStage === 0 && "PHASE 01: Wireframe Grid Geometry Established"}
                  {architectStage === 1 && "PHASE 02: Responsive Architecture & Component Tree Assembled"}
                  {architectStage === 2 && "PHASE 03: Tailwind Tokens & 60 FPS Micro-Interactions Armed"}
                  {architectStage === 3 && "PHASE 04: Edge Database & Webhook Routing Connected"}
                  {architectStage === 4 && "PHASE 05: Global Edge CDN Synchronized & Live Online"}
                </span>
                <p className="text-sm text-slate-200 max-w-md mx-auto">
                  Architected with Next.js 14 App Router, TypeScript, and modern headless infrastructure.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>HYRINX DIGITAL INFRASTRUCTURE</span>
                <span>PRODUCTION READY</span>
              </div>
            </div>
          </div>

          {/* Visual Bridge: Website zooms into logo mark */}
          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; THE INTERFACE ZOOMS INTO THE LOGO MARK</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 02: IDENTITY // MOVIE: THE IDENTITY */}
      {/* ============================================================== */}
      <section id="chapter-02" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-purple-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>CHAPTER 02 &bull; THE IDENTITY</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                IDENTITY
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                NOTHING &rarr; IDEA &rarr; IDENTITY &rarr; BRAND
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("DESIGN"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-purple-400 transition"
              >
                Inspect Identity
              </button>
              <button
                onClick={() => onDeploy("Branding & Design Studio")}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Identity
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-purple-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                From A Single Mark to A Living Brand Universe
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                An empty canvas gives birth to a single geometric mark. It transforms across typography, physical print, luxury packaging, and monumental billboards.
              </p>
            </div>

            {/* Medium Selector */}
            <div className="flex gap-2 mb-6">
              {[
                { id: "card", label: "Business Card (450 GSM)" },
                { id: "packaging", label: "Luxury Packaging" },
                { id: "billboard", label: "60FT City Billboard" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setIdentityMedium(m.id as typeof identityMedium)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
                    identityMedium === m.id
                      ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30"
                      : "bg-slate-900 text-slate-400 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* The Identity Living Canvas */}
            <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-tr from-purple-950/40 via-slate-950 to-black border border-purple-500/30 p-6 flex flex-col justify-between items-center text-center">
              <div className="w-full flex justify-between text-xs font-mono text-purple-300">
                <span>SACRED PROPORTION // 1.618</span>
                <span>PANTONE SYSTEM CALIBRATED</span>
              </div>

              <div className="my-auto space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl font-black shadow-[0_0_50px_rgba(168,85,247,0.4)] border border-white/20">
                  H
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white tracking-widest uppercase">
                    HYRINX CORP &bull; {identityMedium.toUpperCase()}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1 font-mono">
                    {identityMedium === "card" && "Velvet touch tactile card with raised holographic foil stamp."}
                    {identityMedium === "packaging" && "Custom die-cut luxury unboxing experience calibrated for shelf appeal."}
                    {identityMedium === "billboard" && "Vector geometry rendered at infinite resolution across 4K LED billboard displays."}
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                DESIGN SYSTEM &bull; FIGMA &bull; VECTOR TOKENS
              </div>
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; THE POSTER MULTIPLIES INTO SOCIAL SIGNALS</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 03: ATTENTION // MOVIE: THE ATTENTION */}
      {/* ============================================================== */}
      <section id="chapter-03" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-pink-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span>CHAPTER 03 &bull; THE ATTENTION</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                ATTENTION
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                MESSAGE &rarr; DISTRIBUTION &rarr; ATTENTION &rarr; AUDIENCE &rarr; GROWTH
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("MARKET"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-pink-400 transition"
              >
                Inspect Funnels
              </button>
              <button
                onClick={() => onDeploy("Social Media & Performance Marketing")}
                className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Growth
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-pink-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                A Dark City Lit By Traveling Digital Signals
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                One post publishes. Signals travel through the network. Audience nodes awaken. Targeted search funnels align. The campaign expands with algorithmic precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-pink-400 font-bold block">SIGNAL 01: ORGANIC SEARCH</span>
                <strong className="text-white text-sm block">Google Search & Maps Dominance</strong>
                <p className="text-xs text-slate-300">Targeting buyers at the exact second they search for your service locally.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-pink-400 font-bold block">SIGNAL 02: SOCIAL AMPLITUDE</span>
                <strong className="text-white text-sm block">Algorithm-Optimized Distribution</strong>
                <p className="text-xs text-slate-300">Hooks designed for audience retention, shares, and high comment velocity.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-pink-400 font-bold block">SIGNAL 03: CONVERSION RETARGETING</span>
                <strong className="text-white text-sm block">Closed-Loop Acquisition</strong>
                <p className="text-xs text-slate-300">Turning profile visits directly into verified WhatsApp inquiries.</p>
              </div>
            </div>

            {/* Performance Target Disclaimer Notice */}
            <div className="mt-6 p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/30 text-xs text-pink-200 leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <p>
                <strong>Campaign Objective Policy:</strong> Reach metrics and audience growth represent strategic campaign performance targets and optimization objectives. They depend on platform algorithms, creative quality, and market conditions; Hyrinx does not falsely guarantee static view numbers.
              </p>
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; THE CAMERA TRAVELS THROUGH THE CAMERA LENS</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 04: CREATE // MOVIE: THE PRODUCTION */}
      {/* ============================================================== */}
      <section id="chapter-04" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>CHAPTER 04 &bull; THE PRODUCTION</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                CREATE
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                CAMERA &rarr; LIGHTING &rarr; 4K TIMELINE &rarr; SOUND &rarr; PUBLISHING
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("CREATE"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-amber-400 transition"
              >
                Inspect Studio
              </button>
              <button
                onClick={() => onDeploy("Hyrinx Content Engine")}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Engine
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-amber-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Inside The Professional Video Studio
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                4K Sony cinema cameras, wireless lavalier audio, and studio lighting pass through dynamic jump-cuts, kinetic motion typography, and sound design.
              </p>
            </div>

            {/* Studio Timeline Visual */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {[
                { title: "01. Lens & Hook", sub: "Curiosity Scripts" },
                { title: "02. 4K Filming", sub: "Studio Lighting" },
                { title: "03. Jump Cut", sub: "High Retention" },
                { title: "04. SFX & Grade", sub: "Dynamic Audio" },
                { title: "05. 20K+ Target", sub: "Campaign Strategy" }
              ].map((s, idx) => (
                <button
                  key={s.title}
                  onClick={() => setProdStage(idx)}
                  className={`p-3.5 rounded-xl text-left border transition ${
                    prodStage === idx
                      ? "bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/20"
                      : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono text-amber-400 block font-bold">{s.title}</span>
                  <strong className="text-xs text-white block mt-0.5">{s.sub}</strong>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
              <strong>Algorithm Disclosure:</strong> 20K+ view goals are campaign optimization targets. Reach depends on platform algorithms and viewer interaction; Hyrinx does not guarantee static view numbers.
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; THE EDITING TIMELINE TURNS INTO STREAMS OF DATA</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 05: INTELLIGENCE // MOVIE: THE CONVERSATION */}
      {/* ============================================================== */}
      <section id="chapter-05" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>CHAPTER 05 &bull; THE CONVERSATION</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                INTELLIGENCE
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                INPUT &rarr; INTELLIGENCE &rarr; DECISION &rarr; AUTOMATION &rarr; OUTCOME
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("AUTOMATE"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-emerald-400 transition"
              >
                Inspect Bot Engine
              </button>
              <button
                onClick={() => onDeploy("AI & WhatsApp Intelligence")}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Bot
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-emerald-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                The Floating Conversation Interface
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                A customer sends a single WhatsApp message. Natural language parsing activates. Inventory checks complete. Orders process. CRM updates in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Interactive Simulation */}
              <div className="p-5 rounded-2xl bg-[#0b141a] border border-slate-700 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-white">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Hyrinx AI Agent
                  </span>
                  <span className="font-mono text-emerald-400">Meta Official API</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#005c4b] text-white ml-auto max-w-[85%]">
                    &quot;Can I book an appointment for tomorrow 4 PM?&quot;
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#202c33] text-slate-100 mr-auto max-w-[85%] border border-slate-700">
                    &quot;Confirmed for 4:00 PM tomorrow! Booking #HYR-4921 logged to calendar.&quot;
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono text-center">
                    CRM Pipeline Updated &bull; Google Calendar Event Created
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-white text-xs font-bold block">Zero Rigid Menus</strong>
                  <p className="text-xs text-slate-300">Understands conversational English, Hindi, and Hinglish naturally.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-white text-xs font-bold block">Live Database Handshake</strong>
                  <p className="text-xs text-slate-300">Instantly queries product stock, table bookings, or doctor schedules.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-white text-xs font-bold block">Automated Staff Handoff</strong>
                  <p className="text-xs text-slate-300">Notifies store managers instantly if high-ticket customer needs human care.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; THE AI WORKFLOW BECOMES SOFTWARE ARCHITECTURE</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 06: SYSTEMS // MOVIE: THE MACHINE */}
      {/* ============================================================== */}
      <section id="chapter-06" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>CHAPTER 06 &bull; THE MACHINE</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                SYSTEMS
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                ARCHITECTURE &rarr; ENGINEERING &rarr; INTEGRATION &rarr; PRODUCT
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("SOFTWARE"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-indigo-400 transition"
              >
                Inspect Machine
              </button>
              <button
                onClick={() => onDeploy("Software & App Engineering")}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Software
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-indigo-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                An Enormous Abstract Software Machine
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Connecting modules in unison: PostgreSQL database, REST/GraphQL APIs, OAuth authentication, internal admin dashboards, and native mobile apps.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: "Database", icon: Database, label: "PostgreSQL" },
                { name: "API Layer", icon: Cpu, label: "Fast Edge" },
                { name: "Auth Engine", icon: Lock, label: "NextAuth / OAuth" },
                { name: "Dashboard", icon: Layers, label: "Real-Time Telemetry" },
                { name: "Mobile App", icon: Zap, label: "Flutter / React Native" },
                { name: "Backend Core", icon: Terminal, label: "Node.js Microservices" }
              ].map((comp) => {
                const Icon = comp.icon;
                return (
                  <div key={comp.name} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-md">
                    <Icon className="w-5 h-5 text-indigo-400 mx-auto" />
                    <strong className="text-white text-xs block">{comp.name}</strong>
                    <span className="text-[10px] font-mono text-indigo-300 block">{comp.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; THE DASHBOARD ZOOMS INTO A SINGLE PRODUCT</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 07: COMMERCE // MOVIE: THE JOURNEY */}
      {/* ============================================================== */}
      <section id="chapter-07" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>CHAPTER 07 &bull; THE JOURNEY</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                COMMERCE
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                DISCOVERY &rarr; SELECTION &rarr; TRANSACTION &rarr; WAREHOUSE &rarr; DELIVERY
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("COMMERCE"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-sky-400 transition"
              >
                Inspect Storefront
              </button>
              <button
                onClick={() => onDeploy("E-Commerce Ecosystems")}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Commerce
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-sky-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Following The Protagonist Product
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Follow one single item from social discovery to instant 1-click Razorpay/UPI checkout, warehouse pack slip, automated courier dispatch, and front-door delivery.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { title: "01. Discovered", desc: "Targeted Ad Click" },
                { title: "02. Cart Add", desc: "Instant Cart Drawer" },
                { title: "03. Payment", desc: "UPI / Cards / Razorpay" },
                { title: "04. Warehouse", desc: "Auto Slip Generated" },
                { title: "05. Delivered", desc: "Live Tracking SMS/WA" }
              ].map((st, idx) => (
                <button
                  key={st.title}
                  onClick={() => setJourneyStep(idx)}
                  className={`p-3.5 rounded-xl text-left border transition ${
                    journeyStep === idx
                      ? "bg-sky-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/20"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono text-sky-400 font-bold block">{st.title}</span>
                  <strong className="text-xs text-white block mt-0.5">{st.desc}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; PHYSICAL STORE REGISTERS TRANSFORM INTO CONNECTED PIXELS</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 08: TRANSFORMATION // MOVIE: THE TRANSFORMATION */}
      {/* ============================================================== */}
      <section id="chapter-08" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-teal-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>CHAPTER 08 &bull; THE TRANSFORMATION</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                TRANSFORMATION
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                OFFLINE &rarr; CONNECTED &rarr; DIGITAL
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("DIGITALIZE"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-teal-400 transition"
              >
                Inspect Ecosystem
              </button>
              <button
                onClick={() => onDeploy("Offline-to-Online Digitalization")}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Digitalize Now
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-teal-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Paper, Registers &amp; Chaos Transformed into One Ecosystem
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Traditional local businesses bogged down by physical paper registers and missed phone calls convert into synchronized QR ordering, cloud inventory, and automated Google review engines.
              </p>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTransState("offline")}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
                  transState === "offline"
                    ? "bg-red-950 border border-red-500 text-red-300 font-bold"
                    : "bg-slate-900 text-slate-400"
                }`}
              >
                Before Hyrinx (Paper &amp; Registers)
              </button>
              <button
                onClick={() => setTransState("connected")}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
                  transState === "connected"
                    ? "bg-teal-600 text-white font-bold shadow-lg shadow-teal-600/30"
                    : "bg-slate-900 text-slate-400"
                }`}
              >
                With Hyrinx (Connected Digital OS)
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              {transState === "offline" ? (
                <div className="space-y-2 text-xs text-rose-200">
                  <p>&times; Paper receipt slips getting lost and customer contact numbers never saved.</p>
                  <p>&times; Missed customer calls during peak hours lost forever.</p>
                  <p>&times; Zero Google review generation after purchases.</p>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-emerald-200">
                  <p>&bull; Contactless Smart QR table ordering synced directly to kitchen display.</p>
                  <p>&bull; Missed calls trigger instant automated WhatsApp AI recovery with digital menu.</p>
                  <p>&bull; 5-Star Google reviews triggered automatically via WhatsApp after checkout.</p>
                </div>
              )}
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; DASHBOARDS EXPAND INTO FULL COMMAND CONTROL</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 09: CONTROL // MOVIE: THE CONTROL ROOM */}
      {/* ============================================================== */}
      <section id="chapter-09" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>CHAPTER 09 &bull; THE CONTROL ROOM</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                CONTROL
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                &quot;YOU RUN THE BUSINESS. HYRINX COMMANDS THE DIGITAL SIDE.&quot;
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("MANAGE"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-cyan-400 transition"
              >
                Inspect Retainer
              </button>
              <button
                onClick={() => onDeploy("Hyrinx Management")}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Retainer
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                One Screen Controls The Entire Digital Presence
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Continuous 24/7 technical monitoring, weekly marketing graphics, menu pricing updates, database backups, and SEO maintenance. You focus on sales and operations; Hyrinx guards the digital machine.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold block">UPTIME HEALTH</span>
                <strong className="text-white text-base font-black">99.9% Uptime</strong>
                <p className="text-xs text-slate-300">Pings every 60 seconds.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold block">WEEKLY COMMITS</span>
                <strong className="text-white text-base font-black">Unlimited Content</strong>
                <p className="text-xs text-slate-300">Banners, menus, prices.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold block">CLOUD BACKUPS</span>
                <strong className="text-white text-base font-black">Daily Snapshots</strong>
                <p className="text-xs text-slate-300">Zero data loss guarantee.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold block">OWNERSHIP</span>
                <strong className="text-white text-base font-black">100% Client IP</strong>
                <p className="text-xs text-slate-300">Zero vendor lock-in.</p>
              </div>
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; EXTERNAL PERIMETER THREAT SENSORS ENGAGE</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 10: DEFENSE // MOVIE: THE SHIELD */}
      {/* ============================================================== */}
      <section id="chapter-10" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>CHAPTER 10 &bull; THE SHIELD</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                DEFENSE
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                THREAT &rarr; DETECTION &rarr; DEFENSE &rarr; PROTECTION
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("PROTECT"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-emerald-400 transition"
              >
                Inspect Fortress
              </button>
              <button
                onClick={() => onDeploy("Hyrinx Security")}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Arm Defense
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-emerald-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                The Dark Digital Fortress
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                No matrix gimmicks. Core business databases shielded inside multi-layered defensive rings: Cloudflare edge WAF, Linux server port hardening, and cryptographic token isolation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                <strong className="text-white text-sm block">Layer 01: Edge WAF Neutralization</strong>
                <p className="text-xs text-slate-300">Blocks automated bot scrapes, credential stuffing, and DDoS flood attempts.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <strong className="text-white text-sm block">Layer 02: Kernel &amp; Port Hardening</strong>
                <p className="text-xs text-slate-300">Only authorized cryptographic keys can access remote server nodes.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <strong className="text-white text-sm block">Layer 03: Vulnerability Patching</strong>
                <p className="text-xs text-slate-300">Continuous scans preventing OWASP Top 10 exploits and injection bugs.</p>
              </div>
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; DEFENSIVE LOGS OPEN INTO THE CONTROLLED LAB RANGE</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 11: KNOWLEDGE // MOVIE: THE LAB */}
      {/* ============================================================== */}
      <section id="chapter-11" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>CHAPTER 11 &bull; THE LAB</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                KNOWLEDGE
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                LEARN &rarr; EXPERIMENT &rarr; UNDERSTAND &rarr; DEFEND
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("LEARN"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-sky-400 transition"
              >
                Inspect Labs
              </button>
              <button
                onClick={() => onDeploy("Hyrinx Cyber Lab")}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Enter Sandbox
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-sky-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Underground Cybersecurity Defensive Range
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Hands-on legal sandbox environments, CTF challenges, Linux hardening training, and secure software development practices.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs text-sky-200">
              <strong>Authorized Practice Only:</strong> All training takes place strictly inside isolated virtual networks and controlled defensive ranges. We do not support or teach illegal intrusion activities.
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; TERMINAL OPENS TO EXPERIMENTAL FUTURE DIMENSIONS</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 12: FUTURE // MOVIE: THE FUTURE */}
      {/* ============================================================== */}
      <section id="chapter-12" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-violet-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span>CHAPTER 12 &bull; THE FUTURE</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                FUTURE
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                3D WEBGL &bull; GENERATIVE AGENTS &bull; INTERACTIVE DIGITAL ART
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("FUTURE LAB"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-violet-400 transition"
              >
                Inspect Future Lab
              </button>
              <button
                onClick={() => onDeploy("Creative Technology & 3D Experiences")}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Future Tech
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-violet-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                A Research Laboratory From The Future
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Where digital artistry meets cutting-edge engineering. WebGL product configurators, three-dimensional spatial landing pages, and autonomous AI multi-agent workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <strong className="text-white text-sm block">Spatial 3D Canvas</strong>
                <p className="text-xs text-slate-300">Fluid WebGL interactive models that respond to user mouse gestures.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <Cpu className="w-5 h-5 text-violet-400" />
                <strong className="text-white text-sm block">Autonomous Agent Loops</strong>
                <p className="text-xs text-slate-300">Self-running AI routines that synthesize data and trigger business actions.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <Layers className="w-5 h-5 text-violet-400" />
                <strong className="text-white text-sm block">Generative Brand Art</strong>
                <p className="text-xs text-slate-300">Procedural visual systems rendered live in the user&apos;s browser.</p>
              </div>
            </div>
          </div>

          <div className="py-6 flex items-center justify-center gap-3 text-xs font-mono text-slate-500">
            <span className="h-px w-12 bg-white/10" />
            <span>TRANSITION &bull; FUTURE LAB PROJECTS REVEAL PROPRIETARY PACKAGES</span>
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CHAPTER 13: ORIGINALS // MOVIE: THE UNKNOWN */}
      {/* ============================================================== */}
      <section id="chapter-13" className="relative scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>CHAPTER 13 &bull; THE UNKNOWN</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase mt-1">
                ORIGINALS
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                9 PROPRIETARY PACKAGED INVENTIONS &bull; THE UNKNOWN
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDossier(getCategoryByTag("ORIGINALS"))}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white hover:border-amber-400 transition"
              >
                Inspect Fleet
              </button>
              <button
                onClick={() => onDeploy("Hyrinx Originals")}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-black uppercase tracking-wider transition"
              >
                Deploy Original
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950 border-2 border-amber-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Pre-Architected Industry Breakthroughs
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Why build from ground zero for 6 months? Hyrinx has engineered, tested, and packaged complete operational software platforms for clinics, restaurants, salons, and retail chains.
              </p>
            </div>

            {/* Progressive Reveal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {[
                { name: "Digital Business-in-a-Box", desc: "Turnkey website + WhatsApp bot + brand pack + Google Maps in 72h." },
                { name: "Business Digital Twin", desc: "Centralized live dashboard mirroring physical store sales, staff & stock." },
                { name: "Missed Customer Recovery", desc: "Automated AI callback and WhatsApp recovery for unanswered phone calls." },
                { name: "QR Smart System", desc: "Contactless table menus, digital ordering & automated Google review boosters." },
                { name: "Digital Warranty Vault", desc: "Paperless digital warranty cards linked to customer mobile numbers." },
                { name: "Digital Queue & Token", desc: "Live mobile queue displays for salons, clinics and busy counters." },
                { name: "AI Business Audit", desc: "Deep digital footprint diagnostic finding high-ROI automation opportunities." },
                { name: "Website-as-a-Service", desc: "Enterprise website + hosting + unlimited updates on recurring plan." },
                { name: "Digital Continuity System", desc: "Encrypted centralized backup of all passwords, domains and company IP." }
              ].slice(0, revealedCount).map((p) => (
                <div key={p.name} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 shadow-md">
                  <div className="flex items-center justify-between">
                    <strong className="text-white text-xs font-bold">{p.name}</strong>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>

            {revealedCount < 9 ? (
              <div className="pt-4 text-center">
                <button
                  onClick={() => setRevealedCount(9)}
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-amber-300 border border-amber-500/40 transition"
                >
                  Reveal All 9 Originals &darr;
                </button>
              </div>
            ) : (
              <div className="pt-4 text-center">
                <span className="text-sm font-mono font-black text-amber-400 tracking-widest uppercase">
                  THERE IS MORE.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
