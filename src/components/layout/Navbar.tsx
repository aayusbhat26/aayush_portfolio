"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      if (latest > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
    setLastY(latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(l => l.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    pathname?.startsWith("/work") ? null : (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-6"
    >
      {/* 
        Changes:
        - Increased padding (px-8 py-4 -> px-8 py-4.5 or similar, maybe px-10 py-5)
        - Background: rgba(8,8,8,.55)
        - Blur: 22px
      */}
      <nav className="flex items-center gap-2 sm:gap-8 px-3 py-2 sm:px-10 sm:py-5 border rounded-full border-white/[0.08] bg-[#080808]/55 backdrop-blur-[22px] shadow-lg">
        <Link href="/" className="hidden sm:block text-sm font-semibold tracking-widest uppercase text-white hover:text-blue-400 transition-colors" data-cursor="hover">
          Aayush
        </Link>
        <div className="hidden sm:block w-[1px] h-4 bg-white/20" />
        <ul className="flex items-center gap-0.5 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-blue-500/20 border border-blue-500/50 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Link
                  href={link.href}
                  className={`relative z-10 block px-2.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                  data-cursor="hover"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
    )
  );
}
