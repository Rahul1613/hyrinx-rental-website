'use client'

import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  Scale,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ArrowRight,
  Code,
  ShieldCheck,
} from 'lucide-react'
import { BreadcrumbJsonLd, SoftwareAppJsonLd } from '@/components/seo/JsonLd'
import { formatPrice } from '@/lib/utils'

export default function RentVsBuildCalculatorTool() {
  const [projectTimelineDays, setProjectTimelineDays] = useState(7)
  const [dailyRentalRate, setDailyRentalRate] = useState(149)
  const [estimatedDevAgencyQuote, setEstimatedDevAgencyQuote] = useState(30000)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  // Calculations
  const rentalTotal = projectTimelineDays === 1 ? 149 : projectTimelineDays <= 3 ? 399 : projectTimelineDays <= 7 ? 599 : projectTimelineDays <= 15 ? 799 : 1099
  const agencyUpfront = estimatedDevAgencyQuote
  const annualHostingMaintenance = 6000
  const totalBuildFirstYear = agencyUpfront + annualHostingMaintenance

  const totalSaved = totalBuildFirstYear - rentalTotal
  const savingsPercent = Math.round((totalSaved / totalBuildFirstYear) * 100)

  const embedCode = `<iframe src="https://hyrinx.in/tools/rent-vs-build-calculator" width="100%" height="600" frameborder="0"></iframe>\n<p style="font-size:12px;color:#666;">Comparison tool by <a href="https://hyrinx.in/pricing" target="_blank" rel="noopener">Hyrinx Website Rentals</a></p>`

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2500)
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Free Tools', url: 'https://hyrinx.in/tools' },
    { name: 'Rent vs Build Calculator', url: 'https://hyrinx.in/tools/rent-vs-build-calculator' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareAppJsonLd
        name="Rent vs Custom Build Website Cost Calculator"
        description="Calculate financial ROI and savings comparing website rental against hiring a freelance developer or software agency in India."
        url="https://hyrinx.in/tools/rent-vs-build-calculator"
      />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-emerald-600" /> Financial ROI Analyzer
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Rent vs. Custom-Build Cost Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Discover whether renting or custom developing makes the most financial sense for your timeline, event, or business campaign.
          </p>
        </div>

        {/* Input Parameters */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Campaign / Event Duration
                </label>
                <span className="text-sm font-bold text-emerald-600">
                  {projectTimelineDays} {projectTimelineDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={projectTimelineDays}
                onChange={(e) => setProjectTimelineDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 Day</span>
                <span>7 Days</span>
                <span>15 Days</span>
                <span>30 Days</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Custom Agency Quote
                </label>
                <span className="text-sm font-bold text-slate-700">
                  {formatPrice(estimatedDevAgencyQuote)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="80000"
                step="5000"
                value={estimatedDevAgencyQuote}
                onChange={(e) => setEstimatedDevAgencyQuote(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹10,000</span>
                <span>₹40,000</span>
                <span>₹80,000</span>
              </div>
            </div>
          </div>

          {/* Comparison Matrix Output */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-6">
            <div className="text-center pb-6 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1.5 mb-1">
                <TrendingDown className="w-4 h-4" /> You Save {formatPrice(totalSaved)} ({savingsPercent}%) by Renting
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white mt-2">
                {formatPrice(rentalTotal)}
                <span className="text-sm font-normal text-slate-400"> total investment</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Custom Agency Build */}
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-1">
                  Custom Development Build
                </span>
                <span className="text-2xl font-bold text-red-400">
                  {formatPrice(totalBuildFirstYear)}
                </span>
                <p className="text-[11px] text-slate-400 mt-1 mb-4">
                  ₹{agencyUpfront.toLocaleString()} upfront + ₹{annualHostingMaintenance.toLocaleString()} annual server/SSL retainers
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>3 to 5 weeks developer turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>You pay for server maintenance forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Requires technical updates and backups</span>
                  </div>
                </div>
              </div>

              {/* Hyrinx Rental */}
              <div className="bg-emerald-950/80 p-5 rounded-xl border border-emerald-600/60">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Hyrinx Website Rental
                </span>
                <span className="text-3xl font-black text-emerald-400">
                  {formatPrice(rentalTotal)}
                </span>
                <p className="text-[11px] text-emerald-200 mt-1 mb-4">
                  Zero server fees. Pay only for the {projectTimelineDays} {projectTimelineDays === 1 ? 'day' : 'days'} you need.
                </p>
                <div className="space-y-2 text-xs text-emerald-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Live in 2 to 6 hours on fast cloud hosting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Safe 30-day archival after event concludes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero developer maintenance headaches</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Decision: For any event under 6 months, renting is mathematically 10x more cost-efficient.
              </p>
              <Link
                href="/websites"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Browse Website Templates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Embed Widget Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200">
              <Code className="w-4 h-4 text-emerald-400" /> Embed this Calculator on Your Blog
            </h3>
            <button
              onClick={copyEmbed}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-emerald-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmbed ? 'Copied HTML!' : 'Copy Embed Code'}</span>
            </button>
          </div>
          <pre className="text-xs bg-slate-950 p-3 rounded-xl overflow-x-auto text-slate-400 font-mono">
            {embedCode}
          </pre>
          <p className="text-[11px] text-slate-400 mt-2">
            Provided by{' '}
            <Link href="/" className="text-emerald-400 underline font-semibold">
              Hyrinx Rental
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
