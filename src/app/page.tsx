import Navbar from '@/components/Navbar'
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
  Code
} from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

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
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' },
        ],
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
    featuredWebsites = results[1]
    categories = results[2]
    lowestPlan = results[3]
    settingsList = results[4]
  } catch (error) {
    console.warn('Failed to load DB data on homepage, using default fallback data:', error)
  }

  if (!featuredWebsites || featuredWebsites.length === 0) {
    featuredWebsites = [
      {
        id: 'web-eternal-moments',
        name: 'Eternal Moments',
        slug: 'eternal-moments',
        category: 'Wedding',
        description: 'Elegant luxury wedding website featuring couple love story, ceremony itinerary, RSVP form, and interactive location map.',
        shortDesc: 'Luxury wedding celebration website with story, venue details, and RSVP.',
        featured: true,
        startingPrice: 149,
      },
      {
        id: 'web-birthday-bash',
        name: 'Birthday Bash',
        slug: 'birthday-bash',
        category: 'Birthday',
        description: 'Vibrant and joyful birthday celebration website with live party countdown, wish board, venue map, and RSVP.',
        shortDesc: 'Joyful birthday party site with live countdown, wish wall, and party details.',
        featured: true,
        startingPrice: 149,
      },
      {
        id: 'web-college-fest-pro',
        name: 'College Fest Pro',
        slug: 'college-fest-pro',
        category: 'College',
        description: 'Comprehensive college festival website featuring dynamic event schedules, rulebooks, sponsor tiers, and registrations.',
        shortDesc: 'All-in-one college cultural & sports fest portal with online registration.',
        featured: true,
        startingPrice: 199,
      },
      {
        id: 'web-gourmet-bistro-cafe',
        name: 'Gourmet Bistro & Cafe',
        slug: 'gourmet-bistro-cafe',
        category: 'Business',
        description: 'Delectable restaurant and café website featuring online visual food menu, chef specials, opening hours, and table reservations.',
        shortDesc: 'Stylish café & restaurant website with menu showcase and table reservation.',
        featured: true,
        startingPrice: 199,
      },
      {
        id: 'web-shuttercraft-studio',
        name: 'ShutterCraft Studio',
        slug: 'shuttercraft-studio',
        category: 'Portfolio',
        description: 'Clean, full-bleed photography portfolio featuring wedding, portrait, and commercial shoots with package booking inquiry.',
        shortDesc: 'Visual photo gallery portfolio for professional photographers.',
        featured: true,
        startingPrice: 179,
      },
      {
        id: 'web-startup-launchpad',
        name: 'Startup Launchpad',
        slug: 'startup-launchpad',
        category: 'Startup',
        description: 'High-converting SaaS landing page with product mockups, benefit breakdown, customer proof, and early-access CTA.',
        shortDesc: 'SaaS & startup landing page with product mockups and lead capture.',
        featured: true,
        startingPrice: 299,
      },
    ]
  }

  if (!categories || categories.length === 0) {
    categories = [
      { id: 'cat-wedding', name: 'Wedding', slug: 'wedding' },
      { id: 'cat-birthday', name: 'Birthday', slug: 'birthday' },
      { id: 'cat-invitation', name: 'Invitation', slug: 'invitation' },
      { id: 'cat-college', name: 'College', slug: 'college' },
      { id: 'cat-business', name: 'Business', slug: 'business' },
      { id: 'cat-portfolio', name: 'Portfolio', slug: 'portfolio' },
      { id: 'cat-startup', name: 'Startup', slug: 'startup' },
      { id: 'cat-events', name: 'Events', slug: 'events' },
    ]
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
  const businessPhone = settings.business_phone || '+91 98765 43210'
  const businessTagline = settings.business_tagline || 'Ideas Online. Moments Forever.'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 sm:px-8 lg:px-12 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-blue-500/30 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {hero.badgeText}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
              {hero.headline}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              {hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href={hero.primaryCtaLink}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1"
              >
                {hero.primaryCtaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href={hero.secondaryCtaLink}
                className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-blue-300 px-10 py-5 rounded-2xl font-bold transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                {hero.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Dynamic Categories Showcase */}
          {categories.length > 0 && (
            <div className="mt-20 max-w-5xl mx-auto">
              <div className="text-center mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">
                Explore Popular Categories
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/websites?category=${cat.name}`}
                    className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-slate-700 hover:text-blue-600 border-2 border-slate-200 hover:border-blue-300 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Websites Section (Managed via Admin) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-blue-600 text-sm font-bold uppercase tracking-widest block mb-2">
                Admin Curated Collection
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                Featured Ready-Made Websites
              </h2>
              <p className="text-slate-600 mt-3 max-w-xl text-lg">
                Choose a professionally created template, test the live demo, and launch in minutes.
              </p>
            </div>
            <Link
              href="/websites"
              className="mt-6 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 text-sm flex items-center gap-2"
            >
              View All Websites ({featuredWebsites.length}+)
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWebsites.map((website) => (
              <div
                key={website.id}
                className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-500 group flex flex-col justify-between hover:-translate-y-2"
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
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-slate-800 shadow-lg border border-slate-200">
                      {website.category}
                    </span>
                    {website.featured && (
                      <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-white" />
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-7">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {website.name}
                    </h3>
                    <p className="text-slate-600 text-base line-clamp-2 mb-5 leading-relaxed">
                      {website.shortDesc || website.description}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-7 pt-4 border-t-2 border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Starting from</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                      {formatPrice(website.startingPrice || lowestPrice)}
                      <span className="text-sm font-normal text-slate-500">/day</span>
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/demo/${website.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border-2 border-slate-200 rounded-2xl text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/websites/${website.slug}`}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-2"
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

          {/* Structured Projects Table & Cards */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
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
                            ✅ Yes (Live Demo)
                          </a>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium italic">
                            ❌ No live link shown
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
                          ✅ Yes
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
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 border-y border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: Tag, text: `Starting at ₹${lowestPrice}/day` },
              { icon: Clock, text: 'No long-term contracts' },
              { icon: Palette, text: 'Ready-made designs' },
              { icon: Smartphone, text: 'Mobile friendly & fast' },
              { icon: Zap, text: 'Fast setup & launch' },
              { icon: Settings, text: 'Customisation included' },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <item.icon className="h-6 w-6 text-white flex-shrink-0" />
                <span className="text-sm font-bold text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-blue-600 text-sm font-bold uppercase tracking-widest block mb-3">
              Simple Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-5">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Get your temporary website live in five simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-400 to-indigo-400 -z-10 rounded-full" />
            {[
              { step: '01', title: 'Choose', desc: 'Browse ready-made websites' },
              { step: '02', title: 'Preview', desc: 'Experience before renting' },
              { step: '03', title: 'Customise', desc: 'Add your content and branding' },
              { step: '04', title: 'Rent', desc: 'Select rental period' },
              { step: '05', title: 'Go Live', desc: 'Your website goes live' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 border-4 border-white shadow-xl shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-3">
              Versatile Solutions
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              Perfect For Every Occasion
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
              From college events to business launches, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 hover:from-slate-750 hover:to-indigo-900 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 -z-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Need a Website Designed Specially For You?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Can't find the exact template you want? Submit a custom website request and our team will build it.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Link
              href="/custom-website"
              className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 rounded-2xl font-bold transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Request Custom Website
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-10 py-5 rounded-2xl font-bold transition-all duration-300 text-lg backdrop-blur-sm hover:-translate-y-1"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-20 px-4 sm:px-6 lg:px-8 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-wider">{businessName}</h3>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">Rental Websites</p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                {businessTagline}
              </p>
              <div className="text-sm text-slate-500 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-blue-400">✉</span> {businessEmail}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-400">📞</span> {businessPhone}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-3 text-base">
                <li><Link href="/websites" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">All Websites</Link></li>
                <li><Link href="/pricing" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Rental Pricing</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">How It Works</Link></li>
                <li><Link href="/use-cases" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Use Cases</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3 text-base">
                <li><Link href="/custom-website" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Custom Website Request</Link></li>
                <li><Link href="/websites?category=College" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">College Fests & Tech</Link></li>
                <li><Link href="/websites?category=Wedding" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Wedding Celebrations</Link></li>
                <li><Link href="/websites?category=Business" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Business Campaigns</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Portal & Help</h4>
              <ul className="space-y-3 text-base">
                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Contact Support</Link></li>
                <li><Link href="/faq" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Frequently Asked Questions</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
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
