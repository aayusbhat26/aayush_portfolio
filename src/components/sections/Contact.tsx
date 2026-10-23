"use client";

import { motion } from "framer-motion";
import { Mail, Briefcase, Code2, FileText, Code, Terminal } from "lucide-react";

const links = [
  { name: "Email", href: "mailto:work.aayush.bhat@gmail.com", icon: <Mail className="w-5 h-5" /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aayush-kumar-bhat-/", icon: <Briefcase className="w-5 h-5" /> },
  { name: "GitHub", href: "https://github.com/aayusbhat26/", icon: <Code2 className="w-5 h-5" /> },
  { name: "LeetCode", href: "https://leetcode.com/u/Aayush_Kumar_Bhat_08/", icon: <Code className="w-5 h-5" /> },
  { name: "GFG", href: "https://www.geeksforgeeks.org/profile/naayushxc4?tab=activity", icon: <Terminal className="w-5 h-5" /> },
  { name: "Resume", href: "https://drive.google.com/file/d/1aX8G92EQv9XeJ4eGwYgukhBDGFD8EAZs/view?usp=sharing", icon: <FileText className="w-5 h-5" /> },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black" />

      <div className="z-10 flex flex-col items-center text-center px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6 mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tighter text-white/60">
            From distributed systems
          </h2>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tighter text-white/60">
            to delightful products.
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white mt-8 text-center leading-[1.1]">
            Let&apos;s build something remarkable.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name === "Email" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300"
              data-cursor="hover"
            >
              {link.icon}
              <span className="text-sm font-semibold tracking-wider uppercase">{link.name}</span>
            </a>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-10 text-white/30 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} Aayush Bhat. All rights reserved.
      </div>
    </section>
  );
}
