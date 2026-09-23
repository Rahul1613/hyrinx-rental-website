'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Music,
  CheckCircle2,
  Sparkles,
  PartyPopper,
  GraduationCap,
  Award,
  Users,
  Utensils,
  Scissors,
  Dumbbell,
  Building,
  Hammer,
  Camera,
  Code,
  Briefcase,
  BookOpen,
  Rocket,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  Send,
  Star,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react'
import { DEFAULT_WEBSITES } from '@/lib/templates-data'

export default function DemoPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const website = DEFAULT_WEBSITES.find((w) => w.slug === slug) || DEFAULT_WEBSITES[0]
  const [rsvpSent, setRsvpSent] = useState(false)
  const [formInput, setFormInput] = useState('')

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRsvpSent(true)
    setTimeout(() => setRsvpSent(false), 5000)
    setFormInput('')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Demo Bar / Frame Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600/20 text-blue-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-blue-500/30">
              Live Demo Preview
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
              {website.name}
            </h1>
            <span className="hidden md:inline-block text-xs text-slate-400">
              ({website.category} Template)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/websites"
              className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Catalog
            </Link>
            <Link
              href={`/websites/${website.slug}`}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center gap-1.5"
            >
              Rent This Website
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Dynamic Demo Website Canvas */}
      <main className="flex-1 bg-white text-slate-900">
        {/* Render theme matching the category */}
        {renderCategoryDemo(website, rsvpSent, handleDemoSubmit, formInput, setFormInput)}
      </main>

      {/* Footer Banner */}
      <div className="bg-slate-950 text-slate-400 py-6 px-4 text-center border-t border-slate-800 text-sm">
        <p>
          You are previewing <strong className="text-white">{website.name}</strong> on HYRINX.
          Rent this website ready-to-use starting at{' '}
          <strong className="text-white">₹{website.startingPrice}/day</strong>.
        </p>
        <div className="mt-3">
          <Link
            href={`/websites/${website.slug}`}
            className="inline-flex items-center gap-2 text-blue-400 font-bold hover:underline"
          >
            Choose duration and launch this website →
          </Link>
        </div>
      </div>
    </div>
  )
}

function renderCategoryDemo(
  website: any,
  rsvpSent: boolean,
  handleDemoSubmit: (e: React.FormEvent) => void,
  formInput: string,
  setFormInput: (v: string) => void
) {
  const category = website.category

  // 1. WEDDING THEME
  if (category === 'Wedding') {
    return (
      <div className="bg-[#FAF7F2] text-stone-800 min-h-screen">
        {/* Hero */}
        <section className="py-24 px-4 text-center border-b border-stone-200">
          <span className="text-stone-500 uppercase tracking-widest text-xs font-semibold mb-3 block">
            Together with their families
          </span>
          <h1 className="text-5xl sm:text-6xl font-serif text-stone-900 mb-4 tracking-tight">
            Aarav &amp; Meera
          </h1>
          <p className="text-stone-600 text-lg max-w-xl mx-auto italic font-serif mb-6">
            &ldquo;We invite you to celebrate our union as we begin our new journey together.&rdquo;
          </p>
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-stone-300 rounded-full px-6 py-2 shadow-sm text-sm text-stone-700">
            <Calendar className="h-4 w-4 text-amber-700" />
            <span>December 18, 2026</span>
            <span>•</span>
            <MapPin className="h-4 w-4 text-amber-700" />
            <span>The Leela Palace, Udaipur</span>
          </div>
        </section>

        {/* Story & Details */}
        <section className="py-16 max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 text-center">
            <Heart className="h-8 w-8 text-rose-500 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold mb-2">Our Story</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              From college library coffee breaks to 7 years of shared dreams, we are getting married!
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 text-center">
            <Clock className="h-8 w-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold mb-2">Ceremony</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Baraat: 4:00 PM • Varmala: 6:00 PM • Royal Dinner Reception: 8:00 PM onwards.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 text-center">
            <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold mb-2">Venue Guide</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Lake Pichola, Udaipur, Rajasthan. Valet parking &amp; guest accommodation available.
            </p>
          </div>
        </section>

        {/* RSVP Form */}
        <section className="py-16 bg-white border-t border-stone-200 text-center px-4">
          <div className="max-w-md mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-3">RSVP to the Wedding</h2>
            <p className="text-stone-600 text-sm mb-6">
              Kindly confirm your presence by November 30 so we can seat you warmly.
            </p>
            {rsvpSent ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Thank you! Your RSVP has been received.
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={formInput}
                  onChange={(e) => setFormInput(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <select className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-700">
                  <option>Attending all celebrations (2 Guests)</option>
                  <option>Attending Reception only (1 Guest)</option>
                  <option>Attending all celebrations (Family)</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 rounded-xl transition-colors text-sm"
                >
                  Send RSVP Confirmation
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    )
  }

  // 2. BIRTHDAY & CELEBRATION
  if (category === 'Birthday' || category === 'Celebration') {
    return (
      <div className="bg-gradient-to-b from-amber-50 via-white to-pink-50 min-h-screen text-slate-800">
        <section className="py-20 text-center px-4">
          <span className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <PartyPopper className="h-4 w-4" /> You&apos;re Invited!
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            {website.name}
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto mb-8 font-medium">
            Join us for an unforgettable evening of music, games, dance, and delicious cake!
          </p>

          <div className="flex flex-wrap gap-4 justify-center max-w-lg mx-auto">
            <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 text-center flex-1 min-w-[120px]">
              <span className="block text-3xl font-black text-pink-600">08</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Days Left</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 text-center flex-1 min-w-[120px]">
              <span className="block text-3xl font-black text-indigo-600">14</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Hours Left</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 text-center flex-1 min-w-[120px]">
              <span className="block text-3xl font-black text-amber-600">30</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Minutes</span>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Party Schedule &amp; Venue</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6 text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-900 block mb-1">Time &amp; Date</span>
                <span className="text-slate-600">Saturday, 7:00 PM • Cake cutting at 8:30 PM</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-900 block mb-1">Location</span>
                <span className="text-slate-600">Skyline Rooftop Lounge, MG Road</span>
              </div>
            </div>

            {rsvpSent ? (
              <div className="bg-green-100 text-green-800 p-4 rounded-xl font-bold text-sm">
                Party RSVP submitted! See you on the dance floor!
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Drop a birthday wish or your name..."
                  required
                  value={formInput}
                  onChange={(e) => setFormInput(e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
                >
                  RSVP
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    )
  }

  // 3. COLLEGE & ACADEMIC
  if (category === 'College') {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen">
        <section className="py-24 text-center px-4 bg-gradient-to-b from-indigo-950/60 to-slate-950">
          <span className="bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-indigo-500/30">
            Annual Flagship Symposium 2026
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4">
            {website.name}
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            30+ Competitions • ₹5,00,000 Prize Pool • 5,000+ Students across 80 Universities.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => alert('Demo Registration: Registration form submitted successfully!')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all"
            >
              Register for Events
            </button>
            <button
              onClick={() => alert('Demo Download: Event Rulebook PDF opened.')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-medium text-sm border border-slate-700 transition-all"
            >
              Download Rulebook
            </button>
          </div>
        </section>

        {/* Event Tracks */}
        <section className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <Code className="h-8 w-8 text-indigo-400 mb-3" />
            <h3 className="font-bold text-lg text-white mb-2">Hackathon &amp; Coding</h3>
            <p className="text-slate-400 text-sm">24-hour sprint on Web3, AI Agents &amp; Cloud Systems.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <Award className="h-8 w-8 text-amber-400 mb-3" />
            <h3 className="font-bold text-lg text-white mb-2">Cultural &amp; Arts</h3>
            <p className="text-slate-400 text-sm">Battle of the Bands, Street Play, and Fashion Runway.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <Users className="h-8 w-8 text-emerald-400 mb-3" />
            <h3 className="font-bold text-lg text-white mb-2">E-Summit &amp; Pitch</h3>
            <p className="text-slate-400 text-sm">Pitch to venture capitalists and win seed angel funding.</p>
          </div>
        </section>
      </div>
    )
  }

  // 4. BUSINESS & SERVICES
  if (category === 'Business') {
    return (
      <div className="bg-white text-slate-900 min-h-screen">
        <section className="py-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest block mb-2">
              Verified Business Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-4">
              {website.name}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {website.description}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => alert('Demo Booking: Service appointment scheduled!')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-500/20"
              >
                Book Appointment / Table
              </button>
              <button
                onClick={() => alert('Demo Call: +91 98765 43210')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
              >
                Contact Business
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Featured Services &amp; Rates</h3>
            {['Signature Package - ₹999', 'Premium Consultation - ₹1,499', 'Full Custom Turnkey - ₹4,999'].map(
              (item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-200 text-sm">
                  <span className="font-medium text-slate-800">{item.split(' - ')[0]}</span>
                  <span className="font-bold text-blue-600">{item.split(' - ')[1]}</span>
                </div>
              )
            )}
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-600" /> Open Mon-Sat 9:00 AM - 9:00 PM
            </div>
          </div>
        </section>
      </div>
    )
  }

  // 5. PORTFOLIO & PERSONAL
  if (category === 'Portfolio' || category === 'Personal') {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen">
        <section className="py-24 px-4 max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-black shadow-xl">
            {website.name.charAt(0)}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            {website.name}
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            {website.shortDesc}
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <button
              onClick={() => alert('Demo Work: Project case studies opened.')}
              className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-all hover:bg-slate-100"
            >
              Explore Portfolio Projects
            </button>
            <button
              onClick={() => alert('Demo Contact: Email me at contact@hyrinx.com')}
              className="bg-slate-800 text-slate-200 font-medium px-6 py-3 rounded-xl text-sm border border-slate-700 hover:bg-slate-700"
            >
              Hire Me
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">Expertise</span>
              <h4 className="text-white font-bold mb-2">Design &amp; Architecture</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Clean, modern user interfaces tailored for high conversions and user delight.
              </p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">Track Record</span>
              <h4 className="text-white font-bold mb-2">45+ Delivered Works</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Proven results for startups, creators, and enterprise commercial brands.
              </p>
            </div>
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider block mb-1">Availability</span>
              <h4 className="text-white font-bold mb-2">Open for Projects</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Available for freelance contracts, consultation, and full-time inquiries.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // 6. STARTUP & PRODUCT LAUNCH (Default)
  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <section className="py-24 text-center px-4 max-w-4xl mx-auto">
        <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest inline-block mb-4">
          {category} Edition
        </span>
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
          {website.name}
        </h1>
        <p className="text-slate-600 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          {website.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-16">
          <input
            type="email"
            placeholder="Enter your email for early access..."
            className="px-4 py-3 border border-slate-300 rounded-xl text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => alert('Demo Early Access: Thanks for joining the waitlist!')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-500/20"
          >
            Get Early Access
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <Rocket className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Lightning Setup</h4>
            <p className="text-slate-600 text-xs">Ready to deploy with customized branding within 24 hours.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <ShieldCheck className="h-6 w-6 text-indigo-600 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Production Tested</h4>
            <p className="text-slate-600 text-xs">Responsive on iOS, Android, macOS, and Windows.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <Star className="h-6 w-6 text-amber-500 mb-2" />
            <h4 className="font-bold text-slate-900 mb-1">Rental Flexibility</h4>
            <p className="text-slate-600 text-xs">Pay only for the days you need without heavy developer bills.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
