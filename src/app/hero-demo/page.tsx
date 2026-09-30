'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import InteractiveHero from '@/components/home/InteractiveHero'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Eye,
  Check,
  Zap,
  Star,
  Info,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  ThumbsUp,
} from 'lucide-react'

export default function HeroDemoPage() {
  const [viewMode, setViewMode] = useState<'new' | 'old' | 'features'>('new')
  const [approvedState, setApprovedState] = useState(false)

  const mockHeroData = {
    headline: 'Why Buy a Website? Rent One Instead.',
    subheadline:
      'Beautiful, ready-to-use websites for events, celebrations, businesses, portfolios and projects. Rent for a day, a week, a month or longer.',
    primaryCtaText: 'Browse Websites',
    primaryCtaLink: '/websites',
    secondaryCtaText: 'View Live Demos',
    secondaryCtaLink: '/websites',
    badgeText: 'Starting at ₹149 / day',
  }

  const mockCategories = [
    { id: '1', name: 'Wedding' },
    { id: '2', name: 'Birthday' },
    { id: '3', name: 'Invitation' },
    { id: '4', name: 'College' },
    { id: '5', name: 'Business' },
    { id: '6', name: 'Portfolio' },
    { id: '7', name: 'Startup' },
    { id: '8', name: 'Product Launch' },
    { id: '9', name: 'Projects for College Students' },
    { id: '10', name: 'Project' },
    { id: '11', name: 'Celebration' },
    { id: '12', name: 'Personal' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* ========================================================================= */}
      {/* TOP DEMO CONTROL & APPROVAL BAR                                           */}
      {/* ========================================================================= */}
      <div className="sticky top-0 z-[60] bg-slate-950 text-white border-b border-slate-800 px-4 py-3 sm:px-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <span className="bg-blue-600/30 text-blue-400 border border-blue-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Hero Section Preview Demo
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              Interactive Redesign for First-Time Visitor Clarity
            </span>
          </div>

          {/* Switcher: New Hero vs Old Hero vs Features Breakdown */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('new')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'new'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Proposed New Hero</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('old')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'old'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Old Basic Hero</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('features')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'features'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>Key Improvements</span>
            </button>
          </div>

          {/* User Approval Indicator */}
          <div className="flex items-center gap-2">
            {approvedState ? (
              <div className="bg-emerald-950 text-emerald-400 border border-emerald-700/60 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Ready to Apply to Home!</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setApprovedState(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 active:scale-95"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Click if you like this Demo</span>
              </button>
            )}

            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white px-2 py-1 transition-colors"
            >
              Exit to Home &rarr;
            </Link>
          </div>

        </div>
      </div>

      {/* Main Standard Navbar */}
      <Navbar />

      {/* ========================================================================= */}
      {/* 1. PROPOSED NEW INTERACTIVE HERO VIEW                                     */}
      {/* ========================================================================= */}
      {viewMode === 'new' && (
        <div className="flex-1">
          <InteractiveHero
            hero={mockHeroData}
            categories={mockCategories}
            lowestPrice={149}
            isDemoPage={true}
          />

          {/* Quick interactive test guidance */}
          <div className="max-w-5xl mx-auto px-4 pb-16">
            <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 border-2 border-dashed border-blue-400/40 rounded-3xl p-6 sm:p-8">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Things you can test right now in this Demo above:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 mt-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Apple/Vercel Modern Bento Grid:</strong> Premium visual cards showcasing Business Platforms, Student Capstones, Portfolios, Campus Fests, and Celebrations with real pricing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Filter Grid Tabs:</strong> Click the pill tabs above the grid (🏢 Businesses, 💻 Student Capstones, 💼 Portfolios, 🎉 Celebrations) to dynamically highlight categories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1-Click Live Demos:</strong> Every bento card includes a direct link to test that template live in full screen (e.g. Business Showcase, AI Phishing Scanner, Royal Wedding).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Rental Savings Math:</strong> Interactive duration toggle (1 Day, 3 Days, 7 Days, 30 Days) proving 98% instant savings compared to paying ₹25,000+ to an agency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Clean Minimalist Typography:</strong> Confident, bold headline with no cluttered laptop simulator — gives instant clarity on what Hyrinx is in 3 seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Popular Categories Bar:</strong> 12 modern category cards with badges, icons, and starting prices.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. OLD BASIC HERO VIEW (For Comparison)                                   */}
      {/* ========================================================================= */}
      {viewMode === 'old' && (
        <div className="flex-1">
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs font-bold text-amber-800">
            ⚠️ Viewing Original Basic Hero (Before Redesign). Notice there is no product visual preview, no rental explanation, and no interactivity.
          </div>
          
          <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-md sm:shadow-lg shadow-blue-500/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Starting at ₹149 / day
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-5 sm:mb-8 leading-tight tracking-tight">
                  Why Buy a Website? Rent One Instead.
                </h1>
                <p className="text-base sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                  Beautiful, ready-to-use websites for events, celebrations, businesses, portfolios and projects. Rent for a day, a week, a month or longer.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto items-center">
                  <Link
                    href="/websites"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-base shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Browse Websites
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                  <Link
                    href="/websites"
                    className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-blue-300 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-base shadow-md hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                  >
                    View Live Demos
                  </Link>
                  <Link
                    href="/hyrinx-services-demo"
                    className="inline-flex items-center justify-center bg-slate-950 hover:bg-slate-900 text-amber-300 hover:text-white border-2 border-amber-500/40 hover:border-amber-400 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-base shadow-lg shadow-amber-500/10 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto group"
                  >
                    Other Services of Hyrinx
                  </Link>
                </div>
              </div>

              {/* Dynamic Categories Showcase */}
              <div className="mt-12 sm:mt-20 max-w-5xl mx-auto">
                <div className="text-center mb-4 sm:mb-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400">
                  Explore Popular Categories
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {[
                    'Wedding', 'Birthday', 'Invitation', 'College', 'Business', 'Portfolio',
                    'Startup', 'Product Launch', 'Projects for College Students', 'Project',
                    'Celebration', 'Personal'
                  ].map((name) => (
                    <span
                      key={name}
                      className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-xs font-bold"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. KEY IMPROVEMENTS BREAKDOWN VIEW                                        */}
      {/* ========================================================================= */}
      {viewMode === 'features' && (
        <div className="flex-1 max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">
              UX &amp; Conversion Breakdown
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Why the New Hero Solves the First-Time Visitor Confusion
            </h2>
            <p className="text-slate-600 text-base mt-2">
              Website renting is a brand-new concept. Here is how the new hero eliminates friction and turns visitors into customers:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">3-Second Clarity Visual</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Replaces long paragraphs with a clean 3-step visual: <strong>Pick Template &rarr; We Customise in 2 Hours &rarr; Live on Link (pay only per day)</strong>.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Interactive Device Simulator</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Rather than asking visitors to imagine what renting looks like, the right column shows real interactive templates (Wedding RSVP, Birthday, College Fest, Viva Capstone).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Why Buy vs Rent Calculator</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Instant math that proves savings: Spending ₹25,000 to buy vs renting for ₹149/day or ₹399 for a 3-day weekend gives visitors a 98% instant savings realization.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Dynamic Rotating Pain Points</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Smoothly morphs the subhead to show specific use-cases (Royal Wedding, College Fest, Birthday, Final Year Project, Startup Launch).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-4">
                5
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Desktop &amp; Mobile Toggle</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Users can preview how their rented website looks on both PC monitors and mobile smartphones right in the hero viewport.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
                6
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Interactive Category Cards</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Instead of flat text pills, 12 rich category cards feature Lucide icons, badges (&apos;Popular&apos;, &apos;Hot&apos;, &apos;Fest&apos;, &apos;Capstone&apos;) and pricing.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setViewMode('new')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm"
            >
              Test the Proposed New Hero Above &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 bg-slate-900 text-slate-400 text-xs text-center border-t border-slate-800">
        <p>HYRINX Hero Redesign Demo Preview &bull; Ready for User Approval</p>
      </footer>
    </div>
  )
}
