import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Contact Support & Founders | Hyrinx Rental Websites',
  description: 'Get in touch with Hyrinx for custom website requests, support, or questions. Reach founders Rahul Sisode & Harshal on WhatsApp or email.',
  keywords: ['contact Hyrinx', 'website rental support', 'Hyrinx phone number', 'Hyrinx WhatsApp'],
  alternates: {
    canonical: 'https://hyrinx.in/contact',
  },
  openGraph: {
    title: 'Contact Us | Hyrinx Rental Websites',
    description: 'Get in touch with Hyrinx for custom website requests and support.',
    url: 'https://hyrinx.in/contact',
    images: [{ url: 'https://hyrinx.in/icon-512.png', width: 1200, height: 630 }],
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://hyrinx.in' },
  { name: 'Contact', url: 'https://hyrinx.in/contact' },
]

export default function ContactLayout({
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
