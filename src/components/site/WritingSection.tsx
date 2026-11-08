import { WRITING } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function WritingSection() {
  return (
    <section id="writing" className="section-anchor">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          number="06"
          title="Writing"
          note="Published elsewhere, when there is something worth saying."
        />

        <div className="reveal mt-8 border-y border-[#111]/20">
          {WRITING.map((entry) => (
            <a
              key={entry.title}
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-4 py-6 md:grid-cols-[130px_1fr_auto] md:items-start md:gap-8 md:py-8"
            >
              <div className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-[#111]/35">
                {entry.source}
                <br />
                {entry.date}
              </div>
              <div>
                <h3 className="display max-w-4xl text-[clamp(1.8rem,3.7vw,3.2rem)] transition-colors group-hover:text-[#c74634]">
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#111]/55">
                  {entry.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="font-mono text-[13px] text-[#111]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c74634] md:mt-1"
              >
                ↗
              </span>
            </a>
          ))}
        </div>

        <p className="mt-5 max-w-xl text-[11px] leading-5 text-[#111]/35">
          {WRITING.length} pieces are listed because that is what is published.
          No ghost posts, no repurposed documentation.
        </p>
      </div>
    </section>
  );
}
