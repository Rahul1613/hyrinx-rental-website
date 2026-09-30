import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malhar 2026 // St. Xavier's Inter-Collegiate Cultural Festival",
  description: "Asia's largest inter-collegiate cultural festival. Explore the creative campus world, literary arts, performing arts, fine arts, and flagship conclaves.",
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
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#060407] text-[#F4EAD8] selection:bg-[#F405F9] selection:text-white">
        {children}
      </body>
    </html>
  );
}
