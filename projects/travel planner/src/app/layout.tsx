import type { Metadata } from 'next';
import './globals.css';
import { TripProvider } from '@/lib/tripStore';

export const metadata: Metadata = {
  title: 'ROAM — Intelligent Travel Planning & Cinematic Itineraries',
  description: 'Apple-grade travel planning experience. Intimate daily itineraries, sanctuary stays, culinary rituals, and interactive cartographic journeys.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07090e] text-[#f4f5f8] antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <TripProvider>
          {children}
        </TripProvider>
      </body>
    </html>
  );
}
