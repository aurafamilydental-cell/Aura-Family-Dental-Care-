import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/services/pediatric");

export default function PediatricServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
