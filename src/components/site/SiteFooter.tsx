const STACK_MARQUEE = [
  "Python",
  "PySpark",
  "FastAPI",
  "DuckDB",
  "Delta Lake",
  "Kafka",
  "Databricks",
  "Azure",
  "Docker",
  "PostgreSQL",
  "Next.js",
  "TypeScript",
  "Parquet",
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#111] bg-[#111] text-[#f4f4f0]">
      <div className="overflow-hidden border-b border-[#f4f4f0]/15 py-3">
        <div className="marquee-track gap-0 font-mono text-[9px] uppercase tracking-[0.16em] text-[#f4f4f0]/55">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {STACK_MARQUEE.map((item) => (
                <span key={`${copy}-${item}`} className="inline-flex items-center">
                  <span className="px-4">{item}</span>
                  <span className="text-[#e08070]">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1240px] flex-col justify-between gap-3 px-5 py-5 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-[#f4f4f0]/45 md:flex-row md:items-center md:px-8">
        <p>© {new Date().getFullYear()} Aayush Bhat. All rights reserved.</p>
        <p>New Delhi · IST · Backend &amp; data</p>
        <a href="#home" className="text-[#f4f4f0]/65 transition-colors hover:text-[#e08070]">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
