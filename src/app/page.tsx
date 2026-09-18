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
        badgeText: parsed.badgeText || `Starting at ₹${lowestPlan?.price || 49} / day`,
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
      badgeText: hero.badgeText || `Starting at ₹${lowestPlan?.price || 49} / day`,
    },
    featuredWebsites,
    categories,
    lowestPrice: lowestPlan?.price || 49,
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
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {hero.badgeText}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              {hero.headline}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={hero.primaryCtaLink}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg shadow-md hover:shadow-lg"
              >
                {hero.primaryCtaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href={hero.secondaryCtaLink}
                className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
              >
                {hero.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Dynamic Categories Showcase */}
          {categories.length > 0 && (
            <div className="mt-14 max-w-4xl mx-auto">
              <div className="text-center mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Explore Popular Categories
              </div>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/websites?category=${cat.name}`}
                    className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-1">
                Admin Curated Collection
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Featured Ready-Made Websites
              </h2>
              <p className="text-slate-600 mt-2 max-w-xl">
                Choose a professionally created template, test the live demo, and launch in minutes.
              </p>
            </div>
            <Link
              href="/websites"
              className="mt-4 md:mt-0 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1.5"
            >
              View All Websites ({featuredWebsites.length}+)
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWebsites.map((website) => (
              <div
                key={website.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    {website.thumbnail ? (
                      <img
                        src={website.thumbnail}
                        alt={website.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <Globe className="h-12 w-12 text-blue-300" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                      {website.category}
                    </span>
                    {website.featured && (
                      <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-950 font-bold px-2.5 py-0.5 rounded-full text-xs shadow-sm flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-950" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {website.name}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {website.shortDesc || website.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Starting from</span>
                    <span className="text-lg font-bold text-slate-900">
                      {formatPrice(website.startingPrice || lowestPrice)}
                      <span className="text-xs font-normal text-slate-500">/day</span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {website.liveDemoUrl && (
                      <a
                        href={website.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Link
                      href={`/websites/${website.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
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
      <section className="bg-white py-12 border-y border-slate-200">
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
              <div key={i} className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get your temporary website live in five simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-blue-200 -z-10" />
            {[
              { step: '01', title: 'Choose', desc: 'Browse ready-made websites' },
              { step: '02', title: 'Preview', desc: 'Experience before renting' },
              { step: '03', title: 'Customise', desc: 'Add your content and branding' },
              { step: '04', title: 'Rent', desc: 'Select rental period' },
              { step: '05', title: 'Go Live', desc: 'Your website goes live' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Perfect For Every Occasion
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
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
              <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700/60 hover:bg-slate-750 transition-colors">
                <item.icon className="h-8 w-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Need a Website Designed Specially For You?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Can't find the exact template you want? Submit a custom website request and our team will build it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/custom-website"
              className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold transition-colors text-lg shadow-md"
            >
              Request Custom Website
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center bg-blue-800/60 hover:bg-blue-800 text-white border border-blue-400/40 px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-black text-white mb-1 tracking-wider">{businessName}</h3>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3">Rental Websites</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {businessTagline}
              </p>
              <div className="text-xs text-slate-500 space-y-1">
                <p>Email: {businessEmail}</p>
                <p>Phone: {businessPhone}</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/websites" className="hover:text-white transition-colors">All Websites</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Rental Pricing</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/use-cases" className="hover:text-white transition-colors">Use Cases</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/custom-website" className="hover:text-white transition-colors">Custom Website Request</Link></li>
                <li><Link href="/websites?category=College" className="hover:text-white transition-colors">College Fests & Tech</Link></li>
                <li><Link href="/websites?category=Wedding" className="hover:text-white transition-colors">Wedding Celebrations</Link></li>
                <li><Link href="/websites?category=Business" className="hover:text-white transition-colors">Business Campaigns</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Portal & Help</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
                <li>
                  <Link 
                    href="/admin" 
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors mt-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
              <Link href="/admin/login" className="text-slate-600 hover:text-slate-400">Admin Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
