import type { Metadata, Viewport } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hyrinx.in'),
  title: {
    default: 'Hyrinx - Rental Websites | Rent Websites Starting at ₹149/day',
    template: '%s | Hyrinx Rental Websites',
  },
  description:
    'Why Buy a Website? Rent One Instead. Professional, ready-to-launch websites for events, weddings, businesses, portfolios, celebrations, and college student projects.',
  keywords: [
    'rent website',
    'website rental India',
    'wedding website rental',
    'birthday website',
    'projects for college students',
    'temporary event website',
    'Hyrinx',
    'affordable website rental',
  ],
  authors: [{ name: 'Rahul Sisode' }, { name: 'Harshal' }],
  creator: 'Hyrinx',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hyrinx.in',
    siteName: 'Hyrinx Rental Websites',
    title: 'Hyrinx - Rental Websites | Starting at ₹149/day',
    description:
      'Why Buy a Website? Rent One Instead. Ready-to-use websites for events, weddings, startups, businesses & college capstones.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyrinx - Rental Websites',
    description:
      'Rent a website for days, weeks, or months starting at ₹149/day. Zero maintenance, instant setup.',
  },
  alternates: {
    canonical: 'https://hyrinx.in',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icon-48.png?v=2', type: 'image/png', sizes: '48x48' },
      { url: '/icon-96.png?v=2', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192.png?v=2', type: 'image/png', sizes: '192x192' },
      { url: '/icon.png?v=2', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: '9K0fkU1vwbqIAbGqoTVeZUjFn_wVGpZagpS58UhhLLA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://hyrinx.in/#organization',
        name: 'Hyrinx',
        url: 'https://hyrinx.in',
        logo: 'https://hyrinx.in/favicon.ico',
        description: 'Why Buy a Website? Rent One Instead. Temporary website rentals for weddings, businesses, celebrations, and college projects.',
        founder: [
          {
            '@type': 'Person',
            name: 'Rahul Sisode',
            jobTitle: 'Founder & CEO',
            sameAs: ['https://www.instagram.com/_rahulsisode/'],
          },
          {
            '@type': 'Person',
            name: 'Harshal',
            jobTitle: 'Founder & Creative Strategist',
            sameAs: ['https://www.instagram.com/hxrshxl_07/'],
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-9730213645',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://hyrinx.in/#website',
        url: 'https://hyrinx.in',
        name: 'Hyrinx Rental Websites',
        publisher: {
          '@id': 'https://hyrinx.in/#organization',
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/icon-48.png?v=2" type="image/png" sizes="48x48" />
        <link rel="icon" href="/icon-192.png?v=2" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
