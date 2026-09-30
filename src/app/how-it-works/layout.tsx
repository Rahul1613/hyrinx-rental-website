import { Metadata } from 'next'
import { BreadcrumbJsonLd, HowToJsonLd } from '@/components/seo/JsonLd'

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
    images: [{ url: 'https://hyrinx.in/icon-512.png', width: 1200, height: 630 }],
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://hyrinx.in' },
  { name: 'How It Works', url: 'https://hyrinx.in/how-it-works' },
]

const howToSteps = [
  { position: 1, name: 'Choose Your Template', text: 'Browse our ready-made website templates across weddings, birthdays, college fests, and businesses.' },
  { position: 2, name: 'Preview Interactive Demo', text: 'Experience the website live to test animations, sound players, RSVP forms, and mobile layouts.' },
  { position: 3, name: 'Customize Content & Branding', text: 'Submit your text, dates, venue locations, photos, and colors through our quick customization form.' },
  { position: 4, name: 'Select Rental Duration', text: 'Pick between 1 day, 3 days, 7 days, 15 days, or monthly rental plans starting at ₹149/day.' },
  { position: 5, name: 'Go Live on Cloud', text: 'Hyrinx configures, tests, and deploys your website on high-speed cloud hosting in 2 to 6 hours.' },
]

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <HowToJsonLd
        name="How to Rent a Website on Hyrinx"
        description="Step-by-step guide to renting a verified website template for events, campaigns, and college projects."
        steps={howToSteps}
      />
      {children}
    </>
  )
}
