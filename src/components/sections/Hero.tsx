"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Subtle Background Elements (Reveal after text) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0"
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-white/5 rounded-full blur-[100px]" />
        
        {/* Moving Particles */}
        <div className="absolute inset-0 z-0 opacity-20">
          <motion.div 
            className="absolute w-1 h-1 bg-white rounded-full" 
            animate={{ y: [0, -100, 0], x: [0, 50, 0], opacity: [0.2, 0.8, 0.2] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ top: "30%", left: "20%" }}
          />
          <motion.div 
            className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full" 
            animate={{ y: [0, 80, 0], x: [0, -40, 0], opacity: [0.1, 0.5, 0.1] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ top: "60%", right: "30%" }}
          />
        </div>
      </motion.div>

      <div className="z-10 w-full max-w-5xl px-6 flex flex-col justify-center">
        <div className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.15] pl-0 md:pl-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I spend more time
          </motion.div>
          <motion.div 
            className="text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            thinking about architecture
          </motion.div>
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            than frameworks.
            <motion.span 
              className="inline-block w-[0.1em] h-[1em] bg-blue-500 ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
