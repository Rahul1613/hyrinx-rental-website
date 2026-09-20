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
  ShieldCheck
} from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getHomepageData() {
  const [heroContentRaw, featuredWebsites, categories, lowestPlan, settingsList] = await Promise.all([
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
                  <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    {website.thumbnail ? (
                      <img
                        src={website.thumbnail}
                        alt={website.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                        <Globe className="h-16 w-16 text-blue-400" />
                      </div>
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
                    {website.liveDemoUrl && (
                      <a
                        href={website.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border-2 border-slate-200 rounded-2xl text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
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
                <li className="pt-2">
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-200 transition-all duration-300 opacity-80 hover:opacity-100"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Staff Access
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link href="/admin/login" className="text-[10px] uppercase tracking-[0.22em] text-slate-500 hover:text-slate-300 transition-colors">Staff Access</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
