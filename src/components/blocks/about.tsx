"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Building2, BookOpen } from "lucide-react";

export function About() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            About SASA
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Smart Architecture & Structural Analytics (SASA) is an innovative web application
            designed to revolutionize structural engineering analysis and design. Our platform
            combines cutting-edge technology with engineering expertise to provide powerful
            tools for structural analysis and design optimization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Our Team</h3>
            </div>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                Vishwanath M. Koliwad
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                Nihal V. Batunge
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                Viraj S. Vighneshi
              </li>
            </ul>
          </motion.div>

          {/* Mentors Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Project Guide</h3>
            </div>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                Mr. Rajat Vaidya
              </li>
            </ul>
          </motion.div>

          {/* Institution Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Institution</h3>
            </div>
            <div className="space-y-4 text-white/70">
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                K. L. E. SOCIETY'S K. L. E. INSTITUTE OF TECHNOLOGY
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                Department of Computer Science
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                Visvesvaraya Technological University
              </p>
              <p className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                Opp. Airport, Gokul, Hubballi-580 027
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto text-center"
        >
          <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Project Vision</h3>
            </div>
            <p className="text-lg text-white/70">
              Our mission is to provide engineers and architects with powerful tools for structural analysis
              and design optimization, making the process more efficient and accurate. Through innovative
              technology and user-friendly interfaces, we aim to transform the way structural engineering
              is practiced.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
