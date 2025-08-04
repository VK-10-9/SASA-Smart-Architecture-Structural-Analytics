"use client";

import { motion } from "framer-motion";

export function ProjectInfo() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
              About The Project
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed text-center">
              This project is developed by <span className="text-white font-medium">Vishwanath M. Koliwad</span>, <span className="text-white font-medium">Nihal V. Batunge</span>, and <span className="text-white font-medium">Viraj S. Vighneshi</span> from the Department of Computer Science & Engineering at K. L. E. SOCIETY's K. L. E. INSTITUTE OF TECHNOLOGY, affiliated with Visvesvaraya Technological University (VTU), Belagavi, under the guidance of <span className="text-white font-medium">Mr. Rajat Vaidya</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
