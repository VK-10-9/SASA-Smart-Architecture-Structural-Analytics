"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: <FileText className="w-6 h-6" />,
      content: "We collect information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide."
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content: "We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect SASSA and our users."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      title: "Your Rights",
      icon: <Shield className="w-6 h-6" />,
      content: "You have the right to access, correct, or delete your personal information. You can also object to our processing of your personal information."
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
            Privacy Policy
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
              Contact Us
            </h2>
            <p className="text-white/70">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@sassa.com" className="text-white hover:text-white/80 transition-colors">
                privacy@sassa.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 