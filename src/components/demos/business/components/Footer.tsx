import React from "react";
import Link from "next/link";
import { Layers, Globe, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                BusinessSite Studio
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The frontend-only no-code website studio that lets any business owner preview, customize, and prototype their digital storefront with real-time browser rendering.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono-spec text-slate-300">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
                100% FRONTEND ONLY
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
                LOCALSTORAGE PERSISTENCE
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
                ZERO BACKEND REQUIRED
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3 font-sans">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 block">
              SaaS Engine
            </span>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  Interactive Studio Editor
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  12+ Industry Templates
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Analytics & Leads Dashboard
                </Link>
              </li>
              <li>
                <Link href="/my-websites" className="hover:text-white transition-colors">
                  My Saved Websites
                </Link>
              </li>
            </ul>
          </div>

          {/* Industry Categories */}
          <div className="space-y-3 font-sans">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 block">
              Business Categories
            </span>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/templates?category=Restaurant" className="hover:text-white transition-colors">
                  Restaurant & Food Service
                </Link>
              </li>
              <li>
                <Link href="/templates?category=Digital+Agency" className="hover:text-white transition-colors">
                  Creative & Digital Agencies
                </Link>
              </li>
              <li>
                <Link href="/templates?category=Real+Estate" className="hover:text-white transition-colors">
                  Real Estate & Realty Estates
                </Link>
              </li>
              <li>
                <Link href="/templates?category=Salon" className="hover:text-white transition-colors">
                  Salons, Spas & Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* System & Privacy */}
          <div className="space-y-3 font-sans">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 block">
              Privacy & Privacy
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your draft websites and uploaded photos remain in your browser's private local storage. No server databases, tracking pixels, or third-party cookies.
            </p>
            <div className="pt-2">
              <Link href="/settings" className="btn-secondary-white text-xs py-1.5 px-3">
                Workspace Settings
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-800/80 bg-slate-950 py-5 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} BusinessSite Studio. Built for ambitious business owners worldwide.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>LIGHTWEIGHT REACT ENGINE</span>
            <span>•</span>
            <span>CLIENT-SIDE RENDERED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
