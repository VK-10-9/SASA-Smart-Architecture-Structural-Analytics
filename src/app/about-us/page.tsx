"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Vishwanath M. Koliwad",
      role: "Lead Developer & UI/UX Designer",
      image: "/team/vishwanath.jpg",
      description: "Full-stack developer with expertise in Next.js and modern web technologies. Responsible for the core architecture and user interface design of SASSA.",
      skills: ["Next.js", "React", "TypeScript", "UI/UX Design"]
    },
    {
      name: "Nihal V. Batunge",
      role: "Backend Developer & Algorithm Specialist",
      image: "/team/nihal.jpg",
      description: "Specialized in structural engineering algorithms and backend development. Focuses on implementing complex calculations and ensuring system reliability.",
      skills: ["Python", "Node.js", "Structural Analysis", "Database Design"]
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-950 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            About Our Team
          </h1>
          <p className="text-lg text-white/70 mb-16 text-center max-w-3xl mx-auto">
            Meet the talented individuals behind SASSA. Our team combines expertise in software development
            and structural engineering to create innovative solutions for the construction industry.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative w-48 h-48 mx-auto md:mx-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-lg"></div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                      {member.name}
                    </h2>
                    <p className="text-white/70 mb-4">
                      {member.role}
                    </p>
                    <p className="text-white/60 mb-6">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-white/70 text-center max-w-3xl mx-auto">
              At SASSA, we're committed to revolutionizing structural engineering through innovative
              technology. Our goal is to make structural analysis more accessible, efficient, and
              accurate for engineers and architects worldwide.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 