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
    default: 'Hyrinx — Website Renting & Developer Platform | Rent Websites from ₹149/day',
    template: '%s | Hyrinx Website Renting',
  },
  description:
    'Why Buy a Website? Rent One Instead. India’s premier website renting and temporary developer platform. Rent verified, ready-to-launch websites for events, weddings, businesses, and college student projects starting at ₹149/day.',
  keywords: [
    'hyrinx',
    'hyrinx.in',
    'website renting',
    'website renting India',
    'rent website',
    'website rental',
    'rent a website',
    'rent a website developer',
    'temporary website developer',
    'website developer for rent',
    'projects for college students',
    'wedding website rental',
    'birthday website rent',
    'temporary event website',
    'affordable website rental',
    'website rental services',
  ],
  authors: [{ name: 'Rahul Sisode' }, { name: 'Harshal' }],
  creator: 'Hyrinx',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hyrinx.in',
    siteName: 'Hyrinx Website Renting',
    title: 'Hyrinx — Website Renting & Temporary Developer Services | Starting at ₹149/day',
    description:
      'Why Buy a Website? Rent One Instead. Rent verified websites for events, weddings, startups, businesses & college capstones.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyrinx — Website Renting Platform',
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
        name: 'Hyrinx Website Renting',
        alternateName: ['Hyrinx', 'Hyrinx.in', 'Hyrinx Rental Websites'],
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://hyrinx.in/websites?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
        publisher: {
          '@id': 'https://hyrinx.in/#organization',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://hyrinx.in/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is website renting and how does Hyrinx work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Website renting allows you to rent a professionally built, fully functional website for days, weeks, or months starting at ₹149/day. Hyrinx provides instant deployment, customisation, free hosting, and custom domain setup.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I rent a website or hire a website developer on Hyrinx?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Browse through 30+ ready-to-use website templates on hyrinx.in, preview the live demo, pick your rental plan (from 1 day to 1 year), and go live within 2 to 6 hours. For tailored needs, request a custom website from our developers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can college students rent projects for academic and semester submissions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Hyrinx provides verified full-stack and AI capstone projects for college students with complete source code, live demos, architecture documentation, and viva presentations.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is included in the website rental price?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All Hyrinx rental plans include fast cloud hosting, customisation with your content and logo, mobile-responsive layout, SEO setup, 24/7 technical support, and subdomain or custom domain mapping.',
            },
          },
        ],
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
