import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/accessibility");

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
