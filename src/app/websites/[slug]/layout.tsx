import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface WebsiteLayoutProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const website = await prisma.website.findUnique({
    where: { slug },
  })

  if (!website) {
    return {
      title: 'Website Not Found | Hyrinx',
      description: 'The website you are looking for does not exist or is no longer available.',
    }
  }

  return {
    title: `${website.name} | Hyrinx Rental Websites`,
    description: website.shortDesc || website.description,
    openGraph: {
      title: website.name,
      description: website.shortDesc || website.description,
      images: website.thumbnail ? [{ url: website.thumbnail }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: website.name,
      description: website.shortDesc || website.description,
      images: website.thumbnail ? [website.thumbnail] : [],
    },
  }
}

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
