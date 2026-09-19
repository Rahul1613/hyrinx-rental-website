'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { ArrowRight, Check, CreditCard, Calendar, User, FileText } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [website, setWebsite] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyEventName: '',
    websiteTitle: '',
    preferredSubdomain: '',
    requiredLaunchDate: '',
    customizationData: {} as any,
  })

  useEffect(() => {
    const websiteId = searchParams.get('website')
    const planId = searchParams.get('plan')

    if (websiteId && planId) {
      fetchWebsiteAndPlan(websiteId, planId)
    } else {
      router.push('/websites')
    }
  }, [searchParams, router])

  const fetchWebsiteAndPlan = async (websiteId: string, planId: string) => {
    try {
      const [websiteRes, planRes] = await Promise.all([
        fetch(`/api/websites/by-id/${websiteId}`),
        fetch(`/api/pricing-plans`),
      ])

      const websiteData = await websiteRes.json()
      const planData = await planRes.json()

      if (websiteRes.ok) {
        setWebsite(websiteData.website)
      }

      if (planRes.ok) {
        const selectedPlan = planData.plans.find((p: any) => p.id === planId)
        setPlan(selectedPlan)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteId: website.id,
          pricingPlanId: plan.id,
          customerInfo: formData,
          totalAmount: plan.price,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/order/success?orderId=${data.order.orderNumber}`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create order')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Failed to create order')
    } finally {
      setLoading(false)
    }
  }

  if (!website || !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  const steps = [
    { number: 1, title: 'Review', icon: FileText },
    { number: 2, title: 'Information', icon: User },
    { number: 3, title: 'Customization', icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-16">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                        step >= s.number
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      {step > s.number ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <s.icon className="h-6 w-6" />
                      )}
                    </div>
                    <span className={`text-sm mt-3 font-bold transition-colors ${
                      step >= s.number ? 'text-slate-900' : 'text-slate-400'
                    }`}>{s.title}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-20 h-1 bg-slate-200 mx-3 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-8">Review Your Selection</h2>

                  <div className="space-y-8">
                    <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-slate-200">
                      {website.thumbnail && (
                        <img
                          src={website.thumbnail}
                          alt={website.name}
                          className="w-32 h-24 object-cover rounded-xl shadow-md"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{website.name}</h3>
                        <p className="text-base text-slate-600 font-medium">{website.category}</p>
                        <p className="text-base text-slate-600 mt-2">{website.shortDesc}</p>
                      </div>
                    </div>

                    <div className="border-t-2 border-slate-200 pt-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Rental Details</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">Duration</span>
                          <span className="font-bold text-slate-900 text-lg">{plan.name}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">Price</span>
                          <span className="font-bold text-slate-900 text-lg">{formatPrice(plan.price)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1"
                    >
                      Continue
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-8">Your Information</h2>

                  <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Company/Event Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyEventName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyEventName: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-4 px-6 rounded-2xl font-bold transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-8">Customization</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Website Title *
                      </label>
                      <input
                        type="text"
                        value={formData.websiteTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, websiteTitle: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Preferred Subdomain (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.preferredSubdomain}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredSubdomain: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        placeholder="myevent"
                      />
                      <p className="text-base text-slate-500 mt-2 font-medium">Your website will be at: myevent.hyrinx.com</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Required Launch Date *
                      </label>
                      <input
                        type="date"
                        value={formData.requiredLaunchDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, requiredLaunchDate: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 rounded-2xl">
                      <p className="text-base text-blue-800 font-medium">
                        <strong>Note:</strong> Your order will be created without payment. Payment will be collected later based on your preferences.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-4 px-6 rounded-2xl font-bold transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50"
                      >
                        {loading ? 'Creating Order...' : 'Create Order'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-slate-200 sticky top-28">
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-6">Order Summary</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-slate-200">
                    {website.thumbnail && (
                      <img
                        src={website.thumbnail}
                        alt={website.name}
                        className="w-20 h-16 object-cover rounded-xl shadow-md"
                      />
                    )}
                    <div>
                      <p className="font-bold text-slate-900 text-base">{website.name}</p>
                      <p className="text-sm text-slate-600 font-medium">{plan.name}</p>
                    </div>
                  </div>

                  <div className="border-t-2 border-slate-200 pt-6 space-y-4">
                    <div className="flex justify-between text-base">
                      <span className="text-slate-600 font-medium">Website Rental</span>
                      <span className="font-bold text-slate-900">{formatPrice(plan.price)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-slate-600 font-medium">Add-ons</span>
                      <span className="font-bold text-slate-900">₹0</span>
                    </div>
                    <div className="border-t-2 border-slate-200 pt-4 flex justify-between">
                      <span className="font-bold text-slate-900 text-lg">Total</span>
                      <span className="font-black text-slate-900 text-xl">{formatPrice(plan.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
          <p className="text-slate-500 font-medium">Loading checkout...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
