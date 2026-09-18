import Navbar from '@/components/Navbar'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: September 2026</p>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. Overview</h2>
            <p>
              Hyrinx provides temporary website rental services for individuals, businesses, educational institutions,
              and events. By renting or ordering a website through our platform, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. Rental Period & Expiry</h2>
            <p>
              Your website will remain online and accessible for the duration selected during checkout (e.g., 1 day, 7 days, 1 month).
              Upon expiration, the website will be deactivated unless an extension is ordered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. Acceptable Use</h2>
            <p>
              You agree not to publish any unlawful, defamatory, fraudulent, or abusive content on rented websites.
              Hyrinx reserves the right to suspend any website found violating these standards without refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Support & Maintenance</h2>
            <p>
              We maintain server uptime and security for the duration of your active rental. Support inquiries can be sent to contact@hyrinx.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
