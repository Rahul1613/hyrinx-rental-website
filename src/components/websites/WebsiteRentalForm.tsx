'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface WebsiteRentalFormProps {
  websiteId: string
  websiteSlug: string
  pricingPlans: any[]
  startingPrice: number
}

export default function WebsiteRentalForm({
  websiteId,
  websiteSlug,
  pricingPlans,
  startingPrice,
}: WebsiteRentalFormProps) {
  const router = useRouter()
  const activePlans = pricingPlans.filter((p) => p.active)
  const defaultPlan = activePlans.length > 0 ? activePlans[0] : null
  const [selectedPlan, setSelectedPlan] = useState<any>(defaultPlan)

  const handleRentNow = () => {
    if (selectedPlan) {
      router.push(`/checkout?website=${websiteId}&plan=${selectedPlan.id}`)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          How long do you need your website?
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
          <Zap className="w-3 h-3 text-blue-600" /> Pay only for days used
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {activePlans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all relative ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">{plan.name}</span>
                    {plan.popular && (
                      <span className="bg-blue-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{plan.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-slate-900">
                    {formatPrice(plan.price)}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    ₹{Math.round(plan.price / (plan.durationDays || 1))}/day
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {selectedPlan && (
        <div className="border-t border-slate-200/90 pt-5">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-slate-600 font-medium">Selected duration:</span>
            <span className="font-bold text-slate-900">{selectedPlan.name} ({selectedPlan.durationDays || 1} {selectedPlan.durationDays === 1 ? 'day' : 'days'})</span>
          </div>
          <div className="flex justify-between items-center mb-5">
            <span className="text-slate-600 font-medium">Total Rental Fee:</span>
            <div className="text-right">
              <span className="text-3xl font-black text-slate-900">
                {formatPrice(selectedPlan.price)}
              </span>
              <p className="text-xs text-green-700 font-semibold">Includes Hosting + Custom Domain Setup</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRentNow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span>Rent This Website Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 100% Secure Checkout
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Live in 2–6 Hours
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
