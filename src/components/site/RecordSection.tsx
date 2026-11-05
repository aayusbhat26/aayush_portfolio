import leetcode from "@/data/leetcode.json";
import { RECORD } from "@/lib/site";
import SectionHeader from "./SectionHeader";
import SolvedMosaic from "./SolvedMosaic";

const synced = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(leetcode.syncedAt));

function RankRail({
  percentage,
  leftLabel,
  rightLabel,
}: {
  percentage: number;
  leftLabel: string;
  rightLabel: string;
}) {
  const marker = Math.min(Math.max(percentage, 0), 100);

  return (
    <div>
      <div className="relative mt-3 h-4">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#111]/20" />
        <span
          className="absolute top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-[#c74634]"
          style={{ left: `${marker}%` }}
        />
        <span
          className="absolute top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#c74634]"
          style={{ left: `${marker}%` }}
        />
      </div>
      <div className="flex justify-between font-mono text-[7px] uppercase tracking-[0.12em] text-[#111]/30">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

export default function RecordSection() {
  return (
    <section id="record" className="section-anchor">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          number="05"
          title="Record"
          note="Live from LeetCode. Captured automatically."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="border border-[#111]/20 bg-[#ebebe5] p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#111]/15 pb-4">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c74634]">
                  LeetCode / accepted solutions
                </p>
                <p className="display mt-2 text-[clamp(3.6rem,7vw,5.6rem)]">
                  {leetcode.solved}
                </p>
              </div>
              <div className="grid gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[#111]/45">
                <span>{leetcode.easy} easy</span>
                <span>{leetcode.medium} medium</span>
                <span className="text-[#c74634]">{leetcode.hard} hard</span>
              </div>
            </div>

            <div className="mt-5">
              <SolvedMosaic
                easy={leetcode.easy}
                medium={leetcode.medium}
                hard={leetcode.hard}
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-[#111]/15 pt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#111]/35">
              <span>1 square = 1 accepted solution</span>
              <span>
                {leetcode.activeDays} active days · {leetcode.currentStreak}-day streak
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#111]/40">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 bg-[#c9c9c1]" /> Easy {leetcode.easy}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 bg-[#6f6f69]" /> Medium {leetcode.medium}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 bg-[#c74634]" /> Hard {leetcode.hard}
              </span>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="reveal border border-[#111]/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c74634]">
                  Contest rating
                </p>
                <span className="border border-[#111]/20 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-[#111]/50">
                  {leetcode.badge ?? "Rated"}
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="display text-[clamp(3rem,5.5vw,4.6rem)]">
                  {leetcode.rating.toLocaleString("en-IN")}
                </p>
                <p className="pb-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-[#111]/35">
                  {leetcode.attendedContests} contests
                  <br />
                  {leetcode.submissionsLastYear} submissions / year
                </p>
              </div>

              <div className="mt-5">
                <div className="flex flex-wrap justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#111]/45">
                  <span>Top {leetcode.topPercentage}%</span>
                  <span>
                    Global rank {leetcode.globalRanking.toLocaleString("en-IN")} /{" "}
                    {leetcode.totalParticipants.toLocaleString("en-IN")}
                  </span>
                </div>
                <RankRail
                  percentage={leetcode.topPercentage}
                  leftLabel="Top 0%"
                  rightLabel="All participants"
                />
              </div>
            </div>

            <div className="reveal border border-[#111]/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c74634]">
                  NIMCET / national entrance
                </p>
                <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#111]/30">
                  {RECORD.nimcet.candidates} candidates
                </span>
              </div>

              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="display text-[clamp(2.6rem,4.8vw,4rem)]">
                  {RECORD.nimcet.rank}
                </p>
                <p className="pb-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-[#111]/35">
                  All India Rank
                  <br />
                  Top 2%
                </p>
              </div>

              <div className="mt-5">
                <RankRail percentage={2} leftLabel="Top 0%" rightLabel="All candidates" />
              </div>

              <p className="mt-3 text-[10px] leading-5 text-[#111]/40">
                One exam, one rank, and a useful reminder that preparation
                compounds.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-[#111]/35 sm:flex-row sm:items-center">
          <span>
            Snapshot · {synced} · synced daily
          </span>
          <a
            href={leetcode.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#111]/55 transition-colors hover:text-[#c74634]"
          >
            Verify the profile ↗
          </a>
        </div>
      </div>
    </section>
  );
}
