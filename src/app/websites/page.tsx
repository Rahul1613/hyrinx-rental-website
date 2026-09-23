'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { Search, Filter, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default function WebsitesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [websites, setWebsites] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWebsites()
    fetchCategories()
  }, [])

  const fetchWebsites = async () => {
    try {
      const response = await fetch('/api/websites')
      const data = await response.json()
      setWebsites(data.websites || [])
    } catch (error) {
      console.error('Error fetching websites:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(['All', ...(data.categories || []).map((c: any) => c.name)])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const filteredWebsites = websites.filter(website => {
    const matchesSearch = website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         website.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || website.category === selectedCategory
    return matchesSearch && matchesCategory && website.published
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Choose Your Website
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pick a design, preview it live and rent it for exactly as long as you need.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-slate-600">
            {loading ? (
              <p>Loading websites...</p>
            ) : (
              <p>Showing {filteredWebsites.length} website{filteredWebsites.length !== 1 ? 's' : ''}</p>
            )}
          </div>

          {/* Website Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                  <div className="aspect-video bg-slate-200 rounded-lg mb-4" />
                  <div className="h-6 bg-slate-200 rounded mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredWebsites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg mb-4">No websites found</p>
              <p className="text-slate-500">Try changing your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWebsites.map((website) => (
                <WebsiteCard key={website.id} website={website} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function WebsiteCard({ website }: { website: any }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Preview Image */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {website.thumbnail ? (
          <img
            src={website.thumbnail}
            alt={website.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <WebsiteCardMockup website={website} />
        )}
        
        {/* Live Demo Badge */}
        {website.liveDemoUrl && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm border border-slate-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Demo
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-1">{website.name}</h3>
            <p className="text-sm text-slate-600">{website.category}</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {website.shortDesc || website.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-slate-900">
            From {formatPrice(website.startingPrice || 149)}/day
          </span>
        </div>

        <div className="flex gap-2">
          {website.liveDemoUrl && (
            <a
              href={website.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white border-2 border-slate-200 text-slate-900 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          <Link
            href={`/websites/${website.slug}`}
            className={`bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm text-center ${website.liveDemoUrl ? 'flex-1' : 'w-full'}`}
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  )
}

function WebsiteCardMockup({ website }: { website: any }) {
  const cat = website.category || ''

  if (cat === 'Wedding') {
    return (
      <div className="w-full h-full bg-[#FAF5EE] text-stone-800 p-4 flex flex-col justify-between border-b border-stone-200">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
          <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-amber-900">
            Royal Wedding
          </span>
          <span className="text-[9px] text-stone-500 font-serif">Dec 2026</span>
        </div>
        <div className="text-center my-auto py-2">
          <h4 className="font-serif text-lg font-bold text-stone-900 leading-tight">
            {website.name}
          </h4>
          <p className="text-[10px] text-stone-600 font-serif italic mt-0.5">
            Celebrate Our Union &bull; Udaipur Palace
          </p>
          <div className="mt-2 inline-block bg-amber-900/10 text-amber-900 border border-amber-900/20 text-[9px] font-serif px-2.5 py-0.5 rounded-full">
            RSVP &bull; Photo Story &bull; Itinerary
          </div>
        </div>
        <div className="flex gap-1.5 justify-center pt-1 border-t border-stone-200/60 text-[9px] text-stone-500 font-serif">
          <span>💍 Ceremony</span>
          <span>&bull;</span>
          <span>🥂 Reception</span>
        </div>
      </div>
    )
  }

  if (cat === 'Birthday' || cat === 'Celebration') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 text-slate-800 p-4 flex flex-col justify-between border-b border-pink-200/60">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600 bg-pink-100/80 px-2 py-0.5 rounded-md">
            Party Live
          </span>
          <span className="text-[10px] text-purple-600 font-bold">🎉 Countdown</span>
        </div>
        <div className="text-center my-auto py-2">
          <h4 className="text-base font-extrabold text-slate-900 tracking-tight">
            {website.name}
          </h4>
          <p className="text-[10px] text-slate-600 font-medium mt-0.5">
            Music &bull; Cake Cutting &bull; Games
          </p>
          <div className="mt-2 flex justify-center gap-1.5 text-[9px] font-bold text-slate-700">
            <span className="bg-white shadow-xs px-2 py-0.5 rounded border border-pink-200">08d</span>
            <span className="bg-white shadow-xs px-2 py-0.5 rounded border border-pink-200">14h</span>
            <span className="bg-white shadow-xs px-2 py-0.5 rounded border border-pink-200">30m</span>
          </div>
        </div>
        <div className="text-[9px] text-center text-pink-700 font-semibold bg-white/70 py-1 rounded-lg border border-pink-100">
          Skyline Rooftop &bull; Confirm Attendance
        </div>
      </div>
    )
  }

  if (cat === 'College') {
    return (
      <div className="w-full h-full bg-slate-950 text-slate-100 p-4 flex flex-col justify-between border-b border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Campus Fest &bull; 2026
          </span>
          <span className="text-[9px] bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700/50">
            ₹5L Prizes
          </span>
        </div>
        <div className="text-center my-auto py-2">
          <h4 className="text-base font-black text-white tracking-tight">
            {website.name}
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5">
            30+ Events &bull; 80 Colleges &bull; Hackathons
          </p>
          <div className="mt-2 inline-flex items-center gap-2 text-[9px] bg-slate-900 text-slate-300 px-2.5 py-1 rounded-full border border-slate-800">
            <span>💻 Tech</span>
            <span>&bull;</span>
            <span>🎭 Cultural</span>
            <span>&bull;</span>
            <span>🏆 Sports</span>
          </div>
        </div>
        <div className="text-[9px] text-center text-indigo-300 bg-indigo-950/80 py-1 rounded border border-indigo-800/40">
          Registration Portal Active
        </div>
      </div>
    )
  }

  if (cat === 'Business') {
    return (
      <div className="w-full h-full bg-slate-50 text-slate-900 p-4 flex flex-col justify-between border-b border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
            {cat} Portal
          </span>
          <span className="text-[9px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            &bull; Open Today
          </span>
        </div>
        <div className="text-center my-auto py-2">
          <h4 className="text-base font-bold text-slate-900 leading-tight">
            {website.name}
          </h4>
          <p className="text-[10px] text-slate-600 line-clamp-1 mt-0.5">
            {website.shortDesc}
          </p>
          <div className="mt-2 inline-flex gap-1.5 text-[9px] text-slate-700 font-medium">
            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">Services</span>
            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">Pricing</span>
            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">Booking</span>
          </div>
        </div>
        <div className="text-[9px] text-center text-slate-500 bg-white py-1 rounded-lg border border-slate-200">
          Direct Customer Appointments &amp; Inquiries
        </div>
      </div>
    )
  }

  if (cat === 'Portfolio' || cat === 'Personal') {
    return (
      <div className="w-full h-full bg-slate-900 text-slate-100 p-4 flex flex-col justify-between border-b border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
            Portfolio Showcase
          </span>
          <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
            Available for Hire
          </span>
        </div>
        <div className="text-center my-auto py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 mx-auto mb-1 flex items-center justify-center font-bold text-xs text-white shadow-xs">
            {website.name.charAt(0)}
          </div>
          <h4 className="text-sm font-bold text-white leading-tight">
            {website.name}
          </h4>
          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
            {website.shortDesc}
          </p>
        </div>
        <div className="flex justify-center gap-2 text-[9px] text-slate-400 border-t border-slate-800/80 pt-1.5">
          <span>45+ Projects</span>
          <span>&bull;</span>
          <span>Case Studies</span>
          <span>&bull;</span>
          <span>Resume</span>
        </div>
      </div>
    )
  }

  if (cat === 'Projects for College Students' || cat === 'Project') {
    const isPhish = website.slug.includes('phishing')
    const isPass = website.slug.includes('securepass')
    const isVoice = website.slug.includes('voice')
    const isStego = website.slug.includes('steganography')
    const isApt = website.slug.includes('aptitude')
    const isScalnex = website.slug.includes('scalnex')

    return (
      <div className="w-full h-full bg-[#0a0f1d] text-slate-100 p-4 flex flex-col justify-between border-b border-indigo-900/60 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
          <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
            {isPhish ? '🛡️ Cyber ML' : isPass ? '🔒 Crypto AI' : isVoice ? '🎙️ Speech NLP' : isStego ? '🔐 Steganography' : isApt ? '📝 Exam Platform' : '🚀 SaaS Capstone'}
          </span>
          <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            ● Live Source
          </span>
        </div>

        <div className="text-center my-auto py-2">
          <h4 className="text-sm font-bold text-white tracking-tight leading-tight font-sans">
            {website.name}
          </h4>
          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-sans">
            {website.shortDesc}
          </p>

          <div className="mt-2 flex justify-center gap-1.5 text-[9px] text-slate-300">
            {isPhish && (
              <>
                <span className="bg-red-950/80 border border-red-800/60 text-red-300 px-1.5 py-0.5 rounded">URL Heuristic</span>
                <span className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">NLP Classifier</span>
              </>
            )}
            {isPass && (
              <>
                <span className="bg-indigo-950 border border-indigo-800/60 text-indigo-300 px-1.5 py-0.5 rounded">Shannon Entropy</span>
                <span className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">Brute Force Test</span>
              </>
            )}
            {isVoice && (
              <>
                <span className="bg-cyan-950 border border-cyan-800/60 text-cyan-300 px-1.5 py-0.5 rounded">Speech-to-Text</span>
                <span className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">Intent Parser</span>
              </>
            )}
            {isStego && (
              <>
                <span className="bg-purple-950 border border-purple-800/60 text-purple-300 px-1.5 py-0.5 rounded">LSB Encoding</span>
                <span className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">AES-256 Payload</span>
              </>
            )}
            {isApt && (
              <>
                <span className="bg-blue-950 border border-blue-800/60 text-blue-300 px-1.5 py-0.5 rounded">Proctor Timer</span>
                <span className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">Auto Analytics</span>
              </>
            )}
            {isScalnex && (
              <>
                <span className="bg-emerald-950 border border-emerald-800/60 text-emerald-300 px-1.5 py-0.5 rounded">AI Matching</span>
                <span className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded">Full-Stack SaaS</span>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-[9px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
          <span>Final Year Capstone</span>
          <span className="text-indigo-300 font-bold">GitHub + PPT Included</span>
        </div>
      </div>
    )
  }

  // Startup, Product Launch, Invitation, Events
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-4 flex flex-col justify-between border-b border-indigo-800">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          {cat}
        </span>
        <span className="text-[9px] text-blue-200">🚀 Ready Template</span>
      </div>
      <div className="text-center my-auto py-2">
        <h4 className="text-base font-black text-white tracking-tight leading-tight">
          {website.name}
        </h4>
        <p className="text-[10px] text-blue-200 line-clamp-1 mt-0.5">
          {website.shortDesc}
        </p>
        <div className="mt-2 inline-flex gap-1.5 text-[9px] bg-white/10 px-2.5 py-0.5 rounded-full text-white backdrop-blur-xs border border-white/10">
          <span>High Conversion</span>
          <span>&bull;</span>
          <span>Instant Launch</span>
        </div>
      </div>
      <div className="text-[9px] text-center text-cyan-200 bg-white/5 py-1 rounded border border-white/10">
        Fully Mobile &amp; Desktop Responsive
      </div>
    </div>
  )
}
