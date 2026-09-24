import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed | Hyrinx Rental Websites',
  description: 'Your rental website order has been received successfully.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
