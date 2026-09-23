import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Track Your Rental Order Status | Hyrinx',
  description:
    'Track your website rental status in real time. Check your live subdomain, deployment progress, and connect directly with the founders.',
  alternates: {
    canonical: 'https://hyrinx.in/order/track',
  },
}

export default function OrderTrackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
