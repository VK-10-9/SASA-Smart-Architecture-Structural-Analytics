"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
      <motion.h1
        className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        SASA
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl lg:text-3xl text-white/70 tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Smart Architecture & Structural Analytics
      </motion.p>
    </div>
  );
}
