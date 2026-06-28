import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura Family Dental Care | Premium & Honest Dentistry",
  description: "Aura Family Dental Care provides an evidence-based, welcoming, and uniquely comfortable dental experience.",
};

import CookieBanner from "@/components/CookieBanner";

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
      </body>
    </html>
  );
}
