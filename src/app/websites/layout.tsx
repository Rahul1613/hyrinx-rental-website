import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Websites | Hyrinx Rental Websites',
  description: 'Browse our collection of beautiful, ready-to-use websites for events, celebrations, businesses, and projects. Rent for a day, a week, or longer.',
  openGraph: {
    title: 'Browse Websites | Hyrinx',
    description: 'Browse our collection of beautiful, ready-to-use websites for events, celebrations, businesses, and projects.',
  },
}

export default function WebsitesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
