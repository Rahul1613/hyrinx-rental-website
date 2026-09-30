import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import {
  ExternalLink,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  HelpCircle,
  Layers,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { DEFAULT_WEBSITES, DEFAULT_PRICING_PLANS } from '@/lib/templates-data'
import { getTemplateEditorialContent } from '@/lib/seo-helpers'
import {
  BreadcrumbJsonLd,
  TemplateProductJsonLd,
  FAQJsonLd,
} from '@/components/seo/JsonLd'
import WebsiteRentalForm from '@/components/websites/WebsiteRentalForm'
import DetailMockup from '@/components/websites/DetailMockup'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function WebsiteDetailPage({ params }: PageProps) {
  const { slug } = await params

  let website: any = null
  let pricingPlans: any[] = []

  try {
    const results = await Promise.all([
      prisma.website.findUnique({
        where: { slug },
      }),
      prisma.pricingPlan.findMany({
        where: { active: true },
        orderBy: { price: 'asc' },
      }),
    ])
    website = results[0]
    pricingPlans = results[1] || []
  } catch (error) {
    // Database fallback
  }

  if (!website) {
    website = DEFAULT_WEBSITES.find((w) => w.slug === slug)
  }

  if (!website) {
    notFound()
  }

  if (!pricingPlans || pricingPlans.length === 0) {
    pricingPlans = DEFAULT_PRICING_PLANS.filter((p) => p.active).sort(
      (a, b) => a.durationDays - b.durationDays
    )
  }

  const editorial = getTemplateEditorialContent(website)
  const features: string[] = website.features
    ? typeof website.features === 'string'
      ? JSON.parse(website.features)
      : website.features
    : []
  const customization: string[] = website.customization
    ? typeof website.customization === 'string'
      ? JSON.parse(website.customization)
      : website.customization
    : []
  const galleryImages: string[] = website.galleryImages
    ? typeof website.galleryImages === 'string'
      ? JSON.parse(website.galleryImages)
      : website.galleryImages
    : []

  // Related templates in the same category or overall catalog
  const relatedTemplates = DEFAULT_WEBSITES.filter(
    (w) => w.slug !== slug && (w.category === website.category || w.featured)
  ).slice(0, 3)

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Websites', url: 'https://hyrinx.in/websites' },
    {
      name: website.category || 'Templates',
      url: `https://hyrinx.in/websites?category=${encodeURIComponent(website.category || '')}`,
    },
    { name: website.name, url: `https://hyrinx.in/websites/${slug}` },
  ]

  const offerList = pricingPlans.map((plan) => ({
    name: plan.name,
    price: plan.price,
    priceCurrency: 'INR',
    duration: `${plan.durationDays || 1} Days`,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Structured Data (JSON-LD) for Googlebot */}
      <BreadcrumbJsonLd items={breadcrumbs} />
      <TemplateProductJsonLd
        name={website.name}
        description={website.description || website.shortDesc || ''}
        category={website.category || 'Website Template'}
        slug={website.slug}
        image={website.thumbnail}
        startingPrice={website.startingPrice || 149}
        offers={offerList}
      />
      <FAQJsonLd faqs={editorial.faqs} />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/websites" className="hover:text-blue-600 transition-colors">
              Websites
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link
              href={`/websites?category=${encodeURIComponent(website.category || '')}`}
              className="hover:text-blue-600 transition-colors"
            >
              {website.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">
              {website.name}
            </span>
          </nav>

          {/* Top Section: Visual Preview & Rental Order Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Left Column: Visual Mockup / Thumbnail & Live Demo CTA */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm sticky top-24">
                {website.thumbnail ? (
                  <div className="relative aspect-video bg-slate-900 group">
                    <img
                      src={website.thumbnail}
                      alt={editorial.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                      Preview: {website.name}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video">
                    <DetailMockup website={website} />
                  </div>
                )}

                {website.liveDemoUrl && (
                  <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Experience Live Website</p>
                      <p className="text-[11px] text-slate-500">Test all animations, sound, and RSVP flows</p>
                    </div>
                    <a
                      href={website.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-xl text-sm font-bold shadow-sm transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Live Demo</span>
                    </a>
                  </div>
                )}

                {/* Additional Gallery Thumbnails */}
                {galleryImages.length > 0 && (
                  <div className="p-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Template Gallery Previews
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {galleryImages.map((image: string, i: number) => (
                        <img
                          key={i}
                          src={image}
                          alt={`${website.name} screenshot preview ${i + 1} - Hyrinx Rental`}
                          className="rounded-lg border border-slate-200 aspect-video object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Title, Primary H1, Key Selling Points, and Rental Calculator */}
            <div>
              <div className="mb-3 flex items-center gap-2 flex-wrap">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                  {website.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Template
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Live in 2–6 Hours
                </span>
              </div>

              {/* Primary H1 with Target Keyword */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight">
                {website.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mb-5 leading-relaxed">
                {website.shortDesc || website.description}
              </p>

              {/* Starting at price banner */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rental Price Starts At</span>
                  <div className="text-3xl font-black text-slate-900 mt-0.5">
                    {formatPrice(website.startingPrice || 149)}
                    <span className="text-sm font-semibold text-slate-500 font-normal"> / day</span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">Zero Agency Fees</p>
                  <p>Hosting + Subdomain Included</p>
                </div>
              </div>

              {/* Client Interactive Rental Form */}
              <WebsiteRentalForm
                websiteId={website.id}
                websiteSlug={website.slug}
                pricingPlans={pricingPlans}
                startingPrice={website.startingPrice || 149}
              />

              {/* Features List */}
              {features.length > 0 && (
                <div className="mb-6 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Built-in Template Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customization Options */}
              {customization.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Included Customization Options
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {customization.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                        <Check className="h-4 w-4 text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SEO SECTION 1: Deep Editorial Information (Who It's For & What's Included) */}
          {/* ========================================================================= */}
          <div className="border-t border-slate-200 pt-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Who It's For */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
                  Who Is {website.name} Best For?
                </h2>
                <ul className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {editorial.whoItsFor.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="font-bold text-blue-600 text-base mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Included */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-emerald-600 rounded-full inline-block"></span>
                  What Is Included in Your Rental?
                </h2>
                <ul className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {editorial.whatsIncluded.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SEO SECTION 2: How Renting Works Step-by-Step                              */}
          {/* ========================================================================= */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="text-blue-400 uppercase tracking-widest text-xs font-extrabold">
                Seamless Deployment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 mb-3">
                How Renting {website.name} Works
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                No complex server configurations, no long developer contracts. Get your site live in 4 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {editorial.rentalProcessSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-black text-blue-400 mb-2 block">
                      0{idx + 1}
                    </span>
                    <h3 className="font-bold text-base text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SEO SECTION 3: FAQ Block (Direct-Answer Snippet Optimized)                 */}
          {/* ========================================================================= */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <span className="text-blue-600 font-extrabold text-xs uppercase tracking-wider">
                Clear Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Frequently Asked Questions About {website.name}
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Everything you need to know about pricing, customization, and rental duration.
              </p>
            </div>

            <div className="space-y-4">
              {editorial.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
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

          {/* ========================================================================= */}
          {/* SEO SECTION 4: Related Templates (Contextual Internal Links)               */}
          {/* ========================================================================= */}
          {relatedTemplates.length > 0 && (
            <div className="border-t border-slate-200 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Explore Related Website Templates
                  </h2>
                  <p className="text-sm text-slate-600">
                    More popular websites in {website.category} ready for rent.
                  </p>
                </div>
                <Link
                  href="/websites"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>View All Templates</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTemplates.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/websites/${rel.slug}`}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group block"
                  >
                    <div className="aspect-video bg-slate-100 overflow-hidden relative">
                      {rel.thumbnail ? (
                        <img
                          src={rel.thumbnail}
                          alt={`${rel.name} website template preview`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <DetailMockup website={rel} />
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors mt-1">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {rel.shortDesc || rel.description}
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900">
                          {formatPrice(rel.startingPrice || 149)}/day
                        </span>
                        <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          Rent Now <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
