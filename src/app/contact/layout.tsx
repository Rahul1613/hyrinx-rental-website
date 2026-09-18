import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Hyrinx Rental Websites',
  description: 'Get in touch with Hyrinx for custom website requests, support, or any questions about our website rental services.',
  openGraph: {
    title: 'Contact Us | Hyrinx',
    description: 'Get in touch with Hyrinx for custom website requests and support.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
