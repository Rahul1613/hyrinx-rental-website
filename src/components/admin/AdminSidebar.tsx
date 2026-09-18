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
  LogOut 
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
    <aside className="w-64 bg-slate-900 min-h-screen p-6 fixed left-0 top-0 z-30 flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <Link href="/admin" className="block">
            <h1 className="text-2xl font-bold text-white tracking-wider">HYRINX</h1>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mt-0.5">
              Admin Portal
            </p>
          </Link>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href, item.exact)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          View Public Website
        </Link>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
