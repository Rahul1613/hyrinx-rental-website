import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import {
  MapPin,
  Check,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { PROGRAMMATIC_PAGES, ProgrammaticPageData } from '@/lib/programmatic-data'
import { DEFAULT_WEBSITES } from '@/lib/templates-data'
import { formatPrice } from '@/lib/utils'
import DetailMockup from '@/components/websites/DetailMockup'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'

export const dynamic = 'force-dynamic'

interface ProgrammaticProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProgrammaticProps): Promise<Metadata> {
  const { slug } = await params
  const page = PROGRAMMATIC_PAGES.find((p) => p.slug === slug)

  if (!page) {
    return {
      title: 'Page Not Found | Hyrinx Rental',
      robots: { index: false, follow: false },
    }
  }

  // Thin-content safety net: if page lacks substance, enforce noindex
  if (page.thinFallback) {
    return {
      title: page.title,
      description: page.metaDescription,
      robots: { index: false, follow: true },
    }
  }

  const url = `https://hyrinx.in/rent/${slug}`

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: [
      page.primaryKeyword,
      `${page.category.toLowerCase()} website rent ${page.city.toLowerCase()}`,
      `rent website ${page.city.toLowerCase()}`,
      'temporary website rental India',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url,
      siteName: 'Hyrinx Rental',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://hyrinx.in/icon-512.png',
          width: 1200,
          height: 630,
          alt: `${page.title} - Hyrinx`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
      images: ['https://hyrinx.in/icon-512.png'],
    },
  }
}

export default async function ProgrammaticLandingPage({ params }: ProgrammaticProps) {
  const { slug } = await params
  const page = PROGRAMMATIC_PAGES.find((p) => p.slug === slug)

  if (!page) {
    notFound()
  }

  const templates = DEFAULT_WEBSITES.filter((w) =>
    page.templateSlugs.includes(w.slug)
  )

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Rent in India', url: 'https://hyrinx.in/rent' },
    { name: page.city, url: `https://hyrinx.in/rent/${slug}` },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={page.faqs} />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/websites" className="hover:text-blue-600 transition-colors">
            Rentals
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900 truncate">{page.h1}</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{page.city} &bull; {page.useCase}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            {page.h1}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            Rent verified, ready-to-launch {page.category.toLowerCase()} website templates from ₹{page.startingPrice}/day. Zero developer fees, free hosting, and live on your custom link in 2 to 6 hours.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 flex-wrap">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Staging
            </span>
            <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Clock className="w-3.5 h-3.5 text-blue-600" /> Live in 2–6 Hours
            </span>
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Save 85% Budget
            </span>
          </div>
        </div>

        {/* Localized Editorial Context */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 mb-16 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
            Why Rent a {page.category} Website for {page.city}?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {page.localContext}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {page.whyInThisCity.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
              >
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Templates Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Recommended Templates for {page.city} ({templates.length})
            </h2>
            <Link
              href="/websites"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All 30+ Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-video bg-slate-100 overflow-hidden relative">
                    {template.thumbnail ? (
                      <img
                        src={template.thumbnail}
                        alt={`${template.name} - template preview`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <DetailMockup website={template} />
                    )}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                      ₹{template.startingPrice || 149}/day
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      {template.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                      {template.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {template.shortDesc || template.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                  {template.liveDemoUrl ? (
                    <a
                      href={template.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Verified Staging</span>
                  )}

                  <Link
                    href={`/websites/${template.slug}`}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl shadow-xs transition-all"
                  >
                    <span>Rent Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Localized FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            Frequently Asked Questions — {page.city}
          </h2>
          <div className="space-y-4">
            {page.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Ready to Launch in {page.city}?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Rent your website today or request a custom layout tailored to your event schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/websites"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg transition-all"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/custom-website"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-8 py-4 rounded-2xl font-bold text-sm border border-slate-700 transition-all"
            >
              <span>Custom Website Request</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
