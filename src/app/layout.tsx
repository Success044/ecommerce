import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store",
  description: "Browse products and find what you need.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only fixed top-3 left-3 z-50 rounded-md bg-white px-4 py-2 focus:not-sr-only"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
