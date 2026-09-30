import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import {
  ArrowRight,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Zap,
} from 'lucide-react'
import { DEFAULT_CATEGORIES, DEFAULT_WEBSITES } from '@/lib/templates-data'
import { formatPrice } from '@/lib/utils'
import DetailMockup from '@/components/websites/DetailMockup'
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from '@/components/seo/JsonLd'

export const dynamic = 'force-dynamic'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

interface CategoryConfig {
  name: string
  slug: string
  h1: string
  title: string
  description: string
  primaryKeyword: string
  intro: string
  whyRent: string[]
  faqs: { question: string; answer: string }[]
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  wedding: {
    name: 'Wedding',
    slug: 'wedding',
    h1: 'Wedding Invitation Websites on Rent in India',
    title: 'Wedding Invitation Website on Rent from ₹149/Day | Hyrinx',
    description: 'Rent luxury royal Indian wedding invitation websites with 3D wax patrika, 7 sacred vows, shehnai audio & WhatsApp RSVP. Live in hours starting at ₹149/day.',
    primaryKeyword: 'wedding invitation website on rent',
    intro: 'Why spend ₹40,000+ on an agency wedding website or waste money on paper cards? Rent an opulent, interactive digital wedding invitation website for the exact days of your ceremonies.',
    whyRent: [
      'Save over 85% compared to custom wedding development agencies.',
      'Instant WhatsApp RSVP collection sent directly to your family phone.',
      'Interactive 3D wax-sealed patrika, couple love story timeline, and shehnai music.',
      'Interactive Google Maps navigation directly to your banquet hall or palace venue.',
      'Safe 30-day archival after your reception ends with zero recurring subscription fees.',
    ],
    faqs: [
      {
        question: 'How much does renting a wedding website cost on Hyrinx?',
        answer: 'Wedding website rentals start at just ₹149/day. Popular packages include 3-day plans (₹399) and 7-day plans (₹599), which cover the entire duration from Mehndi and Sangeet to Reception.',
      },
      {
        question: 'How do wedding guests submit their RSVPs?',
        answer: 'Guests open your wedding website link, click RSVP, choose their attendance status and dietary preferences, and their confirmation is instantly sent to your family WhatsApp number.',
      },
      {
        question: 'Can I include wedding music or Shehnai tunes on the website?',
        answer: 'Yes! Our royal wedding templates include a built-in cultural audio player featuring Shehnai, flute, or romantic background melodies with easy pause/play controls.',
      },
      {
        question: 'How fast can our wedding website go live?',
        answer: 'Once you provide your names, wedding muhurat, venue location, and photos, your wedding website is staged and live within 2 to 6 hours.',
      },
    ],
  },
  college: {
    name: 'College',
    slug: 'college',
    h1: 'College Fest & Event Websites on Rent',
    title: 'College Fest Website on Rent from ₹199/Day | Hyrinx',
    description: 'Rent battle-tested college fest, hackathon & technical symposium websites in India. Online event registration, schedule & live passes. Live in hours.',
    primaryKeyword: 'college fest website on rent',
    intro: 'Stop letting college fest portals crash on AWS during peak registration hours. Rent a verified, responsive event website designed to handle thousands of registrations without headaches.',
    whyRent: [
      'Eliminate 3 weeks of frantic student development right before semester exams.',
      'Pre-built sports, cultural, and technical event registration workflows.',
      'Mobile-optimized schedule matrix and digital participant pass issuance.',
      'Sponsor showcase banners to secure higher corporate sponsorship deals.',
      'Sub-second load times on mobile networks across campus.',
    ],
    faqs: [
      {
        question: 'Can the college fest website handle thousands of student registrations?',
        answer: 'Yes. All Hyrinx college fest templates run on high-performance cloud infrastructure with DDoS protection and CDN caching, easily handling spike traffic during fest announcements.',
      },
      {
        question: 'Can we customize the fest events, rules, and coordinators?',
        answer: 'Yes, every event category (Hackathons, Dance, Debate, Gaming, Robowars) can have customized rules, registration forms, team limits, and student coordinator contact details.',
      },
      {
        question: 'Can we rent the website just for the 3 days of our fest?',
        answer: 'Absolutely. Hyrinx lets you rent for exact durations (e.g., 3 days for ₹399 or 7 days for ₹599) to cover registration week and live fest days without paying annual fees.',
      },
    ],
  },
  'projects-for-college-students': {
    name: 'Projects for College Students',
    slug: 'projects-for-college-students',
    h1: 'Final Year Engineering Projects & Capstones on Rent',
    title: 'College Capstone Projects with Live Demo & Code | Hyrinx',
    description: 'Rent verified final year engineering and MCA projects with live demo, full GitHub code, system architecture diagrams & viva presentation guides.',
    primaryKeyword: 'projects for college students capstones',
    intro: 'Prepare for your final year semester submission and examiner viva with confidence. Rent verified, production-ready AI and full-stack software capstones with working code and documentation.',
    whyRent: [
      'Complete working source code and reproducible local development setup.',
      'Live cloud-hosted demo URL ready for your examiner presentation.',
      'Detailed system architecture, data flow diagrams, and PPT slides included.',
      'Examiner viva question and answer preparation guide.',
      'Verified by senior full-stack engineers and security researchers.',
    ],
    faqs: [
      {
        question: 'Do college student project rentals include full source code?',
        answer: 'Yes! Every project rental includes complete repository access, clean commented code, database schemas, and documentation.',
      },
      {
        question: 'Are these projects acceptable for final year engineering and MCA submissions?',
        answer: 'Yes, our projects follow IEEE standards and standard university curriculum requirements with complete architecture diagrams and research paper references.',
      },
    ],
  },
  business: {
    name: 'Business',
    slug: 'business',
    h1: 'Small Business & Restaurant Websites on Rent',
    title: 'Business & Restaurant Website on Rent from ₹199/Day | Hyrinx',
    description: 'Rent professional business profile, cafe, gym, and salon websites starting at ₹199/day in India. Zero agency retainers, mobile-friendly with WhatsApp leads.',
    primaryKeyword: 'business website on rent India',
    intro: 'Launch a high-converting digital storefront for your restaurant, gym, salon, or consultancy. Pay only for the months you run campaigns without lock-in contracts.',
    whyRent: [
      'Zero ₹30,000 upfront design fees or expensive monthly retainer agreements.',
      'Direct WhatsApp inquiry buttons and Google Maps directions for local customers.',
      'Digital QR menu integration for cafes, bistros, and dining spots.',
      'Optimized for local Indian city searches and mobile speeds.',
    ],
    faqs: [
      {
        question: 'Why should a small business rent a website instead of buying one?',
        answer: 'Renting saves capital upfront, includes free cloud hosting, requires zero maintenance from your side, and allows you to upgrade or pause anytime your business needs change.',
      },
      {
        question: 'Can I connect my business domain to the rented website?',
        answer: 'Yes! We can easily map your existing domain (e.g. yourbusiness.in) or provide a free clean Hyrinx subdomain.',
      },
    ],
  },
  birthday: {
    name: 'Birthday',
    slug: 'birthday',
    h1: 'Birthday Party & Celebration Websites on Rent',
    title: 'Birthday Invitation Website on Rent from ₹149/Day | Hyrinx',
    description: 'Rent interactive birthday celebration websites with live countdown, venue maps, photo memories, and WhatsApp RSVP. Live in minutes from ₹149/day.',
    primaryKeyword: 'birthday invitation website rent',
    intro: 'Surprise your loved ones or announce a milestone birthday with a custom celebration website featuring live countdowns, photo galleries, and guest wish walls.',
    whyRent: [
      'Unique digital experience that outshines generic WhatsApp image invites.',
      'Live countdown timer to the cake cutting celebration.',
      'Photo wall showcasing childhood memories and family highlights.',
      'Instant RSVP confirmations so you know exact guest counts for catering.',
    ],
    faqs: [
      {
        question: 'Can I play background birthday music or party songs?',
        answer: 'Yes, our celebration templates support celebratory background tunes with mute controls.',
      },
      {
        question: 'How long can I rent a birthday website for?',
        answer: 'Most people rent for 1 day (₹149) or 3 days (₹399) to cover the party weekend and memory sharing.',
      },
    ],
  },
  portfolio: {
    name: 'Portfolio',
    slug: 'portfolio',
    h1: 'Creative & Photographer Portfolio Websites on Rent',
    title: 'Photographer & Freelancer Portfolio on Rent | Hyrinx',
    description: 'Rent sleek photography and creative portfolio websites from ₹179/day. Showcase client galleries, booking inquiries, and high-res visuals instantly.',
    primaryKeyword: 'photographer portfolio website on rent',
    intro: 'Pitch high-ticket clients or showcase your photography exhibition with an ultra-sleek, minimalist portfolio without paying annual website builder fees.',
    whyRent: [
      'High-resolution image optimization with lightning-fast image loading.',
      'Rent for 7 days during job interview weeks or photography gallery shows.',
      'Integrated booking inquiry and direct WhatsApp connection.',
      'Looks incredible on mobile, iPad, and 4K displays.',
    ],
    faqs: [
      {
        question: 'Can I update the photo gallery with my own client shoots?',
        answer: 'Yes, we replace all demo images with your high-resolution portfolio photographs and categorized albums.',
      },
    ],
  },
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categoryConfig = CATEGORY_MAP[slug]
  const matchedCategory = DEFAULT_CATEGORIES.find((c) => c.slug === slug)

  if (!categoryConfig && !matchedCategory) {
    return {
      title: 'Category Not Found | Hyrinx Rental',
      robots: { index: false, follow: false },
    }
  }

  const name = categoryConfig ? categoryConfig.name : matchedCategory!.name
  const title = categoryConfig
    ? categoryConfig.title
    : `${name} Website Templates on Rent from ₹149/Day | Hyrinx`
  const description = categoryConfig
    ? categoryConfig.description
    : `Rent verified ${name.toLowerCase()} website templates starting at ₹149/day in India. Live in minutes with custom domain & mobile responsiveness.`
  const url = `https://hyrinx.in/categories/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Hyrinx Rental',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://hyrinx.in/icon-512.png',
          width: 1200,
          height: 630,
          alt: `${name} Website Templates on Rent - Hyrinx`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://hyrinx.in/icon-512.png'],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const config = CATEGORY_MAP[slug]
  const matchedCategory = DEFAULT_CATEGORIES.find((c) => c.slug === slug)

  if (!config && !matchedCategory) {
    notFound()
  }

  const categoryName = config ? config.name : matchedCategory!.name
  const templates = DEFAULT_WEBSITES.filter(
    (w) =>
      w.published &&
      (w.category.toLowerCase() === categoryName.toLowerCase() ||
        (slug === 'college' && (w.category === 'College' || w.category === 'Events')) ||
        (slug === 'projects-for-college-students' &&
          (w.category === 'Projects for College Students' || w.category === 'Project')))
  )

  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Websites', url: 'https://hyrinx.in/websites' },
    { name: categoryName, url: `https://hyrinx.in/categories/${slug}` },
  ]

  // ItemList Schema for rich search results
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryName} Website Templates on Rent`,
    numberOfItems: templates.length,
    itemListElement: templates.map((t, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: t.name,
      url: `https://hyrinx.in/websites/${t.slug}`,
      image: t.thumbnail || 'https://hyrinx.in/icon-512.png',
    })),
  }

  const faqs = config?.faqs || [
    {
      question: `How does renting a ${categoryName} website work?`,
      answer: `Choose your preferred ${categoryName} template, pick a rental duration (from 1 day to 1 year), submit your customization content, and our team delivers your live website within 2 to 6 hours with hosting included.`,
    },
    {
      question: `Can I extend my ${categoryName} website rental later?`,
      answer: 'Yes! You can extend your rental duration at any point before expiration at standard daily plan rates.',
    },
  ]

  const whyRentPoints = config?.whyRent || [
    'Save thousands compared to custom agency development.',
    'Fast delivery with cloud hosting and free subdomain included.',
    'Fully mobile responsive on smartphones, tablets, and laptops.',
    '24/7 technical support and safe 30-day archival after expiration.',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <JsonLd data={itemListSchema} />
      <FAQJsonLd faqs={faqs} />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
              Websites
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-900">{categoryName}</span>
          </nav>

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Verified Category Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              {config?.h1 || `${categoryName} Websites on Rent`}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {config?.intro ||
                `Browse ready-to-launch ${categoryName.toLowerCase()} website templates starting at ₹149/day. Zero maintenance, instant setup, and mobile-friendly design.`}
            </p>
          </div>

          {/* Templates Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Available {categoryName} Templates ({templates.length})
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Live interactive demos available
              </span>
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
                          alt={`${template.name} - ${template.category} website preview`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <DetailMockup website={template} />
                      )}
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                        ₹{template.startingPrice || 149}/day
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                          {template.category}
                        </span>
                        {template.featured && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                        {template.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {template.shortDesc || template.description}
                      </p>

                      {/* Features bullets */}
                      {template.features && (
                        <div className="space-y-1.5 mb-4">
                          {template.features.slice(0, 3).map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                    {template.liveDemoUrl ? (
                      <a
                        href={template.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">Verified Layout</span>
                    )}

                    <Link
                      href={`/websites/${template.slug}`}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl shadow-xs transition-all"
                    >
                      <span>Rent from ₹{template.startingPrice || 149}/day</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Section: Why Rent & Features */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 mb-16 shadow-xs">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                Smart Digital Strategy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-3">
                Why Rent a {categoryName} Website on Hyrinx?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Traditional custom websites take weeks of developer back-and-forth and cost ₹25,000 to ₹60,000 upfront. With Hyrinx micro-rentals, you get verified, high-performance websites configured and hosted for only the days you actually need them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyRentPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-8">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                Common Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {categoryName} Website Rental FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
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

          {/* Bottom CTA */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Need a Custom {categoryName} Website?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Tell our engineers your exact specifications and we will build, configure, and host your bespoke website in 24–48 hours.
            </p>
            <Link
              href="/custom-website"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all"
            >
              <span>Request Custom Website</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
