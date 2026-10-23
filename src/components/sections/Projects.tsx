"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const project = {
  title: "TaskFlow",
  subtitle: "A chat-native work OS.",
  description:
    "Team decisions usually die in chat and get rebuilt in another tool. TaskFlow keeps the task, poll, or brief attached to the message that started it — then carries the same context into notes, focus sessions, and deliberate practice.",
  year: "2026",
  role: "Product design + full-stack",
  stack: "Next.js · Socket.IO · PostgreSQL",
  status: "Live on Render",
  source: "https://github.com/aayusbhat26/task_flow",
  demo: "https://taskflow-render.onrender.com/en",
};

const surfaces = [
  { src: "/work/taskflow/chat-slash.png", label: "Conversation" },
  { src: "/work/taskflow/dsa.png", label: "Practice" },
  { src: "/work/taskflow/notes.png", label: "Notes" },
];

const proof = [
  { value: "3", label: "services + proxy" },
  { value: "62", label: "Prisma models" },
  { value: "116", label: "DSA questions" },
  { value: "2", label: "OAuth providers" },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 w-full border-t border-white/[0.06] bg-[#080807] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#C09B86]">
              02 / Selected work
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
              One product. Built, deployed, documented.
            </p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/35 sm:text-right">
            Real product surfaces, the constraints behind them, and the
            trade-offs that remain.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className="text-[#F4F0E8]">{project.title}</span>
              <span className="h-px w-6 bg-white/20" />
              <span className="text-white/35">{project.year}</span>
            </div>

            <h2 className="mt-5 font-editorial text-[clamp(4.4rem,9vw,6.6rem)] leading-[0.82] tracking-[-0.035em] text-[#F4F0E8]">
              TaskFlow<span className="text-[#B4594F]">.</span>
            </h2>
            <p className="mt-5 font-editorial text-2xl italic leading-tight text-[#D8D2C6] md:text-[30px]">
              {project.subtitle}
            </p>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-white/50">
              {project.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-6">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Role
                </dt>
                <dd className="mt-1.5 text-sm text-white/75">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Stack
                </dt>
                <dd className="mt-1.5 text-sm text-white/75">{project.stack}</dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Status
                </dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-sm text-white/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  {project.status}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Source
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                  >
                    GitHub repository
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/work/taskflow"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#F4F0E8] px-5 py-3 text-sm font-semibold text-[#1B1915] transition-colors hover:bg-white"
              >
                Read the case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                title="Render free tier — the first load may take a moment"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                Live app
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <p className="mt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-white/25">
              Render free tier may sleep. First load can take a minute.
            </p>
          </div>

          <div>
            <figure>
              <div className="overflow-hidden border border-white/[0.14] bg-[#F2EEE5] p-1.5 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] md:p-2">
                <Image
                  src="/work/taskflow/dashboard.png"
                  width={2400}
                  height={1500}
                  alt="TaskFlow dashboard showing daily goal, DSA progress, recent activity, and milestones"
                  sizes="(min-width: 1024px) 660px, 100vw"
                  className="h-auto w-full"
                  priority
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-white/25">
                <span>Synthetic workspace · local build</span>
                <span>01 / Overview</span>
              </figcaption>
            </figure>

            <div className="mt-3 grid grid-cols-3 gap-2.5 md:gap-3">
              {surfaces.map((surface, index) => (
                <figure key={surface.src}>
                  <div className="overflow-hidden border border-white/10 bg-[#F2EEE5] p-1">
                    <Image
                      src={surface.src}
                      width={2400}
                      height={1500}
                      alt={`TaskFlow ${surface.label.toLowerCase()} surface`}
                      sizes="(min-width: 1024px) 220px, 33vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
                    <span>0{index + 2}</span>
                    <span className="text-white/15">/</span>
                    <span>{surface.label}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:mt-20 md:grid-cols-4">
          {proof.map((item) => (
            <div key={item.label} className="bg-[#080807] px-5 py-6 md:px-7 md:py-8">
              <div className="font-editorial text-4xl leading-none text-[#F4F0E8] md:text-5xl">
                {item.value}
              </div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="max-w-xl font-editorial text-2xl leading-snug text-[#D8D2C6] md:text-[28px]">
            The short version: a real product, one free-tier deploy, and the
            limits documented alongside the wins.
          </p>
          <Link
            href="/work/taskflow"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#C09B86] transition-colors hover:text-[#E2C4B2]"
          >
            Open the full case file
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
