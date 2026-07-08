import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/services");

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
