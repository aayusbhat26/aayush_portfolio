import { Fragment } from "react";

export default function Flow({
  stages,
  note,
}: {
  stages: { title: string; detail: string }[];
  note?: string;
}) {
  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {stages.map((stage, index) => (
          <Fragment key={stage.title}>
            <div className="flex-1 border border-[#111]/20 bg-[#ebebe5] p-4">
              <p className="font-mono text-[8px] tracking-[0.12em] text-[#c74634]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-[#111]/80">
                {stage.title}
              </p>
              <p className="mt-2 font-mono text-[9px] leading-5 text-[#111]/45">
                {stage.detail}
              </p>
            </div>
            {index < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className="grid shrink-0 place-items-center font-mono text-[12px] text-[#111]/30"
              >
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
      {note ? (
        <p className="mt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-[#111]/35">
          {note}
        </p>
      ) : null}
    </div>
  );
}
