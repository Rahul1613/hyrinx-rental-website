'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  ArrowRight,
  Sparkles,
  Building2,
  Rocket,
  Code,
  Briefcase,
  PartyPopper,
  Heart,
  CheckCircle2,
  ExternalLink,
  Shield,
  Zap,
  TrendingUp,
  Star,
  Users,
  ChevronRight,
  Globe,
  Lock,
  Layers,
  BarChart3,
  Calendar,
  Check,
  BookOpen,
  Laptop,
  GraduationCap,
} from 'lucide-react'

interface InteractiveHeroProps {
  hero?: {
    headline?: string
    subheadline?: string
    primaryCtaText?: string
    primaryCtaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    badgeText?: string
  }
  categories?: any[]
  lowestPrice?: number
  isDemoPage?: boolean
}

type BentoCategory = 'all' | 'business' | 'students' | 'portfolio' | 'events'

export default function InteractiveHero({
  hero,
  categories = [],
  lowestPrice = 149,
  isDemoPage = false,
}: InteractiveHeroProps) {
  const [activeFilter, setActiveFilter] = useState<BentoCategory>('all')
  const [selectedDuration, setSelectedDuration] = useState<'1day' | '3days' | '7days' | '30days'>('3days')
  const [interactiveTestStep, setInteractiveTestStep] = useState<string | null>(null)

  const triggerCelebration = (label: string) => {
    setInteractiveTestStep(label)
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#2563EB', '#4F46E5', '#06B6D4', '#10B981', '#F59E0B'],
      disableForReducedMotion: true,
    })
    setTimeout(() => setInteractiveTestStep(null), 3000)
  }

  const durationPricing = {
    '1day': { duration: '1 Day', price: 149, save: '₹24,851 (99% saved)' },
    '3days': { duration: '3 Days', price: 399, save: '₹24,601 (98% saved)' },
    '7days': { duration: '7 Days', price: 599, save: '₹24,401 (97% saved)' },
    '30days': { duration: '30 Days', price: 1099, save: '₹23,901 (95% saved)' },
  }

  const currentPlan = durationPricing[selectedDuration]

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[550px] bg-gradient-to-b from-blue-100/50 via-indigo-100/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-48 -left-36 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-80 -right-36 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Modern Grid Background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* TOP CENTERED HERO SECTION (Apple / Vercel Minimalist Master Headline)     */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/90 border border-slate-200/90 shadow-xs px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-slate-800 mb-6 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="font-bold text-slate-900">India&apos;s 1st Website Rental Platform</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-600 font-extrabold">Starting at ₹{lowestPrice} / day</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight mb-5"
          >
            Why Buy a Website?{' '}
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Rent One Instead.
            </span>
          </motion.h1>

          {/* Elegant Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-8"
          >
            {hero?.subheadline ||
              'Beautiful, ready-to-use websites for businesses, startups, student projects, portfolios and celebrations. Live on your custom link in 2 hours. Pay only for the days you need.'}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto mb-10"
          >
            <Link
              href={hero?.primaryCtaLink || '/websites'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-slate-900/15 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <span>{hero?.primaryCtaText || 'Browse Websites'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={hero?.secondaryCtaLink || '/websites'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200/90 hover:border-slate-300 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>{hero?.secondaryCtaText || 'View Live Demos'}</span>
            </Link>

            <Link
              href="/hyrinx-services-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all group"
              title="Enter 3D Library Room with 13 Living Service Volumes"
            >
              <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>Other Services of Hyrinx</span>
            </Link>
          </motion.div>

          {/* Bento Category Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs font-bold text-slate-600">
            <span className="text-slate-400 uppercase tracking-widest text-[11px] mr-1 hidden sm:inline-block">Filter Grid:</span>
            {[
              { id: 'all', label: 'All Websites' },
              { id: 'business', label: '🏢 Businesses & Startups' },
              { id: 'students', label: '💻 Student Capstones' },
              { id: 'portfolio', label: '💼 Portfolios' },
              { id: 'events', label: '🎉 Events & Celebrations' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as BentoCategory)}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE BENTO GRID (Apple / Vercel High-End Visual Cards)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mb-12 sm:mb-16">
          
          {/* ===================================================================== */}
          {/* BENTO CARD 1: Business & Commercial Websites (Large Hero Anchor)      */}
          {/* ===================================================================== */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: activeFilter === 'all' || activeFilter === 'business' ? 1 : 0.35,
              y: 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:col-span-7 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-300"
          >
            {/* Subtle card backdrop glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Card Header Pill */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial &amp; Business</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  From ₹199 / day
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-2">
                Modern Business &amp; Agency Websites
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mb-6 leading-relaxed">
                Launch a high-converting digital storefront for your agency, clinic, consultancy, or retail brand. Fully customizable with WhatsApp chat, appointment booking, and instant leads.
              </p>

              {/* Realistic Interactive Mini-Browser Surface */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-inner mb-6">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-[11px] font-mono text-slate-400">business.hyrinx.in</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-800/50 font-bold">
                    ● Ready in 2h
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-semibold block">Client Leads</span>
                    <span className="text-lg font-black text-white mt-0.5 block">+148% Surge</span>
                    <span className="text-[9px] text-emerald-400">Integrated CRM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-semibold block">Hosting Setup</span>
                    <span className="text-lg font-black text-blue-400 mt-0.5 block">₹0 / month</span>
                    <span className="text-[9px] text-slate-400">Zero Maintenance</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-semibold block">Live Performance</span>
                    <span className="text-lg font-black text-emerald-400 mt-0.5 block">99/100</span>
                    <span className="text-[9px] text-emerald-400">Next.js Speed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <Link
                  href="/demo/business-showcase"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-blue-600/30"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live Demo</span>
                </Link>
                <Link
                  href="/websites/business-showcase"
                  className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 transition-all"
                >
                  <span>Rent Website</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <span className="text-[11px] text-slate-400">
                Includes WhatsApp Leads &bull; Custom Domain
              </span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* BENTO CARD 2: Final Year College Projects & Viva Capstones (5 cols)   */}
          {/* ===================================================================== */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: activeFilter === 'all' || activeFilter === 'students' ? 1 : 0.35,
              y: 0,
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="md:col-span-5 bg-gradient-to-br from-slate-950 via-[#0a1618] to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>College Projects &bull; Viva</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ₹199 / day
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                Final Year Project Submissions
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed">
                Verified, working AI/ML &amp; full-stack capstones with live web interface, complete GitHub source code, and viva presentations.
              </p>

              {/* Terminal Code Mockup */}
              <div className="bg-black/70 rounded-2xl border border-emerald-900/40 p-4 font-mono text-xs text-slate-300 space-y-2 mb-5">
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2">
                  <span>ML INFERENCE VIVA DEMO</span>
                  <span className="text-emerald-400 font-bold">ACCURACY 98.4%</span>
                </div>
                <div className="text-emerald-300 truncate">$ python scan_model.py --target live_url</div>
                <div className="text-slate-400 text-[11px]">&gt; Heuristic &amp; NLP models loaded</div>
                <div className="text-cyan-300 text-[11px] font-bold">&gt; Status: 100% Viva Presentation Ready</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
              <Link
                href="/demo/ai-phishing-detection-engine"
                target="_blank"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/30"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Test Live Engine</span>
              </Link>
              <Link
                href="/websites?category=Projects+for+College+Students"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <span>6+ Projects</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* BENTO CARD 3: Creator & Professional Portfolios (4 cols)              */}
          {/* ===================================================================== */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: activeFilter === 'all' || activeFilter === 'portfolio' ? 1 : 0.35,
              y: 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg flex flex-col justify-between group hover:border-purple-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Portfolios</span>
                </span>
                <span className="text-xs font-bold text-slate-500">₹149 / day</span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-1">
                Creator &amp; Founder Portfolios
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Stand out with an editorial, minimalist portfolio showcasing your work, case studies, and Calendly booking.
              </p>

              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                  R
                </div>
                <div className="truncate">
                  <span className="text-xs font-bold text-slate-900 block truncate">Product Architect Portfolio</span>
                  <span className="text-[11px] text-slate-500 block truncate">38+ Case Studies &bull; Ready in 2h</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/demo/portfolio-pro"
                target="_blank"
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <span>Live Portfolio Demo</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[11px] text-slate-400">Bio Link Ready</span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* BENTO CARD 4: College Fests & Hackathon Portals (4 cols)              */}
          {/* ===================================================================== */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: activeFilter === 'all' || activeFilter === 'students' ? 1 : 0.35,
              y: 0,
            }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg flex flex-col justify-between group hover:border-indigo-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" />
                  <span>College Fest</span>
                </span>
                <span className="text-xs font-bold text-slate-500">₹149 / day</span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-1">
                Campus Fests &amp; Hackathons
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Interactive event passes, 30+ competition registrations, schedule timeline, and sponsor leaderboards.
              </p>

              <div className="bg-indigo-50/60 rounded-2xl p-3 border border-indigo-100 flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-950 block">IGNITE Symposium &lsquo;26</span>
                  <span className="text-[11px] text-indigo-600 font-semibold block">1,450+ Passes Claimed</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/demo/college-fest-pro"
                target="_blank"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Live Fest Demo</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[11px] text-slate-400">QR Passes Included</span>
            </div>
          </motion.div>

          {/* ===================================================================== */}
          {/* BENTO CARD 5: Celebrations & Royal Weddings (4 cols)                  */}
          {/* ===================================================================== */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: activeFilter === 'all' || activeFilter === 'events' ? 1 : 0.35,
              y: 0,
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="md:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg flex flex-col justify-between group hover:border-amber-300 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <PartyPopper className="w-3.5 h-3.5" />
                  <span>Celebrations &bull; Events</span>
                </span>
                <span className="text-xs font-bold text-slate-500">₹149 / day</span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-1">
                Weddings &amp; Birthdays
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                Digital invitations with RSVP, couple story, photo carousel, background shehnai/music, and wishes wall.
              </p>

              <div className="bg-amber-50/50 rounded-2xl p-3 border border-amber-100 flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-stone-900 block font-serif">Royal Wedding &bull; Dec 2026</span>
                  <span className="text-[11px] text-amber-700 font-serif italic block">RSVP Wishes &bull; Shehnai Player</span>
                </div>
                <button
                  type="button"
                  onClick={() => triggerCelebration('RSVP Confetti')}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-3 py-1.5 rounded-xl text-[11px] shadow-xs active:scale-95 transition-all"
                  title="Click to test celebratory confetti"
                >
                  🎉 Confetti
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/demo/royal-wedding"
                target="_blank"
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                <span>Live Wedding Demo</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-[11px] text-slate-400">RSVP System</span>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* RENTAL FINANCIAL MATH STRIP: Why Buy vs Rent Clear Comparison              */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/40 mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left: Duration Selector */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>See Your Savings: Buying vs Renting</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                How Long Do You Need Your Website?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Select your rental duration to compare costs against paying a developer:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {(['1day', '3days', '7days', '30days'] as const).map((key) => {
                  const item = durationPricing[key]
                  const isSelected = selectedDuration === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDuration(key)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">{item.duration}</span>
                      <span className={`text-[11px] block ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        ₹{item.price} total
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right: Comparison Metric Box */}
            <div className="w-full lg:w-auto bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 shrink-0 shadow-lg min-w-[280px] sm:min-w-[340px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-bold text-slate-400">TRADITIONAL AGENCY BUILD</span>
                <span className="text-xs line-through text-slate-400">₹25,000+</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-bold text-emerald-400">HYRINX RENTAL ({currentPlan.duration})</span>
                <span className="text-2xl font-black text-white">₹{currentPlan.price}</span>
              </div>
              <div className="bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl text-center mb-4">
                <span className="text-xs font-bold text-emerald-300 block">
                  🎉 You Save {currentPlan.save}!
                </span>
                <span className="text-[10px] text-emerald-400/80 block mt-0.5">
                  Includes Free Customization + Hosting + QR Code
                </span>
              </div>
              <Link
                href="/websites"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all text-center"
              >
                <span>Rent Website For {currentPlan.duration}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* POPULAR CATEGORIES CARDS (Clean Grid)                                     */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6 text-center sm:text-left">
            <div>
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block">
                Explore Popular Categories
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Select Your Category to Start Renting
              </h3>
            </div>
            <Link
              href="/websites"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
            >
              <span>View All Websites Catalog ({categories.length || 12}+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {[
              { name: 'Business', icon: Building2, color: 'hover:border-blue-400 hover:bg-blue-50/50', badge: 'Leads', slug: 'Business' },
              { name: 'Startup', icon: Rocket, color: 'hover:border-cyan-400 hover:bg-cyan-50/50', badge: 'Launch', slug: 'Startup' },
              { name: 'College Projects', icon: Code, color: 'hover:border-emerald-400 hover:bg-emerald-50/50', badge: 'Capstone', slug: 'Projects for College Students' },
              { name: 'Portfolio', icon: Briefcase, color: 'hover:border-purple-400 hover:bg-purple-50/50', badge: 'Creative', slug: 'Portfolio' },
              { name: 'College Fest', icon: Users, color: 'hover:border-indigo-400 hover:bg-indigo-50/50', badge: 'Fest', slug: 'College' },
              { name: 'Product Launch', icon: Zap, color: 'hover:border-yellow-400 hover:bg-yellow-50/50', badge: 'New', slug: 'Product Launch' },
              { name: 'Wedding', icon: Heart, color: 'hover:border-rose-400 hover:bg-rose-50/50', badge: 'Event', slug: 'Wedding' },
              { name: 'Birthday', icon: PartyPopper, color: 'hover:border-pink-400 hover:bg-pink-50/50', badge: 'Surprise', slug: 'Birthday' },
              { name: 'Invitation', icon: Sparkles, color: 'hover:border-amber-400 hover:bg-amber-50/50', badge: 'Passes', slug: 'Invitation' },
              { name: 'Project', icon: BookOpen, color: 'hover:border-teal-400 hover:bg-teal-50/50', badge: 'Code', slug: 'Project' },
              { name: 'Celebration', icon: Star, color: 'hover:border-orange-400 hover:bg-orange-50/50', badge: 'Moments', slug: 'Celebration' },
              { name: 'Personal', icon: Globe, color: 'hover:border-slate-400 hover:bg-slate-50/50', badge: 'Bio', slug: 'Personal' },
            ].map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.name}
                  href={`/websites?category=${encodeURIComponent(cat.slug)}`}
                  className={`bg-white border-2 border-slate-200/90 rounded-2xl p-3 sm:p-3.5 flex flex-col items-center justify-between text-center transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden ${cat.color}`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">
                      {cat.badge}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  
                  <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
                  </div>

                  <span className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-slate-900 leading-tight">
                    {cat.name}
                  </span>
                  
                  <span className="text-[10px] text-slate-500 font-medium mt-1">
                    From ₹{lowestPrice}/day
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
