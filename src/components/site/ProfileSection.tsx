import { LINKS, PROFILE, PROFILE_PARAGRAPHS } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function ProfileSection() {
  return (
    <section id="profile" className="section-anchor">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          number="01"
          title="Profile"
          note="The layer behind the interface."
        />

        <div className="reveal mt-8 grid gap-10 border-t border-[#111]/15 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-2xl space-y-5 text-[15px] leading-8 text-[#111]/65">
            <p className="border-l-2 border-[#111] pl-5 text-[17px] leading-8 text-[#111]/85">
              {PROFILE_PARAGRAPHS[0]}
            </p>
            <p>{PROFILE_PARAGRAPHS[1]}</p>
            <p>{PROFILE_PARAGRAPHS[2]}</p>
          </div>

          <aside>
            <div className="border border-[#111]/20 bg-[#ebebe5] p-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c74634]">
                Currently
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase leading-5 tracking-[0.06em] text-[#111]/80">
                Associate Engineer @ Nagarro
              </p>
              <p className="mt-3 text-[12px] leading-6 text-[#111]/50">
                Production data systems: stream processing, OLAP services, and
                the interfaces that make them inspectable.
              </p>
              <div className="mt-5 grid gap-2 border-t border-[#111]/15 pt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-[#111]/45">
                <span>{PROFILE.location} · {PROFILE.timezone}</span>
                <span className="text-[#2f7d4f]">● {PROFILE.status}</span>
                <span>{PROFILE.notice}</span>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-6 text-[#111]/45">
              Also building: CASCADE, a Windows download manager with segmented
              transfers and browser integration.{" "}
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="border-b border-[#111]/25 pb-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#111]/55 transition-colors hover:border-[#111] hover:text-[#111]"
              >
                GitHub ↗
              </a>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
