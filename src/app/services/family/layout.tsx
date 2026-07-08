import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/services/family");

export default function FamilyServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
