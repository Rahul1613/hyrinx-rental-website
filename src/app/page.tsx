import Navbar from '@/components/layout/Navbar'
import InteractiveHero from '@/components/home/InteractiveHero'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  Globe,
  Clock,
  Smartphone,
  Zap,
  Palette,
  Share,
  Calendar,
  Tag,
  Settings,
  GraduationCap,
  Heart,
  Star,
  Users,
  PartyPopper,
  Building2,
  ExternalLink,
  ShieldCheck,
  Code,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

import { DEFAULT_WEBSITES, DEFAULT_CATEGORIES, DEFAULT_PRICING_PLANS } from '@/lib/templates-data'

export const dynamic = 'force-dynamic'

// Static featured websites — always the guaranteed base
const STATIC_FEATURED = DEFAULT_WEBSITES.filter(w => w.featured && w.published).slice(0, 8)

async function getHomepageData() {
  let heroContentRaw: any = null
  let featuredWebsites: any[] = []
  let categories: any[] = []
  let lowestPlan: any = null
  let settingsList: any[] = []

  try {
    const results = await Promise.all([
      prisma.homepageContent.findFirst({
        where: { section: 'hero', enabled: true },
      }),
      prisma.website.findMany({
        where: { published: true },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
        take: 6,
      }),
      prisma.category.findMany({
        where: { enabled: true },
        orderBy: { order: 'asc' },
        take: 8,
      }),
      prisma.pricingPlan.findFirst({
        where: { active: true },
        orderBy: { price: 'asc' },
      }),
      prisma.settings.findMany(),
    ])
    heroContentRaw = results[0]
    const dbWebsites: any[] = results[1] || []
    categories = results[2] || []
    lowestPlan = results[3]
    settingsList = results[4]

    // Prioritize the real interactive featured projects on the homepage
    const staticFormatted = STATIC_FEATURED.map(w => ({
      ...w,
      features: JSON.stringify(w.features),
      customization: JSON.stringify(w.customization),
    }))
    const staticSlugs = new Set(STATIC_FEATURED.map(w => w.slug))
    const nonDupeDb = dbWebsites.filter((w: any) => !staticSlugs.has(w.slug))
    featuredWebsites = [...staticFormatted, ...nonDupeDb].slice(0, 8)

  } catch (error) {
    console.warn('Failed to load DB data on homepage, using static fallback:', error)
  }

  // Guarantee at least 6 featured websites from static data
  if (!featuredWebsites || featuredWebsites.length === 0) {
    featuredWebsites = STATIC_FEATURED.map(w => ({
      ...w,
      features: JSON.stringify(w.features),
      customization: JSON.stringify(w.customization),
    }))
  }

  // Always merge categories: static is base, DB overrides by name
  const staticCats = DEFAULT_CATEGORIES.filter(c => c.enabled)
  if (!categories || categories.length === 0) {
    categories = staticCats
  } else {
    const dbCatNames = new Set(categories.map((c: any) => c.name.toLowerCase()))
    const staticOnly = staticCats.filter(c => !dbCatNames.has(c.name.toLowerCase()))
    categories = [...categories, ...staticOnly]
  }

  // Fallback lowestPlan to static pricing if DB returned nothing
  if (!lowestPlan) {
    lowestPlan = DEFAULT_PRICING_PLANS.filter(p => p.active).sort((a, b) => a.price - b.price)[0]
  }

  let hero: any = {}
  if (heroContentRaw?.content) {
    try {
      const parsed = JSON.parse(heroContentRaw.content)
      hero = {
        headline: parsed.headline || parsed.heading || 'Why Buy a Website? Rent One Instead.',
        subheadline: parsed.subheadline || parsed.subheading || 'Beautiful, ready-to-use websites for events, celebrations, businesses, portfolios and projects. Rent for a day, a week, a month or longer.',
        primaryCtaText: parsed.primaryCtaText || parsed.ctaText || 'Browse Websites',
        primaryCtaLink: parsed.primaryCtaLink || parsed.ctaLink || '/websites',
        secondaryCtaText: parsed.secondaryCtaText || 'View Live Demos',
        secondaryCtaLink: parsed.secondaryCtaLink || '/websites',
        badgeText: parsed.badgeText || `Starting at ₹${lowestPlan?.price || 149} / day`,
      }
    } catch {}
  }

  const settingsMap: Record<string, string> = {}
  settingsList.forEach((s) => {
    settingsMap[s.key] = s.value
  })

  return {
    hero: {
      headline: hero.headline || 'Why Buy a Website? Rent One Instead.',
      subheadline: hero.subheadline || 'Beautiful, ready-to-use websites for events, celebrations, businesses, portfolios and projects. Rent for a day, a week, a month or longer.',
      primaryCtaText: hero.primaryCtaText || 'Browse Websites',
      primaryCtaLink: hero.primaryCtaLink || '/websites',
      secondaryCtaText: hero.secondaryCtaText || 'View Live Demos',
      secondaryCtaLink: hero.secondaryCtaLink || '/websites',
      badgeText: hero.badgeText || `Starting at ₹${lowestPlan?.price || 149} / day`,
    },
    featuredWebsites,
    categories,
    lowestPrice: lowestPlan?.price || 149,
    settings: settingsMap,
  }
}

export default async function Home() {
  const { hero, featuredWebsites, categories, lowestPrice, settings } = await getHomepageData()

  const businessName = settings.business_name || 'HYRINX'
  const businessEmail = settings.business_email || 'contact@hyrinx.com'
  const businessPhone = settings.business_phone || '+91 97302 13645'
  const businessTagline = settings.business_tagline || 'Ideas Online. Moments Forever.'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <InteractiveHero
        hero={hero}
        categories={categories}
        lowestPrice={lowestPrice}
      />

      {/* Other Services of Hyrinx Showcase Banner */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900/95 via-[#120e0a] to-neutral-950 border border-amber-500/30 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
              <BookOpen className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono uppercase tracking-widest mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                13 Living Volumes • 3D Study Room
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-light">
                Beyond Websites: Explore Hyrinx Enterprise Divisions
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Step inside our private 3D library room. 13 physical volumes covering Custom Software, AI Automations, Luxury Branding, WhatsApp Commerce, and Cyber Defense.
              </p>
            </div>
          </div>
          <Link
            href="/hyrinx-services-demo"
            className="whitespace-nowrap inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition-all duration-300 text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:-translate-y-0.5 shrink-0"
          >
            <span>Other Services of Hyrinx</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured Websites Section (Managed via Admin) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16">
            <div>
              <span className="text-blue-600 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
                Admin Curated Collection
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent leading-tight">
                Featured Ready-Made Websites
              </h2>
              <p className="text-slate-600 mt-2 sm:mt-3 max-w-xl text-sm sm:text-lg">
                Choose a professionally created template, test the live demo, and launch in minutes.
              </p>
            </div>
            <Link
              href="/websites"
              className="mt-5 md:mt-0 w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 shadow-md sm:shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 text-xs sm:text-sm flex items-center gap-2"
            >
              View All Websites ({DEFAULT_WEBSITES.filter(w => w.published).length}+)
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {featuredWebsites.map((website) => (
              <div
                key={website.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 sm:border-2 sm:border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-500 group flex flex-col justify-between hover:-translate-y-1 sm:hover:-translate-y-2 shadow-sm sm:shadow-none"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden">
                    {website.thumbnail ? (
                      <img
                        src={website.thumbnail}
                        alt={website.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <HomepageCardMockup website={website} />
                    )}
                    <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold text-slate-800 shadow-md border border-slate-200">
                      {website.category}
                    </span>
                    {website.featured && (
                      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs shadow-md flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-white" />
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4 sm:p-7">
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-3 group-hover:text-blue-600 transition-colors">
                      {website.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-base line-clamp-2 mb-2 sm:mb-5 leading-relaxed">
                      {website.shortDesc || website.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-7 py-3 sm:py-5 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-4 bg-slate-50/60">
                  <div>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider block">From</span>
                    <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                      {formatPrice(website.startingPrice || lowestPrice)}
                      <span className="text-[10px] sm:text-sm font-normal text-slate-500">/day</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <Link
                      href={`/demo/${website.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:p-2.5 border border-slate-200 sm:border-2 rounded-lg sm:rounded-xl text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center bg-white shadow-xs"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/websites/${website.slug}`}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-1 whitespace-nowrap"
                    >
                      Rent Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects for College Students Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider block w-fit mb-3">
                Academic &amp; Final Year Capstones
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Projects for College Students
              </h2>
              <p className="text-slate-400 text-base mt-2 max-w-2xl">
                Verified, working full-stack and AI final-year projects with live web demo, complete GitHub source code, architecture diagrams, and viva presentations. Rent for semester submissions.
              </p>
            </div>
            <Link
              href="/websites?category=Projects+for+College+Students"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all shadow-lg shadow-blue-500/20"
            >
              Browse All Student Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Responsive View: Desktop/Tablet Table + Mobile Cards */}
          {/* 1. Desktop & Tablet Table (md and up) */}
          <div className="hidden md:block bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/80 text-xs uppercase font-bold text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">#</th>
                    <th className="py-4 px-6">Project Name &amp; Description</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Live Demo</th>
                    <th className="py-4 px-6 text-center">GitHub Code</th>
                    <th className="py-4 px-6 text-right">Rent Project</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {[
                    {
                      id: 1,
                      name: 'Scalnex — Business Growth & Job SaaS',
                      slug: 'scalnex-business-saas',
                      desc: 'Full-stack AI business growth & talent matching recruitment engine.',
                      status: 'Live',
                      liveDemoUrl: 'https://scalnex-businessgrowthplatform.netlify.app',
                      github: 'https://github.com/Rahul1613',
                      price: 199,
                    },
                    {
                      id: 2,
                      name: 'AI Phishing Detection Engine',
                      slug: 'ai-phishing-detection-engine',
                      desc: 'Real-time cybersecurity ML engine for detecting phishing URLs & email threats.',
                      status: 'Live',
                      liveDemoUrl: 'https://phishing-detection-ai-powered.netlify.app',
                      github: 'https://github.com/Rahul1613',
                      price: 199,
                    },
                    {
                      id: 3,
                      name: 'SecurePass AI — Password Security Analyzer',
                      slug: 'securepass-ai-analyzer',
                      desc: 'Entropy calculation engine and AI credential vulnerability analyzer.',
                      status: 'Live',
                      liveDemoUrl: 'https://securepass-ai.netlify.app',
                      github: 'https://github.com/Rahul1613',
                      price: 199,
                    },
                    {
                      id: 4,
                      name: 'Aptitude Assessment Platform',
                      slug: 'aptitude-assessment-platform',
                      desc: 'Campus placement examination portal with timer & analytics dashboard.',
                      status: 'Live',
                      liveDemoUrl: null,
                      github: 'https://github.com/Rahul1613',
                      price: 199,
                    },
                    {
                      id: 5,
                      name: 'AI Voice Assistant',
                      slug: 'ai-voice-assistant',
                      desc: 'Voice-controlled desktop & web assistant with NLP intent recognition.',
                      status: 'Live',
                      liveDemoUrl: null,
                      github: 'https://github.com/Rahul1613',
                      price: 199,
                    },
                    {
                      id: 6,
                      name: 'Image Steganography Tool',
                      slug: 'image-steganography-tool',
                      desc: 'LSB image steganography and AES-256 encrypted payload concealing application.',
                      status: 'Live',
                      liveDemoUrl: null,
                      github: 'https://github.com/Rahul1613',
                      price: 199,
                    },
                  ].map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-slate-500">{proj.id}</td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-white block text-base">{proj.name}</span>
                        <span className="text-xs text-slate-400 mt-0.5 block">{proj.desc}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2.5 py-1 rounded-full text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          ● {proj.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {proj.liveDemoUrl ? (
                          <a
                            href={proj.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live Demo
                          </a>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium italic">
                            Private
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                        >
                          <Code className="h-3.5 w-3.5 text-indigo-400" />
                          Code
                        </a>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <Link
                          href={`/websites/${proj.slug}`}
                          className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20 whitespace-nowrap"
                        >
                          Rent · ₹{proj.price}/day
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Mobile Cards (sm and below) */}
          <div className="md:hidden space-y-4">
            {[
              {
                id: 1,
                name: 'Scalnex — Business Growth & Job SaaS',
                slug: 'scalnex-business-saas',
                desc: 'Full-stack AI business growth & talent matching recruitment engine.',
                status: 'Live',
                liveDemoUrl: 'https://scalnex-businessgrowthplatform.netlify.app',
                github: 'https://github.com/Rahul1613',
                price: 199,
              },
              {
                id: 2,
                name: 'AI Phishing Detection Engine',
                slug: 'ai-phishing-detection-engine',
                desc: 'Real-time cybersecurity ML engine for detecting phishing URLs & email threats.',
                status: 'Live',
                liveDemoUrl: 'https://phishing-detection-ai-powered.netlify.app',
                github: 'https://github.com/Rahul1613',
                price: 199,
              },
              {
                id: 3,
                name: 'SecurePass AI — Password Security Analyzer',
                slug: 'securepass-ai-analyzer',
                desc: 'Entropy calculation engine and AI credential vulnerability analyzer.',
                status: 'Live',
                liveDemoUrl: 'https://securepass-ai.netlify.app',
                github: 'https://github.com/Rahul1613',
                price: 199,
              },
              {
                id: 4,
                name: 'Aptitude Assessment Platform',
                slug: 'aptitude-assessment-platform',
                desc: 'Campus placement examination portal with timer & analytics dashboard.',
                status: 'Live',
                liveDemoUrl: null,
                github: 'https://github.com/Rahul1613',
                price: 199,
              },
              {
                id: 5,
                name: 'AI Voice Assistant',
                slug: 'ai-voice-assistant',
                desc: 'Voice-controlled desktop & web assistant with NLP intent recognition.',
                status: 'Live',
                liveDemoUrl: null,
                github: 'https://github.com/Rahul1613',
                price: 199,
              },
              {
                id: 6,
                name: 'Image Steganography Tool',
                slug: 'image-steganography-tool',
                desc: 'LSB image steganography and AES-256 encrypted payload concealing application.',
                status: 'Live',
                liveDemoUrl: null,
                github: 'https://github.com/Rahul1613',
                price: 199,
              },
            ].map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-slate-500 font-bold">#{proj.id}</span>
                    <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug">{proj.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{proj.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Demo
                      </a>
                    )}
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                    >
                      <Code className="h-3 w-3 text-indigo-400" />
                      Code
                    </a>
                  </div>

                  <Link
                    href={`/websites/${proj.slug}`}
                    className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20"
                  >
                    Rent · ₹{proj.price}/day
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10 sm:py-16 border-y border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 lg:gap-8">
            {[
              { icon: Tag, text: `Starting at ₹${lowestPrice}/day` },
              { icon: Clock, text: 'No long-term contracts' },
              { icon: Palette, text: 'Ready-made designs' },
              { icon: Smartphone, text: 'Mobile friendly & fast' },
              { icon: Zap, text: 'Fast setup & launch' },
              { icon: Settings, text: 'Customisation included' },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2.5 sm:space-x-3 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20">
                <item.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-20">
            <span className="text-blue-600 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2 sm:mb-3">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-3 sm:mb-5 leading-tight">
              How It Works
            </h2>
            <p className="text-sm sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Get your temporary website live in five simple steps
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-400 to-indigo-400 -z-10 rounded-full" />
            {[
              { step: '01', title: 'Choose', desc: 'Browse ready-made websites' },
              { step: '02', title: 'Preview', desc: 'Experience before renting' },
              { step: '03', title: 'Customise', desc: 'Add your content and branding' },
              { step: '04', title: 'Rent', desc: 'Select rental period' },
              { step: '05', title: 'Go Live', desc: 'Your website goes live' },
            ].map((item, i) => (
              <div key={i} className="text-center group bg-white/60 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none border border-slate-200/60 sm:border-0 shadow-sm sm:shadow-none">
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-2xl font-bold mx-auto mb-3 sm:mb-5 border-2 sm:border-4 border-white shadow-md sm:shadow-xl shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2 sm:mb-3">
              Versatile Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-5 leading-tight">
              Perfect For Every Occasion
            </h2>
            <p className="text-sm sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
              From college events to business launches, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: GraduationCap, title: 'College Events', desc: 'Fest, farewell, fresher, hackathon, sports and seminars' },
              { icon: PartyPopper, title: 'Birthdays', desc: 'Personal birthday websites with galleries, wishes and memories' },
              { icon: Heart, title: 'Weddings', desc: 'Wedding invitation, schedule, gallery, RSVP and location' },
              { icon: Building2, title: 'Businesses', desc: 'Temporary landing pages, campaigns and launches' },
              { icon: Star, title: 'Startups', desc: 'Pitch pages, product launches and presentations' },
              { icon: Users, title: 'Students', desc: 'Projects, portfolios and demonstrations' },
              { icon: Palette, title: 'Creators', desc: 'Personal portfolios and campaign websites' },
              { icon: Calendar, title: 'Celebrations', desc: 'Anniversaries, parties, and special moments' },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-700/50 hover:border-blue-500/50 hover:from-slate-750 hover:to-indigo-900 transition-all duration-300 group hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entity Definition & E-E-A-T Authority Block (GEO / AEO Optimization) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                About Hyrinx Rental & Developer Platform
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Why Buy an Expensive Website When You Can <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Rent One Instead?</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Founded by Rahul Sisode and Harshal, <strong>Hyrinx Rental</strong> is India’s premier verified website rental and temporary developer platform. Instead of paying ₹25,000 to ₹75,000 to digital agencies for events or campaigns that only last a few days or weeks, Hyrinx gives you complete access to battle-tested, high-conversion website templates starting at just ₹149/day.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Every rental includes high-speed cloud hosting, SSL certification, mobile-responsive layout, customization with your text and images, and custom domain mapping. Whether you are hosting a royal wedding in Udaipur, organizing an engineering college fest in Pune, or running a flash business campaign in Mumbai, Hyrinx gets you live in 2 to 6 hours.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/vs/rent-vs-custom-website"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 bg-blue-950/60 border border-blue-800/80 px-4 py-2 rounded-xl transition-all"
                >
                  <span>Rent vs Custom Website</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/vs/hyrinx-vs-wix"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-950/60 border border-indigo-800/80 px-4 py-2 rounded-xl transition-all"
                >
                  <span>Hyrinx vs Wix & WordPress</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/founders"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/80 px-4 py-2 rounded-xl transition-all"
                >
                  <span>Meet Our Founders</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-base sm:text-lg mb-3">
                  ₹149
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-1">Starting Price</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Rent websites per day with zero upfront development retainers or hidden server bills.</p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-base sm:text-lg mb-3">
                  2-6h
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-1">Rapid Launch</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Submit your details and your branded website goes live within hours, not weeks.</p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-base sm:text-lg mb-3">
                  100%
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-1">Fully Managed</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Cloud hosting, SSL certificates, speed optimization, and backups included in every tier.</p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-base sm:text-lg mb-3">
                  30+
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-1">Ready Templates</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Tested designs for weddings, college fests, restaurants, gyms, and portfolios.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visible FAQ Section (Matches JSON-LD FAQPage Schema for 100% Rich Result Compliance) */}
      <section id="faq" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-blue-400 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2 sm:mb-3">
              Help & Clarifications
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 sm:mb-5 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
              Everything you need to know about renting website templates with Hyrinx
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-2.5">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  What is website renting and how does Hyrinx work?
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
                Website renting allows you to rent a professionally built, fully functional website for days, weeks, or months starting at ₹149/day. Hyrinx provides instant deployment, customisation, free hosting, and custom domain setup.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-2.5">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  How can I rent a website or hire a website developer on Hyrinx?
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
                Browse through 30+ ready-to-use website templates on hyrinx.in, preview the live demo, pick your rental plan (from 1 day to 1 year), and go live within 2 to 6 hours. For tailored needs, request a custom website from our developers.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-2.5">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  Can college students rent projects for academic and semester submissions?
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
                Yes! Hyrinx provides verified full-stack and AI capstone projects for college students with complete source code, live demos, architecture documentation, and viva presentations.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-2.5">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  What is included in the website rental price?
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
                All Hyrinx rental plans include fast cloud hosting, customisation with your content and logo, mobile-responsive layout, SEO setup, 24/7 technical support, and subdomain or custom domain mapping.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-2.5">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  Can I connect my own custom domain (e.g. mywedding.com)?
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
                Yes! By default, your website is instantly deployed on a free clean subdomain (e.g., yourname.hyrinx.com). If you already own or want a custom domain (e.g., rohanwedsneha.in or technofest2026.org), our engineers configure DNS records for you at zero extra charge.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 space-y-2.5">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  What happens when my rental duration finishes?
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
                When your selected rental period ends, your website is safely archived. We maintain a secure backup of all your customized event data for 30 days, allowing you to renew or re-activate your website anytime with a single click.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-400 hover:text-white bg-blue-900/30 hover:bg-blue-800/50 border border-blue-700/60 px-5 py-2.5 rounded-xl transition-all"
            >
              <span>View All Frequently Asked Questions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 -z-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Need a Website Designed Specially For You?
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Can't find the exact template you want? Submit a custom website request and our team will build it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
            <Link
              href="/custom-website"
              className="inline-flex items-center justify-center bg-white text-blue-700 hover:bg-blue-50 px-6 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-sm sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
            >
              Request Custom Website
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-6 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-sm sm:text-lg backdrop-blur-sm hover:-translate-y-1 w-full sm:w-auto"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Complete Internal Link Architecture */}
      <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
            {/* Col 1: Brand & Contact */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-wider">{businessName}</h3>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">Rental Websites & Dev</p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {businessTagline}
              </p>
              <div className="text-xs text-slate-400 space-y-1.5">
                <p className="flex items-center gap-2">
                  <span className="text-blue-400">✉</span> {businessEmail}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-400">📞</span> {businessPhone}
                </p>
                <p className="text-slate-500 pt-1 text-[11px]">
                  Founders: Rahul Sisode &amp; Harshal &bull; India
                </p>
              </div>
            </div>

            {/* Col 2: Explore */}
            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                <li><Link href="/websites" className="hover:text-white hover:translate-x-1 transition-all inline-block">All 30+ Websites</Link></li>
                <li><Link href="/pricing" className="hover:text-white hover:translate-x-1 transition-all inline-block">Rental Pricing (₹149/d)</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white hover:translate-x-1 transition-all inline-block">How Renting Works</Link></li>
                <li><Link href="/use-cases" className="hover:text-white hover:translate-x-1 transition-all inline-block">Use Cases</Link></li>
                <li><Link href="/founders" className="hover:text-white hover:translate-x-1 transition-all inline-block">Meet the Founders</Link></li>
                <li><Link href="/custom-website" className="hover:text-white hover:translate-x-1 transition-all inline-block">Custom Website</Link></li>
                <li><Link href="/hyrinx-services-demo" className="text-amber-400 hover:text-amber-300 font-semibold hover:translate-x-1 transition-all inline-block">★ Other Services</Link></li>
              </ul>
            </div>

            {/* Col 3: Categories */}
            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Categories</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                <li><Link href="/categories/wedding" className="hover:text-white hover:translate-x-1 transition-all inline-block">Royal Wedding Invites</Link></li>
                <li><Link href="/categories/college-fest" className="hover:text-white hover:translate-x-1 transition-all inline-block">College Fests &amp; Events</Link></li>
                <li><Link href="/categories/business" className="hover:text-white hover:translate-x-1 transition-all inline-block">Business &amp; SaaS Profiles</Link></li>
                <li><Link href="/categories/restaurant" className="hover:text-white hover:translate-x-1 transition-all inline-block">Restaurants &amp; Cafes</Link></li>
                <li><Link href="/categories/photographer" className="hover:text-white hover:translate-x-1 transition-all inline-block">Photographer Portfolios</Link></li>
                <li><Link href="/categories/birthday" className="hover:text-white hover:translate-x-1 transition-all inline-block">Birthday Celebrations</Link></li>
                <li><Link href="/categories/gym-fitness" className="hover:text-white hover:translate-x-1 transition-all inline-block">Gym &amp; Fitness Studios</Link></li>
              </ul>
            </div>

            {/* Col 4: Free Tools & Comparison */}
            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">Free Tools &amp; Guides</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                <li><Link href="/tools" className="text-cyan-400 hover:text-cyan-300 font-semibold hover:translate-x-1 transition-all inline-block">Free Planning Tools Hub</Link></li>
                <li><Link href="/tools/wedding-website-checklist" className="hover:text-white hover:translate-x-1 transition-all inline-block">Wedding Website Checklist</Link></li>
                <li><Link href="/tools/college-fest-planner" className="hover:text-white hover:translate-x-1 transition-all inline-block">College Fest Planner</Link></li>
                <li><Link href="/tools/website-cost-calculator" className="hover:text-white hover:translate-x-1 transition-all inline-block">Website Cost Calculator</Link></li>
                <li><Link href="/tools/qr-code-invitation-generator" className="hover:text-white hover:translate-x-1 transition-all inline-block">QR Code Generator</Link></li>
                <li><Link href="/vs/rent-vs-custom-website" className="hover:text-white hover:translate-x-1 transition-all inline-block">Rent vs Custom Website</Link></li>
                <li><Link href="/vs/hyrinx-vs-wix" className="hover:text-white hover:translate-x-1 transition-all inline-block">Hyrinx vs Wix &amp; WordPress</Link></li>
              </ul>
            </div>

            {/* Col 5: City Rentals & Support */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold mb-3 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">City Hubs &amp; Help</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                <li><Link href="/rent" className="hover:text-white hover:translate-x-1 transition-all inline-block">All Indian City Hubs</Link></li>
                <li><Link href="/rent/wedding-invitation-website-mumbai" className="hover:text-white hover:translate-x-1 transition-all inline-block">Wedding Websites Mumbai</Link></li>
                <li><Link href="/rent/college-fest-website-pune" className="hover:text-white hover:translate-x-1 transition-all inline-block">Fest Websites Pune</Link></li>
                <li><Link href="/rent/business-website-delhi" className="hover:text-white hover:translate-x-1 transition-all inline-block">Business Websites Delhi</Link></li>
                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact Support</Link></li>
                <li><Link href="/faq" className="hover:text-white hover:translate-x-1 transition-all inline-block">Frequently Asked Questions</Link></li>
                <li><Link href="/order/track" className="hover:text-white hover:translate-x-1 transition-all inline-block">Track Rental Order</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">XML Sitemap</Link>
              <Link href="/llms.txt" className="hover:text-slate-400 transition-colors">llms.txt</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HomepageCardMockup({ website }: { website: any }) {
  const cat = website.category || ''

  if (cat === 'Wedding') {
    return (
      <div className="w-full h-full bg-[#FAF5EE] text-stone-800 p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
          <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-amber-900">
            Royal Wedding
          </span>
          <span className="text-[10px] text-stone-500 font-serif">Dec 2026</span>
        </div>
        <div className="text-center my-auto py-3">
          <h4 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            {website.name}
          </h4>
          <p className="text-[11px] text-stone-600 font-serif italic mt-1">
            Celebrate Our Union &bull; Udaipur Palace
          </p>
        </div>
        <div className="flex gap-2 justify-center pt-2 border-t border-stone-200/60 text-[10px] text-stone-500 font-serif">
          <span>💍 Ceremony</span>
          <span>&bull;</span>
          <span>🥂 Reception</span>
        </div>
      </div>
    )
  }

  if (cat === 'Birthday' || cat === 'Celebration') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 text-slate-800 p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-pink-600 bg-pink-100/80 px-2 py-0.5 rounded-md">
            Party Live
          </span>
          <span className="text-[11px] text-purple-600 font-bold">🎉 Countdown</span>
        </div>
        <div className="text-center my-auto py-3">
          <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {website.name}
          </h4>
          <p className="text-[11px] text-slate-600 font-medium mt-1">
            Music &bull; Cake Cutting &bull; Games
          </p>
        </div>
        <div className="text-[10px] text-center text-pink-700 font-semibold bg-white/70 py-1 rounded-lg border border-pink-100">
          Skyline Rooftop &bull; Confirm Attendance
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          {cat} Edition
        </span>
        <span className="text-[10px] text-blue-200">🚀 Template</span>
      </div>
      <div className="text-center my-auto py-3">
        <h4 className="text-lg font-black text-white tracking-tight leading-tight">
          {website.name}
        </h4>
        <p className="text-[11px] text-blue-200 line-clamp-1 mt-1">
          {website.shortDesc}
        </p>
      </div>
      <div className="text-[10px] text-center text-cyan-200 bg-white/10 py-1 rounded border border-white/10">
        Interactive Live Demo Available
      </div>
    </div>
  )
}
