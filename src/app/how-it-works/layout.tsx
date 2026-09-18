import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works | Hyrinx Rental Websites',
  description: 'Learn how to rent a website from Hyrinx in 5 simple steps. Choose, preview, customize, rent, and go live with your temporary website.',
  openGraph: {
    title: 'How It Works | Hyrinx',
    description: 'Learn how to rent a website from Hyrinx in 5 simple steps.',
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
