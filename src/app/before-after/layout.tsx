import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/before-after");

export default function BeforeAfterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
