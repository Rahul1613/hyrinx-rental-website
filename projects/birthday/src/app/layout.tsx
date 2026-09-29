import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birthday Celebration — An Evening of Memories & Milestones",
  description: "Join us in celebrating this milestone birthday with memories, food, music, and great company. RSVP and leave a note on the live guestbook wall.",
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
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#070A11] text-[#E2E8F0] selection:bg-[#F6D062] selection:text-[#090D16]">
        {children}
      </body>
    </html>
  );
}
