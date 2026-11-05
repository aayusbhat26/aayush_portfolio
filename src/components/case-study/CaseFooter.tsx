import Link from "next/link";

export default function CaseFooter({
  nextLabel,
  nextHref,
}: {
  nextLabel: string;
  nextHref: string;
}) {
  return (
    <footer className="border-t border-[#111]/20">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c74634]">
          Next case file
        </p>
        <Link
          href={nextHref}
          prefetch={false}
          className="group mt-4 flex items-end justify-between gap-6 border-b border-[#111]/20 pb-5"
        >
          <span className="display text-[clamp(2.8rem,7vw,6rem)] transition-colors group-hover:text-[#c74634]">
            {nextLabel}
          </span>
          <span
            aria-hidden="true"
            className="mb-2 font-mono text-[20px] text-[#111]/30 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c74634]"
          >
            ↗
          </span>
        </Link>
        <div className="mt-5 flex flex-col justify-between gap-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-[#111]/40 sm:flex-row">
          <Link
            href="/#projects"
            prefetch={false}
            className="transition-colors hover:text-[#111]"
          >
            ← All work
          </Link>
          <Link href="/" prefetch={false} className="transition-colors hover:text-[#111]">
            Aayush Bhat / Portfolio
          </Link>
        </div>
      </div>
      <div className="border-t border-[#111] bg-[#111]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col justify-between gap-2 px-5 py-4 font-mono text-[8px] uppercase tracking-[0.12em] text-[#f4f4f0]/45 md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} Aayush Bhat</p>
          <p>New Delhi · IST · Backend &amp; data</p>
        </div>
      </div>
    </footer>
  );
}
