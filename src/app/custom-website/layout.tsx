import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Request a Custom Website — Tailored Development | Hyrinx',
  description: 'Can\'t find what you\'re looking for? Request a custom website tailored to your specific needs. Tell us your requirements and we\'ll build and host it for you.',
  keywords: ['custom website request', 'temporary custom website', 'hire website developer India', 'custom web design'],
  alternates: {
    canonical: 'https://hyrinx.in/custom-website',
  },
  openGraph: {
    title: 'Custom Website Request | Hyrinx Rental Websites',
    description: 'Request a custom website tailored to your specific needs.',
    url: 'https://hyrinx.in/custom-website',
    images: [{ url: 'https://hyrinx.in/icon-512.png', width: 1200, height: 630 }],
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://hyrinx.in' },
  { name: 'Custom Website', url: 'https://hyrinx.in/custom-website' },
]

export default function CustomWebsiteLayout({
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
