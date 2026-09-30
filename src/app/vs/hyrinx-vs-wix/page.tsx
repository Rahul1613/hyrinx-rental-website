import React from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  Check,
  X,
  ArrowRight,
  TrendingDown,
  HelpCircle,
} from 'lucide-react'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Hyrinx vs. Wix: Which Is Better for Short Events in India? | Hyrinx',
  description:
    'Compare Hyrinx website rentals against Wix. Why pay ₹8,000+ for an annual Wix subscription for a 3-day wedding or fest? Rent from ₹149/day on Hyrinx.',
  alternates: {
    canonical: 'https://hyrinx.in/vs/hyrinx-vs-wix',
  },
  openGraph: {
    title: 'Hyrinx vs. Wix: Comparison Guide for Events & Pop-ups | Hyrinx',
    description: 'Detailed pricing and setup comparison between Hyrinx website rentals and Wix builders.',
    url: 'https://hyrinx.in/vs/hyrinx-vs-wix',
  },
}

export default function HyrinxVsWixPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Comparisons', url: 'https://hyrinx.in/vs/hyrinx-vs-wix' },
    { name: 'Hyrinx vs Wix', url: 'https://hyrinx.in/vs/hyrinx-vs-wix' },
  ]

  const faqs = [
    {
      question: 'Is Hyrinx cheaper than Wix for short-term events?',
      answer:
        'Yes, significantly cheaper. Wix locks users into monthly or annual subscriptions typically costing ₹8,000 to ₹15,000 per year with domain add-ons. Hyrinx lets you rent for exact durations starting at just ₹149/day or ₹399 for 3 days, saving you over 90%.',
    },
    {
      question: 'Do I have to build the website myself like on Wix?',
      answer:
        'No. On Wix, you must spend 10 to 20 hours dragging blocks, configuring mobile breakpoints, and connecting forms. On Hyrinx, our engineering team handles all template customization and staging for you, delivering a finished site in 2 to 6 hours.',
    },
    {
      question: 'Does Hyrinx support WhatsApp RSVP unlike Wix?',
      answer:
        'Yes. Hyrinx wedding and celebration templates feature native WhatsApp RSVP integration tailored for Indian families, whereas Wix requires complex third-party app integrations.',
    },
  ]

  const comparisonRows = [
    { feature: 'Pricing Model', hyrinx: 'Pay-per-day micro rental (₹149/day)', wix: 'Monthly / Annual subscription locked' },
    { feature: '3-Day Event Cost', hyrinx: '₹399 total', wix: '₹8,000+ (annual plan required for custom domain)' },
    { feature: 'Setup Effort', hyrinx: 'Done-For-You by Hyrinx engineers', wix: 'DIY drag-and-drop builder (15+ hours)' },
    { feature: 'Indian Cultural Themes', hyrinx: 'Royal Wedding (Saat Phere, Shehnai, Patrika)', wix: 'Western standard templates only' },
    { feature: 'WhatsApp RSVP Integration', hyrinx: 'Built-in natively for Indian weddings', wix: 'Requires third-party paid plugins' },
    { feature: 'Deployment Speed', hyrinx: 'Live in 2 to 6 hours', wix: 'Depends on your design skill & time' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={faqs} />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Platform Teardown
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Hyrinx vs. Wix: Which Is Better for Indian Events?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Planning a 3-day wedding, weekend college fest, or flash sale? Discover why locking into annual DIY builder subscriptions is a costly mistake.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 sm:p-5 font-bold text-slate-900">Feature / Metric</th>
                  <th className="p-4 sm:p-5 font-extrabold text-blue-700 bg-blue-50/50">Hyrinx Website Rental</th>
                  <th className="p-4 sm:p-5 font-bold text-slate-600">Wix Website Builder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">{row.feature}</td>
                    <td className="p-4 sm:p-5 font-bold text-blue-800 bg-blue-50/30">{row.hyrinx}</td>
                    <td className="p-4 sm:p-5 text-slate-600">{row.wix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Direct Answer GEO/AEO Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 mb-16 shadow-xs">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            The Direct Answer: Why Hyrinx Wins for Short Events
          </h2>
          <p className="text-slate-700 text-base leading-relaxed mb-6 font-normal">
            <strong>Direct Answer:</strong> Wix is designed for permanent websites with recurring monthly and annual subscription fees. If you only need a website for a 3-day wedding ceremony, weekend college festival, or 7-day marketing campaign, Wix forces you to pay for an entire year. Hyrinx solves this by offering daily micro-rentals starting at ₹149/day with done-for-you configuration, Indian cultural audio players, and native WhatsApp RSVP integration.
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Rent Your Event Website in 2 Hours
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Select your favorite template, choose your days, and go live without DIY builder stress.
          </p>
          <Link
            href="/websites"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all"
          >
            <span>Browse All Website Templates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
