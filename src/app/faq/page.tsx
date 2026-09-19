import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { HelpCircle, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getFAQs() {
  const faqs = await prisma.fAQ.findMany({
    where: { enabled: true },
    orderBy: { order: 'asc' },
  })

  if (faqs.length > 0) return faqs

  return [
    {
      id: '1',
      question: 'What is a rental website and how does it work?',
      answer: 'Instead of spending weeks and tens of thousands of rupees buying a permanent website, Hyrinx allows you to rent a ready-made, professionally designed website for the exact duration of your event, campaign, or project (from 1 day to 1 year). We configure it with your details and host it for you.',
    },
    {
      id: '2',
      question: 'How fast will my website be live after placing an order?',
      answer: 'Most standard rental websites go live within 2 to 6 hours after you submit your customization details and complete payment. For custom websites, preparation typically takes 24 to 48 hours.',
    },
    {
      id: '3',
      question: 'Can I customize the colors, text, and images on the template?',
      answer: 'Yes! Every template allows full customization of text, galleries, event dates, schedules, location maps, contact details, and brand colors.',
    },
    {
      id: '4',
      question: 'Can I extend my rental period if my event or campaign lasts longer?',
      answer: 'Yes! You can contact us anytime before your rental expires to renew or extend your rental duration at the standard daily/monthly plan rate.',
    },
    {
      id: '5',
      question: 'What happens when my rental period ends?',
      answer: 'When your rental period concludes, the website is safely archived. We keep a secure backup of your customized content for 30 days should you wish to reactivate it.',
    },
    {
      id: '6',
      question: 'Can I connect a custom domain (e.g. myevent.com)?',
      answer: 'By default, your website comes with a clean subdomain (e.g. yourname.hyrinx.com). If you would like to connect your own custom domain, our team can configure DNS settings for you upon request.',
    },
  ]
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to know about renting websites on Hyrinx
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-blue-100 text-sm mb-6">Our team is here to assist with any questions about your website rental.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-sm"
          >
            Contact Support
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
