import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getRentals() {
  const rentals = await prisma.rental.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      website: true,
      order: {
        include: {
          orderItems: {
            include: {
              pricingPlan: true,
            },
          },
        },
      },
    },
  })
  return rentals
}

export default async function AdminRentalsPage() {
  try {
    await requireAuth()
    const rentals = await getRentals()

    const activeRentals = rentals.filter((r) => r.status === 'active')
    const expiringSoon = rentals.filter((r) => {
      const expiryTime = new Date(r.expiryTime)
      const now = new Date()
      const diffHours = (expiryTime.getTime() - now.getTime()) / (1000 * 60 * 60)
      return diffHours > 0 && diffHours <= 24
    })
    const expiredRentals = rentals.filter((r) => r.status === 'expired')

    return (
      <AdminShell>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1 sm:text-3xl">Rentals Tracking</h1>
          <p className="text-sm text-slate-600 sm:text-base">Monitor live deployments, scheduled rentals, and expiry deadlines</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-slate-900 text-sm">Active Rentals</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{activeRentals.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-slate-900 text-sm">Expiring Soon (24h)</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{expiringSoon.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold text-slate-900 text-sm">Expired</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900">{expiredRentals.length}</p>
          </div>
        </div>

        {/* Rentals Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase tracking-wider text-slate-700 sm:text-xs">
                <tr>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Website</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Customer</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Duration</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Start</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Expiry</th>
                  <th className="px-3 py-3 text-center sm:px-5 sm:py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {rentals.map((rental) => {
                  const orderItem = rental.order?.orderItems[0]
                  const plan = orderItem?.pricingPlan

                  return (
                    <tr key={rental.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 sm:px-5 sm:py-4">
                        <div className="font-semibold text-slate-900">{rental.website?.name}</div>
                      </td>
                      <td className="px-3 py-3 text-slate-600 sm:px-5 sm:py-4">
                        {rental.order?.customerName || 'N/A'}
                      </td>
                      <td className="px-3 py-3 text-slate-600 sm:px-5 sm:py-4">
                        {plan?.name || 'N/A'}
                      </td>
                      <td className="px-3 py-3 text-[11px] text-slate-600 sm:px-5 sm:py-4 sm:text-xs">
                        {new Date(rental.startTime).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3 text-[11px] text-slate-600 sm:px-5 sm:py-4 sm:text-xs">
                        {new Date(rental.expiryTime).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-3 text-center sm:px-5 sm:py-4">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider sm:text-xs ${
                            rental.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : rental.status === 'expiring_soon'
                              ? 'bg-yellow-100 text-yellow-700'
                              : rental.status === 'expired'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {rental.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {rentals.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-1">No rentals tracked yet.</p>
              <p className="text-slate-400 text-xs">Rentals generated from customer orders will appear here.</p>
            </div>
          )}
        </div>
      </AdminShell>
    )
  } catch (error) {
    redirect('/admin/login')
  }
}
