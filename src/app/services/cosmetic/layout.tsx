import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/services/cosmetic");

export default function CosmeticServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
