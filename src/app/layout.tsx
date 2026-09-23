import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
