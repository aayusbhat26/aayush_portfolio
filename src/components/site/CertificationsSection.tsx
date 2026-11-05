import { CERTIFICATIONS } from "@/lib/site";
import SectionHeader from "./SectionHeader";

const ISSUER_COUNT = new Set(CERTIFICATIONS.map((item) => item.issuer)).size;

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-anchor">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
        <SectionHeader
          number="07"
          title="Certifications"
          note="Completed credentials only."
        />

        <div className="reveal mt-8 grid gap-px border border-[#111]/20 bg-[#111]/15 md:grid-cols-2">
          {CERTIFICATIONS.map((certification, index) => {
            const wide =
              CERTIFICATIONS.length % 2 === 1 &&
              index === CERTIFICATIONS.length - 1;

            return (
              <article
                key={certification.credential}
                className={`flex flex-col bg-[#f4f4f0] p-5 md:p-7 ${
                  wide
                    ? "md:col-span-2 md:flex-row md:items-end md:justify-between md:gap-12"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c74634]">
                      {certification.issuer === "Oracle"
                        ? "Oracle University"
                        : certification.issuer}
                    </p>
                    <h3 className="display mt-4 text-[clamp(1.45rem,2.6vw,2.2rem)]">
                      {certification.credential}
                    </h3>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#111]/50">
                      {certification.name}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 border border-[#111]/20 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-[#2f7d4f]">
                    ✓ Completed
                  </span>
                </div>
                <div
                  className={`mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[#111]/15 pt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#111]/35 ${
                    wide
                      ? "md:mt-0 md:w-[300px] md:shrink-0 md:flex-col md:items-end md:gap-2 md:border-t-0 md:pt-0"
                      : ""
                  }`}
                >
                  <span>{certification.meta ?? "Completed"}</span>
                  {certification.href ? (
                    <a
                      href={certification.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#111]/55 transition-colors hover:text-[#c74634]"
                    >
                      {certification.linkLabel ?? "Verify"} ↗
                    </a>
                  ) : (
                    <span>Verification on request</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col justify-between gap-2 text-[11px] leading-5 text-[#111]/40 md:flex-row md:items-baseline">
          <p>
            Only completed certifications are listed. Nothing in progress is
            presented as earned.
          </p>
          <p className="font-mono text-[8px] uppercase tracking-[0.1em]">
            {CERTIFICATIONS.length} credentials · {ISSUER_COUNT} issuers
          </p>
        </div>
      </div>
    </section>
  );
}
