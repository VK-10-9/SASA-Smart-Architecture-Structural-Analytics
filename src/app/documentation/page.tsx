"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Calculator, Settings } from "lucide-react";

export default function Documentation() {
  const sections = [
    {
      title: "Getting Started",
      icon: <BookOpen className="w-6 h-6" />,
      content: "Learn how to set up and start using SASSA for your structural analysis needs."
    },
    {
      title: "Force Calculator",
      icon: <Calculator className="w-6 h-6" />,
      content: "Detailed guide on using the force calculator tool for structural analysis."
    },
    {
      title: "Design Scenarios",
      icon: <Settings className="w-6 h-6" />,
      content: "Explore different design scenarios and how to implement them in your projects."
    },
    {
      title: "API Reference",
      icon: <Code2 className="w-6 h-6" />,
      content: "Technical documentation for developers looking to integrate with SASSA."
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
            Documentation
          </h1>
          <p className="text-lg text-white/70 mb-12">
            Welcome to the SASSA documentation. Here you'll find comprehensive guides and documentation
            to help you start working with SASSA as quickly as possible.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
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
              Need Help?
            </h2>
            <p className="text-white/70">
              If you need any assistance or have questions about using SASSA, please don't hesitate to
              contact our support team or refer to our FAQ section.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 