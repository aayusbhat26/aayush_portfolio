import type { ReactNode } from "react";

export default function CaseSectionHeader({
  number,
  label,
  title,
  intro,
}: {
  number: string;
  label: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="reveal grid gap-5 border-t border-[#111]/20 pt-6 md:grid-cols-[160px_1fr] md:gap-10">
      <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-[#c74634]">
        {number} / {label}
      </p>
      <div>
        <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)]">{title}</h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#111]/60">{intro}</p>
        ) : null}
      </div>
    </div>
  );
}
