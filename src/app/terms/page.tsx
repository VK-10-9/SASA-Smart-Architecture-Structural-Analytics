"use client";

import { motion } from "framer-motion";
import { Scale, AlertTriangle, CheckCircle, FileWarning } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="w-6 h-6" />,
      content: "By accessing and using SASSA, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      title: "Use License",
      icon: <Scale className="w-6 h-6" />,
      content: "Permission is granted to temporarily use SASSA for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "Disclaimer",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: "The materials on SASSA are provided on an 'as is' basis. SASSA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      title: "Limitations",
      icon: <FileWarning className="w-6 h-6" />,
      content: "In no event shall SASSA or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SASSA."
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Terms of Service
          </h1>
          <p className="text-lg text-white/70 mb-12">
            Last updated: March 7, 2024
          </p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-white/70">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Governing Law
            </h2>
            <p className="text-white/70">
              These terms and conditions are governed by and construed in accordance with the laws
              of India and you irrevocably submit to the exclusive jurisdiction of the courts in
              that location.
            </p>
          </div>

          <div className="mt-8 bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Contact Information
            </h2>
            <p className="text-white/70">
              Questions about the Terms of Service should be sent to us at:
              <br />
              <a href="mailto:legal@sassa.com" className="text-white hover:text-white/80 transition-colors">
                legal@sassa.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 