import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/large-name-footer";
import NavBarDemo from "@/components/NavBarDemo";
import { Analytics } from "@vercel/analytics/react"; // Import Vercel Analytics

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SASA - Smart Architecture & Structural Analytics",
  description: "Smart tools for structural analysis and architectural design",
  keywords: ["structural analysis", "architecture", "engineering", "calculators"],
  authors: [{ name: "SASA Team" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarDemo />
        {children}
        <Footer />
        {/* Vercel Analytics: Tracks page views and performance. Safe to include in all environments. */}
        <Analytics />
      </body>
    </html>
  );
}
