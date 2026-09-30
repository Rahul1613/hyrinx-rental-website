import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'
import { Home, ArrowRight, Sparkles } from 'lucide-react'

export default function NotFound() {
  const popularTemplates = [
    { name: 'Royal Wedding (W01)', href: '/websites/royal-wedding', category: 'Wedding' },
    { name: 'College Fest Pro (C01)', href: '/websites/college-fest-pro', category: 'College' },
    { name: 'Birthday Bash', href: '/websites/birthday-bash', category: 'Birthday' },
    { name: 'Gourmet Bistro & Cafe (B01)', href: '/websites/gourmet-bistro-cafe', category: 'Business' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 pt-28 pb-16">
        <div className="text-center max-w-xl">
          <div className="mb-6">
            <span className="text-8xl sm:text-9xl font-black text-slate-900 tracking-tight block">
              404
            </span>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mt-2 mb-6"></div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            This Page Has Expired or Does Not Exist
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md mx-auto">
            The template or page link you followed may have been archived or moved. Explore our active ready-to-rent websites below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/websites"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <span>Browse All Websites</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Popular Templates Quick Links */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular Website Templates Ready to Rent</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {popularTemplates.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/60 hover:bg-blue-50/40 transition-colors group flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
