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
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-3" />
              <div className="h-4 bg-slate-200 rounded w-32 mx-auto mb-2" />
              <div className="h-3 bg-slate-100 rounded w-24 mx-auto" />
            </div>
          </div>
        )}
        
        {/* Live Demo Badge */}
        {website.liveDemoUrl && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
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
          <Link
            href={`/demo/${website.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white border-2 border-slate-200 text-slate-900 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </Link>
          <Link
            href={`/websites/${website.slug}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm text-center"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  )
}
