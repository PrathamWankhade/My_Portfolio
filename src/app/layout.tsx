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
    default: "Pratham Wankhade — AI/ML & Full-Stack Engineer",
  },
  description:
    "AI/ML & full-stack engineer. Mesh messaging, computer vision, security, and offline-first systems. Colorful editorial portfolio of original, verifiable work.",
  metadataBase: new URL("https://prathamwankhade.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Pratham Wankhade",
    title: "Pratham Wankhade — AI/ML & Full-Stack Engineer",
    description:
      "AI/ML & full-stack engineer. Mesh messaging, computer vision, security, and offline-first systems.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Pratham Wankhade — AI/ML & Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Wankhade — AI/ML & Full-Stack Engineer",
    description:
      "AI/ML & full-stack engineer. Mesh messaging, computer vision, security, and offline-first systems.",
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
