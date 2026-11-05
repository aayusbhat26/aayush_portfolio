import Link from "next/link";

export default function CaseStudyHeader({
  caseNumber,
  projectName,
  liveHref,
  liveLabel,
  sourceHref,
}: {
  caseNumber: string;
  projectName: string;
  liveHref: string;
  liveLabel: string;
  sourceHref: string;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#111]/15 bg-[#f4f4f0]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-5 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/#projects"
            prefetch={false}
            className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#111]/55 transition-colors hover:text-[#111]"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            <span className="hidden sm:inline">Aayush Bhat / Work</span>
            <span className="sm:hidden">Work</span>
          </Link>
          <span className="hidden font-mono text-[8px] uppercase tracking-[0.14em] text-[#111]/25 md:inline">
            / {caseNumber} — {projectName}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4 font-mono text-[8px] uppercase tracking-[0.12em]">
          <a
            href={liveHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-[#111]/20 px-2.5 py-2 text-[#111]/65 transition-colors hover:border-[#111] hover:text-[#111]"
          >
            {liveLabel} <span aria-hidden="true">↗</span>
          </a>
          <a
            href={sourceHref}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-[#111]/45 transition-colors hover:text-[#111] sm:inline-flex"
          >
            Source <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
