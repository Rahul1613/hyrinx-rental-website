import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "॥ शुभ नवरात्रि ॥ Shree Navratri Mahotsav & Dandiya Raas 2026",
  description: "Experience 9 divine nights of Maa Durga Puja, sacred colors, rituals, Aarti, and grand Dandiya Raas celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Rozha+One&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF7F2] text-[#2E1508] selection:bg-[#D97706] selection:text-white">
        {children}
      </body>
    </html>
  );
}
