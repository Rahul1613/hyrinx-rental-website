'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from 'lucide-react'

function TrackContent() {
  const searchParams = useSearchParams()
  const initialId = searchParams.get('id') || ''
  const [orderId, setOrderId] = useState(initialId)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialId) {
      handleTrack(initialId)
    }
  }, [initialId])

  const handleTrack = async (searchId?: string) => {
    const targetId = (searchId ?? orderId).trim()
    if (!targetId) return

    setLoading(true)
    setError('')
    setOrder(null)

    try {
      const res = await fetch(`/api/order/track?id=${encodeURIComponent(targetId)}`)
      const data = await res.json()

      if (res.ok && data.order) {
        setOrder(data.order)
      } else {
        setError(data.error || 'Order not found. Please double-check your Order ID.')
      }
    } catch {
      setError('Failed to reach server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'paid', label: 'Payment Received' },
    { key: 'active', label: 'Website Live' },
    { key: 'completed', label: 'Completed' },
  ]

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending':
        return 0
      case 'paid':
        return 1
      case 'active':
        return 2
      case 'completed':
        return 3
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm">
              <Package className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Track Your Order
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Enter your Order ID (e.g. HYR-XXXXXX) to view real-time rental and launch status.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-md mb-8 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                placeholder="Enter Order ID (e.g., HYR-123456)"
                className="w-full pl-12 pr-4 py-3 rounded-xl text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => handleTrack()}
              disabled={loading || !orderId.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Searching...</>
              ) : (
                <>
                  <Search className="h-4 w-4" /> Track Order
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 text-center text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Order Result Card */}
          {order && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
              {/* Card Header */}
              <div className="bg-slate-900 text-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Order Reference
                    </span>
                    <h2 className="text-2xl font-bold font-mono text-white">{order.orderNumber}</h2>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                      order.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : order.status === 'paid'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : order.status === 'completed'
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        : order.status === 'cancelled'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    {order.status === 'active'
                      ? 'Website Live'
                      : order.status === 'paid'
                      ? 'Payment Confirmed'
                      : order.status === 'completed'
                      ? 'Rental Completed'
                      : order.status === 'cancelled'
                      ? 'Cancelled'
                      : 'Pending Setup'}
                  </span>
                </div>

                {/* Progress Steps (if not cancelled) */}
                {order.status !== 'cancelled' ? (
                  <div className="pt-2">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {steps.map((st, idx) => {
                        const currentIdx = getStepIndex(order.status)
                        const isDone = idx <= currentIdx
                        const isCurrent = idx === currentIdx

                        return (
                          <div key={st.key} className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                                isDone
                                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/50'
                                  : 'bg-slate-800 text-slate-500'
                              } ${isCurrent ? 'ring-4 ring-blue-500/30' : ''}`}
                            >
                              {idx + 1}
                            </div>
                            <span
                              className={`text-[11px] font-medium leading-tight ${
                                isDone ? 'text-white' : 'text-slate-500'
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-rose-950/40 border border-rose-800/50 rounded-xl p-3 text-rose-300 text-xs text-center">
                    This order was cancelled. Please contact our team via WhatsApp for any refund queries.
                  </div>
                )}
              </div>

              {/* Order Details Body */}
              <div className="p-6 sm:p-8 divide-y divide-slate-100">
                <div className="pb-5 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Customer Name</span>
                    <span className="font-semibold text-slate-900">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Website Design</span>
                    <span className="font-semibold text-slate-900">
                      {order.orderItems?.[0]?.website?.name || 'Custom Rental'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Duration Plan</span>
                    <span className="font-semibold text-slate-900">
                      {order.orderItems?.[0]?.pricingPlan?.name || 'Selected Plan'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Total Rental Amount</span>
                    <span className="font-bold text-blue-600 text-base">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Ordered On</span>
                    <span className="text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Subdomain status */}
                {order.preferredSubdomain && (
                  <div className="py-4 flex justify-between items-center text-sm">
                    <span className="text-slate-500">Configured Subdomain</span>
                    <span className="font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                      {order.preferredSubdomain}.hyrinx.com
                    </span>
                  </div>
                )}

                {/* WhatsApp Help */}
                <div className="pt-6">
                  <p className="text-xs text-slate-500 text-center mb-4">
                    Have any questions regarding custom content or deployment urgency?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/919730213645?text=Hi%2C%20I%20am%20checking%20status%20for%20order%20${order.orderNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat with Rahul
                    </a>
                    <a
                      href={`https://wa.me/917020072239?text=Hi%2C%20I%20am%20checking%20status%20for%20order%20${order.orderNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat with Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
          Loading order tracker...
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  )
}
