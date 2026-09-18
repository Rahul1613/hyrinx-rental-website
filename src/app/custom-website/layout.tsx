import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Website Request | Hyrinx Rental Websites',
  description: 'Can\'t find what you\'re looking for? Request a custom website tailored to your specific needs. Tell us your requirements and we\'ll build it for you.',
  openGraph: {
    title: 'Custom Website Request | Hyrinx',
    description: 'Request a custom website tailored to your specific needs.',
  },
}

export default function CustomWebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
