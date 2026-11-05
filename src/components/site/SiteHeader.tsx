"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { LINKS, NAV } from "@/lib/site";

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function SiteHeader() {
  const [now, setNow] = useState<Date | null>(null);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkHeader, setDarkHeader] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNow(new Date()));
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (section): section is HTMLElement => Boolean(section)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const darkSection = document.getElementById("hero-dark");
    let frame = 0;

    const update = () => {
      const rect = darkSection?.getBoundingClientRect();
      setDarkHeader(Boolean(rect && rect.top <= 64 && rect.bottom > 64));
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const initial = requestAnimationFrame(update);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(initial);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const time = now ? timeFormatter.format(now) : "--:--:--";

  const headerStyle = {
    "--header-ink": darkHeader ? "#f4f4f0" : "#111111",
    "--header-muted": darkHeader
      ? "rgba(244, 244, 240, 0.55)"
      : "rgba(17, 17, 17, 0.55)",
    "--header-line": darkHeader
      ? "rgba(244, 244, 240, 0.2)"
      : "rgba(17, 17, 17, 0.15)",
    "--header-bg": darkHeader
      ? "rgba(17, 17, 17, 0.92)"
      : "rgba(244, 244, 240, 0.92)",
    "--header-mark-bg": darkHeader ? "#f4f4f0" : "#111111",
    "--header-mark-ink": darkHeader ? "#111111" : "#f4f4f0",
  } as CSSProperties;

  return (
    <>
      <header
        style={headerStyle}
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--header-line)] bg-[var(--header-bg)] text-[var(--header-ink)] backdrop-blur-md transition-colors duration-500"
      >
        <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-5 md:px-8">
          <a href="#home" className="group flex min-w-0 items-center gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center bg-[var(--header-mark-bg)] font-mono text-[8px] tracking-[0.06em] text-[var(--header-mark-ink)] transition-colors duration-500">
              AB
            </span>
            <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
              Aayush Bhat
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--header-muted)] sm:inline">
              / backend &amp; data
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--header-muted)] md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2f7d4f]" />
              open to remote
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--header-muted)] sm:inline">
              {time} IST
            </span>
            <a
              href={LINKS.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden border border-[var(--header-line)] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--header-muted)] transition-colors hover:border-[var(--header-ink)] hover:text-[var(--header-ink)] sm:inline-flex"
            >
              Résumé ↗
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-index"
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--header-muted)] transition-colors hover:text-[var(--header-ink)] min-[1440px]:hidden"
            >
              Index
              <span aria-hidden="true" className="text-[13px] leading-none">
                +
              </span>
            </button>
          </div>
        </div>
        <span aria-hidden="true" className="scroll-progress" />
      </header>

      <nav
        aria-label="Section index"
        style={headerStyle}
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 min-[1440px]:flex"
      >
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="nav-rail-link group"
            data-active={active === item.id}
            aria-current={active === item.id ? "location" : undefined}
          >
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] opacity-70">
              {active === item.id ? `${item.number} / ${item.label}` : item.number}
            </span>
            <span className="nav-rail-dash" />
          </a>
        ))}
      </nav>

      {menuOpen ? (
        <div
          id="mobile-index"
          className="fixed inset-0 z-[70] overflow-y-auto bg-[#f4f4f0] px-5 py-5 min-[1440px]:hidden"
        >
          <div className="flex items-center justify-between border-b border-[#111]/20 pb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#111]/45">
              Index / 2026
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#111]/65"
            >
              Close ×
            </button>
          </div>

          <nav aria-label="Mobile sections" className="mt-4">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline justify-between gap-4 border-b border-[#111]/15 py-3.5"
              >
                <span className="font-mono text-[9px] tracking-[0.16em] text-[#c74634]">
                  {item.number}
                </span>
                <span className="display flex-1 text-[2.15rem] leading-none tracking-[-0.04em]">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] text-[#111]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#111]/20 pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-[#111]/50">
            <div>
              <p className="text-[#111]/30">Email</p>
              <a href={`mailto:${LINKS.email}`} className="mt-1 block break-words text-[8px] text-[#111]/75">
                {LINKS.email}
              </a>
            </div>
            <div>
              <p className="text-[#111]/30">Elsewhere</p>
              <div className="mt-1 flex flex-col gap-1">
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="text-[#111]/75">
                  LinkedIn ↗
                </a>
                <a href={LINKS.github} target="_blank" rel="noreferrer" className="text-[#111]/75">
                  GitHub ↗
                </a>
                <a href={LINKS.leetcode} target="_blank" rel="noreferrer" className="text-[#111]/75">
                  LeetCode ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
