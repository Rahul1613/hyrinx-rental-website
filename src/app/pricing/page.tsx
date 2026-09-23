'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Check, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { DEFAULT_PRICING_PLANS } from '@/lib/templates-data'

// Static plans are always the guaranteed base
const STATIC_PLANS = DEFAULT_PRICING_PLANS.filter(p => p.active).sort((a, b) => a.durationDays - b.durationDays)

export default function PricingPage() {
  const [plans, setPlans] = useState<any[]>(STATIC_PLANS) // start with static immediately
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Try to fetch from API and merge — but static plans are already shown
    fetch('/api/pricing-plans')
      .then(r => r.json())
      .then(data => {
        const apiPlans: any[] = data.plans || []
        if (apiPlans.length >= STATIC_PLANS.length) {
          // API returned full or more data — use it
          setPlans(apiPlans.sort((a: any, b: any) => (a.durationDays ?? 0) - (b.durationDays ?? 0)))
        } else {
          // API returned partial — merge with static to fill gaps
          const apiNames = new Set(apiPlans.map((p: any) => p.name.toLowerCase()))
          const staticOnly = STATIC_PLANS.filter(p => !apiNames.has(p.name.toLowerCase()))
          setPlans([...apiPlans, ...staticOnly].sort((a: any, b: any) => (a.durationDays ?? 0) - (b.durationDays ?? 0)))
        }
      })
      .catch(() => {
        // API failed — static plans already shown, nothing to do
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Flexible Plans For Every Need
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Rent for one day or keep your website for as long as your project needs it.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Features Comparison */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              What's Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                'Full website customization',
                'Mobile-responsive design',
                'Fast loading speed',
                'SEO optimized',
                'Social media integration',
                'Contact form',
                'Image gallery',
                'Analytics dashboard',
                '24/7 support',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <div className="bg-blue-600 rounded-2xl p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 mb-8">
                Browse our collection of beautiful, ready-to-use websites
              </p>
              <Link
                href="/websites"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Browse Websites
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ plan }: { plan: any }) {
  return (
    <div
      className={`bg-white rounded-xl border-2 p-6 relative ${
        plan.popular ? 'border-blue-600 shadow-lg' : 'border-slate-200'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="h-3 w-3 fill-white" /> Most Popular
          </span>
        </div>
      )}

      <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
      <p className="text-slate-600 text-sm mb-4">{plan.description}</p>

      <div className="mb-6">
        <span className="text-4xl font-bold text-slate-900">
          {formatPrice(plan.price)}
        </span>
      </div>

      <Link
        href="/websites"
        className={`block w-full py-3 px-6 rounded-lg font-medium text-center transition-colors ${
          plan.popular
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
        }`}
      >
        Get Started
      </Link>

      <div className="mt-6 space-y-3">
        {[
          'Full website access',
          'Customization included',
          'Mobile responsive',
          'Fast hosting',
          '24/7 support',
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
