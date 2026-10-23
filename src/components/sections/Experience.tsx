import { ArrowUpRight } from "lucide-react";

const RESUME =
  "https://drive.google.com/file/d/1aX8G92EQv9XeJ4eGwYgukhBDGFD8EAZs/view?usp=sharing";

const role = {
  company: "Nagarro",
  title: "Associate Software Engineer",
  period: ["Jan 2026", "Present"],
  location: "Gurugram, India",
  stack: ["Python", "FastAPI", "Kafka", "Docker", "Azure"],
  highlights: [
    "Built incremental, watermark-based ETL pipelines processing high-volume stream telemetry.",
    "Designed production-grade Medallion architecture with Z-Ordering on Delta Lake.",
    "Engineered an SLA-driven framework handling millions of events/day with real-time fault alerts.",
  ],
};

const education = [
  {
    school: "USICT",
    degree: "Master of Computer Applications",
    period: ["2024", "2026"],
    detail: "CGPA 8.99",
    note: "Specialized in Software Engineering and scalable system design.",
  },
  {
    school: "Integrated Institute of Technology, Dwarka",
    degree: "Bachelor of Computer Applications",
    period: ["2020", "2023"],
    detail: "CGPA 9.01",
    note: "Graduated with distinction. Built strong foundations in core computer science.",
  },
];

function DateRail({ period }: { period: string[] }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30 md:block md:pt-1.5">
      <span>{period[0]}</span>
      <span className="text-white/15 md:hidden">—</span>
      <span className="md:mt-1 md:block">{period[1]}</span>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 w-full border-t border-white/[0.06] bg-[#080807] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#C09B86]">
            01 / Experience
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
            2020 — Present
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-editorial text-[clamp(3.4rem,7vw,5.8rem)] leading-[0.86] tracking-[-0.035em] text-[#F4F0E8]">
              The systems
              <br />
              <em className="text-[#D8D2C6]">underneath.</em>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/45">
              I work on the layer that has to stay correct: pipelines, schemas,
              and the services product teams depend on.
            </p>
            <a
              href={RESUME}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#C09B86] transition-colors hover:text-[#E2C4B2]"
            >
              Résumé
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div>
            <article className="grid gap-5 md:grid-cols-[112px_1fr] md:gap-8">
              <DateRail period={role.period} />

              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-editorial text-[42px] leading-none tracking-[-0.025em] text-[#F4F0E8] md:text-[52px]">
                    {role.company}
                  </h3>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#C09B86]">
                    Current
                  </span>
                </div>
                <p className="mt-3 text-[17px] text-white/75">{role.title}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                  {role.location}
                </p>

                <ul className="mt-7 space-y-4 border-t border-white/10 pt-6">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-[14px] leading-6 text-white/55"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#C09B86]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">
                  {role.stack.map((item, index) => (
                    <span key={item} className="flex items-center gap-3">
                      {index > 0 && <span className="text-white/15">/</span>}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <div className="mt-16">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Education
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/20">
                  Delhi, India
                </p>
              </div>

              <div>
                {education.map((entry) => (
                  <article
                    key={entry.school}
                    className="grid gap-4 border-b border-white/10 py-6 md:grid-cols-[112px_1fr] md:gap-8"
                  >
                    <DateRail period={entry.period} />
                    <div>
                      <h4 className="font-editorial text-[26px] leading-tight tracking-[-0.015em] text-[#F4F0E8]">
                        {entry.school}
                      </h4>
                      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="text-[13px] text-white/50">{entry.degree}</p>
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/35">
                          {entry.detail}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] leading-5 text-white/30">
                        {entry.note}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
