'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Check, Copy, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  const orderId = searchParams.get('orderId')

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              ORDER RECEIVED
            </h1>
            <p className="text-lg text-slate-600">
              Thank you for choosing Hyrinx.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-slate-200">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-600">Order ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-slate-900">{orderId}</span>
                  <button
                    onClick={copyOrderId}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Copy Order ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-600">Status</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  Preparing Website
                </span>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  We will process your website and send the live link to your submitted contact details.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={copyOrderId}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-3 px-6 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                <Copy className="h-5 w-5" />
                {copied ? 'Copied!' : 'Copy Order ID'}
              </button>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Hyrinx
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4">What happens next?</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                <span className="text-slate-700">We review your order and customization requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                <span className="text-slate-700">Payment verification is processed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                <span className="text-slate-700">Your website is customized with your content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                <span className="text-slate-700">Your website goes live and you receive the link</span>
              </li>
            </ol>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Hyrinx
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
