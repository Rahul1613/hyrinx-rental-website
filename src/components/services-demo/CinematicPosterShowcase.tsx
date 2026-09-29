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
  Terminal,
  Sparkles,
  Box,
  ArrowRight,
  Zap,
  PhoneCall,
  ExternalLink,
  Film,
  Volume2,
  VolumeX,
  CheckCircle2,
  ChevronDown,
  Layers,
  Database,
  Radio,
  Lock,
  MessageSquare,
  Truck,
  TrendingUp,
  Activity,
  Play
} from "lucide-react";
import {
  HYRINX_SERVICE_CATEGORIES,
  ServiceCategory
} from "./servicesData";
import { soundFX } from "./soundFx";

interface CinematicPosterShowcaseProps {
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
  onStartProject: () => void;
  onReplayIntro: () => void;
}

// 13 Posters Definitions with Cinematic Film Meta & Clear Everyday Language
const POSTERS = [
  {
    chapter: "01",
    catId: "web-dev",
    filmTitle: "THE ARCHITECT",
    serviceTitle: "Website Development & Web Apps",
    genre: "HIGH-CONVERSION DIGITAL REAL ESTATE",
    tagline: "We don't just build websites. We construct digital real estate engineered to convert.",
    accentColor: "#3b82f6",
    gradient: "from-blue-600/30 via-indigo-950/40 to-black",
    badgeColor: "border-blue-500/40 text-blue-300 bg-blue-950/60",
    icon: Code2,
    rating: "AAA // ENTERPRISE SPEED",
    runtime: "< 0.8s LOAD SPEED",
    simpleSummary: "Fast, modern websites and web applications built with Next.js, Google 100 SEO optimization, and conversion layouts that turn visitors into paying customers.",
    deliverables: [
      "Custom Next.js & React 18 Web Platforms",
      "Sub-Second Page Load Optimization",
      "Google-Verified 100% SEO Architecture",
      "High-Converting Landing Pages & Funnels",
      "Custom Client Cloud Dashboards & APIs"
    ],
    whyItMatters: "53% of mobile visitors abandon websites that take over 3 seconds to load. We engineer ultra-fast digital real estate that outranks competitors and converts visitors on first visit.",
    specs: ["NEXT.JS 14", "TAILWIND CSS", "POSTGRESQL", "EDGE CDN"]
  },
  {
    chapter: "02",
    catId: "branding",
    filmTitle: "THE IDENTITY",
    serviceTitle: "Branding, Logo Design & Visual Systems",
    genre: "PREMIUM BRAND ARCHITECTURE",
    tagline: "Brands engineered to dominate attention and command immediate market respect.",
    accentColor: "#f43f5e",
    gradient: "from-rose-600/30 via-purple-950/40 to-black",
    badgeColor: "border-rose-500/40 text-rose-300 bg-rose-950/60",
    icon: Palette,
    rating: "GOLDEN RATIO MASTER",
    runtime: "COMPLETE BRAND KIT",
    simpleSummary: "We create distinctive luxury visual identities: timeless logos, premium packaging, typography guides, and social media branding that make your business look like an established market leader.",
    deliverables: [
      "Master Logo Design & Golden Ratio Glyphs",
      "Complete Brand Identity Guidelines Book",
      "Luxury 3D Unboxing & Product Packaging",
      "Premium Matte Foil Business Cards & Print",
      "High-Impact Social Media Visual Systems"
    ],
    whyItMatters: "Customers form an opinion about your business within 50 milliseconds. We engineer visual identities that build instant trust and justify premium pricing.",
    specs: ["PANTONE CMYK", "VECTOR SVG", "3D PACKAGING", "BRAND MANUAL"]
  },
  {
    chapter: "03",
    catId: "marketing",
    filmTitle: "THE ATTENTION",
    serviceTitle: "Social Media Growth & Performance Ads",
    genre: "REVENUE-FOCUSED CUSTOMER ACQUISITION",
    tagline: "Attention engineered into real customers, sales, and verified inquiries.",
    accentColor: "#06b6d4",
    gradient: "from-cyan-600/30 via-blue-950/40 to-black",
    badgeColor: "border-cyan-500/40 text-cyan-300 bg-cyan-950/60",
    icon: Megaphone,
    rating: "HIGH-INTENT TRAFFIC",
    runtime: "20K+ TARGET CAMPAIGNS",
    simpleSummary: "Targeted Meta (Instagram/Facebook) and Google ads combined with organic short-form viral growth and direct WhatsApp conversation funnels that deliver actual leads.",
    deliverables: [
      "Meta Ads Management (Instagram & Facebook)",
      "Google High-Intent Search & PPC Campaigns",
      "Viral Short-Form Content & Reels Strategy",
      "Direct-to-WhatsApp Inbound Lead Funnels",
      "Weekly ROI & Conversion Analytics Reports"
    ],
    whyItMatters: "Likes and views don't pay bills. We focus on high-intent customer acquisition with transparent campaign benchmarks (20K+ reach objective targets tailored per client market).",
    specs: ["META PIXEL", "GOOGLE ADS", "WHATSAPP API", "CONVERSIONS"]
  },
  {
    chapter: "04",
    catId: "content-creation",
    filmTitle: "THE PRODUCTION",
    serviceTitle: "High-End Video Production & Content Engine",
    genre: "CINEMATIC 4K ANAMORPHIC STORYTELLING",
    tagline: "High-impact video production that stops the scroll and commands retention.",
    accentColor: "#f59e0b",
    gradient: "from-amber-600/30 via-orange-950/40 to-black",
    badgeColor: "border-amber-500/40 text-amber-300 bg-amber-950/60",
    icon: Clapperboard,
    rating: "4K DCI // 60 FPS",
    runtime: "STUDIO & ON-SITE",
    simpleSummary: "Professional on-site 4K video shooting, cinematic storytelling cuts, viral Instagram reels, corporate brand documentaries, and dynamic 3D motion graphics.",
    deliverables: [
      "On-Location & Studio 4K Video Shooting",
      "High-Retention Reels, TikToks & Shorts",
      "Corporate Promotional Commercials",
      "3D Kinetic Motion Graphics & Titles",
      "ACES Cinema Color Grading & Audio Master"
    ],
    whyItMatters: "Video content generates 1200% more shares than text and static images combined. We build video engines that establish authority and capture attention within 2 seconds.",
    specs: ["4K PRORES", "LOG COLOR", "ANAMORPHIC", "DAVINCI RESOLVE"]
  },
  {
    chapter: "05",
    catId: "ai-automation",
    filmTitle: "THE CONVERSATION",
    serviceTitle: "AI Agents & WhatsApp Business Automation",
    genre: "24/7 AUTONOMOUS REVENUE ENGINE",
    tagline: "Never miss another customer. Intelligent WhatsApp bots and automated booking agents.",
    accentColor: "#10b981",
    gradient: "from-emerald-600/30 via-teal-950/40 to-black",
    badgeColor: "border-emerald-500/40 text-emerald-300 bg-emerald-950/60",
    icon: Bot,
    rating: "SUB-3s RESPONSE TIME",
    runtime: "24/7/365 AUTONOMOUS",
    simpleSummary: "Smart WhatsApp bots that reply in seconds, answer customer questions, qualify prospective leads, book appointments on your calendar, and update your CRM automatically while you sleep.",
    deliverables: [
      "Official WhatsApp Business API Integration",
      "24/7 Autonomous AI Customer Support Bot",
      "Instant Lead Qualification & Routing",
      "Automatic Calendar Booking & Reminders",
      "CRM Data Synchronization & Lead Recovery"
    ],
    whyItMatters: "Leads contacted within 5 minutes are 21x more likely to convert. Our intelligent automation guarantees instant, professional engagement 24 hours a day, 7 days a week.",
    specs: ["WHATSAPP CLOUD API", "OPENAI / GEMINI", "CRM SYNC", "CALENDAR API"]
  },
  {
    chapter: "06",
    catId: "software-apps",
    filmTitle: "THE MACHINE",
    serviceTitle: "Custom Software & Mobile App Development",
    genre: "INTERLOCKING ENTERPRISE ARCHITECTURE",
    tagline: "Custom software machines and cross-platform native mobile apps built to scale.",
    accentColor: "#3b82f6",
    gradient: "from-blue-600/30 via-slate-950/40 to-black",
    badgeColor: "border-blue-500/40 text-blue-300 bg-blue-950/60",
    icon: Cpu,
    rating: "CROSS-PLATFORM NATIVE",
    runtime: "ENTERPRISE SCALABILITY",
    simpleSummary: "Custom iOS and Android mobile apps, internal business portals, and SaaS platforms tailored 100% to your company workflows without expensive third-party licensing fees.",
    deliverables: [
      "Native iOS & Android Mobile Applications",
      "Custom Enterprise SaaS Platforms",
      "Internal Business Dashboards & Portals",
      "Robust REST & GraphQL API Architectures",
      "Automated Cloud Database Scalability"
    ],
    whyItMatters: "Off-the-shelf software forces your business into someone else's box and charges endless per-seat fees. We build proprietary software that you own 100% forever.",
    specs: ["REACT NATIVE", "NODE.JS", "POSTGRESQL", "AWS / CLOUDFLARE"]
  },
  {
    chapter: "07",
    catId: "ecommerce",
    filmTitle: "THE JOURNEY",
    serviceTitle: "High-Conversion E-Commerce & Checkout",
    genre: "SEAMLESS DISCOVERY TO DOORSTEP",
    tagline: "From product discovery to customer doorstep in one frictionless digital journey.",
    accentColor: "#f59e0b",
    gradient: "from-amber-600/30 via-stone-950/40 to-black",
    badgeColor: "border-amber-500/40 text-amber-300 bg-amber-950/60",
    icon: ShoppingBag,
    rating: "SUB-SECOND CHECKOUT",
    runtime: "GLOBAL & DOMESTIC",
    simpleSummary: "Custom Shopify and headless e-commerce storefronts designed for speed, 1-click UPI and card checkout, automated inventory sync, and live courier tracking.",
    deliverables: [
      "Custom Shopify & Headless Storefronts",
      "High-Conversion 1-Click Checkout Funnels",
      "Real-Time Stock & Warehouse Inventory Sync",
      "Automated Shipping & Courier Label Generation",
      "Abandoned Cart & Missed Order Recovery"
    ],
    whyItMatters: "Friction-heavy checkout flows kill conversions. We build lightning-fast e-commerce experiences that reduce abandoned carts by up to 35%.",
    specs: ["SHOPIFY PLUS", "RAZORPAY / STRIPE", "SHIPROCKET", "LIVE TRACKING"]
  },
  {
    chapter: "08",
    catId: "digitalization",
    filmTitle: "THE TRANSFORMATION",
    serviceTitle: "Business Digitalization & Smart QR Systems",
    genre: "ANALOG TO CONNECTED DIGITAL SHIFT",
    tagline: "Transforming traditional physical businesses into connected digital ecosystems.",
    accentColor: "#14b8a6",
    gradient: "from-teal-600/30 via-emerald-950/40 to-black",
    badgeColor: "border-teal-500/40 text-teal-300 bg-teal-950/60",
    icon: QrCode,
    rating: "PAPER-TO-CLOUD",
    runtime: "CONNECTED ECOSYSTEM",
    simpleSummary: "We replace manual paper registers, telephone order taking, and physical receipts with dynamic Smart QR codes, cloud billing, digital menus, and instant WhatsApp ordering.",
    deliverables: [
      "Paper-to-Cloud Database Transition",
      "Dynamic Smart QR Menus & Service Portals",
      "Automated Digital Billing & GST Invoices",
      "WhatsApp Direct Customer Ordering",
      "Real-Time Mobile Stock & Sales Tracking"
    ],
    whyItMatters: "Manual paperwork wastes 15+ hours weekly and causes billing errors. We modernize your physical storefront in days so every customer interaction is smooth, modern, and tracked.",
    specs: ["SMART QR", "CLOUD INVOICING", "WHATSAPP ORDERING", "ZERO HARDWARE"]
  },
  {
    chapter: "09",
    catId: "management",
    filmTitle: "THE CONTROL BRIDGE",
    serviceTitle: "Full-Stack Digital Management Services",
    genre: "UNIFIED 360° DIGITAL OPERATIONS",
    tagline: "Your entire digital presence managed and protected by one dedicated partner.",
    accentColor: "#3b82f6",
    gradient: "from-blue-600/30 via-slate-950/40 to-black",
    badgeColor: "border-blue-500/40 text-blue-300 bg-blue-950/60",
    icon: Activity,
    rating: "99.99% UPTIME SLA",
    runtime: "DEDICATED TEAM",
    simpleSummary: "Never manage 5 different agencies again. Hyrinx manages your website updates, social media publishing, cloud server uptime, ad campaigns, and customer support with a dedicated account manager.",
    deliverables: [
      "Dedicated Full-Time Digital Account Lead",
      "Daily Social Media Publishing & Engagement",
      "Continuous Website Updates & SRE Maintenance",
      "Real-Time Performance Marketing Optimization",
      "Priority 24/7 Technical Emergency Hotline"
    ],
    whyItMatters: "Managing separate freelancers and agencies leads to finger-pointing and dropped balls. Hyrinx acts as your complete in-house digital department for a fraction of the cost.",
    specs: ["DEDICATED LEAD", "DAILY OPS", "SRE MONITORING", "MONTHLY REPORTS"]
  },
  {
    chapter: "10",
    catId: "cybersecurity",
    filmTitle: "THE DIGITAL FORTRESS",
    serviceTitle: "Cybersecurity, WAF & Cloud Hardening",
    genre: "ZERO-TRUST DEFENSE ARCHITECTURE",
    tagline: "Enterprise security perimeter engineered to protect critical business assets.",
    accentColor: "#6366f1",
    gradient: "from-indigo-600/30 via-slate-950/40 to-black",
    badgeColor: "border-indigo-500/40 text-indigo-300 bg-indigo-950/60",
    icon: ShieldCheck,
    rating: "ZERO-TRUST AUDITED",
    runtime: "24/7 SOC DEFENSE",
    simpleSummary: "Cloud security audits, Web Application Firewall (WAF) setup, DDoS mitigation, vulnerability penetration testing, and end-to-end database encryption that keep your business safe.",
    deliverables: [
      "Web Application Firewall (WAF) & DDoS Defense",
      "Vulnerability Assessment & Penetration Testing",
      "Zero-Trust MFA & Identity Access Controls",
      "AES-256 Quantum-Resistant Database Encryption",
      "Continuous 24/7 Threat Monitoring & Incident Response"
    ],
    whyItMatters: "Cyber threats target small and mid-sized businesses every 39 seconds. We build iron-clad defenses that protect your customer data, revenue streams, and reputation.",
    specs: ["CLOUDFLARE WAF", "OWASP TOP 10", "AES-256", "PEN-TEST REPORT"]
  },
  {
    chapter: "11",
    catId: "cyber-education",
    filmTitle: "THE CYBER LAB",
    serviceTitle: "Cybersecurity Education & Defensive Labs",
    genre: "AUTHORIZED PRACTICAL DEFENSIVE TRAINING",
    tagline: "Empowering teams with real-world defensive security skills and cyber awareness.",
    accentColor: "#06b6d4",
    gradient: "from-cyan-600/30 via-blue-950/40 to-black",
    badgeColor: "border-cyan-500/40 text-cyan-300 bg-cyan-950/60",
    icon: Terminal,
    rating: "AUTHORIZED DEFENSE ONLY",
    runtime: "HANDS-ON SIMULATION",
    simpleSummary: "Practical corporate employee cybersecurity training, phishing defense drills, hands-on virtual lab ranges, and secure coding workshops for engineering teams.",
    deliverables: [
      "Corporate Employee Cyber Hygiene & Phishing Drills",
      "Hands-On Virtual Linux & Network Defense Labs",
      "Defensive Capture-The-Flag (CTF) Exercises",
      "Secure Coding Guidelines for Software Developers",
      "Executive Incident Preparedness Workshops"
    ],
    whyItMatters: "Over 88% of data breaches originate from human error and social engineering. We train your staff to recognize attacks before breaches happen in strictly authorized defensive environments.",
    specs: ["ETHICAL ONLY", "VIRTUAL RANGE", "CTF DRILLS", "DEFENSIVE CERTS"]
  },
  {
    chapter: "12",
    catId: "creative-tech",
    filmTitle: "THE FUTURE LAB",
    serviceTitle: "Creative Technology, 3D WebGL & AI R&D",
    genre: "FRONTIER INTERACTIVE EXPERIENCES",
    tagline: "Turning emerging technology into undeniable competitive market advantage.",
    accentColor: "#a855f7",
    gradient: "from-purple-600/30 via-pink-950/40 to-black",
    badgeColor: "border-purple-500/40 text-purple-300 bg-purple-950/60",
    icon: Sparkles,
    rating: "EXPERIMENTAL R&D",
    runtime: "SPATIAL 3D & AI",
    simpleSummary: "Interactive 3D WebGL web experiences, generative AI applications, interactive physical art installations, and spatial computing interfaces that leave lasting impressions.",
    deliverables: [
      "3D WebGL & Spatial Web Experiences",
      "Custom Generative AI Interactive Pipelines",
      "Interactive Physical Installations & Hardware",
      "Augmented Reality (AR) Product Showcases",
      "Frontier R&D Prototyping for Forward-Thinking Brands"
    ],
    whyItMatters: "Generic templates are invisible. Cutting-edge 3D interactive experiences achieve 3x longer user engagement and earn massive organic viral reach.",
    specs: ["THREE.JS / WEBGL", "GENERATIVE AI", "GLSL SHADERS", "SPATIAL COMPUTING"]
  },
  {
    chapter: "13",
    catId: "hyrinx-originals",
    filmTitle: "THE UNKNOWN",
    serviceTitle: "Hyrinx Originals: 9 Proprietary Inventions",
    genre: "EXCLUSIVE PROPRIETARY BLUEPRINTS",
    tagline: "Original digital products engineered and manufactured exclusively by Hyrinx.",
    accentColor: "#ef4444",
    gradient: "from-red-600/30 via-rose-950/40 to-black",
    badgeColor: "border-red-500/40 text-red-300 bg-red-950/60",
    icon: Box,
    rating: "9 EXCLUSIVE PATENTS",
    runtime: "TURNKEY DISRUPTORS",
    simpleSummary: "Nine ready-to-deploy proprietary blueprints built by Hyrinx to solve complex business bottlenecks: from turnkey 72-hour business launches to sub-90-second missed lead recovery systems.",
    deliverables: [
      "Digital Business-in-a-Box (Turnkey 72h Launch)",
      "Business Digital Twin (Real-Time Simulator)",
      "Missed Customer Recovery (Sub-90s Recapture)",
      "QR Smart Systems (Physical-to-Digital Touchpoints)",
      "Digital Warranty Vault & Digital Queue Engine",
      "AI Business Diagnostic Audit & WaaS Model"
    ],
    whyItMatters: "These are exclusive inventions developed in our lab that you cannot buy from standard agencies. They solve immediate revenue leaks with turnkey execution.",
    specs: ["9 BLUEPRINTS", "READY TO DEPLOY", "TURNKEY SETUP", "EXCLUSIVE"]
  }
];

export default function CinematicPosterShowcase({
  onOpenDetails,
  onDeploy,
  onStartProject,
  onReplayIntro
}: CinematicPosterShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    soundFX.isMuted = !soundFX.isMuted;
    setIsMuted(soundFX.isMuted);
    if (!soundFX.isMuted) {
      soundFX.ensureAudioReady();
      soundFX.playUiSelect();
    } else {
      soundFX.stopAll();
    }
  };

  const filteredPosters = activeFilter === "all"
    ? POSTERS
    : POSTERS.filter((p) => {
        if (activeFilter === "build") return ["web-dev", "software-apps", "ecommerce"].includes(p.catId);
        if (activeFilter === "brand") return ["branding", "content-creation"].includes(p.catId);
        if (activeFilter === "growth") return ["marketing", "ai-automation", "digitalization"].includes(p.catId);
        if (activeFilter === "defense") return ["cybersecurity", "cyber-education", "management"].includes(p.catId);
        if (activeFilter === "future") return ["creative-tech", "hyrinx-originals"].includes(p.catId);
        return true;
      });

  return (
    <div className="min-h-screen bg-[#020204] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* 1. TOP CINEMATIC CONTROLS HEADER */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-500/20">
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-widest text-sm text-white">HYRINX</span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 font-bold">
                CINEMATIC POSTER SHOWCASE
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              13 Blockbuster Service Divisions &bull; Everything You Need To Build &amp; Scale
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay Opening Intro */}
          <button
            onClick={onReplayIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 hover:border-red-500/60 text-slate-300 hover:text-white transition text-xs font-mono"
            title="Replay Opening Movie Intro"
          >
            <Film className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline font-bold">Replay Opening</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition text-xs font-mono"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            )}
            <span className="font-bold">{isMuted ? "SOUND: OFF" : "SOUND: ON"}</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20am%20reviewing%20the%20Services%20Poster%20Showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">+91-9730213645</span>
          </a>

          {/* Start Project CTA */}
          <button
            onClick={onStartProject}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition"
          >
            Start Project
          </button>
        </div>
      </header>

      {/* 2. GRAND HERO: CINEMA POSTER GALLERY INTRO */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>HYRINX SERVICES EXHIBITION &bull; 13 FILM POSTERS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
            Everything Hyrinx Builds. Presented as Cinema.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            Hyrinx replaces fragmented agencies with unified creative technology. Explore our 13 specialized divisions presented as movie posters — complete with crystal-clear deliverables, real business outcomes, and direct project booking.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
          <span className="text-xs font-mono text-slate-400 uppercase font-bold mr-2">Filter Posters:</span>
          {[
            { id: "all", label: "All 13 Posters" },
            { id: "build", label: "Web & Software" },
            { id: "brand", label: "Brand & Creative" },
            { id: "growth", label: "Marketing & AI" },
            { id: "defense", label: "Cyber & Management" },
            { id: "future", label: "Future & Originals" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playUiSelect();
                setActiveFilter(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition ${
                activeFilter === tab.id
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                  : "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. THE 13 CINEMATIC MOVIE POSTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {filteredPosters.map((poster) => {
          const IconComp = poster.icon;

          return (
            <article
              key={poster.catId}
              id={`poster-${poster.chapter}`}
              className="relative rounded-3xl bg-gradient-to-b from-[#0a0c16] via-[#05060b] to-black border-2 border-white/15 p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden group hover:border-cyan-500/40 transition-colors duration-500"
            >
              {/* Background Ambient Glow */}
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity"
                style={{ backgroundColor: poster.accentColor }}
              />

              {/* POSTER HEADER: Film Meta & Release Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                    {poster.chapter}
                  </span>
                  <div className="h-6 w-[2px] bg-white/20" />
                  <span className="font-mono text-xs tracking-widest uppercase font-bold text-cyan-400">
                    {poster.genre}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-300 font-bold">
                    {poster.rating}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-300 font-bold">
                    {poster.runtime}
                  </span>
                </div>
              </div>

              {/* POSTER GRID: 2 Column Layout (Left: Movie Visual Block, Right: Clear Story & Deliverables) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* LEFT: THE POSTER MONUMENT (5 Cols) */}
                <div className="lg:col-span-5 relative">
                  <div
                    className={`relative w-full aspect-[4/5] rounded-2xl bg-gradient-to-b ${poster.gradient} border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden`}
                  >
                    {/* Poster Top Corner Tag */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center">
                        <IconComp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        HYRINX STUDIOS
                      </span>
                    </div>

                    {/* Central Monumental Title */}
                    <div className="space-y-2 my-auto text-center py-6">
                      <div className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-black">
                        FEATURE DIVISION
                      </div>
                      <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-lg font-sans">
                        {poster.filmTitle}
                      </h2>
                      <div className="w-12 h-1 bg-white/40 mx-auto rounded-full" />
                      <p className="text-xs font-mono text-slate-300 tracking-wider uppercase font-semibold">
                        {poster.serviceTitle}
                      </p>
                    </div>

                    {/* Poster Bottom Billing Block */}
                    <div className="border-t border-white/15 pt-4 text-center space-y-1">
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                        DIRECTED &amp; ENGINEERED BY HYRINX
                      </p>
                      <div className="flex flex-wrap justify-center gap-1.5 text-[8px] font-mono text-slate-500">
                        {poster.specs.map((sp, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: CLEAR HUMAN-READABLE DETAILS (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Catchy Tagline */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      &ldquo;{poster.tagline}&rdquo;
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {poster.simpleSummary}
                    </p>
                  </div>

                  {/* Concrete What You Get Deliverables */}
                  <div className="space-y-3 p-5 rounded-2xl bg-black/50 border border-white/10">
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-black flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>WHAT HYRINX DELIVERS IN THIS DIVISION</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {poster.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why It Matters Callout */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300 leading-relaxed">
                    <span className="font-mono text-cyan-400 font-bold uppercase mr-1.5">Business Rationale:</span>
                    {poster.whyItMatters}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onDeploy(poster.serviceTitle)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition flex items-center gap-2"
                    >
                      <span>Start This Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenDetails(poster.catId)}
                      className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/20 font-mono text-xs font-bold transition flex items-center gap-2"
                    >
                      <span>Full Technical Blueprint</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    </button>

                    <a
                      href={`https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20am%20interested%20in%20${encodeURIComponent(poster.serviceTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition flex items-center gap-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Consultation</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 4. GRAND FINALE POSTER: "BUILD WHAT COMES NEXT." */}
      <section className="relative py-24 px-4 sm:px-6 border-t border-white/10 bg-gradient-to-b from-black via-[#080511] to-black">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-indigo-600 flex items-center justify-center font-black text-white text-3xl mx-auto shadow-2xl shadow-red-500/30 border border-white/20">
            H
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono tracking-[0.4em] uppercase text-cyan-400 font-bold">
              HYRINX &bull; THE COMPLETE DIGITAL TRANSFORMATION PARTNER
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase">
              Build What Comes Next.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Ready to replace scattered vendors with an integrated technology and creative powerhouse? Book a direct consultation or reach our founders on WhatsApp.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartProject}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:brightness-110 active:scale-95 transition flex items-center gap-2.5"
            >
              <span>Start A Project With Hyrinx</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20have%20reviewed%20the%20Services%20Posters%20and%20want%20to%20consult%20on%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border-2 border-emerald-500/60 text-emerald-300 font-bold text-sm transition flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +91-9730213645</span>
            </a>

            <button
              onClick={onReplayIntro}
              className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/20 font-mono text-xs font-bold transition flex items-center gap-2"
            >
              <Film className="w-3.5 h-3.5 text-red-400" />
              <span>Replay Opening Title</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. CINEMA FOOTER */}
      <footer className="border-t border-white/10 bg-black py-10 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-black tracking-wider">HYRINX</span>
            <span>&copy; {new Date().getFullYear()} Creative Technology &bull; Systems &bull; Defense</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-mono text-[11px] font-bold">
              DIRECT WHATSAPP: +91-9730213645
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-300 hover:text-white transition font-mono font-bold"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
