import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/contact");

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
