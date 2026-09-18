import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="flex items-center justify-center px-4 pt-24 pb-12">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-slate-900 mb-4">404</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            This Page Went Offline
          </h2>
          
          <p className="text-lg text-slate-600 mb-8">
            The page you're looking for doesn't exist or is no longer available.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Home className="h-5 w-5" />
            Back to Hyrinx
            <ArrowRight className="h-5 w-5" />
          </Link>

          <div className="mt-12">
            <p className="text-slate-600 mb-4">Looking for something specific?</p>
            <div className="flex flex-col gap-2">
              <Link href="/websites" className="text-blue-600 hover:text-blue-700">
                Browse Websites
              </Link>
              <Link href="/pricing" className="text-blue-600 hover:text-blue-700">
                View Pricing
              </Link>
              <Link href="/custom-website" className="text-blue-600 hover:text-blue-700">
                Request Custom Website
              </Link>
              <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
