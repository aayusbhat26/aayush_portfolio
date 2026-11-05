import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Off the map | Aayush Bhat",
  robots: { index: false, follow: false },
};

const places = [
  { label: "TaskFlow", href: "/work/taskflow" },
  { label: "Globe News Atlas", href: "/work/globe-news-atlas" },
  { label: "All work", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen bg-[#f4f4f0] px-5 py-6 text-[#111] md:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex h-10 items-center justify-between border-b border-[#111]/20 font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
          <Link href="/" className="transition-colors hover:text-[#111]">
            Aayush Bhat / Portfolio
          </Link>
          <span>404 / Not found</span>
        </div>

        <div className="py-20 md:py-28">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#c74634]">
            Request returned no document
          </p>
          <h1 className="display mt-6 text-[clamp(4.5rem,14vw,10rem)]">
            Off the
            <br />
            map<span className="text-[#c74634]">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[14px] leading-7 text-[#111]/55">
            The URL you followed does not point to a page in this portfolio. No
            fallback content, no guessed location — the honest state is a
            missing page.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 font-mono text-[9px] uppercase tracking-[0.12em]">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex items-center gap-2 bg-[#111] px-4 py-3 text-[#f4f4f0] transition-colors hover:bg-[#c74634]"
            >
              Back to the portfolio <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/#projects"
              prefetch={false}
              className="inline-flex items-center gap-2 border border-[#111]/20 px-4 py-3 text-[#111]/60 transition-colors hover:border-[#111] hover:text-[#111]"
            >
              Selected work <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="mt-16 grid gap-px border border-[#111]/20 bg-[#111]/15 sm:grid-cols-2 lg:grid-cols-4">
            {places.map((place) => (
              <Link
                key={place.href}
                href={place.href}
                prefetch={false}
                className="group flex items-center justify-between gap-4 bg-[#f4f4f0] px-4 py-4 transition-colors hover:bg-[#ebebe5]"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/55 transition-colors group-hover:text-[#111]">
                  {place.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] text-[#c74634] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
