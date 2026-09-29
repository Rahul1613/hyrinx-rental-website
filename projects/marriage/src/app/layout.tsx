import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shubh Vivaah — Rhea & Kabir | Divine Wedding Celebration",
  description: "॥ श्री गणेशाय नमः ॥ A sacred celebration of divine love, auspicious rituals, and lifelong vows. Explore our journey, holy muhurat, and share your blessings.",
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
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Marcellus&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FDFBF7] text-[#2B1F1D] selection:bg-[#E5B869] selection:text-[#3B151E]">
        {children}
      </body>
    </html>
  );
}
