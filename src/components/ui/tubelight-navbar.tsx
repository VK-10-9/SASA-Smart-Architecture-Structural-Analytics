"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 w-full flex justify-center z-50 pt-4 transition-all duration-300",
        isScrolled && "pt-2",
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center gap-2 sm:gap-4 md:gap-6 bg-black/30 backdrop-blur-xl border border-white/10 py-1.5 px-2 sm:px-3 rounded-full shadow-2xl transition-all duration-300",
        isScrolled && "sm:scale-95"
      )}>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.url

          return (
            <Link
              key={item.name}
              href={item.url}
              scroll={false}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-2.5 sm:px-4 md:px-5 py-2 rounded-full transition-all duration-300",
                "text-white/70 hover:text-white hover:bg-white/5",
                isActive && "text-white"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                      <motion.div
                        className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.7, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
} 