"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  X,
  PhoneCall,
  ExternalLink,
  Play,
  Volume2,
  VolumeX,
  CheckCircle2,
  Zap,
  Eye,
  ShieldCheck,
  Terminal,
  Palette,
  Code2,
  Megaphone,
  Clapperboard,
  Bot,
  ShoppingBag,
  Layers,
  Activity,
  Cpu,
  Box,
  Sparkles,
  ArrowRight,
  Library,
  RotateCcw,
  MousePointerClick,
  Check,
  TrendingUp,
  Server,
  Lock,
  Workflow,
  Sparkle
} from "lucide-react";
import {
  HYRINX_SERVICE_CATEGORIES,
  ServiceCategory
} from "./servicesData";
import { soundFX } from "./soundFx";

interface CinematicBookshelfShowcaseProps {
  onOpenDetails: (catId: string) => void;
  onDeploy: (title: string) => void;
  onStartProject: () => void;
  onReplayIntro: () => void;
}

interface VolumeDefinition {
  id: string;
  volumeNumber: string;
  catId: string;
  bookTitle: string;
  serviceTitle: string;
  genre: string;
  tagline: string;
  plainSynopsis: string;
  whyYouNeedIt: string;
  deliverablesSummary: string[];
  spineColor: string;
  leatherGradient: string;
  coverTexture: string;
  foilColor: string;
  accentHex: string;
  ribbonColor: string;
  icon: any;
  shelfTier: 1 | 2 | 3;
  pagesCount: string;
  edition: string;
  heightPx: number;
  widthPx: number;
  tiltDeg: number;
  diagramType:
    | "web-funnel"
    | "app-architecture"
    | "brand-system"
    | "growth-funnel"
    | "video-pipeline"
    | "ai-agent"
    | "whatsapp-flow"
    | "ecommerce-funnel"
    | "digital-hub"
    | "watchtower"
    | "cyber-shield"
    | "cto-roadmap"
    | "labs-incubation";
}

const VOLUMES: VolumeDefinition[] = [
  {
    id: "vol-01",
    volumeNumber: "VOL. 01",
    catId: "web-dev",
    bookTitle: "THE ARCHITECT",
    serviceTitle: "Website Development & Web Apps",
    genre: "DIGITAL ARCHITECTURE & REAL ESTATE",
    tagline: "We don't just write code. We construct high-converting digital real estate.",
    plainSynopsis: "Everything you need to turn visitors into paying customers. Lightning-fast Next.js websites, mobile-perfect layouts, high-ranking Google SEO, and secure cloud hosting.",
    whyYouNeedIt: "A slow, outdated website actively leaks revenue. We replace template bloat with sub-second, custom-engineered digital storefronts that convert.",
    deliverablesSummary: [
      "Custom Next.js & React High-Speed Website",
      "Mobile-First Responsive UI & Fast Navigation",
      "Technical SEO & Google Lighthouse 95+ Score",
      "Enterprise AWS / Vercel Global CDN Setup"
    ],
    spineColor: "from-blue-900 via-blue-950 to-slate-950",
    leatherGradient: "from-blue-950 via-slate-900 to-black",
    coverTexture: "#0b1329",
    foilColor: "text-blue-400 border-blue-500/40",
    accentHex: "#3b82f6",
    ribbonColor: "bg-blue-500",
    icon: Code2,
    shelfTier: 1,
    pagesCount: "240 PP",
    edition: "2026 REVISED",
    heightPx: 310,
    widthPx: 50,
    tiltDeg: 0,
    diagramType: "web-funnel"
  },
  {
    id: "vol-02",
    volumeNumber: "VOL. 02",
    catId: "app-dev",
    bookTitle: "THE SOFTWARE ENGINE",
    serviceTitle: "Web Application & Software Engineering",
    genre: "ENTERPRISE SOFTWARE & SAAS",
    tagline: "Complex business logic translated into effortless user experiences.",
    plainSynopsis: "Custom software built for scale: Client portals, SaaS platforms, booking engines, and internal ERP dashboards that automate manual business bottlenecks.",
    whyYouNeedIt: "Off-the-shelf software forces you into monthly subscription traps and inflexible workflows. We build proprietary software your company actually owns.",
    deliverablesSummary: [
      "Full-Stack Web App (React / Node / PostgreSQL)",
      "Role-Based Authentication & Client Portals",
      "Stripe / Razorpay Payment Gateway Integration",
      "Scalable REST & GraphQL API Infrastructure"
    ],
    spineColor: "from-emerald-900 via-teal-950 to-slate-950",
    leatherGradient: "from-emerald-950 via-teal-900 to-black",
    coverTexture: "#081c15",
    foilColor: "text-emerald-400 border-emerald-500/40",
    accentHex: "#10b981",
    ribbonColor: "bg-emerald-500",
    icon: Terminal,
    shelfTier: 1,
    pagesCount: "380 PP",
    edition: "PROPRIETARY BUILD",
    heightPx: 295,
    widthPx: 54,
    tiltDeg: -1.5,
    diagramType: "app-architecture"
  },
  {
    id: "vol-03",
    volumeNumber: "VOL. 03",
    catId: "brand-identity",
    bookTitle: "THE VISUAL COUTURE",
    serviceTitle: "Brand Identity & Graphic Design",
    genre: "VISUAL IDENTITY & PRESTIGE",
    tagline: "First impressions dictate your pricing power. Make your brand unforgettable.",
    plainSynopsis: "Complete visual rebranding: Iconic logos, typography, luxury packaging design, brand guideline books, and marketing assets that position you as market leader.",
    whyYouNeedIt: "Cheap graphics signal cheap products. A unified, luxury identity lets you command premium pricing and builds instant consumer trust.",
    deliverablesSummary: [
      "Vector Logo Suite (Primary, Wordmark, Monogram)",
      "Comprehensive Brand Styleguide & Typography",
      "Social Media Design Kits & Advertising Templates",
      "Print & Packaging Production-Ready Vector Files"
    ],
    spineColor: "from-purple-900 via-fuchsia-950 to-slate-950",
    leatherGradient: "from-purple-950 via-purple-900 to-black",
    coverTexture: "#190a28",
    foilColor: "text-purple-400 border-purple-500/40",
    accentHex: "#a855f7",
    ribbonColor: "bg-purple-500",
    icon: Palette,
    shelfTier: 1,
    pagesCount: "190 PP",
    edition: "COUTURE EDITION",
    heightPx: 320,
    widthPx: 46,
    tiltDeg: 0,
    diagramType: "brand-system"
  },
  {
    id: "vol-04",
    volumeNumber: "VOL. 04",
    catId: "marketing-growth",
    bookTitle: "THE MARKET ACCELERATOR",
    serviceTitle: "Digital Marketing & Social Media Growth",
    genre: "ACQUISITION & PROFIT ENGINE",
    tagline: "Traffic is vanity. Conversion and measurable profit are sanity.",
    plainSynopsis: "Targeted Meta & Google ad campaigns, high-converting sales funnels, viral content strategies, and email retention automation that turns clicks into recurring revenue.",
    whyYouNeedIt: "Running random social media posts wastes budget. We engineer systematic ad funnels with transparent ROAS (Return On Ad Spend) tracking.",
    deliverablesSummary: [
      "High-ROAS Meta (Instagram/FB) & Google Ad Management",
      "Conversion Funnel & Dedicated Landing Pages",
      "Klaviyo / WhatsApp Automated Retargeting Flows",
      "Weekly Transparent Revenue & CAC Dashboard"
    ],
    spineColor: "from-amber-900 via-orange-950 to-slate-950",
    leatherGradient: "from-amber-950 via-stone-900 to-black",
    coverTexture: "#231206",
    foilColor: "text-amber-400 border-amber-500/40",
    accentHex: "#f59e0b",
    ribbonColor: "bg-amber-500",
    icon: Megaphone,
    shelfTier: 1,
    pagesCount: "310 PP",
    edition: "GROWTH RELEASE",
    heightPx: 305,
    widthPx: 52,
    tiltDeg: 1.5,
    diagramType: "growth-funnel"
  },
  {
    id: "vol-05",
    volumeNumber: "VOL. 05",
    catId: "commercial-video",
    bookTitle: "THE CELLULOID VISION",
    serviceTitle: "Commercial Video & Visual Production",
    genre: "HIGH-IMPACT VISUAL CINEMA",
    tagline: "Commercials that command reverence, emotion, and immediate action.",
    plainSynopsis: "Full-cycle cinematic video production: High-end 4K commercial reels, product showcases, 3D CGI motion graphics, and vertical reels tailored for ad conversion.",
    whyYouNeedIt: "Modern audiences scroll past static images in 0.5 seconds. Cinematic video holds attention, elevates brand status, and doubles ad conversion.",
    deliverablesSummary: [
      "Cinematic 4K Brand Film & Commercial Reel",
      "Vertical High-Conversion Instagram / YouTube Ad Cuts",
      "Professional Color Grading & Master Audio Engineering",
      "3D Product Renders & Motion Graphics Sequences"
    ],
    spineColor: "from-rose-900 via-red-950 to-slate-950",
    leatherGradient: "from-rose-950 via-red-950 to-black",
    coverTexture: "#230910",
    foilColor: "text-rose-400 border-rose-500/40",
    accentHex: "#f43f5e",
    ribbonColor: "bg-rose-500",
    icon: Clapperboard,
    shelfTier: 2,
    pagesCount: "160 PP",
    edition: "4K MASTER",
    heightPx: 325,
    widthPx: 48,
    tiltDeg: 0,
    diagramType: "video-pipeline"
  },
  {
    id: "vol-06",
    volumeNumber: "VOL. 06",
    catId: "ai-automation",
    bookTitle: "THE SYNTHETIC COGNITION",
    serviceTitle: "AI Automations & Intelligent Agents",
    genre: "AUTONOMOUS BUSINESS WORKFLOWS",
    tagline: "Put repetitive work on auto-pilot. Let AI work for your business 24/7.",
    plainSynopsis: "Custom LLM agents, automated lead qualification, intelligent invoice processing, and CRM synchronization that reduce operational payroll by hundreds of hours.",
    whyYouNeedIt: "Competitors using AI answer customer inquiries in 3 seconds while your team takes hours. We automate your back-office so you scale with zero extra headcount.",
    deliverablesSummary: [
      "Custom AI Autonomous Agent & LLM Integration",
      "Automated CRM Lead Pipeline & Instant Data Sync",
      "Document AI (Invoice, Contract & Form Extraction)",
      "Zero-Code Zapier / Make / Python Custom Webhooks"
    ],
    spineColor: "from-cyan-900 via-sky-950 to-slate-950",
    leatherGradient: "from-cyan-950 via-slate-900 to-black",
    coverTexture: "#081926",
    foilColor: "text-cyan-400 border-cyan-500/40",
    accentHex: "#06b6d4",
    ribbonColor: "bg-cyan-500",
    icon: Bot,
    shelfTier: 2,
    pagesCount: "420 PP",
    edition: "NEURAL RELEASE",
    heightPx: 290,
    widthPx: 56,
    tiltDeg: -2,
    diagramType: "ai-agent"
  },
  {
    id: "vol-07",
    volumeNumber: "VOL. 07",
    catId: "whatsapp-biz",
    bookTitle: "THE CONVERSATIONAL MATRIX",
    serviceTitle: "WhatsApp Business Solutions & Chatbots",
    genre: "DIRECT CONVERSATIONAL COMMERCE",
    tagline: "98% open rates right where your customers spend their entire day.",
    plainSynopsis: "Official WhatsApp Cloud API setup, automated booking and order confirmation bots, broadcasting engines, and multi-agent customer support inboxes.",
    whyYouNeedIt: "Emails get lost in spam folders. WhatsApp messages get opened within 3 minutes. Direct conversational sales convert up to 5x higher than traditional forms.",
    deliverablesSummary: [
      "Official Green-Tick WhatsApp Cloud API Setup",
      "24/7 Automated Lead Qualifier & FAQ Chatbot",
      "Interactive Product Catalog & Quick-Checkout Menus",
      "Centralized Multi-Agent Support Team Dashboard"
    ],
    spineColor: "from-green-900 via-emerald-950 to-slate-950",
    leatherGradient: "from-green-950 via-emerald-900 to-black",
    coverTexture: "#061f12",
    foilColor: "text-green-400 border-green-500/40",
    accentHex: "#22c55e",
    ribbonColor: "bg-green-500",
    icon: Zap,
    shelfTier: 2,
    pagesCount: "210 PP",
    edition: "CLOUD API VERIFIED",
    heightPx: 315,
    widthPx: 44,
    tiltDeg: 0,
    diagramType: "whatsapp-flow"
  },
  {
    id: "vol-08",
    volumeNumber: "VOL. 08",
    catId: "ecommerce",
    bookTitle: "THE COMMERCE BASTION",
    serviceTitle: "E-Commerce Store Development & Optimization",
    genre: "HIGH-VOLUME RETAIL INFRASTRUCTURE",
    tagline: "Turn window shoppers into loyal customers with friction-free checkout.",
    plainSynopsis: "High-performance Shopify & custom headless e-commerce storefronts, 1-click checkouts, upsell funnels, inventory syncing, and automated abandoned cart recovery.",
    whyYouNeedIt: "A 1-second checkout delay causes 7% cart abandonment. We design high-speed, frictionless shopping experiences that maximize Average Order Value (AOV).",
    deliverablesSummary: [
      "Custom Shopify Plus or Headless Commerce Store",
      "Frictionless 1-Click Checkout & Upsell System",
      "Automated Shipping, Logistics & Inventory Sync",
      "Cart Abandonment & Post-Purchase Retention Flows"
    ],
    spineColor: "from-amber-900 via-yellow-950 to-slate-950",
    leatherGradient: "from-amber-950 via-yellow-900 to-black",
    coverTexture: "#231804",
    foilColor: "text-amber-400 border-amber-500/40",
    accentHex: "#d97706",
    ribbonColor: "bg-amber-600",
    icon: ShoppingBag,
    shelfTier: 2,
    pagesCount: "340 PP",
    edition: "HIGH-AOV EDITION",
    heightPx: 300,
    widthPx: 52,
    tiltDeg: 2,
    diagramType: "ecommerce-funnel"
  },
  {
    id: "vol-09",
    volumeNumber: "VOL. 09",
    catId: "business-digitalization",
    bookTitle: "THE OPERATIONAL BLUEPRINT",
    serviceTitle: "Business Digitalization & Workflow Architecture",
    genre: "INFRASTRUCTURE & PROCESS MODERNIZATION",
    tagline: "Ditch messy spreadsheets. Run your entire company from a single dashboard.",
    plainSynopsis: "End-to-end digital transformation: Migrating manual paperwork to cloud databases, automated reporting, team task management, and unified business operating systems.",
    whyYouNeedIt: "Disorganized paper files and disconnected spreadsheets lead to lost invoices, billing errors, and wasted management hours. We unify your operations.",
    deliverablesSummary: [
      "Custom Centralized Operations Portal & Cloud Database",
      "Automated Daily Executive KPI & Revenue Reports",
      "Seamless Legacy Tool Migration & Data Backup",
      "Staff SOPs & Guided Onboarding Video Manuals"
    ],
    spineColor: "from-slate-800 via-zinc-900 to-black",
    leatherGradient: "from-zinc-900 via-slate-900 to-black",
    coverTexture: "#13171e",
    foilColor: "text-slate-300 border-slate-400/40",
    accentHex: "#94a3b8",
    ribbonColor: "bg-slate-400",
    icon: Layers,
    shelfTier: 3,
    pagesCount: "290 PP",
    edition: "ENTERPRISE TRANSIT",
    heightPx: 305,
    widthPx: 48,
    tiltDeg: 0,
    diagramType: "digital-hub"
  },
  {
    id: "vol-10",
    volumeNumber: "VOL. 10",
    catId: "maintenance-support",
    bookTitle: "THE WATCHTOWER",
    serviceTitle: "Ongoing Maintenance & Dedicated Management",
    genre: "MISSION-CRITICAL DEDICATED DEV OPS",
    tagline: "Sleep soundly knowing your digital infrastructure is monitored 24/7.",
    plainSynopsis: "Complete peace of mind: Automated cloud backups, instant emergency bug fixes, speed optimizations, server uptime monitoring, and ongoing monthly feature updates.",
    whyYouNeedIt: "Websites and servers break when left unattended. Hiring a full-time in-house engineering team costs $120k+/yr; our dedicated desk handles it all at a fraction of that.",
    deliverablesSummary: [
      "24/7 Cloud Uptime & Real-Time Security Monitoring",
      "Daily Automated Off-Site Backups & Disaster Recovery",
      "Monthly Feature Enhancements & Speed Maintenance",
      "Guaranteed <2-Hour Emergency Response SLA"
    ],
    spineColor: "from-indigo-900 via-blue-950 to-black",
    leatherGradient: "from-indigo-950 via-slate-950 to-black",
    coverTexture: "#0f1124",
    foilColor: "text-indigo-400 border-indigo-500/40",
    accentHex: "#6366f1",
    ribbonColor: "bg-indigo-500",
    icon: Activity,
    shelfTier: 3,
    pagesCount: "220 PP",
    edition: "24/7 SLA VERIFIED",
    heightPx: 295,
    widthPx: 46,
    tiltDeg: -1,
    diagramType: "watchtower"
  },
  {
    id: "vol-11",
    volumeNumber: "VOL. 11",
    catId: "cybersecurity",
    bookTitle: "THE FORTRESS",
    serviceTitle: "Cybersecurity, Hardening & Data Protection",
    genre: "ZERO-TRUST DEFENSE & HARDENING",
    tagline: "Your customer data and business IP are under constant attack. Lock the gates.",
    plainSynopsis: "Penetration testing, vulnerability auditing, SSL & TLS encryption hardening, DDoS attack mitigation, and GDPR/data compliance that keeps your business impenetrable.",
    whyYouNeedIt: "A single data breach or ransomware attack can destroy client trust and trigger catastrophic legal liabilities. We protect your digital perimeter.",
    deliverablesSummary: [
      "Full Penetration Testing & Vulnerability Audit Report",
      "Cloud DDoS & Web Application Firewall (WAF) Deployment",
      "End-to-End Database Encryption & Zero-Trust Access",
      "Regulatory Compliance & Security Certification Prep"
    ],
    spineColor: "from-red-950 via-zinc-950 to-black",
    leatherGradient: "from-red-950 via-stone-950 to-black",
    coverTexture: "#230606",
    foilColor: "text-red-400 border-red-500/40",
    accentHex: "#ef4444",
    ribbonColor: "bg-red-600",
    icon: ShieldCheck,
    shelfTier: 3,
    pagesCount: "360 PP",
    edition: "DEFENSE LEVEL 4",
    heightPx: 320,
    widthPx: 54,
    tiltDeg: 0,
    diagramType: "cyber-shield"
  },
  {
    id: "vol-12",
    volumeNumber: "VOL. 12",
    catId: "consulting-labs",
    bookTitle: "THE STRATEGIC ORACLE",
    serviceTitle: "Digital Consulting, Architecture & Future Labs",
    genre: "STRATEGIC TECH ROADMAPPING",
    tagline: "Stop guessing what technology to invest in. Get an exact battle-tested blueprint.",
    plainSynopsis: "CTO-level technical roadmapping, legacy architecture audits, vendor evaluation, and AI feasibility studies before you spend large capital on engineering.",
    whyYouNeedIt: "Building the wrong tech stack costs millions and months of wasted time. We audit your business goals and deliver clear, actionable architectural plans.",
    deliverablesSummary: [
      "Fractional CTO Technical Strategy & Architecture Deck",
      "Detailed 12-Month Technology & Investment Roadmap",
      "Vendor, Team & Software Stack Feasibility Analysis",
      "Interactive High-Fidelity Interactive Wireframes"
    ],
    spineColor: "from-violet-900 via-indigo-950 to-black",
    leatherGradient: "from-violet-950 via-slate-900 to-black",
    coverTexture: "#150a26",
    foilColor: "text-violet-400 border-violet-500/40",
    accentHex: "#8b5cf6",
    ribbonColor: "bg-violet-500",
    icon: Cpu,
    shelfTier: 3,
    pagesCount: "310 PP",
    edition: "ADVISORY CLASS",
    heightPx: 310,
    widthPx: 48,
    tiltDeg: 1.5,
    diagramType: "cto-roadmap"
  },
  {
    id: "vol-13",
    volumeNumber: "VOL. 13",
    catId: "hyrinx-originals",
    bookTitle: "THE PROPRIETARY LAB",
    serviceTitle: "Hyrinx Originals & Proprietary Ventures",
    genre: "INCUBATION & EXPERIMENTAL TECH",
    tagline: "We don't just build for clients. We invent our own proprietary digital ventures.",
    plainSynopsis: "In-house incubated micro-SaaS products, experimental AI tools, digital IP, and commercial software built and proven in live production by Hyrinx labs.",
    whyYouNeedIt: "We have skin in the game. The technologies, strategies, and growth systems we deploy for clients are field-tested in our own profitable digital ventures.",
    deliverablesSummary: [
      "Proprietary Hyrinx Tools & Reusable Software Kits",
      "Joint Venture & Co-Founding Tech Partnerships",
      "Early Access to Experimental AI Growth Modules",
      "Licensable Enterprise IP & Scalable Software Assets"
    ],
    spineColor: "from-yellow-900 via-amber-950 to-black",
    leatherGradient: "from-amber-950 via-stone-900 to-black",
    coverTexture: "#261c05",
    foilColor: "text-yellow-400 border-yellow-500/40",
    accentHex: "#eab308",
    ribbonColor: "bg-yellow-500",
    icon: Box,
    shelfTier: 3,
    pagesCount: "450 PP",
    edition: "FOUNDERS EDITION",
    heightPx: 330,
    widthPx: 58,
    tiltDeg: 0,
    diagramType: "labs-incubation"
  }
];

export default function CinematicBookshelfShowcase({
  onOpenDetails,
  onDeploy,
  onStartProject,
  onReplayIntro
}: CinematicBookshelfShowcaseProps) {
  const [selectedBook, setSelectedBook] = useState<VolumeDefinition | null>(null);
  // bookOpenPhase: "shelf" | "openingCover" | "opened" | "turningPage" | "closingCover"
  const [bookOpenPhase, setBookOpenPhase] = useState<
    "shelf" | "openingCover" | "opened" | "turningPage" | "closingCover"
  >("shelf");
  // currentSpread: 1 = Core Concept & Diagram, 2 = Deliverables & Workflow, 3 = Case Studies & Commission Order
  const [currentSpread, setCurrentSpread] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState(soundFX.isMuted);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedBook || bookOpenPhase === "shelf") return;

      if (e.key === "Escape") {
        handleCloseBook();
      } else if (e.key === "ArrowRight") {
        handleTurnNext();
      } else if (e.key === "ArrowLeft") {
        handleTurnPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBook, bookOpenPhase, currentSpread]);

  // Click on book from shelf
  const handleSelectBook = (vol: VolumeDefinition) => {
    setSelectedBook(vol);
    setCurrentSpread(1);
    setBookOpenPhase("openingCover");
    soundFX.playBookOpen();

    // After 3D cover swings open on hinge, set to "opened"
    setTimeout(() => {
      setBookOpenPhase("opened");
    }, 700);
  };

  // Turn page forward
  const handleTurnNext = () => {
    if (currentSpread >= 3 || bookOpenPhase === "turningPage") return;
    setBookOpenPhase("turningPage");
    soundFX.playPageFlip();

    setTimeout(() => {
      setCurrentSpread((prev) => prev + 1);
      setBookOpenPhase("opened");
    }, 550);
  };

  // Turn page backward
  const handleTurnPrev = () => {
    if (currentSpread <= 1 || bookOpenPhase === "turningPage") return;
    setBookOpenPhase("turningPage");
    soundFX.playPageFlip();

    setTimeout(() => {
      setCurrentSpread((prev) => prev - 1);
      setBookOpenPhase("opened");
    }, 550);
  };

  // Close book and return to shelf
  const handleCloseBook = () => {
    if (bookOpenPhase === "closingCover" || bookOpenPhase === "shelf") return;
    setBookOpenPhase("closingCover");
    soundFX.playBookClose();

    setTimeout(() => {
      setBookOpenPhase("shelf");
      setSelectedBook(null);
      setCurrentSpread(1);
    }, 650);
  };

  const toggleSound = () => {
    soundFX.isMuted = !soundFX.isMuted;
    setIsAudioMuted(soundFX.isMuted);
    if (!soundFX.isMuted) {
      soundFX.ensureAudioReady();
      soundFX.playSmoothOpening();
    } else {
      soundFX.stopAll();
    }
  };

  const activeCategoryData = selectedBook
    ? HYRINX_SERVICE_CATEGORIES.find((c) => c.id === selectedBook.catId)
    : null;

  return (
    <div className="relative bg-[#050608] text-neutral-100 min-h-screen overflow-x-hidden flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* ========================================================================= */}
      {/* 3D ROOM ATMOSPHERE: WALL SCONCES, HARDWOOD PARQUET FLOOR, WOOD PANELING */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Wall Ambient Library Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1300px] h-[500px] bg-gradient-to-b from-amber-600/15 via-amber-900/5 to-transparent blur-3xl opacity-70" />

        {/* Ambient Wall Sconces (Left & Right) */}
        <div className="absolute top-24 left-8 sm:left-24 w-40 h-40 bg-amber-500/10 blur-2xl rounded-full" />
        <div className="absolute top-24 right-8 sm:right-24 w-40 h-40 bg-amber-500/10 blur-2xl rounded-full" />

        {/* Wooden Wainscoting Vertical Seams Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:64px_64px] opacity-40" />

        {/* Hardwood Parquet Floor Gradient at Bottom */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#0e0a07] via-[#090705] to-transparent opacity-90 border-t border-amber-900/10" />
      </div>

      {/* Top Archival Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#08090f]/90 border-b border-amber-500/20 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/25 via-amber-600/10 to-transparent border border-amber-500/40 flex items-center justify-center shadow-inner">
            <Library className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-amber-400 font-semibold">
                The Hyrinx Library Room
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                13 VOLUMES • 13 SERVICES
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden md:block">
              Click any volume on the bookcase. It slides into the room and opens with real 3D page physics.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onReplayIntro}
            className="px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-amber-500/40 bg-neutral-900/80 hover:bg-neutral-800 text-xs text-neutral-300 hover:text-white transition flex items-center gap-1.5"
            title="Replay cinematic title opening"
          >
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span className="hidden sm:inline">Replay Intro</span>
          </button>

          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition flex items-center justify-center ${
              isAudioMuted
                ? "border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-sm"
            }`}
            title={isAudioMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <a
            href="https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20am%20exploring%20the%20Bookshelf%20and%20would%20like%20to%20commission%20a%20volume."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs transition flex items-center gap-1.5 shadow-lg shadow-amber-600/20"
          >
            <PhoneCall className="w-3.5 h-3.5 text-black" />
            <span className="hidden xs:inline">Order Volume</span>
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* THE ROOM: SINGLE SHOWCASE BOOKSHELF STANDING IN THE CENTER */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center space-y-8">
        {/* Room Atmosphere Inscription */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>The Private Study Room</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-wide">
            One Bookshelf. 13 Living Volumes.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Each book represents one definitive Hyrinx capability. Click any book to draw it from the shelf and open its pages with real physics, diagrams, and plain English breakdowns.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* THE MASTER WOODEN BOOKCASE (AUTHENTIC SMOKED WALNUT CABINET) */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#18110b] via-[#0f0b07] to-[#070503] border-4 border-[#2b1c11] shadow-[0_40px_120px_rgba(0,0,0,0.98)] p-4 sm:p-7 md:p-9 space-y-9 overflow-hidden">
          {/* Ambient Wood Warmth Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.18),transparent_65%)] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-600/30 via-amber-400/60 to-amber-600/30 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

          {/* Crown Archival Plate */}
          <div className="flex items-center justify-between pb-2 border-b border-amber-900/40 text-[10px] font-mono tracking-widest text-amber-300/70 uppercase">
            <span>STUDY ROOM BOOKCASE • EDITION 2026</span>
            <span>CLICK TO DRAW FROM SHELF</span>
          </div>

          {/* SHELF I: Digital Architecture & Software Engineering */}
          <AestheticShelfTier
            tierNumber="I"
            title="DIGITAL ARCHITECTURE & SOFTWARE SYSTEMS"
            volumes={VOLUMES.filter((v) => v.shelfTier === 1)}
            onSelectBook={handleSelectBook}
          />

          {/* SHELF II: Visual Cinema & Synthetic Intelligence */}
          <AestheticShelfTier
            tierNumber="II"
            title="VISUAL CINEMA & AUTONOMOUS COGNITION"
            volumes={VOLUMES.filter((v) => v.shelfTier === 2)}
            onSelectBook={handleSelectBook}
          />

          {/* SHELF III: Mission-Critical Defense, Operations & Proprietary Labs */}
          <AestheticShelfTier
            tierNumber="III"
            title="CYBER DEFENSE, OPERATIONS & PROPRIETARY LABS"
            volumes={VOLUMES.filter((v) => v.shelfTier === 3)}
            onSelectBook={handleSelectBook}
          />
        </div>

        {/* Enterprise Retainer Footer Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950/80 border border-amber-500/25 shadow-xl text-xs text-neutral-300">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Need an entire multi-division digital transformation suite?</span>
          </div>
          <button
            onClick={onStartProject}
            className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-white font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <span>Commission Full Enterprise Canon</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-900/80 py-4 px-4 text-center text-xs text-neutral-500 font-mono">
        © 2026 HYRINX PRIVATE ARCHIVE • PULL ANY BOOK TO READ
      </footer>

      {/* ========================================================================= */}
      {/* REAL PHYSICAL 3D BOOK STAGE (3D COVER HINGE + REAL PAGE TURNING) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={handleCloseBook}
            style={{ perspective: "2500px" }}
          >
            {/* The 3D Book Experience Container */}
            <motion.div
              initial={{ scale: 0.5, y: 80, rotateX: 18 }}
              animate={
                bookOpenPhase === "closingCover"
                  ? { scale: 0.5, y: 80, rotateX: 18, opacity: 0 }
                  : { scale: 1, y: 0, rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl my-auto select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Study Desk Lamp Floating Overhead Light Bar */}
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                  <span className="text-xs font-mono uppercase text-amber-300 font-bold tracking-widest">
                    {selectedBook.volumeNumber}: {selectedBook.bookTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Page Indicator & Turn Buttons */}
                  <div className="flex items-center bg-black/60 rounded-lg p-0.5 border border-amber-500/30 text-xs font-mono text-neutral-300">
                    <button
                      onClick={handleTurnPrev}
                      disabled={currentSpread === 1 || bookOpenPhase === "turningPage"}
                      className="p-1.5 rounded hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition"
                      title="Previous Page (or press ← arrow)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-2.5 text-[11px] font-semibold text-amber-300">
                      SPREAD {currentSpread} OF 3
                    </span>
                    <button
                      onClick={handleTurnNext}
                      disabled={currentSpread === 3 || bookOpenPhase === "turningPage"}
                      className="p-1.5 rounded hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition"
                      title="Next Page (or press → arrow)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Physical Close Book Button */}
                  <button
                    onClick={handleCloseBook}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-medium transition flex items-center gap-1.5 shadow-sm"
                    title="Close book and return to shelf"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Close Book</span>
                  </button>
                </div>
              </div>

              {/* THE OPEN HARDCOVER BOOK SPREAD */}
              <div
                className="relative rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.98)] overflow-hidden border-2 border-amber-500/40 flex flex-col md:flex-row min-h-[500px] sm:min-h-[560px] bg-[#0c0e14]"
                style={{
                  boxShadow: `0 25px 80px -10px ${selectedBook.accentHex}40, 0 0 0 1px rgba(255,255,255,0.05)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* 3D Stacked Paper Edges (Giving real physical page block thickness) */}
                <div className="absolute right-0 inset-y-0 w-2.5 bg-gradient-to-r from-neutral-800 via-[#e5dfce] to-neutral-700 opacity-60 z-30 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-b from-neutral-800 via-[#e5dfce] to-neutral-900 opacity-60 z-30 pointer-events-none" />

                {/* Stitched Center Leather Spine Gutter */}
                <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/80 via-black/95 to-black/80 z-20 pointer-events-none shadow-inner" />

                {/* ========================================================================= */}
                {/* SPREAD 1: CHAPTER I (THE PREMISE) & VISUAL ARCHITECTURE DIAGRAM */}
                {/* ========================================================================= */}
                {currentSpread === 1 && (
                  <motion.div
                    key="spread-1"
                    initial={{ opacity: 0, rotateY: 12 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full flex flex-col md:flex-row"
                  >
                    {/* LEFT PAGE: Chapter I — The Core Premise */}
                    <div
                      className={`w-full md:w-1/2 p-6 sm:p-10 bg-gradient-to-br ${selectedBook.leatherGradient} border-b md:border-b-0 md:border-r border-amber-500/20 flex flex-col justify-between relative`}
                    >
                      {/* Corner Filigrees */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/40 pointer-events-none" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/40 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/40 pointer-events-none" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/40 pointer-events-none" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-b border-amber-500/20 pb-2">
                          <span className="text-amber-300 font-bold uppercase tracking-widest">
                            {selectedBook.volumeNumber} • PAGE 01
                          </span>
                          <span>{selectedBook.edition}</span>
                        </div>

                        {/* Emblem & Title */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl border-2 border-amber-400/40 flex items-center justify-center bg-black/50 shadow-2xl shrink-0"
                            style={{ color: selectedBook.accentHex }}
                          >
                            <selectedBook.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold block">
                              {selectedBook.genre}
                            </span>
                            <h2 className="text-lg sm:text-2xl font-serif text-white font-medium">
                              {selectedBook.bookTitle}
                            </h2>
                            <p className="text-xs text-neutral-300 font-medium">
                              {selectedBook.serviceTitle}
                            </p>
                          </div>
                        </div>

                        <blockquote className="border-l-2 border-amber-400/50 pl-3 py-1 italic text-amber-100/90 text-xs sm:text-sm font-serif leading-relaxed">
                          “{selectedBook.tagline}”
                        </blockquote>

                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                            CHAPTER I: THE FOUNDATION
                          </span>
                          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                            {selectedBook.plainSynopsis}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>P. 01</span>
                        <span className="text-amber-400">HYRINX ARCHIVE</span>
                      </div>
                    </div>

                    {/* RIGHT PAGE: Visual Diagram & Industry Problem Solved */}
                    <div className="w-full md:w-1/2 p-6 sm:p-10 bg-[#0d0f16] flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-b border-neutral-800 pb-2">
                          <span>HYRINX ARCHIVE</span>
                          <span className="text-rose-400 font-bold uppercase tracking-widest">
                            PAGE 02 • CHAPTER II
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                            VISUAL ARCHITECTURE DIAGRAM
                          </span>
                          <h3 className="text-base sm:text-lg font-serif text-white">
                            How This Capability Operates
                          </h3>
                        </div>

                        {/* Interactive Visual Diagram */}
                        <ServiceVisualDiagram
                          diagramType={selectedBook.diagramType}
                          accentHex={selectedBook.accentHex}
                        />

                        {/* Why Businesses Need This */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                            THE REAL BUSINESS PROBLEM SOLVED
                          </span>
                          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                            {selectedBook.whyYouNeedIt}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-neutral-500">P. 02</span>
                        <button
                          onClick={handleTurnNext}
                          className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                        >
                          <span>Deliverables (P. 03) →</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ========================================================================= */}
                {/* SPREAD 2: CHAPTER III (DELIVERABLES) & CHAPTER IV (EXECUTION ROADMAP) */}
                {/* ========================================================================= */}
                {currentSpread === 2 && (
                  <motion.div
                    key="spread-2"
                    initial={{ opacity: 0, rotateY: 12 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full flex flex-col md:flex-row"
                  >
                    {/* LEFT PAGE: Concrete Deliverables Checklist */}
                    <div className="w-full md:w-1/2 p-6 sm:p-10 bg-[#0e1017] border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-b border-neutral-800 pb-2">
                          <span className="text-emerald-400 font-bold uppercase tracking-widest">
                            PAGE 03 • CHAPTER III
                          </span>
                          <span>HYRINX ARCHIVE</span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                            CONCRETE DELIVERABLES
                          </span>
                          <h3 className="text-lg sm:text-xl font-serif text-white">
                            What You Actually Receive
                          </h3>
                        </div>

                        <div className="space-y-2 pt-1">
                          {selectedBook.deliverablesSummary.map((item, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-800 text-xs text-neutral-200"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <button
                          onClick={handleTurnPrev}
                          className="text-neutral-400 hover:text-white transition flex items-center gap-1"
                        >
                          ← P. 01–02
                        </button>
                        <span>P. 03</span>
                      </div>
                    </div>

                    {/* RIGHT PAGE: Step-by-Step 4-Stage Execution Roadmap Diagram */}
                    <div className="w-full md:w-1/2 p-6 sm:p-10 bg-[#0d0f16] flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-b border-neutral-800 pb-2">
                          <span>HYRINX ARCHIVE</span>
                          <span className="text-cyan-400 font-bold uppercase tracking-widest">
                            PAGE 04 • CHAPTER IV
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                            EXECUTION ROADMAP
                          </span>
                          <h3 className="text-lg sm:text-xl font-serif text-white">
                            How We Deploy This Service
                          </h3>
                        </div>

                        {/* Visual 4-Stage Roadmap */}
                        <div className="space-y-2.5 pt-1">
                          {activeCategoryData?.workflowSteps ? (
                            activeCategoryData.workflowSteps.slice(0, 4).map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-neutral-900/50 border border-neutral-800/80"
                              >
                                <span className="px-2 py-0.5 rounded bg-black/60 border border-amber-500/30 text-[10px] font-mono text-amber-400 font-bold shrink-0">
                                  {step.step}
                                </span>
                                <div>
                                  <h5 className="text-xs font-semibold text-white">
                                    {step.label}
                                  </h5>
                                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-normal">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-neutral-300">
                              Discovery & Architecture → Sprint Prototyping → Code Hardening & Auditing → Live Production Release.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-neutral-500">P. 04</span>
                        <button
                          onClick={handleTurnNext}
                          className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                        >
                          <span>Commission (P. 05) →</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ========================================================================= */}
                {/* SPREAD 3: CHAPTER V (PROVEN RESULTS) & CHAPTER VI (COMMISSION ORDER) */}
                {/* ========================================================================= */}
                {currentSpread === 3 && (
                  <motion.div
                    key="spread-3"
                    initial={{ opacity: 0, rotateY: 12 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full flex flex-col md:flex-row"
                  >
                    {/* LEFT PAGE: Proven Results & Case Studies */}
                    <div className="w-full md:w-1/2 p-6 sm:p-10 bg-[#0e1017] border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-b border-neutral-800 pb-2">
                          <span className="text-amber-400 font-bold uppercase tracking-widest">
                            PAGE 05 • CHAPTER V
                          </span>
                          <span>HYRINX ARCHIVE</span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                            PROVEN TRACK RECORD
                          </span>
                          <h3 className="text-lg sm:text-xl font-serif text-white">
                            Production Client Outcomes
                          </h3>
                        </div>

                        {activeCategoryData?.useCases && activeCategoryData.useCases.length > 0 ? (
                          <div className="space-y-2.5 pt-1">
                            {activeCategoryData.useCases.map((uc, uIdx) => (
                              <div
                                key={uIdx}
                                className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-amber-300">
                                    {uc.client}
                                  </span>
                                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                    VERIFIED
                                  </span>
                                </div>
                                <p className="text-[11px] text-neutral-200 font-medium">
                                  {uc.title}
                                </p>
                                <p className="text-[11px] text-neutral-400 leading-normal">
                                  {uc.outcome}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300">
                            Enterprise deployments with guaranteed performance SLAs, verified ROI, and continuous support.
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <button
                          onClick={handleTurnPrev}
                          className="text-neutral-400 hover:text-white transition flex items-center gap-1"
                        >
                          ← P. 03–04
                        </button>
                        <span>P. 05</span>
                      </div>
                    </div>

                    {/* RIGHT PAGE: Commission Order & Actions */}
                    <div className="w-full md:w-1/2 p-6 sm:p-10 bg-[#0d0f16] flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-b border-neutral-800 pb-2">
                          <span>HYRINX ARCHIVE</span>
                          <span className="text-emerald-400 font-bold uppercase tracking-widest">
                            PAGE 06 • CHAPTER VI
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                            READY TO DEPLOY
                          </span>
                          <h3 className="text-lg sm:text-xl font-serif text-white">
                            Commission This Volume
                          </h3>
                          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                            Commission this division immediately, or inspect the comprehensive technical blueprint dossier.
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-1">
                          {/* 1. Commission Volume Button */}
                          <button
                            onClick={() => onDeploy(selectedBook.serviceTitle)}
                            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
                          >
                            <Zap className="w-4 h-4 text-black" />
                            <span>Commission This Volume</span>
                          </button>

                          {/* 2. Blueprint Dossier Modal */}
                          <button
                            onClick={() => onOpenDetails(selectedBook.catId)}
                            className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 hover:border-amber-400 text-amber-200 hover:text-white font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4 text-amber-400" />
                            <span>Inspect Deep Technical Blueprint</span>
                          </button>

                          {/* 3. WhatsApp Direct Line */}
                          <a
                            href={`https://wa.me/919730213645?text=Hello%20Hyrinx%2C%20I%20am%20reviewing%20${encodeURIComponent(
                              selectedBook.volumeNumber + ": " + selectedBook.bookTitle + " (" + selectedBook.serviceTitle + ")"
                            )}%20and%20want%20to%20get%20started.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono transition flex items-center justify-center gap-2"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Direct WhatsApp: +91-9730213645</span>
                          </a>
                        </div>
                      </div>

                      {/* Close & Return to Shelf Button */}
                      <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-neutral-500">P. 06</span>
                        <button
                          onClick={handleCloseBook}
                          className="px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Close Book & Return to Shelf</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: AESTHETIC SHELF TIER
// ---------------------------------------------------------------------------
interface AestheticShelfTierProps {
  tierNumber: string;
  title: string;
  volumes: VolumeDefinition[];
  onSelectBook: (vol: VolumeDefinition) => void;
}

function AestheticShelfTier({
  tierNumber,
  title,
  volumes,
  onSelectBook
}: AestheticShelfTierProps) {
  return (
    <div className="relative space-y-2">
      {/* Overhead Recessed Warm LED Strip Glow */}
      <div className="absolute inset-x-8 -top-3 h-4 bg-gradient-to-b from-amber-400/25 to-transparent blur-md pointer-events-none" />

      {/* Brass Placard on Shelf Wall */}
      <div className="flex items-center justify-between pb-1.5 px-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400/80 shadow-[0_0_6px_#f59e0b]" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-amber-300 font-semibold uppercase">
            TIER {tierNumber} • {title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:block">
          SOLID SMOKED WALNUT
        </span>
      </div>

      {/* Row of Realistic Standing Books on Shelf */}
      <div className="relative flex items-end justify-center sm:justify-start gap-3 sm:gap-4 md:gap-6 pt-12 pb-2 px-3 overflow-x-auto scrollbar-none">
        {/* Left Brass Geometric Bookend */}
        <div className="hidden sm:flex flex-col items-center justify-end h-[240px] w-6 pb-1 shrink-0 opacity-80 pointer-events-none">
          <div className="w-4 h-36 bg-gradient-to-b from-amber-500/40 via-amber-700/60 to-amber-900/80 border-r-2 border-t-2 border-amber-400/60 rounded-tr-md shadow-lg" />
          <div className="w-7 h-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-sm shadow-md" />
        </div>

        {/* The Books */}
        {volumes.map((vol) => (
          <AestheticBookSpine
            key={vol.id}
            vol={vol}
            onClick={() => onSelectBook(vol)}
          />
        ))}

        {/* Right Brass Geometric Bookend */}
        <div className="hidden sm:flex flex-col items-center justify-end h-[240px] w-6 pb-1 shrink-0 opacity-80 pointer-events-none">
          <div className="w-4 h-36 bg-gradient-to-b from-amber-500/40 via-amber-700/60 to-amber-900/80 border-l-2 border-t-2 border-amber-400/60 rounded-tl-md shadow-lg" />
          <div className="w-7 h-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 rounded-sm shadow-md" />
        </div>
      </div>

      {/* Solid Beveled Smoked Walnut Shelf Board with Brass Trim */}
      <div className="relative h-7 sm:h-8 bg-gradient-to-r from-[#382312] via-[#523319] to-[#382312] rounded-sm border-t-2 border-[#7c4d26] shadow-[0_12px_24px_rgba(0,0,0,0.95)] flex items-center justify-between px-4 text-[9px] font-mono text-amber-300/60 uppercase tracking-widest">
        <span>ARCHIVE SHELF {tierNumber}</span>
        <div className="w-16 h-1 bg-amber-500/30 rounded-full" />
        <span>RESERVED VOLUMES</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: AESTHETIC BOOK SPINE ON SHELF
// ---------------------------------------------------------------------------
interface AestheticBookSpineProps {
  vol: VolumeDefinition;
  onClick: () => void;
}

function AestheticBookSpine({ vol, onClick }: AestheticBookSpineProps) {
  const IconComponent = vol.icon;

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => soundFX.playUiHover()}
      whileHover={{ y: -30, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative cursor-pointer select-none transition-all group flex-shrink-0"
      style={{
        transform: `rotate(${vol.tiltDeg}deg)`
      }}
    >
      {/* Golden Overhead Spotlight Beam on Hover */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-32 bg-gradient-to-b from-amber-400/0 via-amber-400/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Realistic Book Spine */}
      <div
        className={`relative rounded-t-sm shadow-2xl flex flex-col justify-between items-center py-4 px-1 border border-neutral-800/80 group-hover:border-amber-400/90 bg-gradient-to-b ${vol.spineColor} transition-all`}
        style={{
          width: `${vol.widthPx}px`,
          height: `${vol.heightPx}px`,
          boxShadow: `0 12px 28px -5px ${vol.accentHex}40, inset 0 0 14px rgba(0,0,0,0.9)`
        }}
      >
        {/* Raised Leather Spine Ribs (Cords) */}
        <div className="absolute top-8 inset-x-0 h-[2px] bg-amber-400/40 shadow-sm" />
        <div className="absolute top-10 inset-x-0 h-[1px] bg-black/70" />
        <div className="absolute bottom-12 inset-x-0 h-[2px] bg-amber-400/40 shadow-sm" />
        <div className="absolute bottom-10 inset-x-0 h-[1px] bg-black/70" />

        {/* Top Volume Tag & Emblem */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-tighter text-amber-300 font-bold">
            {vol.volumeNumber}
          </span>
          <div
            className="w-5 h-5 rounded-full mt-1.5 flex items-center justify-center border border-amber-400/40 bg-black/50 shadow-inner"
            style={{ color: vol.accentHex }}
          >
            <IconComponent className="w-3 h-3" />
          </div>
        </div>

        {/* Vertical Spine Title */}
        <div className="h-full flex items-center justify-center my-3 overflow-hidden">
          <span className="transform -rotate-90 whitespace-nowrap text-[11px] sm:text-xs tracking-[0.2em] font-serif uppercase font-bold text-amber-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] group-hover:text-amber-300 transition">
            {vol.bookTitle}
          </span>
        </div>

        {/* Bottom Archival Seal */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
            HYRINX
          </span>
        </div>

        {/* Hanging Silk Ribbon Bookmark with Pointed Fishtail */}
        <div
          className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-2.5 h-6 rounded-b shadow-md ${vol.ribbonColor} transition-transform group-hover:scale-y-125`}
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
        />
      </div>

      {/* Book Shadow On Shelf Board */}
      <div className="w-full h-3.5 bg-black/90 blur-sm rounded-full mt-1 group-hover:scale-110 transition" />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: CLEAN VISUAL ARCHITECTURE DIAGRAMS (EASY TO UNDERSTAND)
// ---------------------------------------------------------------------------
interface ServiceVisualDiagramProps {
  diagramType: VolumeDefinition["diagramType"];
  accentHex: string;
}

function ServiceVisualDiagram({ diagramType, accentHex }: ServiceVisualDiagramProps) {
  switch (diagramType) {
    case "web-funnel":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>VISITOR CLICK</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-emerald-400 font-bold">&lt; 0.5s FAST LOAD</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-amber-400 font-bold">PAID CLIENT</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
              <span className="text-neutral-400 block">LIGHTHOUSE</span>
              <span className="text-emerald-400 font-bold text-xs">99 / 100</span>
            </div>
            <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
              <span className="text-neutral-400 block">SEO RANK</span>
              <span className="text-blue-400 font-bold text-xs">TOP 3</span>
            </div>
            <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
              <span className="text-neutral-400 block">CONVERSION</span>
              <span className="text-amber-400 font-bold text-xs">+140%</span>
            </div>
          </div>
        </div>
      );

    case "app-architecture":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
            <span className="px-2 py-1 rounded bg-neutral-900 border border-emerald-500/30 text-emerald-400">
              Client Portal
            </span>
            <span className="text-emerald-400 font-bold">⇄</span>
            <span className="px-2 py-1 rounded bg-neutral-900 border border-cyan-500/30 text-cyan-400">
              Secure Auth & DB
            </span>
            <span className="text-emerald-400 font-bold">⇄</span>
            <span className="px-2 py-1 rounded bg-neutral-900 border border-amber-500/30 text-amber-400">
              Auto Revenue
            </span>
          </div>
          <p className="text-[10px] text-neutral-400 text-center font-mono">
            Zero third-party SaaS rent. You own 100% of your source code & data.
          </p>
        </div>
      );

    case "brand-system":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
          <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
            <div className="p-1.5 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300">
              Logo Suite
            </div>
            <div className="p-1.5 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300">
              Typography
            </div>
            <div className="p-1.5 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300">
              Packaging
            </div>
            <div className="p-1.5 rounded bg-purple-950/40 border border-purple-500/30 text-purple-300">
              Prestige
            </div>
          </div>
          <p className="text-[10px] text-neutral-400 text-center font-mono">
            Command 2x–5x higher client fees with executive luxury positioning.
          </p>
        </div>
      );

    case "growth-funnel":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5 text-[10px] font-mono">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Meta / Google Targeted Ads</span>
            <span className="text-amber-400 font-bold">10,000 Reach</span>
          </div>
          <div className="w-full bg-neutral-900 rounded-full h-1.5">
            <div className="bg-amber-500 h-1.5 rounded-full w-[80%]" />
          </div>
          <div className="flex items-center justify-between text-neutral-400 pt-1">
            <span>High-Intent Landing Page Leads</span>
            <span className="text-amber-400 font-bold">850 Qualified</span>
          </div>
          <div className="w-full bg-neutral-900 rounded-full h-1.5">
            <div className="bg-amber-400 h-1.5 rounded-full w-[45%]" />
          </div>
          <div className="flex items-center justify-between text-emerald-400 font-bold pt-1">
            <span>Net Return on Ad Spend (ROAS)</span>
            <span>4.2x ROAS</span>
          </div>
        </div>
      );

    case "video-pipeline":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-center">
          <div className="flex items-center justify-around text-[10px] font-mono text-neutral-300">
            <span className="p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">
              4K Raw Shoot
            </span>
            <span>→</span>
            <span className="p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">
              3D CGI Grading
            </span>
            <span>→</span>
            <span className="p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">
              Viral Ad Cut
            </span>
          </div>
          <p className="text-[10px] text-neutral-400 font-mono">
            Stop thumbs scrolling in 0.5s. Triples brand authority and ad recall.
          </p>
        </div>
      );

    case "ai-agent":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-[10px] font-mono">
          <div className="flex items-center justify-between p-1.5 rounded bg-neutral-900 border border-cyan-500/30 text-cyan-300">
            <span>Customer Inquiry</span>
            <span className="text-emerald-400 font-bold">Instant 2s Reply</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-neutral-900 border border-cyan-500/30 text-cyan-300">
            <span>Invoice / Doc Parsing</span>
            <span className="text-emerald-400 font-bold">100% Automated</span>
          </div>
          <p className="text-[10px] text-neutral-400 text-center font-mono">
            Saves 40+ hours of repetitive manual admin work every week.
          </p>
        </div>
      );

    case "whatsapp-flow":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-[10px] font-mono">
          <div className="flex items-center justify-between text-neutral-300">
            <span className="text-emerald-400 font-bold">WhatsApp Cloud API</span>
            <span className="text-emerald-300">98% Open Rate</span>
          </div>
          <div className="p-2 rounded bg-neutral-900 border border-emerald-500/30 flex items-center justify-between">
            <span>Smart Bot Booking & Catalog</span>
            <span className="text-amber-400 font-bold">1-Click Checkout</span>
          </div>
          <p className="text-[10px] text-neutral-400 text-center font-mono">
            Reaches customers directly where they check their phones all day.
          </p>
        </div>
      );

    case "ecommerce-funnel":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1.5 text-[10px] font-mono">
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="p-1.5 rounded bg-neutral-900 border border-amber-500/30 text-amber-300">
              1-Click Buy
            </div>
            <div className="p-1.5 rounded bg-neutral-900 border border-amber-500/30 text-amber-300">
              Auto Upsell
            </div>
            <div className="p-1.5 rounded bg-neutral-900 border border-amber-500/30 text-amber-300">
              Cart Recovery
            </div>
          </div>
          <p className="text-[10px] text-neutral-400 text-center font-mono pt-1">
            Engineered to boost Average Order Value (AOV) by +35%.
          </p>
        </div>
      );

    case "digital-hub":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-[10px] font-mono text-center">
          <div className="flex items-center justify-between text-neutral-300">
            <span className="text-rose-400 line-through">Messy Spreadsheets</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Unified ERP Dashboard</span>
          </div>
          <p className="text-[10px] text-neutral-400 font-mono">
            Real-time daily KPI & revenue reports accessible from any device.
          </p>
        </div>
      );

    case "watchtower":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-[10px] font-mono">
          <div className="flex items-center justify-between text-neutral-300">
            <span>Uptime Monitoring</span>
            <span className="text-emerald-400 font-bold">99.99% Online</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span>Daily Cloud Backups</span>
            <span className="text-indigo-400 font-bold">Automated</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span>Emergency Bug SLA</span>
            <span className="text-amber-400 font-bold">&lt; 2 Hours</span>
          </div>
        </div>
      );

    case "cyber-shield":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-[10px] font-mono">
          <div className="flex items-center justify-between text-neutral-300">
            <span>WAF DDoS Shield</span>
            <span className="text-emerald-400 font-bold">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span>Database Encryption</span>
            <span className="text-emerald-400 font-bold">AES-256</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span>Penetration Test Audit</span>
            <span className="text-red-400 font-bold">0 VULNERABILITIES</span>
          </div>
        </div>
      );

    case "cto-roadmap":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-[10px] font-mono text-center">
          <div className="grid grid-cols-3 gap-1">
            <div className="p-1 rounded bg-violet-950/40 border border-violet-500/30 text-violet-300">
              Q1: Audit
            </div>
            <div className="p-1 rounded bg-violet-950/40 border border-violet-500/30 text-violet-300">
              Q2: Re-Arch
            </div>
            <div className="p-1 rounded bg-violet-950/40 border border-violet-500/30 text-violet-300">
              Q3: Scale
            </div>
          </div>
          <p className="text-[10px] text-neutral-400 font-mono">
            Prevents costly technical mistakes before spending engineering budgets.
          </p>
        </div>
      );

    case "labs-incubation":
      return (
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-[10px] font-mono text-center">
          <div className="flex items-center justify-between text-neutral-300">
            <span className="text-yellow-400 font-bold">In-House Lab R&D</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Field Proven IP</span>
          </div>
          <p className="text-[10px] text-neutral-400 font-mono">
            Every technology we deploy for clients is tested in our own ventures first.
          </p>
        </div>
      );

    default:
      return null;
  }
}
