import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Privacy Policy | Hyrinx Rental Websites',
  description: 'Learn how Hyrinx collects, protects, and uses customer data when renting temporary websites.',
  alternates: {
    canonical: 'https://hyrinx.in/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: September 2026</p>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. Information We Collect</h2>
            <p>
              We collect information that you provide when requesting a website, creating an order, or submitting a contact request.
              This includes your name, email address, phone number, and customized event content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. How We Use Your Information</h2>
            <p>
              We use your information solely to deliver and host your rented website, communicate order updates,
              and process payments. We never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Data Retention</h2>
            <p>
              Following the expiration of your website rental, customized website assets are retained for 30 days
              for archival and renewal purposes, after which they are permanently purged.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Contact Us</h2>
            <p>
              For privacy-related inquiries, please email us at contact@hyrinx.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
