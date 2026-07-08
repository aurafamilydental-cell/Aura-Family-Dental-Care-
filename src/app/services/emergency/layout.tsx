import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/services/emergency");

export default function EmergencyServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
