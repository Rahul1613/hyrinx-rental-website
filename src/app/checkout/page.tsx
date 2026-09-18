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
    { number: 4, title: 'Payment', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= s.number
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step > s.number ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <s.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs mt-2 text-slate-600">{s.title}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-16 h-0.5 bg-slate-200 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Review Your Selection</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                      {website.thumbnail && (
                        <img
                          src={website.thumbnail}
                          alt={website.name}
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-900">{website.name}</h3>
                        <p className="text-sm text-slate-600">{website.category}</p>
                        <p className="text-sm text-slate-600 mt-1">{website.shortDesc}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Rental Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Duration</span>
                          <span className="font-medium text-slate-900">{plan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Price</span>
                          <span className="font-medium text-slate-900">{formatPrice(plan.price)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Information</h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company/Event Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyEventName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyEventName: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-slate-100 text-slate-900 py-3 px-6 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Customization</h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Website Title *
                      </label>
                      <input
                        type="text"
                        value={formData.websiteTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, websiteTitle: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Subdomain (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.preferredSubdomain}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredSubdomain: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="myevent"
                      />
                      <p className="text-sm text-slate-500 mt-1">Your website will be at: myevent.hyrinx.com</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Required Launch Date *
                      </label>
                      <input
                        type="date"
                        value={formData.requiredLaunchDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, requiredLaunchDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 bg-slate-100 text-slate-900 py-3 px-6 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 4 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Website</span>
                          <span className="font-medium text-slate-900">{website.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Duration</span>
                          <span className="font-medium text-slate-900">{plan.name}</span>
                        </div>
                        <div className="border-t border-slate-200 pt-3 flex justify-between">
                          <span className="text-slate-600">Total</span>
                          <span className="font-bold text-slate-900 text-xl">{formatPrice(plan.price)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> This is a demo payment flow. In production, you would be redirected to a payment gateway like Razorpay, Stripe, or PayPal.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1 bg-slate-100 text-slate-900 py-3 px-6 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : `Pay ${formatPrice(plan.price)}`}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {website.thumbnail && (
                      <img
                        src={website.thumbnail}
                        alt={website.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{website.name}</p>
                      <p className="text-xs text-slate-600">{plan.name}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Website Rental</span>
                      <span className="font-medium text-slate-900">{formatPrice(plan.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Add-ons</span>
                      <span className="font-medium text-slate-900">₹0</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between">
                      <span className="font-semibold text-slate-900">Total</span>
                      <span className="font-bold text-slate-900">{formatPrice(plan.price)}</span>
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
