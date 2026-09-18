import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Calendar, Briefcase, Heart, GraduationCap, Store, Globe, ArrowRight } from 'lucide-react'

export default function UseCasesPage() {
  const useCases = [
    {
      icon: Calendar,
      title: 'Events & Celebrations',
      description: 'Weddings, birthdays, anniversaries, parties, reunions - create a beautiful website to share event details, RSVP, and memories.',
      examples: ['Wedding Websites', 'Birthday Party Pages', 'Anniversary Celebrations', 'Party Invitations'],
    },
    {
      icon: Briefcase,
      title: 'Business & Corporate',
      description: 'Product launches, conferences, trade shows, company events - temporary websites for specific business initiatives.',
      examples: ['Product Launches', 'Conference Pages', 'Trade Show Booths', 'Company Events'],
    },
    {
      icon: GraduationCap,
      title: 'Education & College',
      description: 'College fests, workshops, seminars, alumni meets - professional websites for educational institutions and events.',
      examples: ['College Fests', 'Workshop Pages', 'Seminar Registrations', 'Alumni Meets'],
    },
    {
      icon: Store,
      title: 'Small Businesses',
      description: 'Seasonal promotions, flash sales, pop-up shops - temporary online presence for short-term business activities.',
      examples: ['Flash Sales', 'Seasonal Promotions', 'Pop-up Shops', 'Limited Offers'],
    },
    {
      icon: Heart,
      title: 'Personal Projects',
      description: 'Portfolios, personal branding, crowdfunding campaigns - showcase your work or raise awareness for your cause.',
      examples: ['Personal Portfolios', 'Crowdfunding Pages', 'Personal Branding', 'Cause Awareness'],
    },
    {
      icon: Globe,
      title: 'Community & Non-Profit',
      description: 'Charity events, community drives, volunteer recruitment - connect with your community for a specific cause.',
      examples: ['Charity Events', 'Community Drives', 'Volunteer Recruitment', 'Fundraising'],
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
              Who Uses Hyrinx?
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From personal celebrations to corporate events, discover how people use temporary websites to make an impact
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <useCase.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                <p className="text-slate-600 mb-6">{useCase.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Popular uses:</p>
                  <ul className="space-y-1">
                    {useCase.examples.map((example, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl p-12 shadow-sm mb-20">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Why Rent Instead of Build?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Save Time',
                  description: 'Get your website live in hours, not weeks or months.',
                },
                {
                  title: 'Save Money',
                  description: 'Pay only for the duration you need, no long-term costs.',
                },
                {
                  title: 'Professional Quality',
                  description: 'Access professionally designed templates without hiring designers.',
                },
                {
                  title: 'No Maintenance',
                  description: 'No hosting, domain, or maintenance headaches.',
                },
              ].map((benefit, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
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
