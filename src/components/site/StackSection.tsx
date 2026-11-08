import { STACK } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function StackSection() {
  return (
    <section id="stack" className="section-anchor">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          number="04"
          title="Stack"
          note="Tools I reach for, not a logo wall."
        />

        <div className="reveal mt-8 grid gap-x-14 border-t border-[#111]/15 pt-2 md:grid-cols-2">
          {STACK.map((group, index) => (
            <div
              key={group.label}
              className={`grid grid-cols-[86px_1fr] gap-4 border-b border-[#111]/10 py-5 md:py-6 ${
                index === STACK.length - 1 && STACK.length % 2 === 1
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[8px] text-[#c74634]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/35">
                  {group.label}
                </span>
              </div>
              <p className="text-[13px] leading-6 text-[#111]/65">{group.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-2xl text-[11px] leading-5 text-[#111]/35">
          I care more about the shape of the system than the length of the list:
          where correctness lives, what happens under load, and what the
          interface does when the data is missing.
        </p>
      </div>
    </section>
  );
}
