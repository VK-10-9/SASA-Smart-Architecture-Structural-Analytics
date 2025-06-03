import { motion } from "framer-motion";
import { ArrowRight, Building2, Calculator } from "lucide-react";

const features = [
  {
    title: "Design Scenario",
    description: "Create and analyze different architectural designs. Input building parameters, materials, and environmental conditions for comprehensive structural planning.",
    icon: Building2,
    details: [
      "3D model visualization",
      "Material selection",
      "Environmental conditions",
      "Load distribution planning"
    ]
  },
  {
    title: "Force Calculator",
    description: "Calculate and analyze various forces acting on your structure. Get detailed insights into structural loads, stresses, and deformations.",
    icon: Calculator,
    details: [
      "Load calculation",
      "Stress analysis",
      "Deformation prediction",
      "Safety factor assessment"
    ]
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Core Features
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            SASSA offers three powerful tools for comprehensive structural analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Feature Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 h-full">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    {<feature.icon className="w-8 h-8 text-white" />}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/70 mb-6">
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <ul className="text-left w-full space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-white/60">
                        <span className="w-2 h-2 bg-white/40 rounded-full mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connection Line */}
              {index < features.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8">
                  <ArrowRight className="w-8 h-8 text-white/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent" />
        </div>
      </div>
    </section>
  );
}
