import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/about");

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
