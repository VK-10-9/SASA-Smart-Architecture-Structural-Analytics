import { motion } from "framer-motion";

export function About() {
  return (
    <section className="relative py-16 bg-black/10 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            About SASSA
          </h2>
          <p className="text-lg text-white/70 mb-12">
            Smart Architecture & Structural Analytics (SASSA) is an innovative web application
            designed to revolutionize structural engineering analysis and design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Our Team</h3>
            <ul className="space-y-2 text-white/70">
              <li>Student Name 1</li>
              <li>Student Name 2</li>
              <li>Student Name 3</li>
              <li>Student Name 4</li>
            </ul>
          </motion.div>

          {/* Mentors Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Project Guides</h3>
            <ul className="space-y-2 text-white/70">
              <li>Prof. Guide Name 1</li>
              <li>Prof. Guide Name 2</li>
            </ul>
          </motion.div>

          {/* Institution Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Institution</h3>
            <div className="text-white/70">
              <p className="mb-2">Department of Civil Engineering</p>
              <p className="mb-2">College Name</p>
              <p>University Name</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
