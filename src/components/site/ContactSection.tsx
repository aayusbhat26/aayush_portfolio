import { LINKS, PROFILE } from "@/lib/site";
import CopyEmail from "./CopyEmail";

const contactLinks = [
  { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}`, external: false },
  { label: "LinkedIn", value: "/in/aayush-kumar-bhat-", href: LINKS.linkedin, external: true },
  { label: "GitHub", value: "/aayusbhat26", href: LINKS.github, external: true },
  { label: "LeetCode", value: "/Aayush_Kumar_Bhat_08", href: LINKS.leetcode, external: true },
  { label: "Résumé", value: "One-page PDF", href: LINKS.resume, external: true },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-anchor border-t border-[#111]/15">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
          <span className="text-[#c74634]">08 — Contact</span>
          <span>Open to remote-first roles</span>
        </div>

        <h2 className="display mt-8 text-[clamp(4rem,12vw,9.5rem)]">
          Let&apos;s talk<span className="text-[#c74634]">.</span>
        </h2>

        <div className="reveal mt-10 grid gap-10 border-t border-[#111]/20 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="max-w-xl text-[15px] leading-7 text-[#111]/65">
              I&apos;m interested in backend, data, and product engineering roles
              where production ownership is expected. Based in New Delhi, open
              to remote-first work in India and global roles with sponsorship.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <CopyEmail email={PROFILE.email} />
              <a
                href={`mailto:${LINKS.email}?subject=Backend%20or%20data%20role%20—%20Aayush%20Bhat`}
                className="border-b border-[#111]/25 pb-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#111]/55 transition-colors hover:border-[#111] hover:text-[#111]"
              >
                Start an email ↗
              </a>
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#111]/15 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em]">
              <div>
                <dt className="text-[#111]/30">Location</dt>
                <dd className="mt-1 text-[#111]/60">{PROFILE.location}</dd>
              </div>
              <div>
                <dt className="text-[#111]/30">Timezone</dt>
                <dd className="mt-1 text-[#111]/60">{PROFILE.timezone}</dd>
              </div>
              <div>
                <dt className="text-[#111]/30">Availability</dt>
                <dd className="mt-1 text-[#111]/60">{PROFILE.notice}</dd>
              </div>
              <div>
                <dt className="text-[#111]/30">Status</dt>
                <dd className="mt-1 text-[#2f7d4f]">● {PROFILE.status}</dd>
              </div>
            </dl>
          </div>

          <div>
            <ul className="border-t border-[#111]/20">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-5 border-b border-[#111]/15 py-3.5"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/35">
                      {link.label}
                    </span>
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="truncate font-mono text-[10px] text-[#111]/55 transition-colors group-hover:text-[#111]">
                        {link.value}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-[11px] text-[#111]/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c74634]"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-xs text-[10px] leading-5 text-[#111]/35">
              No form, no lead capture. A direct email is the shortest path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
