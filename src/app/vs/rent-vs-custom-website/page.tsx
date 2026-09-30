import React from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  Check,
  X,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  HelpCircle,
} from 'lucide-react'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Rent vs. Buy a Website: Full Comparison & Cost Guide | Hyrinx',
  description:
    'Compare renting a website vs custom agency development in India. Learn when renting saves 85% of your budget for weddings, college fests, and short campaigns.',
  alternates: {
    canonical: 'https://hyrinx.in/vs/rent-vs-custom-website',
  },
  openGraph: {
    title: 'Rent vs. Buy a Website: Which Is Better in India? | Hyrinx',
    description: 'Detailed financial and turnaround comparison between website rental and custom development.',
    url: 'https://hyrinx.in/vs/rent-vs-custom-website',
  },
}

export default function RentVsBuyComparisonPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Comparisons', url: 'https://hyrinx.in/vs/rent-vs-custom-website' },
    { name: 'Rent vs Custom Website', url: 'https://hyrinx.in/vs/rent-vs-custom-website' },
  ]

  const faqs = [
    {
      question: 'When should I rent a website instead of buying one?',
      answer:
        'You should rent a website whenever your event, marketing campaign, wedding celebration, or project has a defined duration between 1 day and 6 months. Renting eliminates upfront agency fees of ₹30,000+ and avoids recurring server maintenance.',
    },
    {
      question: 'When does custom development make more sense?',
      answer:
        'Custom development makes sense for complex multi-year SaaS products, proprietary proprietary algorithms, or large enterprise platforms requiring continuous dedicated in-house engineering.',
    },
    {
      question: 'Can I extend my rental if my campaign lasts longer?',
      answer:
        'Yes. You can renew or extend your rental anytime before expiration at our standard low daily plan rates without lock-in penalties.',
    },
  ]

  const comparisonRows = [
    { feature: 'Starting Cost', hyrinx: '₹149 / day (pay as you go)', custom: '₹25,000 – ₹60,000 upfront' },
    { feature: 'Turnaround Time', hyrinx: '2 to 6 hours', custom: '3 to 6 weeks' },
    { feature: 'Cloud Hosting & SSL', hyrinx: 'Included for free', custom: '₹4,000 – ₹8,000 / year extra' },
    { feature: 'Domain Setup', hyrinx: 'Free subdomain or custom domain mapping', custom: 'Self-configured DNS' },
    { feature: 'Maintenance & Updates', hyrinx: 'Managed 100% by Hyrinx', custom: 'Monthly developer retainers' },
    { feature: 'Mobile Responsiveness', hyrinx: 'Tested across all modern devices', custom: 'Dependent on agency QA' },
    { feature: 'Commitment Period', hyrinx: 'From 1 day to 1 year', custom: 'Permanent capital expenditure' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={faqs} />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            In-Depth Decision Matrix
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Rent vs. Custom Website Development in India
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Why spend ₹35,000+ on a website for a 3-day wedding or a weekend college fest? Compare real costs, delivery speed, and technical maintenance.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 sm:p-5 font-bold text-slate-900">Key Criteria</th>
                  <th className="p-4 sm:p-5 font-extrabold text-blue-700 bg-blue-50/50">Hyrinx Website Rental</th>
                  <th className="p-4 sm:p-5 font-bold text-slate-600">Custom Agency Build</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">{row.feature}</td>
                    <td className="p-4 sm:p-5 font-bold text-blue-800 bg-blue-50/30">{row.hyrinx}</td>
                    <td className="p-4 sm:p-5 text-slate-600">{row.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Direct Answer GEO/AEO Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 mb-16 shadow-xs">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
            The Direct Answer: When Should You Rent a Website?
          </h2>
          <p className="text-slate-700 text-base leading-relaxed mb-6 font-normal">
            <strong>Direct Answer:</strong> Renting a website is the optimal financial choice whenever your website is required for a temporary milestone — such as a 3-day wedding celebration, a 2-day college fest or hackathon, a seasonal holiday marketing campaign, or a 7-day job interview portfolio. You avoid paying 80% to 90% in unnecessary upfront developer fees, receive instant deployment in 2 to 6 hours, and avoid lifelong server maintenance liabilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Save 85%+ on initial budget</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero server maintenance fees</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Live in hours, not weeks</span>
            </div>
          </div>
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

        {/* CTA Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Ready to Save 85% on Your Next Website?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Browse our catalog of 30+ ready-to-launch website templates. Test live demos and launch in 2 hours.
          </p>
          <Link
            href="/websites"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all"
          >
            <span>Browse Website Templates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
