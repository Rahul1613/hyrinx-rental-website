import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Hyrinx Rental Websites',
  description: 'Flexible pricing plans for website rentals. Rent for 1 day, 3 days, 7 days, 15 days, 1 month, 3 months, 6 months, or 1 year.',
  openGraph: {
    title: 'Pricing | Hyrinx',
    description: 'Flexible pricing plans for website rentals. Choose the duration that fits your needs.',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
