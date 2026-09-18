import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Globe, 
  Clock, 
  TrendingUp, 
  Users, 
  AlertCircle,
  ArrowRight,
  LayoutDashboard,
  Package,
  DollarSign,
  Settings,
  LogOut,
} from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'

async function getDashboardStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    totalOrders,
    todayOrders,
    activeRentals,
    pendingOrders,
    totalRevenue,
    todayRevenue,
    expiringToday,
    customRequests,
    totalWebsites,
    publishedWebsites,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({
      where: {
        createdAt: { gte: today },
      },
    }),
    prisma.rental.count({
      where: { status: 'active' },
    }),
    prisma.order.count({
      where: { status: 'pending' },
    }),
    prisma.order.aggregate({
      where: { status: { in: ['paid', 'active', 'completed'] } },
      _sum: { totalAmount: true },
    }),
    prisma.order.aggregate({
      where: {
        createdAt: { gte: today },
        status: { in: ['paid', 'active', 'completed'] },
      },
      _sum: { totalAmount: true },
    }),
    prisma.rental.count({
      where: {
        expiryTime: { lte: new Date(Date.now() + 24 * 60 * 60 * 1000) },
        status: 'active',
      },
    }),
    prisma.customRequest.count({
      where: { status: 'new' },
    }),
    prisma.website.count(),
    prisma.website.count({
      where: { published: true },
    }),
  ])

  return {
    totalOrders,
    todayOrders,
    activeRentals,
    pendingOrders,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
    todayRevenue: todayRevenue._sum.totalAmount || 0,
    expiringToday,
    customRequests,
    totalWebsites,
    publishedWebsites,
  }
}

export default async function AdminDashboard() {
  try {
    const session = await requireAuth()
    const stats = await getDashboardStats()

    return (
      <AdminShell>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Good morning, {session.name}
          </h1>
            <p className="text-slate-600">Here's what's happening with your platform today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <StatCard
              title="Today's Orders"
              value={stats.todayOrders}
              icon={ShoppingCart}
              color="blue"
            />
            <StatCard
              title="Active Rentals"
              value={stats.activeRentals}
              icon={Clock}
              color="green"
            />
            <StatCard
              title="Pending Orders"
              value={stats.pendingOrders}
              icon={AlertCircle}
              color="yellow"
            />
            <StatCard
              title="Revenue"
              value={formatPrice(stats.todayRevenue)}
              icon={DollarSign}
              color="purple"
            />
            <StatCard
              title="Expiring Today"
              value={stats.expiringToday}
              icon={Clock}
              color="red"
            />
            <StatCard
              title="Custom Requests"
              value={stats.customRequests}
              icon={AlertCircle}
              color="orange"
            />
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Platform Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Orders</span>
                  <span className="font-semibold text-slate-900">{stats.totalOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Revenue</span>
                  <span className="font-semibold text-slate-900">{formatPrice(stats.totalRevenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Websites</span>
                  <span className="font-semibold text-slate-900">{stats.totalWebsites}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Published Websites</span>
                  <span className="font-semibold text-slate-900">{stats.publishedWebsites}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/websites/new"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-slate-700">Add New Website</span>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </Link>
                <Link
                  href="/admin/orders?status=pending"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-slate-700">Review Pending Orders</span>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </Link>
                <Link
                  href="/admin/custom-requests"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-slate-700">View Custom Requests</span>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </Link>
                <Link
                  href="/admin/rentals?status=expiring"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-slate-700">Manage Expiring Rentals</span>
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          </div>
        </AdminShell>
    )
  } catch (error) {
    redirect('/admin/login')
  }
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="text-slate-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}
