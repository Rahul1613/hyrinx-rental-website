'use client'

import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  GraduationCap,
  Calendar,
  Users,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Code,
  Sparkles,
} from 'lucide-react'
import { BreadcrumbJsonLd, SoftwareAppJsonLd } from '@/components/seo/JsonLd'

export default function CollegeFestPlannerTool() {
  const [festDays, setFestDays] = useState(3)
  const [expectedParticipants, setExpectedParticipants] = useState('1000-2500')
  const [hasHackathon, setHasHackathon] = useState(true)
  const [hasCultural, setHasCultural] = useState(true)
  const [hasSports, setHasSports] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  const estimatedTraffic = festDays * (expectedParticipants === '500-1000' ? 1200 : expectedParticipants === '1000-2500' ? 3500 : 8000)
  const recommendedPlan = festDays <= 3 ? '3 Days Rental (₹399 total)' : '7 Days Rental (₹599 total)'

  const embedCode = `<iframe src="https://hyrinx.in/tools/college-fest-planner" width="100%" height="600" frameborder="0"></iframe>\n<p style="font-size:12px;color:#666;">Fest planning tool by <a href="https://hyrinx.in/categories/college" target="_blank" rel="noopener">Hyrinx Fest Rentals</a></p>`

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2500)
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Free Tools', url: 'https://hyrinx.in/tools' },
    { name: 'College Fest Planner', url: 'https://hyrinx.in/tools/college-fest-planner' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareAppJsonLd
        name="College Fest Website & Schedule Planner"
        description="Calculate server requirements, timeline schedule, registration workflows, and rental costs for university college fests."
        url="https://hyrinx.in/tools/college-fest-planner"
      />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> Student Committee Resource
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            College Fest Website &amp; Schedule Planner
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Plan your university fest registration portal, estimate server peak load, configure event categories, and avoid last-minute server crashes.
          </p>
        </div>

        {/* Configuration Matrix */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Fest Duration (Days)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 5, 7].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setFestDays(days)}
                    className={`py-2.5 rounded-xl font-bold text-sm border transition-all ${
                      festDays === days
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {days} {days === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Expected Participants
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['500-1000', '1000-2500', '2500-10000'].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setExpectedParticipants(range)}
                    className={`py-2.5 px-2 rounded-xl font-bold text-xs border truncate transition-all ${
                      expectedParticipants === range
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Event Category Toggles */}
          <div className="mb-8">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Included Event Categories
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setHasHackathon(!hasHackathon)}
                className={`p-3.5 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                  hasHackathon
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>Hackathon &amp; Tech</span>
                {hasHackathon ? <CheckCircle2 className="w-4 h-4 text-indigo-600" /> : <div className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setHasCultural(!hasCultural)}
                className={`p-3.5 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                  hasCultural
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>Cultural, Dance &amp; Music</span>
                {hasCultural ? <CheckCircle2 className="w-4 h-4 text-indigo-600" /> : <div className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setHasSports(!hasSports)}
                className={`p-3.5 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${
                  hasSports
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>Sports &amp; E-Sports</span>
                {hasSports ? <CheckCircle2 className="w-4 h-4 text-indigo-600" /> : <div className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Generated Plan Recommendations */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7">
            <h3 className="text-base font-bold text-indigo-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Recommended Fest Portal Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Peak Pageviews</span>
                <span className="text-xl font-bold text-white">~{estimatedTraffic.toLocaleString()}</span>
              </div>
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Recommended Plan</span>
                <span className="text-base font-bold text-emerald-400">{recommendedPlan}</span>
              </div>
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Turnaround Time</span>
                <span className="text-base font-bold text-amber-300">Live in 2–6 Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400">
                Templates include team registration forms, passes, and sponsor showcases.
              </p>
              <Link
                href="/categories/college"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>View College Fest Templates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Embed Widget Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200">
              <Code className="w-4 h-4 text-indigo-400" /> Embed this Fest Planner on Your Student Portal
            </h3>
            <button
              onClick={copyEmbed}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-indigo-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmbed ? 'Copied HTML!' : 'Copy Embed Code'}</span>
            </button>
          </div>
          <pre className="text-xs bg-slate-950 p-3 rounded-xl overflow-x-auto text-slate-400 font-mono">
            {embedCode}
          </pre>
          <p className="text-[11px] text-slate-400 mt-2">
            Provided free by{' '}
            <Link href="/" className="text-indigo-400 underline font-semibold">
              Hyrinx Fest Rentals
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
