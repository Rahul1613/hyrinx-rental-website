import React from 'react'

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ProductOffer {
  name: string
  price: number
  priceCurrency: string
  duration?: string
}

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <JsonLd data={schema} />
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  return <JsonLd data={schema} />
}

export function TemplateProductJsonLd({
  name,
  description,
  category,
  slug,
  image,
  startingPrice = 149,
  offers = [],
}: {
  name: string
  description: string
  category: string
  slug: string
  image?: string
  startingPrice?: number
  offers?: ProductOffer[]
}) {
  const url = `https://hyrinx.in/websites/${slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${name} — Website Template on Rent`,
    image: image ? [image] : ['https://hyrinx.in/icon-512.png'],
    description: description,
    sku: `HYR-${slug.toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: 'Hyrinx',
    },
    category: category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: startingPrice,
      highPrice: offers.length > 0 ? Math.max(...offers.map((o) => o.price)) : 6099,
      offerCount: offers.length > 0 ? offers.length : 8,
      offers: offers.map((offer) => ({
        '@type': 'Offer',
        name: `${name} (${offer.name})`,
        price: offer.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: url,
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Hyrinx',
        },
      })),
    },
  }
  return <JsonLd data={schema} />
}

export function SoftwareAppJsonLd({
  name,
  description,
  url,
  applicationCategory = 'UtilityApplication',
}: {
  name: string
  description: string
  url: string
  applicationCategory?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: 'Any (Web-based)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  }
  return <JsonLd data={schema} />
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { name: string; text: string; position: number }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.position,
      name: step.name,
      text: step.text,
    })),
  }
  return <JsonLd data={schema} />
}

export function PersonJsonLd({
  name,
  jobTitle,
  image,
  sameAs = [],
  worksFor = 'Hyrinx',
}: {
  name: string
  jobTitle: string
  image?: string
  sameAs?: string[]
  worksFor?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: worksFor,
      url: 'https://hyrinx.in',
    },
    ...(image ? { image } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
  return <JsonLd data={schema} />
}

