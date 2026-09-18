'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ExternalLink, Star, Check, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function WebsiteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [website, setWebsite] = useState<any>(null)
  const [pricingPlans, setPricingPlans] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      fetchWebsite(params.slug as string)
      fetchPricingPlans()
    }
  }, [params.slug])

  const fetchWebsite = async (slug: string) => {
    try {
      const response = await fetch(`/api/websites/${slug}`)
      const data = await response.json()
      if (response.ok) {
        setWebsite(data.website)
        // Select the first plan by default
        if (data.pricingPlans && data.pricingPlans.length > 0) {
          setSelectedPlan(data.pricingPlans[0])
        }
      }
    } catch (error) {
      console.error('Error fetching website:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPricingPlans = async () => {
    try {
      const response = await fetch('/api/pricing-plans')
      const data = await response.json()
      if (response.ok) {
        setPricingPlans(data.plans || [])
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error)
    }
  }

  const handleRentNow = () => {
    if (selectedPlan) {
      router.push(`/checkout?website=${website.id}&plan=${selectedPlan.id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/3 mb-4" />
              <div className="aspect-video bg-slate-200 rounded-xl mb-8" />
              <div className="h-6 bg-slate-200 rounded w-1/2 mb-4" />
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-8" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">Website not found</h1>
            <Link href="/websites" className="text-blue-600 hover:text-blue-700">
              Browse all websites
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const features = website.features ? JSON.parse(website.features) : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/websites" className="text-slate-600 hover:text-slate-900 text-sm">
              ← Back to Websites
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Preview */}
            <div>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg">
                {website.thumbnail ? (
                  <img
                    src={website.thumbnail}
                    alt={website.name}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4" />
                      <div className="h-6 bg-slate-200 rounded w-48 mx-auto mb-2" />
                      <div className="h-4 bg-slate-100 rounded w-32 mx-auto" />
                    </div>
                  </div>
                )}

                {website.liveDemoUrl && (
                  <div className="p-4 border-t border-slate-200">
                    <a
                      href={website.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View Live Demo
                    </a>
                  </div>
                )}
              </div>

              {/* Gallery */}
              {website.galleryImages && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {JSON.parse(website.galleryImages).map((image: string, i: number) => (
                      <img
                        key={i}
                        src={image}
                        alt={`${website.name} gallery ${i + 1}`}
                        className="rounded-lg border border-slate-200 aspect-video object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Details */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {website.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-slate-900 mb-2">{website.name}</h1>
              <p className="text-lg text-slate-600 mb-4">{website.category} Website</p>

              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-slate-600 ml-2">5.0 (12 reviews)</span>
              </div>

              <p className="text-slate-700 mb-8">{website.description}</p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Starting at</h3>
                <p className="text-3xl font-bold text-slate-900">
                  {formatPrice(website.startingPrice || 49)}/day
                </p>
              </div>

              {/* Pricing Calculator */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  How long do you need your website?
                </h3>

                <div className="space-y-3 mb-6">
                  {pricingPlans.filter(p => p.active).map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedPlan?.id === plan.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">{plan.name}</span>
                            {plan.popular && (
                              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{plan.description}</p>
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                          {formatPrice(plan.price)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedPlan && (
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-600">Selected duration:</span>
                      <span className="font-semibold text-slate-900">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-600">Price:</span>
                      <span className="text-2xl font-bold text-slate-900">
                        {formatPrice(selectedPlan.price)}
                      </span>
                    </div>

                    <button
                      onClick={handleRentNow}
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Rent This Website
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
