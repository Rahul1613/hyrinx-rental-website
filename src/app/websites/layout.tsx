import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rent Websites — Browse Ready-Made Templates Starting at ₹149/day | Hyrinx',
  description:
    'Browse 30+ ready-to-launch website templates for weddings, birthdays, invitations, businesses, SaaS startups, and final-year college student projects. Live demos available.',
  keywords: [
    'rent website online',
    'wedding website templates',
    'projects for college students capstones',
    'birthday website rent',
    'SaaS landing page rent',
    'Hyrinx website catalog',
    'website rental India',
  ],
  alternates: {
    canonical: 'https://hyrinx.in/websites',
  },
  openGraph: {
    title: 'Browse Ready-to-Rent Websites | Hyrinx',
    description:
      'Choose a professionally designed website, preview the live demo, and launch in 60 seconds.',
    url: 'https://hyrinx.in/websites',
  },
}

export default function WebsitesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
