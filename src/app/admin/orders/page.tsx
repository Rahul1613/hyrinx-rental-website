'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { ShoppingCart, Mail, Phone, Trash2, AlertTriangle } from 'lucide-react'

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  totalAmount: number
  status: string
  createdAt: string
  orderItems: {
    website?: { name: string } | null
    pricingPlan?: { name: string } | null
  }[]
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/orders-list')
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== id))
      }
    } finally {
      setDeletingId(null)
      setConfirmId(null)
    }
  }

  async function handleStatusChange(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        )
      }
    } catch (err) {
      console.error('Failed to change status:', err)
    }
  }

  const statusColor = (s: string) => {
    if (s === 'paid' || s === 'active') return 'bg-green-100 text-green-700 border-green-200'
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    if (s === 'completed') return 'bg-blue-100 text-blue-700 border-blue-200'
    if (s === 'cancelled') return 'bg-red-100 text-red-700 border-red-200'
    return 'bg-slate-100 text-slate-700 border-slate-200'
  }

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1 sm:text-3xl">Customer Orders</h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Track orders, customer details, and rental status
          </p>
        </div>
        <div className="text-sm font-semibold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </span>
              <h2 className="font-bold text-slate-900 text-lg">Delete Order?</h2>
            </div>
            <p className="text-sm text-slate-600 mb-5">
              This will permanently remove the order and all its items. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 border border-slate-300 text-slate-700 font-semibold py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deletingId === confirmId}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition-colors disabled:opacity-60"
              >
                {deletingId === confirmId ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">Loading orders…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[740px] w-full">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase tracking-wider text-slate-700 sm:text-xs">
                <tr>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Order #</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Customer</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Website</th>
                  <th className="px-3 py-3 text-left sm:px-5 sm:py-4">Amount</th>
                  <th className="px-3 py-3 text-center sm:px-5 sm:py-4">Status</th>
                  <th className="px-3 py-3 text-center sm:px-5 sm:py-4">Date</th>
                  <th className="px-3 py-3 text-center sm:px-5 sm:py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {orders.map((order) => {
                  const orderItem = order.orderItems[0]
                  const website = orderItem?.website
                  const plan = orderItem?.pricingPlan

                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        deletingId === order.id ? 'opacity-40' : ''
                      }`}
                    >
                      <td className="px-3 py-3 font-mono text-xs font-bold text-blue-600 sm:px-5 sm:py-4 sm:text-sm whitespace-nowrap">
                        {order.orderNumber}
                      </td>
                      <td className="px-3 py-3 sm:px-5 sm:py-4">
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
                      </td>
                      <td className="px-3 py-3 sm:px-5 sm:py-4">
                        <div className="font-medium text-slate-900">{website?.name || 'N/A'}</div>
                        <div className="text-[11px] text-slate-500">{plan?.name || 'Plan'}</div>
                      </td>
                      <td className="px-3 py-3 font-bold text-slate-900 sm:px-5 sm:py-4 whitespace-nowrap">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="px-3 py-3 text-center sm:px-5 sm:py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          disabled={deletingId === order.id}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider sm:text-xs border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${statusColor(
                            order.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 text-center text-[11px] text-slate-500 sm:px-5 sm:py-4 sm:text-xs whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td className="px-3 py-3 text-center sm:px-5 sm:py-4">
                        <button
                          onClick={() => setConfirmId(order.id)}
                          disabled={!!deletingId}
                          title="Delete order"
                          className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 mb-1">No orders yet.</p>
                <p className="text-slate-400 text-xs">Customer checkouts will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  )
}
