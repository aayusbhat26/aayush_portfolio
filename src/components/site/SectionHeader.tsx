export default function SectionHeader({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="reveal flex flex-wrap items-end gap-x-5 gap-y-2 pb-4">
      <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#c74634]">
        {number}
      </span>
      <h2 className="display text-[clamp(2.45rem,5.5vw,4.8rem)]">{title}</h2>
      <span aria-hidden="true" className="mb-2 hidden h-px flex-1 bg-[#111]/30 sm:block" />
      {note ? (
        <p className="mb-2 max-w-xs font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-[#111]/40 sm:text-right">
          {note}
        </p>
      ) : null}
    </div>
  );
}
