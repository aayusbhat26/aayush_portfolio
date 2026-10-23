"use client";

import { motion } from "framer-motion";

const clusters = [
  {
    id: "backend",
    name: "Backend",
    description: "APIs, services and realtime systems.",
    color: "#3b82f6",
    items: ["Python", "FastAPI", "Node.js", "Express"],
  },
  {
    id: "data",
    name: "Data",
    description: "Streaming pipelines and storage at scale.",
    color: "#a855f7",
    items: ["Kafka", "PySpark", "PostgreSQL", "Redis"],
  },
  {
    id: "infra",
    name: "Infrastructure",
    description: "Deployments that stay up under load.",
    color: "#10b981",
    items: ["AWS", "Docker", "Terraform", "Kubernetes"],
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Interfaces that feel considered.",
    color: "#f59e0b",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="relative w-full py-32 bg-transparent overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 pl-0 md:pl-12"
        >
          <h2 className="text-sm font-mono tracking-[0.2em] text-blue-500 mb-4 uppercase">
            Tech Constellations
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Tools are just tools.
            </span>
            <br className="hidden md:block" />
            <span className="text-white/40">Here is what I use to build.</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {clusters.map((cluster, index) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-9 transition-colors duration-300 hover:border-white/[0.16] hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between mb-7">
                <span className="font-mono text-[11px] tracking-[0.25em] text-white/30">
                  0{index + 1}
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: cluster.color }}
                />
              </div>

              <h4 className="text-2xl font-bold text-white tracking-tight mb-2">
                {cluster.name}
              </h4>
              <p className="text-sm text-white/40 mb-7">{cluster.description}</p>

              <div className="flex flex-wrap gap-2">
                {cluster.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/70 transition-colors duration-300 group-hover:border-white/15 group-hover:text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
