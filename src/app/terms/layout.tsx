import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/terms");

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
