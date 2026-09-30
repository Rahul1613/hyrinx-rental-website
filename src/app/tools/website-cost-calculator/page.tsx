'use client'

import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  Calculator,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  Code,
  Check,
  Copy,
} from 'lucide-react'
import { BreadcrumbJsonLd, SoftwareAppJsonLd } from '@/components/seo/JsonLd'
import { formatPrice } from '@/lib/utils'

export default function WebsiteCostCalculatorTool() {
  const [eventType, setEventType] = useState<'wedding' | 'fest' | 'business' | 'birthday'>('wedding')
  const [durationDays, setDurationDays] = useState(3)
  const [needsCustomDomain, setNeedsCustomDomain] = useState(false)
  const [needsWhatsAppRSVP, setNeedsWhatsAppRSVP] = useState(true)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  // Calculations
  const agencyCost = eventType === 'wedding' ? 35000 : eventType === 'fest' ? 25000 : 40000
  const wixCost = 8500 // Annual subscription + domain
  
  let hyrinxBasePrice = 399
  if (durationDays === 1) hyrinxBasePrice = 149
  else if (durationDays <= 3) hyrinxBasePrice = 399
  else if (durationDays <= 7) hyrinxBasePrice = 599
  else if (durationDays <= 15) hyrinxBasePrice = 799
  else hyrinxBasePrice = 1099

  const savingsAmount = agencyCost - hyrinxBasePrice
  const savingsPercent = Math.round((savingsAmount / agencyCost) * 100)

  const embedCode = `<iframe src="https://hyrinx.in/tools/website-cost-calculator" width="100%" height="600" frameborder="0"></iframe>\n<p style="font-size:12px;color:#666;">Calculator tool by <a href="https://hyrinx.in" target="_blank" rel="noopener">Hyrinx Website Rentals</a></p>`

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2500)
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Free Tools', url: 'https://hyrinx.in/tools' },
    { name: 'Event Website Cost Calculator', url: 'https://hyrinx.in/tools/website-cost-calculator' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <SoftwareAppJsonLd
        name="Event Website Cost Calculator India"
        description="Calculate how much you should pay for an event website. Compare custom agency quotes, DIY builders, and Hyrinx rentals."
        url="https://hyrinx.in/tools/website-cost-calculator"
      />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" /> Transparent Pricing Tool
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Much Should My Event Website Cost?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Compare real Indian market rates for custom web agencies vs annual website builders vs Hyrinx daily rentals.
          </p>
        </div>

        {/* Calculator Control Panel */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          {/* Step 1: Event Type */}
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Select Event / Purpose
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'wedding', label: '💍 Wedding Ceremony' },
                { id: 'fest', label: '🎓 College Fest' },
                { id: 'business', label: '🏢 Business / Cafe' },
                { id: 'birthday', label: '🎉 Birthday Party' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEventType(item.id as any)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    eventType === item.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Duration */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Duration Needed
              </label>
              <span className="text-sm font-bold text-blue-600">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 Day (Flash)</span>
              <span>7 Days (Popular)</span>
              <span>15 Days</span>
              <span>30 Days (Full Month)</span>
            </div>
          </div>

          {/* Real Cost Comparison Table */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-6">
            <div className="text-center pb-6 border-b border-slate-800">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1 mb-1">
                <TrendingDown className="w-4 h-4" /> Save {savingsPercent}% with Hyrinx Rental
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                {formatPrice(hyrinxBasePrice)}
                <span className="text-sm font-semibold text-slate-400 font-normal"> / {durationDays} {durationDays === 1 ? 'day' : 'days'} total</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Hosting, subdomain, customization, and mobile optimization included.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-center">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Web Agency Build</span>
                <span className="text-xl font-bold text-red-400 line-through">
                  {formatPrice(agencyCost)}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Takes 3–4 weeks to launch</p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Wix / Squarespace (1 Yr)</span>
                <span className="text-xl font-bold text-amber-400 line-through">
                  {formatPrice(wixCost)}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Locked into annual plans</p>
              </div>

              <div className="bg-blue-950/80 p-4 rounded-xl border border-blue-600/60">
                <span className="text-xs text-blue-300 font-bold block mb-1">Hyrinx Rental</span>
                <span className="text-2xl font-black text-emerald-400">
                  {formatPrice(hyrinxBasePrice)}
                </span>
                <p className="text-[11px] text-blue-200 mt-1">Live in 2–6 hours</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                No hidden server costs. No recurring subscription lock-ins.
              </p>
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>View All Rental Plans</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Embed Widget Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200">
              <Code className="w-4 h-4 text-blue-400" /> Embed this Calculator on Your Website
            </h3>
            <button
              onClick={copyEmbed}
              className="inline-flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
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
            <Link href="/" className="text-blue-400 underline font-semibold">
              Hyrinx Rental
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
