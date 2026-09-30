import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Website Rental Use Cases — Weddings, College Fests & Startups | Hyrinx',
  description: 'Discover how people use Hyrinx for events, celebrations, businesses, education, and more. Perfect for weddings, college fests, product launches, and temporary projects.',
  keywords: ['college fest website rental', 'wedding website rental', 'business campaign landing page', 'temporary website use cases'],
  alternates: {
    canonical: 'https://hyrinx.in/use-cases',
  },
  openGraph: {
    title: 'Use Cases | Hyrinx Rental Websites',
    description: 'Discover how people use Hyrinx for events, celebrations, businesses, education, and more.',
    url: 'https://hyrinx.in/use-cases',
    images: [{ url: 'https://hyrinx.in/icon-512.png', width: 1200, height: 630 }],
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://hyrinx.in' },
  { name: 'Use Cases', url: 'https://hyrinx.in/use-cases' },
]

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {children}
    </>
  )
}
