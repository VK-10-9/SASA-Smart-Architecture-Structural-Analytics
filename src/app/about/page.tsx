"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-20 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            About SASSA
          </h1>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Our Vision
              </h2>
              <p className="text-white/70">
                SASSA (Structural Analysis Software for Smart Architecture) is a cutting-edge platform
                designed to revolutionize the way structural engineers and architects approach their
                projects. We combine advanced algorithms with an intuitive interface to make structural
                analysis more accessible and efficient.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                What We Offer
              </h2>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Advanced structural analysis tools powered by state-of-the-art algorithms
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Intuitive user interface designed for both beginners and professionals
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Real-time calculations and visualizations
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Comprehensive documentation and support
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-white/70 mb-6">
                Our team consists of passionate developers and structural engineering experts
                dedicated to creating the best structural analysis software in the industry.
              </p>
              <Link
                href="/about-us"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 
                         text-white rounded-lg transition-colors duration-200"
              >
                Learn More About Our Team
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 