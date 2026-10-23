"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(!pathname?.startsWith("/work"));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname?.startsWith("/work")) return;
    // Simulate loading progress - slower and more visible
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        // Slower increment for better visibility
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 150); // Slower interval

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white"
          style={{ zIndex: 99999 }}
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-medium tracking-tight"
            >
              AAYUSH BHAT
            </motion.h1>
          </div>
          <div className="absolute bottom-10 right-10 overflow-hidden">
            <motion.p
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="text-2xl md:text-4xl font-light"
            >
              {progress > 100 ? 100 : progress}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
