import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/services/restorative");

export default function RestorativeServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
