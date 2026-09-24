import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DEFAULT_WEBSITES } from '@/lib/templates-data'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  let website: any = null

  try {
    website = await prisma.website.findUnique({
      where: { slug },
    })
  } catch {}

  if (!website) {
    website = DEFAULT_WEBSITES.find((w) => w.slug === slug)
  }

  const name = website?.name || 'Website'
  const title = `Live Interactive Demo: ${name} | Hyrinx Rental Websites`
  const canonicalUrl = `https://hyrinx.in/websites/${slug}`

  return {
    title,
    description: `Preview the live interactive demo of the ${name} template on Hyrinx Rental Websites.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
