import type { Metadata } from "next";
import "./globals.css";
import TermsGate from "@/components/TermsGate";

export const metadata: Metadata = {
  title: "Hyrinx - Rental Websites",
  description: "Why Buy a Website? Rent One Instead. Professional websites for events, businesses, celebrations, projects and ideas — available exactly when you need them.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <TermsGate />
      </body>
    </html>
  );
}
