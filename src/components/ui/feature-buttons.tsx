"use client";

import { motion } from "framer-motion";

export function FeatureButtons() {
  return (
    <motion.div
      className="flex gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <button className="px-6 py-3 bg-white text-neutral-950 rounded-lg hover:bg-white/90 transition-colors">
        Design Scenario
      </button>
      <button className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
        Force Calculator
      </button>
    </motion.div>
  );
}
