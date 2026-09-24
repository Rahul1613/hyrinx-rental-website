import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works — Rent a Website in 5 Easy Steps | Hyrinx',
  description: 'Learn how to rent a website from Hyrinx in 5 simple steps. Choose, preview, customize, rent, and go live with your temporary website in hours.',
  keywords: ['how website rental works', 'rent a website steps', 'temporary website setup', 'Hyrinx rental process'],
  alternates: {
    canonical: 'https://hyrinx.in/how-it-works',
  },
  openGraph: {
    title: 'How It Works | Hyrinx Rental Websites',
    description: 'Learn how to rent a website from Hyrinx in 5 simple steps.',
    url: 'https://hyrinx.in/how-it-works',
  },
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
