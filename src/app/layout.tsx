import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/large-name-footer";
import { NavBarDemo } from '@/components/NavBarDemo'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SASSA - Smart Architecture & Structural Analytics",
  description: "Smart tools for structural analysis and architectural design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBarDemo />
        {children}
        <Footer />
      </body>
    </html>
  );
}
