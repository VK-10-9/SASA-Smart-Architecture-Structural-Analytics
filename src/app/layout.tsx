import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/large-name-footer";
import NavBarDemo from "@/components/NavBarDemo";

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
  title: "SASSA - Smart Architecture & Structural Analytics",
  description: "Smart tools for structural analysis and architectural design",
  keywords: ["structural analysis", "architecture", "engineering", "calculators"],
  authors: [{ name: "SASSA Team" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-black min-h-screen`}>
        <NavBarDemo />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
