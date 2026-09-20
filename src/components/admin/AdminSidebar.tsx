'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingCart,
  Clock,
  Globe,
  Tag,
  DollarSign,
  MessageSquare,
  Home,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react'

export default function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin', exact: true, icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', exact: false, icon: ShoppingCart },
    { name: 'Rentals', href: '/admin/rentals', exact: false, icon: Clock },
    { name: 'Websites', href: '/admin/websites', exact: false, icon: Globe },
    { name: 'Categories', href: '/admin/categories', exact: false, icon: Tag },
    { name: 'Pricing', href: '/admin/pricing', exact: false, icon: DollarSign },
    { name: 'Custom Requests', href: '/admin/custom-requests', exact: false, icon: MessageSquare },
    { name: 'Homepage CMS', href: '/admin/homepage', exact: false, icon: Home },
    { name: 'Settings', href: '/admin/settings', exact: false, icon: Settings },
  ]

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside className="w-full bg-slate-900 p-4 border-b border-slate-800 lg:fixed lg:left-0 lg:top-0 lg:z-30 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
      <div className="flex flex-col justify-between gap-6 lg:h-full">
        <div>
          <div className="mb-6 lg:mb-8">
            <Link href="/admin" className="block">
              <h1 className="text-xl font-bold text-white tracking-wider sm:text-2xl">HYRINX</h1>
              <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-widest mt-0.5 sm:text-xs">
                Admin Portal
              </p>
            </Link>
          </div>

          <nav className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href, item.exact)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="space-y-2 border-t border-slate-800 pt-4 lg:pt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Public Website
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-left text-xs font-medium text-red-400 transition-colors hover:bg-red-950/40 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
