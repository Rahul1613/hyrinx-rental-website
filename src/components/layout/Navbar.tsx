'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Websites', href: '/websites', always: true },
    { name: 'Pricing', href: '/pricing', always: true },
    { name: 'How It Works', href: '/how-it-works', always: true },
    { name: 'Custom Website', href: '/custom-website', always: true },
    { name: 'Tools', href: '/tools', xlOnly: true },
    { name: 'Founders', href: '/founders', xlOnly: true },
    { name: 'Track Order', href: '/order/track', xlOnly: true },
    { name: 'Contact', href: '/contact', always: true },
  ]

  const mobileNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Websites', href: '/websites' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Free Planning Tools', href: '/tools' },
    { name: 'Founders', href: '/founders' },
    { name: 'Custom Website', href: '/custom-website' },
    { name: 'Track Order', href: '/order/track' },
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
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo - Protected from shrinking or wrapping */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0 select-none">
            <img
              src="/icon.png"
              alt="Hyrinx"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain shadow-xs border border-slate-200/60 shrink-0"
            />
            <div className="flex flex-col shrink-0 whitespace-nowrap">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 leading-none">
                HYRINX
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-blue-600 tracking-widest group-hover:text-indigo-600 transition-colors mt-0.5">
                Rental Websites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap text-slate-700 hover:text-blue-600 transition-all duration-300 text-xs xl:text-sm font-bold hover:-translate-y-0.5 px-2 xl:px-2.5 py-2 ${
                  link.xlOnly ? 'hidden 2xl:inline-block' : 'inline-block'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/websites"
              className="whitespace-nowrap shrink-0 inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 xl:px-4 py-2 xl:py-2.5 rounded-xl font-bold transition-all duration-300 text-xs xl:text-sm shadow-md shadow-blue-500/30 hover:shadow-lg hover:-translate-y-0.5 ml-1"
            >
              Browse Websites
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>

            <Link
              href="/hyrinx-services-demo"
              className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-amber-300 hover:text-white px-3 xl:px-3.5 py-2 xl:py-2.5 rounded-xl font-bold transition-all duration-300 text-xs xl:text-sm border border-amber-500/40 hover:border-amber-400 shadow-sm hover:shadow-md hover:-translate-y-0.5 ml-1"
              title="Other Services of Hyrinx"
            >
              <span>📚</span>
              <span className="hidden xl:inline">Other Services of Hyrinx</span>
              <span className="xl:hidden">Other Services</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 sm:p-3 rounded-xl hover:bg-slate-100 transition-all duration-300 group"
            aria-label="Toggle Navigation Menu"
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
          <div className="lg:hidden py-4 sm:py-6 border-t-2 border-slate-200 bg-white/95 backdrop-blur-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="flex flex-col space-y-2 sm:space-y-3 pb-4">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 sm:py-3 rounded-xl font-bold text-sm transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/websites"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-center text-sm mt-2 shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Websites
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/hyrinx-services-demo"
                className="inline-flex items-center justify-center gap-2 bg-slate-950 text-amber-300 hover:text-white px-5 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 text-center text-sm border border-amber-500/40 shadow-lg mt-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>📚 Other Services of Hyrinx</span>
                <ArrowRight className="ml-2 h-4 w-4 text-amber-400" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
