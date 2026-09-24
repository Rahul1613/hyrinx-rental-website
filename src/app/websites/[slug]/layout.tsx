import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DEFAULT_WEBSITES } from '@/lib/templates-data'

export const dynamic = 'force-dynamic'

interface WebsiteLayoutProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let website: any = null

  try {
    website = await prisma.website.findUnique({
      where: { slug },
    })
  } catch (e) {
    // DB query fallback
  }

  if (!website) {
    website = DEFAULT_WEBSITES.find((w) => w.slug === slug)
  }

  if (!website) {
    return {
      title: 'Website Not Found | Hyrinx',
      description: 'The website you are looking for does not exist or is no longer available.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `${website.name} — Rent from ₹${website.startingPrice || 149}/day | Hyrinx`
  const description =
    website.shortDesc ||
    website.description ||
    `Rent ${website.name} website template starting at ₹${website.startingPrice || 149}/day. Fast deployment, customisation included, zero hosting fees.`
  const url = `https://hyrinx.in/websites/${slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: website.thumbnail ? [{ url: website.thumbnail }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: website.thumbnail ? [website.thumbnail] : [],
    },
  }
}

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
