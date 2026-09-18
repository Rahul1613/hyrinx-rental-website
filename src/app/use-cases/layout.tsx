import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases | Hyrinx Rental Websites',
  description: 'Discover how people use Hyrinx for events, celebrations, businesses, education, and more. Perfect for weddings, college fests, product launches, and temporary projects.',
  openGraph: {
    title: 'Use Cases | Hyrinx',
    description: 'Discover how people use Hyrinx for events, celebrations, businesses, education, and more.',
  },
}

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
