import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s · Pratham Wankhade",
    default: "Pratham Wankhade — Information Technology Graduate",
  },
  description:
    "Information Technology graduate. AI/ML, software engineering, and distributed systems — mesh messaging, computer vision, security, and offline-first work, documented with architecture, trade-offs, and limits.",
  metadataBase: new URL("https://prathamwankhades-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Pratham Wankhade",
    title: "Pratham Wankhade — Information Technology Graduate",
    description:
      "Information Technology graduate. AI/ML, software engineering, and distributed systems — mesh messaging, computer vision, security, and offline-first work.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pratham Wankhade — Information Technology Graduate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Wankhade — Information Technology Graduate",
    description:
      "Information Technology graduate. AI/ML, software engineering, and distributed systems — mesh messaging, computer vision, security, and offline-first work.",
    images: ["/opengraph-image.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Reveal blocks animate in via JS; without JS keep them visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
