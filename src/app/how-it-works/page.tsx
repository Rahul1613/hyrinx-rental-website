import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ArrowRight, Check, Clock, Palette, Zap, Globe, Share, Eye } from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Choose',
      description: 'Browse our ready-made websites across various categories including birthdays, weddings, college events, businesses, and more.',
      icon: Globe,
    },
    {
      number: '02',
      title: 'Preview',
      description: 'Experience the website before renting. View live demos to see exactly how your rented website will look and function.',
      icon: Eye,
    },
    {
      number: '03',
      title: 'Customize',
      description: 'Provide your content, images, links, and branding. Our system adapts the template to match your specific requirements.',
      icon: Palette,
    },
    {
      number: '04',
      title: 'Rent',
      description: 'Choose your rental period - from 1 day to 1 year. Select the duration that fits your event or project timeline.',
      icon: Clock,
    },
    {
      number: '05',
      title: 'Go Live',
      description: 'Hyrinx prepares and activates your website. You receive the live link to share with your audience.',
      icon: Zap,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get your temporary website live in five simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 mb-20">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-600 text-lg">{step.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                    <step.icon className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-12 shadow-sm mb-20">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Why Choose Hyrinx?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Check,
                  title: 'No Long-term Commitment',
                  description: 'Rent for exactly as long as you need - from a single day to a full year.',
                },
                {
                  icon: Palette,
                  title: 'Fully Customizable',
                  description: 'Add your content, images, branding, and personalize the website to match your needs.',
                },
                {
                  icon: Zap,
                  title: 'Instant Setup',
                  description: 'No development required. Your website goes live quickly after order confirmation.',
                },
                {
                  icon: Globe,
                  title: 'Professional Designs',
                  description: 'High-quality, modern templates created by professional designers.',
                },
                {
                  icon: Share,
                  title: 'Easy Sharing',
                  description: 'Share your website via link, QR code, WhatsApp, Instagram, and more.',
                },
                {
                  icon: Clock,
                  title: 'Flexible Duration',
                  description: 'Choose from multiple rental periods to match your event or project timeline.',
                },
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 mb-8">
                Browse our collection of beautiful, ready-to-use websites
              </p>
              <Link
                href="/websites"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Browse Websites
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
