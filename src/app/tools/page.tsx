import React from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  Heart,
  GraduationCap,
  Calculator,
  QrCode,
  Scale,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Free Event & Website Planning Tools | Hyrinx Rental',
  description:
    'Free tools for wedding planners, college fest organizers, and business owners. Wedding checklist, fest planner, cost calculator, QR code generator & ROI tools.',
  alternates: {
    canonical: 'https://hyrinx.in/tools',
  },
  openGraph: {
    title: 'Free Event & Website Planning Tools | Hyrinx',
    description: 'Calculate costs, plan college fests, generate QR invites, and compare rent vs build.',
    url: 'https://hyrinx.in/tools',
  },
}

export default function ToolsHubPage() {
  const tools = [
    {
      title: 'Indian Wedding Website Checklist',
      description: 'Checklist for Saat Phere, WhatsApp RSVPs, music, photos, and Google Maps directions.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      href: '/tools/wedding-website-checklist',
    },
    {
      title: 'College Fest Website & Schedule Planner',
      description: 'Estimate peak traffic, hackathon schedules, and registration portal rental costs.',
      icon: GraduationCap,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      href: '/tools/college-fest-planner',
    },
    {
      title: 'Event Website Cost Calculator',
      description: 'Compare real agency quotes, DIY annual plans, and Hyrinx daily rentals.',
      icon: Calculator,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      href: '/tools/website-cost-calculator',
    },
    {
      title: 'Digital Invitation QR Code Generator',
      description: 'Generate instant high-res QR codes and WhatsApp links for wedding welcome boards.',
      icon: QrCode,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      href: '/tools/qr-code-invitation-generator',
    },
    {
      title: 'Rent vs. Custom-Build Cost Calculator',
      description: 'Analyze financial ROI and savings comparing website rental against hiring an agency.',
      icon: Scale,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      href: '/tools/rent-vs-build-calculator',
    },
  ]

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Free Tools', url: 'https://hyrinx.in/tools' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            100% Free Interactive Tools
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Free Event &amp; Website Planning Tools
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Plan your wedding invitation, college techfest, or business campaign. Free interactive calculators, checklists, and QR code generators with no registration required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool, idx) => {
            const Icon = tool.icon
            return (
              <Link
                key={idx}
                href={tool.href}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 ${tool.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Open Free Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
