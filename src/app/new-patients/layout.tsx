import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata("/new-patients");

export default function NewPatientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
