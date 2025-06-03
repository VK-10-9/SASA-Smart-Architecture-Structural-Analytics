"use client";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-8" />
              <h2 className="text-lg font-bold">SASSA</h2>
            </Link>

            <h1 className="dark:text-gray-300 mt-4">
              Smart Architecture & Structural Analytics
            </h1>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} SASSA. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/force-calculator" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Force Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/design-scenario" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Design Scenario
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/examples" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-4 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 select-none">
            SASSA
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer }; 