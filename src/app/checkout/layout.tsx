import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Checkout | Hyrinx Rental Websites',
  description: 'Complete your website rental order with Hyrinx. Secure UPI and online payment.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
