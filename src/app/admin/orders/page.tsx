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

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase tracking-wider text-slate-700 sm:text-xs">
                <tr>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Order #</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Customer</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Website</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Amount</th>
                  <th className="px-3 py-3 text-center sm:px-5 sm:py-4">Status</th>
                  <th className="px-3 py-3 text-right sm:px-5 sm:py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {orders.map((order) => {
                  const orderItem = order.orderItems[0]
                  const website = orderItem?.website
                  const plan = orderItem?.pricingPlan

                  return (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-mono text-xs font-bold text-blue-600 sm:px-5 sm:py-4 sm:text-sm">
                        {order.orderNumber}
                      </td>
                      <td className="px-3 py-3 sm:px-5 sm:py-4">
                        <div>
                          <div className="font-semibold text-slate-900">{order.customerName}</div>
                          <div className="mt-0.5 flex flex-col gap-1 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:gap-3">
                            <a href={`mailto:${order.customerEmail}`} className="flex items-center gap-1 hover:underline">
                              <Mail className="h-3 w-3" />
                              {order.customerEmail}
                            </a>
                            <a href={`tel:${order.customerPhone}`} className="flex items-center gap-1 hover:underline">
                              <Phone className="h-3 w-3" />
                              {order.customerPhone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:px-5 sm:py-4">
                        <div className="font-medium text-slate-900">{website?.name || 'N/A'}</div>
                        <div className="text-[11px] text-slate-500">{plan?.name || 'Plan'}</div>
                      </td>
                      <td className="px-3 py-3 font-bold text-slate-900 sm:px-5 sm:py-4">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="px-3 py-3 text-center sm:px-5 sm:py-4">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider sm:text-xs ${
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
                      <td className="px-3 py-3 text-right text-[11px] text-slate-500 sm:px-5 sm:py-4 sm:text-xs">
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
