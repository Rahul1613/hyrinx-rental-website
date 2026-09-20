import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'
import { ShoppingCart, Mail, Phone, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      orderItems: {
        include: {
          website: true,
          pricingPlan: true,
        },
      },
    },
  })
  return orders
}

export default async function AdminOrdersPage() {
  try {
    await requireAuth()
    const orders = await getOrders()

    return (
      <AdminShell>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1 sm:text-3xl">Customer Orders</h1>
          <p className="text-sm text-slate-600 sm:text-base">Track orders, customer details, and rental status</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Order #</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Website & Duration</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {orders.map((order) => {
                const orderItem = order.orderItems[0]
                const website = orderItem?.website
                const plan = orderItem?.pricingPlan

                return (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-900">{order.customerName}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                          <a href={`mailto:${order.customerEmail}`} className="hover:underline flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {order.customerEmail}
                          </a>
                          <a href={`tel:${order.customerPhone}`} className="hover:underline flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {order.customerPhone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{website?.name || 'N/A'}</div>
                      <div className="text-xs text-slate-500">{plan?.name || 'Plan'}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-bold">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          order.status === 'paid' || order.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : order.status === 'completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs text-right">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-1">No orders yet.</p>
              <p className="text-slate-400 text-xs">Customer checkouts will appear here.</p>
            </div>
          )}
        </div>
      </AdminShell>
    )
  } catch (error) {
    redirect('/admin/login')
  }
}
