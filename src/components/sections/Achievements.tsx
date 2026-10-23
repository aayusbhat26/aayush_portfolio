import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const LEETCODE = "https://leetcode.com/u/Aayush_Kumar_Bhat_08/";

function FigureStat({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-editorial text-[34px] leading-none tracking-[-0.02em] md:text-[46px] ${
          accent ? "text-[#C09B86]" : "text-[#F4F0E8]"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
        {label}
      </div>
    </div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative z-10 w-full border-t border-white/[0.06] bg-[#080807] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#C09B86]">
            03 / The record
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
            External benchmarks
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-editorial text-[clamp(3.4rem,7vw,5.8rem)] leading-[0.86] tracking-[-0.035em] text-[#F4F0E8]">
              Measured
              <br />
              <em className="text-[#D8D2C6]">elsewhere.</em>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/45">
              A public rating, two Oracle certifications, and an All India Rank
              — each issued against an external standard.
            </p>
            <div className="mt-8 max-w-xs border-t border-white/10 pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                Competitive programming
              </p>
              <p className="mt-2 text-[13px] leading-6 text-white/45">
                LeetCode Knight · 30 rated contests · 11 badges.
              </p>
            </div>
            <p className="mt-8 max-w-xs font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-white/25">
              LeetCode profile captured 23 Oct 2026. Certification and exam
              records reproduced as issued.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
              <FigureStat value="2,103" label="Peak rating" accent />
              <FigureStat value="752" label="Problems solved" />
              <FigureStat value="1.56%" label="Global top" />
            </div>

            <a
              href={LEETCODE}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Aayush Kumar Bhat's public LeetCode profile"
              className="group mt-6 block"
            >
              <div className="overflow-hidden border border-white/15 bg-[#101010] p-1.5 transition-colors group-hover:border-white/30">
                <Image
                  src="/work/achievements/leetcode-profile.png"
                  width={1470}
                  height={900}
                  alt="Public LeetCode profile showing a 2,103 contest rating, Knight level, 752 problems solved, 11 badges, and a year of submission activity"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="mt-3 flex flex-col justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/30 sm:flex-row sm:items-center">
                <span>LeetCode · @Aayush_Kumar_Bhat_08 · public profile</span>
                <span className="inline-flex items-center gap-1.5 text-[#C09B86] transition-colors group-hover:text-[#E2C4B2]">
                  View profile
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-16 grid border-t border-white/15 md:grid-cols-2">
          <div className="py-8 md:pr-12 md:py-10">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em]">
              <span className="text-[#C09B86]">02</span>
              <span className="text-white/25">Cloud certification</span>
            </div>
            <h3 className="mt-4 font-editorial text-[38px] leading-none tracking-[-0.02em] text-[#F4F0E8] md:text-[46px]">
              OCI Certified
            </h3>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
              Oracle Cloud Infrastructure
            </p>

            <div className="mt-7 grid grid-cols-2 gap-6 border-t border-white/10 pt-5">
              <div>
                <div className="font-editorial text-[25px] leading-none text-[#F4F0E8] md:text-[28px]">
                  Professional
                </div>
                <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                  DevOps
                </div>
              </div>
              <div>
                <div className="font-editorial text-[25px] leading-none text-[#F4F0E8] md:text-[28px]">
                  Associate
                </div>
                <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                  Architecture
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-8 md:border-t-0 md:border-l md:border-white/10 md:py-10 md:pl-12">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em]">
              <span className="text-[#C09B86]">03</span>
              <span className="text-white/25">National entrance</span>
            </div>
            <h3 className="mt-4 font-editorial text-[38px] leading-none tracking-[-0.02em] text-[#F4F0E8] md:text-[46px]">
              NIMCET
            </h3>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
              NIT MCA Common Entrance Test · All India Rank
            </p>

            <div className="mt-7 flex flex-wrap items-end gap-x-9 gap-y-5 border-t border-white/10 pt-5">
              <FigureStat value="1,030" label="All India rank" accent />
              <FigureStat value="50k+" label="Candidates" />
              <FigureStat value="Top 2%" label="Percentile" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
