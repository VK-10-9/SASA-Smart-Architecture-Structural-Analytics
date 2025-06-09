"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Calculator, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("getting-started"); // Default active section
  const [sectionFeedback, setSectionFeedback] = useState<{[key: string]: 'yes' | 'no' | null}>({});

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    {
      title: "Getting Started",
      icon: <BookOpen className="w-6 h-6" />,
      content: "Learn how to set up and start using SASSA for your structural analysis needs.",
      description: "Learn how to set up and start using SASSA for your structural analysis needs.",
      url: "/documentation#getting-started",
    },
    {
      title: "Force Calculator",
      icon: <Calculator className="w-6 h-6" />,
      content: "Detailed guide on using the force calculator tool for structural analysis.",
      description: "Detailed guide on using the force calculator tool for structural analysis.",
      url: "/documentation#force-calculator",
    },
    {
      title: "Design Scenarios",
      icon: <Settings className="w-6 h-6" />,
      content: "Explore different design scenarios and how to implement them in your projects.",
      description: "Explore different design scenarios and how to implement them in your projects.",
      url: "/documentation#design-scenarios",
    },
    {
      title: "API Reference",
      icon: <Code2 className="w-6 h-6" />,
      content: "Technical documentation for developers looking to integrate with SASSA.",
      description: "Technical documentation for developers looking to integrate with SASSA.",
      url: "/documentation#api-reference",
      hasCodeExample: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling down 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // Adjust this to control when sections become active
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [sections]); // Depend on sections to re-observe if they change (though they are static here)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-neutral-950 pt-20 py-16">
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

          <div className="mb-12">
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block">
              <nav className="sticky top-28 space-y-2 text-white/70">
                <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
                {sections.map((section) => (
                  <Link
                    key={section.title}
                    href={section.url}
                    className={cn(
                      "block hover:text-white transition-colors",
                      activeSection === section.url.split("#")[1] && "text-blue-500 font-semibold"
                    )}
                  >
                    {section.title}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div>
              <div className="grid md:grid-cols-1 gap-6">
                {sections
                  .filter(
                    (section) =>
                      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      section.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((section, index) => (
                    <Link key={section.title} href={section.url} className="block">
                      <motion.div
                        ref={(el) => (sectionRefs.current[index] = el)} // Assign ref to each section
                        id={section.url.split("#")[1]} // Add ID for direct linking
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-white/10 rounded-lg">
                            {section.icon}
                          </div>
                          <h2 className="text-2xl font-semibold text-white">
                            {section.title}
                          </h2>
                        </div>
                        <div className="text-white/70">
                          <p>{section.content}</p>
                          {section.hasCodeExample && (
                            <div className="mt-4">
                              <p className="mb-2">Example API call:</p>
                              <SyntaxHighlighter language="javascript" style={darcula} customStyle={{ borderRadius: '0.5rem', padding: '1rem', fontSize: '0.875rem' }}>
                                {`fetch('/api/solve-physics', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'force',
    parameters: {
      problem: "A 5kg object is pushed with a force of 20N. What is its acceleration?"
    }
  }),
});`}
                              </SyntaxHighlighter>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10">
                          {sectionFeedback[section.title] ? (
                            <p className="text-sm text-green-400">Thank you for your feedback!</p>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white/70">Was this helpful?</span>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSectionFeedback(prev => ({...prev, [section.title]: 'yes'}));
                                }}
                                className="px-3 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                              >
                                Yes
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSectionFeedback(prev => ({...prev, [section.title]: 'no'}));
                                }}
                                className="px-3 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                              >
                                No
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </Link>
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

              <div className="mt-8 bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Provide Feedback
                </h2>
                <p className="text-white/70 mb-4">
                  Help us improve our documentation by sharing your thoughts.
                </p>
                <textarea
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Your feedback..."
                ></textarea>
                <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </main>
  );
} 