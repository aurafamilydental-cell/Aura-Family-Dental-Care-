import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/privacy");

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
