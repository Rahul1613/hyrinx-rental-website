import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DEFAULT_WEBSITES } from '@/lib/templates-data'
import { generateTemplateMetadata } from '@/lib/seo-helpers'

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
      title: 'Website Not Found | Hyrinx Rental',
      description: 'The website you are looking for does not exist or is no longer available.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return generateTemplateMetadata(website)
}

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
