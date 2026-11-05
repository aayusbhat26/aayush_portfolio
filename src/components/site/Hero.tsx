import { HERO_TAGS, HERO_TERMINAL, LINKS, PROFILE } from "@/lib/site";

function Terminal() {
  return (
    <div className="overflow-hidden border border-[#f4f4f0]/20 bg-[#171715]">
      <div className="flex items-center justify-between border-b border-[#f4f4f0]/15 px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#f4f4f0]/40">
        <span>Terminal</span>
        <span>~/portfolio</span>
      </div>
      <div className="space-y-3 px-4 py-5 font-mono text-[11px] leading-5">
        {HERO_TERMINAL.map((line) => (
          <div key={line.command}>
            <p>
              <span className="text-[#e08070]">$</span>{" "}
              <span className="text-[#f4f4f0]">{line.command}</span>
            </p>
            <p className="text-[#f4f4f0]/45">{line.output}</p>
          </div>
        ))}
        <p className="pt-1">
          <span className="text-[#e08070]">$</span>{" "}
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-[#f4f4f0]/70 align-middle" />
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div id="home" className="relative">
      <section className="sticky top-0 z-0 flex min-h-[100svh] flex-col overflow-hidden bg-[#f4f4f0]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-5 pb-6 pt-24 md:px-8 md:pb-8 md:pt-28">
          <div className="hero-grid pointer-events-none absolute inset-0" />
          <span className="code-ghost absolute right-0 top-24 hidden lg:block">
            spark.read.parquet(&quot;events/*&quot;)
          </span>
          <span className="code-ghost absolute bottom-28 left-0 hidden lg:block">
            SELECT * FROM work WHERE shipped = true;
          </span>

          <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#111]/15 pb-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
            <span>Portfolio / 2026</span>
            <span className="text-[#c74634]">00 — Introduction</span>
          </div>

          <div className="hero-light-inner relative z-10 flex flex-1 flex-col justify-start pt-10 md:pt-14">
            <h1 className="sr-only">Aayush Bhat — backend and data engineer</h1>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c74634]">
              Backend &amp; data engineer
            </p>
            <div
              aria-hidden="true"
              className="display mt-4 text-[clamp(5.2rem,20vw,15rem)]"
            >
              Aayush
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#111]/35 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#111]/70"
                >
                  {tag}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 border border-[#111]/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#111]/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2f7d4f]" />
                {PROFILE.status}
              </span>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-start md:gap-12">
              <div>
                <p className="max-w-xl text-[14px] leading-7 text-[#111]/60">
                  I work at Nagarro on PySpark streaming, DuckDB and FastAPI
                  services, and Delta Lake pipelines. Outside work I ship
                  products end to end — from schema to the interface that makes
                  the data inspectable.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em]">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 bg-[#111] px-4 py-3 text-[#f4f4f0] transition-colors hover:bg-[#c74634]"
                  >
                    Selected work <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href={LINKS.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-[#111]/25 pb-0.5 text-[#111]/60 transition-colors hover:border-[#111] hover:text-[#111]"
                  >
                    Résumé ↗
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <Terminal />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-4 border-t border-[#111]/15 pt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-[#111]/40">
            <span>
              {PROFILE.location} · {PROFILE.timezone}
            </span>
            <a
              href="#hero-dark"
              className="group inline-flex items-center gap-3 text-[#111]/55 transition-colors hover:text-[#111]"
            >
              <span>Scroll to enter</span>
              <span aria-hidden="true" className="scroll-cue h-6 w-px bg-[#111]/30" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="hero-dark"
        className="relative z-10 overflow-hidden bg-[#111] text-[#f4f4f0]"
      >
        <div className="hero-grid-dark pointer-events-none absolute inset-0" />
        <span className="code-ghost-dark absolute bottom-40 right-0 hidden lg:block">
          EXPLAIN ANALYZE SELECT * FROM events;
        </span>

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col px-5 pb-0 pt-24 md:px-8 md:pt-28">
          <div className="flex items-center justify-between gap-4 border-b border-[#f4f4f0]/15 pb-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#f4f4f0]/40">
            <span>00 / Continuation</span>
            <span>Open to remote-first roles</span>
          </div>

          <div className="flex flex-1 flex-col justify-center py-10 md:py-14">
            <div
              aria-hidden="true"
              className="reveal display text-[clamp(5.2rem,20vw,15rem)] text-[#f4f4f0]/15"
            >
              Bhat
            </div>

            <div className="mt-4 grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-end md:gap-14">
              <div className="reveal">
                <p className="font-mono text-[11px] uppercase leading-6 tracking-[0.08em] text-[#f4f4f0]/75">
                  I work at Nagarro on PySpark streaming, DuckDB and FastAPI
                  services, and Delta Lake pipelines. Outside work I ship
                  products end to end.
                </p>
                <p className="mt-4 max-w-xl text-[14px] leading-7 text-[#f4f4f0]/45">
                  From schema to the interface that makes the data inspectable.
                  The work is documented in two case files, not hidden behind a
                  hero animation.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em]">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 bg-[#f4f4f0] px-4 py-3 text-[#111] transition-colors hover:bg-[#c74634] hover:text-[#f4f4f0]"
                  >
                    Selected work <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href={LINKS.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-[#f4f4f0]/25 pb-0.5 text-[#f4f4f0]/60 transition-colors hover:border-[#f4f4f0] hover:text-[#f4f4f0]"
                  >
                    Résumé ↗
                  </a>
                  <a
                    href={`mailto:${LINKS.email}`}
                    className="border-b border-[#f4f4f0]/25 pb-0.5 text-[#f4f4f0]/60 transition-colors hover:border-[#f4f4f0] hover:text-[#f4f4f0]"
                  >
                    Email ↗
                  </a>
                </div>
              </div>

              <div className="reveal md:pb-1">
                <div className="border border-[#f4f4f0]/20 bg-[#171715] p-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#f4f4f0]/35">
                    What I optimize for
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      ["01", "Correctness before throughput."],
                      ["02", "Interfaces that state their limits."],
                      ["03", "Ownership from deploy to incident."],
                    ].map(([number, item]) => (
                      <li
                        key={number}
                        className="flex gap-3 border-t border-[#f4f4f0]/10 pt-3 font-mono text-[9px] uppercase leading-5 tracking-[0.08em] text-[#f4f4f0]/60 first:border-t-0 first:pt-0"
                      >
                        <span className="text-[#e08070]">{number}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2 border-t border-[#f4f4f0]/15 py-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-[#f4f4f0]/40 sm:grid-cols-3">
            <span>
              {PROFILE.location} · {PROFILE.timezone}
            </span>
            <span>{PROFILE.notice}</span>
            <span className="text-[#7bc59b]">● {PROFILE.status}</span>
          </div>
        </div>

        <div className="relative z-10 overflow-hidden border-t border-[#f4f4f0]/15 py-2.5">
          <div className="marquee-track font-mono text-[8px] uppercase tracking-[0.18em] text-[#f4f4f0]/35">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {["Backend", "Data", "PySpark", "FastAPI", "DuckDB", "Proof"].map((item) => (
                  <span key={`${copy}-${item}`} className="inline-flex items-center">
                    <span className="px-4">{item}</span>
                    <span className="text-[#e08070]">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
