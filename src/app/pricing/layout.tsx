import { Metadata } from 'next'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Website Rental Pricing — 1 Day to 1 Year Plans from ₹149/day | Hyrinx',
  description:
    'Affordable, transparent website rental plans. Rent a verified website for 1 day (₹149), 3 days (₹399), 7 days (₹599), 1 month, or up to 1 year. Free hosting & subdomain included.',
  keywords: [
    'website rental pricing',
    'cheap website rental',
    'rent website 1 day 149',
    'hyrinx pricing plans',
    'affordable website rental India',
  ],
  alternates: {
    canonical: 'https://hyrinx.in/pricing',
  },
  openGraph: {
    title: 'Website Rental Pricing Plans | Hyrinx',
    description: 'No heavy upfront agency fees. Rent websites starting at ₹149/day with hosting and support included.',
    url: 'https://hyrinx.in/pricing',
    images: [{ url: 'https://hyrinx.in/icon-512.png', width: 1200, height: 630 }],
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://hyrinx.in' },
  { name: 'Pricing', url: 'https://hyrinx.in/pricing' },
]

const pricingFaqs = [
  {
    question: 'What is included in the website rental price?',
    answer: 'Every Hyrinx rental plan includes high-speed cloud hosting, SSL encryption, custom domain or clean subdomain mapping, complete personalization with your photos and text, mobile responsiveness, and 24/7 technical support.',
  },
  {
    question: 'Are there any hidden setup fees or cancellation charges?',
    answer: 'No. The price you see is the exact total price you pay. There are zero upfront setup fees, zero recurring server hosting charges, and zero cancellation penalties.',
  },
  {
    question: 'Can I extend my rental if my event lasts longer?',
    answer: 'Yes! You can extend your rental period anytime before expiration by contacting our team or renewing directly through your order tracking portal at standard daily plan rates.',
  },
  {
    question: 'What happens after the rental period concludes?',
    answer: 'When your rental duration finishes, the website is safely archived. We maintain a secure backup of your customized content for 30 days should you wish to reactivate it.',
  },
  {
    question: 'Can I connect my own custom domain (e.g. myevent.com)?',
    answer: 'Yes. By default, your rental includes a clean Hyrinx subdomain. If you wish to connect your own domain, our engineering team configures DNS mapping for you at zero extra charge.',
  },
]

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={pricingFaqs} />
      {children}
    </>
  )
}
