import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Rental Pricing — 1 Day to 1 Year Plans from ₹149/day | Hyrinx',
  description:
    'Affordable, transparent website rental plans. Rent a verified website for 1 day (₹149), 3 days (₹399), 7 days (₹599), 1 month, or up to 1 year. Free hosting & subdomain included.',
  keywords: [
    'website rental pricing',
    'cheap website rental',
    'rent website 1 day 149',
    'hyrinx pricing plans',
    'affordable website rental India',
  ],
  alternates: {
    canonical: 'https://hyrinx.in/pricing',
  },
  openGraph: {
    title: 'Website Rental Pricing Plans | Hyrinx',
    description: 'No heavy upfront agency fees. Rent websites starting at ₹149/day with hosting and support included.',
    url: 'https://hyrinx.in/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
