"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Features } from "@/components/blocks/features-2";
import { About } from "@/components/blocks/about";
import { HowItWorks } from "@/components/blocks/how-it-works";

interface ActionButton {
  name: string;
  style: string;
  href: string;
}

const fadeUpAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ACTIONS: ActionButton[] = [
  { 
    name: "Design Scenario", 
    style: "bg-white text-neutral-950 hover:bg-white/90",
    href: "/design-scenario"
  },
  { 
    name: "Force Calculator", 
    style: "bg-white/10 text-white hover:bg-white/20",
    href: "/force-calculator"
  },
];

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <BeamsBackground>
        <div className="relative z-10 flex h-screen w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter"
              {...fadeUpAnimation}
              transition={{ duration: 0.8 }}
            >
              SASSA
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl lg:text-3xl text-white/70 tracking-tighter"
              {...fadeUpAnimation}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Smart Architecture & Structural Analytics
            </motion.p>
            <motion.div
              className="flex gap-4 mt-8"
              {...fadeUpAnimation}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {ACTIONS.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className={`px-6 py-3 rounded-lg transition-colors ${action.style}`}
                >
                  {action.name}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </BeamsBackground>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* About Section */}
      <About />
    </main>
  );
}
