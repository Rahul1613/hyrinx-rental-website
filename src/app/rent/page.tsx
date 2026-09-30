import React from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import { MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { PROGRAMMATIC_PAGES } from '@/lib/programmatic-data'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Website Rental by City & Event in India | Hyrinx',
  description:
    'Explore ready-to-rent websites across Indian cities: Pune, Mumbai, Delhi NCR, Bangalore, Jaipur. Weddings, college fests, restaurants, and campaigns.',
  alternates: {
    canonical: 'https://hyrinx.in/rent',
  },
}

export default function RentHubPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://hyrinx.in' },
    { name: 'Rent in India', url: 'https://hyrinx.in/rent' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Pan-India Website Rentals
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Rent Websites Across India by City &amp; Occasion
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Local event coordinates, custom WhatsApp RSVPs, and lightning-fast cloud hosting tailored for your city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMMATIC_PAGES.map((page) => (
            <Link
              key={page.slug}
              href={`/rent/${page.slug}`}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    <MapPin className="w-3 h-3 text-blue-600" /> {page.city}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    From ₹{page.startingPrice}/day
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {page.h1}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6">
                  {page.localContext}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>View Local Templates</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
