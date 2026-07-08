import type { Metadata } from "next";
import "./globals.css";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Dental Clinic in Koforidua`,
    template: `%s | ${SITE_NAME}`,
  },
  description: BUSINESS.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | Dental Clinic in Koforidua`,
    description: BUSINESS.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "Aura Family Dental Care clinic in Koforidua, Ghana",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Dental Clinic in Koforidua`,
    description: BUSINESS.description,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
