import Link from "next/link";
import { LINKS, PROJECTS } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-anchor">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          number="03"
          title="Projects"
          note="Two products, built and deployed end to end."
        />

        <div className="mt-2 border-t border-[#111]/20">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="reveal border-b border-[#111]/20 py-10 md:py-14"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#c74634]">
                    03.{project.number}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#111]/40">
                    {project.year} / Case file {project.number}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 border border-[#111]/25 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2f7d4f]" />
                  Live
                </span>
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
                <div>
                  <h3 className="display text-[clamp(2.8rem,6.4vw,5.8rem)]">
                    {project.name}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#111]/50">
                    {project.tagline}
                  </p>
                  <p className="mt-6 max-w-md font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-[#111]/35">
                    {project.facts}
                  </p>
                </div>

                <div className="lg:pt-2">
                  <p className="max-w-xl text-[14px] leading-7 text-[#111]/65">
                    {project.description}
                  </p>

                  <dl className="mt-5 grid gap-3 border-t border-[#111]/15 pt-4 text-[12px] leading-5 sm:grid-cols-3">
                    <div>
                      <dt className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/35">
                        Role
                      </dt>
                      <dd className="mt-1 text-[#111]/65">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/35">
                        Stack
                      </dt>
                      <dd className="mt-1 text-[#111]/65">{project.stack}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/35">
                        Status
                      </dt>
                      <dd className="mt-1 text-[#111]/65">{project.status}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[9px] uppercase tracking-[0.12em]">
                    <Link
                      href={project.caseHref}
                      prefetch={false}
                      className="inline-flex items-center gap-2 bg-[#111] px-4 py-2.5 text-[#f4f4f0] transition-colors hover:bg-[#c74634]"
                    >
                      Read the case study <span aria-hidden="true">↗</span>
                    </Link>
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#111]/55 transition-colors hover:text-[#111]"
                    >
                      Live <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href={project.sourceHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#111]/55 transition-colors hover:text-[#111]"
                    >
                      Source <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a
          href={LINKS.github}
          target="_blank"
          rel="noreferrer"
          className="group mt-6 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#111]/45 transition-colors hover:text-[#111]"
        >
          More experiments on GitHub
          <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
