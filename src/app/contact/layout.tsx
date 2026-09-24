import { Metadata } from 'next'

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
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
