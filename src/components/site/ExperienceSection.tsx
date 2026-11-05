import { EXPERIENCE } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-anchor">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          number="02"
          title="Experience"
          note="Production data systems, owned end to end."
        />

        <div className="mt-10 border-l border-[#111]/20 pl-6 md:pl-10">
          <article className="reveal relative pb-12">
            <span className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full border border-[#111] bg-[#f4f4f0] md:-left-[45px]" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="bg-[#111] px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] text-[#f4f4f0]">
                2026
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#111]/40">
                {EXPERIENCE.currentPeriod} · {EXPERIENCE.location}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-[#2f7d4f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2f7d4f]" />
                Now
              </span>
            </div>

            <h3 className="display mt-4 text-[clamp(1.9rem,3.6vw,3.3rem)]">
              Associate Engineer — Nagarro
            </h3>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#111]/60">
              Building and owning production data systems: a Next.js and FastAPI
              application on DuckDB, PySpark stream processing, and a Delta Lake
              medallion architecture.
            </p>

            <ul className="mt-6 grid gap-3 border-t border-[#111]/15 pt-5 md:grid-cols-2 md:gap-x-10">
              {EXPERIENCE.bullets.map((bullet, index) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-[13px] leading-6 text-[#111]/65"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-[9px] text-[#c74634]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-[#111]/10 pt-3 text-[10px] leading-5 text-[#111]/40">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/30">
                Trainee foundation ·{" "}
              </span>
              {EXPERIENCE.training}
            </p>
          </article>

          <article className="reveal relative border-t border-[#111]/15 pb-10 pt-8">
            <span className="absolute -left-[27px] top-10 h-2.5 w-2.5 rounded-full border border-[#111]/50 bg-[#f4f4f0] md:-left-[45px]" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="border border-[#111]/30 px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] text-[#111]/55">
                2026
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#111]/40">
                {EXPERIENCE.previousPeriod} · {EXPERIENCE.location}
              </span>
            </div>
            <h3 className="display mt-4 text-[clamp(1.5rem,2.7vw,2.4rem)] text-[#111]/55">
              Associate Software Engineer Trainee — Nagarro
            </h3>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-[#111]/50">
              Started with the fundamentals: cloud, distributed data processing,
              and the engineering habits that carried into the production role.
            </p>
          </article>
        </div>

        <div className="mt-12 border-t border-[#111]/15 pt-6">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c74634]">
            Education
          </p>
          <div className="mt-3">
            {EXPERIENCE.education.map((item) => (
              <div
                key={item.school}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[#111]/10 py-3 text-[12px] leading-5"
              >
                <p className="text-[#111]/70">
                  <strong className="font-medium text-[#111]">{item.degree}</strong> ·{" "}
                  {item.school}
                </p>
                <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#111]/40">
                  {item.period} · {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
