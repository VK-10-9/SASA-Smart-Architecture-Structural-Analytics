"use client";

import { motion } from "framer-motion";
import { Building2, Factory, Home, Landmark } from "lucide-react";

export default function Examples() {
  const examples = [
    {
      title: "Residential Buildings",
      icon: <Home className="w-6 h-6" />,
      description: "Analysis of structural forces in residential buildings",
      useCase: "Multi-story apartment complex structural analysis"
    },
    {
      title: "Commercial Structures",
      icon: <Building2 className="w-6 h-6" />,
      description: "Force calculations for commercial buildings",
      useCase: "Shopping mall structural integrity assessment"
    },
    {
      title: "Industrial Facilities",
      icon: <Factory className="w-6 h-6" />,
      description: "Industrial structure analysis and optimization",
      useCase: "Factory building load distribution analysis"
    },
    {
      title: "Infrastructure Projects",
      icon: <Landmark className="w-6 h-6" />,
      description: "Large-scale infrastructure analysis",
      useCase: "Bridge structural force calculations"
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
            Examples & Case Studies
          </h1>
          <p className="text-lg text-white/70 mb-12">
            Explore real-world examples and case studies of how SASSA is being used to solve
            complex structural engineering challenges.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {examples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    {example.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    {example.title}
                  </h2>
                </div>
                <p className="text-white/70 mb-4">
                  {example.description}
                </p>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white/50 mb-2">Use Case</h3>
                  <p className="text-white/70">
                    {example.useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Submit Your Example
            </h2>
            <p className="text-white/70">
              Have a unique use case or example of how you're using SASSA? Share your story
              with our community and help others learn from your experience.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 