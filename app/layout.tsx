import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://electionguide-ai.web.app";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "";

export const metadata: Metadata = {
  title: {
    default: "ElectionGuide AI — Understand Elections in Minutes",
    template: "%s | ElectionGuide AI",
  },
  description:
    "Neutral, beginner-friendly election process guidance with interactive flows, timelines, checklists, and a helpful AI assistant powered by Google Gemini.",
  keywords: ["elections", "voting", "voter guide", "election process", "first time voter", "civic education"],
  authors: [{ name: "ElectionGuide AI" }],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "ElectionGuide AI — Understand Elections in Minutes",
    description:
      "Step-by-step election guidance with timelines, eligibility checker, document checklist, and an AI assistant.",
    type: "website",
    url: BASE_URL,
    siteName: "ElectionGuide AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectionGuide AI",
    description: "Neutral, beginner-friendly election process guidance.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar />
        <div id="main-content" className="flex-1" role="main">
          {children}
        </div>
        <Footer />

        {/* Google Analytics 4 */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
