import type { ReactNode } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [] as { id: string }[];
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
