'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    // Check if admin session cookie exists
    if (typeof document !== 'undefined') {
      setIsAdminLoggedIn(document.cookie.includes('hyrinx_admin_session='))
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Websites', href: '/websites' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Custom Website', href: '/custom-website' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-slate-200/80'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                HYRINX
              </span>
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-widest -mt-1 group-hover:text-indigo-600 transition-colors">
                Rental Websites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 transition-all duration-300 text-sm font-bold hover:-translate-y-0.5"
              >
                {link.name}
              </Link>
            ))}

            {isAdminLoggedIn && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-2 border-blue-200 hover:from-blue-100 hover:to-indigo-100 hover:shadow-lg"
                title="Admin Portal"
              >
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Dashboard</span>
              </Link>
            )}

            <Link
              href="/websites"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Browse Websites
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-slate-100 transition-all duration-300 group"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700 group-hover:scale-110 transition-transform" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t-2 border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {isAdminLoggedIn && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl font-bold text-sm border-2 border-blue-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  Dashboard
                </Link>
              )}

              <Link
                href="/websites"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 text-center text-sm mt-2 shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Websites
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
