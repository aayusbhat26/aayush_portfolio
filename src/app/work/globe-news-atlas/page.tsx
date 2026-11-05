import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import CaseSectionHeader from "@/components/case-study/CaseSectionHeader";
import CaseFigure from "@/components/case-study/CaseFigure";
import Flow from "@/components/case-study/Flow";
import CaseFooter from "@/components/case-study/CaseFooter";
import JsonLd from "@/components/seo/JsonLd";
import { articleSchema, socialMetadata } from "@/lib/seo";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Globe News Atlas — Case study | Aayush Bhat",
  description:
    "How live public feeds become a 3D atlas with country desks, coverage flags, and citation-ready dossiers — including the limits the interface is required to state.",
  ...socialMetadata({
    title: "Globe News Atlas — World events, coverage, provenance",
    description:
      "A case study on a Parquet lake, a 3D globe, country desks, and an interface that reports its own display cap.",
    image: "/og/globe-news-atlas.png",
    alt: "Globe News Atlas case study — world events, coverage, and provenance.",
    path: "/work/globe-news-atlas",
    type: "article",
  }),
};

const meta = [
  ["Role", "Product design + full-stack"],
  ["Scope", "UI, ingestion, pipeline, API, deploy"],
  ["Stack", "React 19, Vite, globe.gl / Three.js, FastAPI, Parquet"],
  ["Status", "Live on Render Free"],
];

const constraints = [
  {
    number: "01",
    title: "No synthetic rows",
    body: "Every event in the public snapshot came from a live feed. There is no sample-data mode, and no random fallback coordinates.",
  },
  {
    number: "02",
    title: "Free-tier arithmetic",
    body: "Optional APIs are budgeted before they are called: 8 LLM summaries per run, 10 NewsAPI requests per day, 120 crawl URLs per run. An exhausted quota degrades the product; it does not crash ingestion.",
  },
  {
    number: "03",
    title: "Coverage is not consensus",
    body: "Outlet counts and left / centre / right columns show who is reporting. Single-source and coverage-gap flags stay visible. The atlas does not average disagreement into a false middle.",
  },
];

const pipelineNotes = [
  {
    number: "01",
    title: "Ingest",
    metric: "10 feeds",
    body: "GDELT 2.0, RSS, Reddit, Bluesky, USGS, and ReliefWeb; NewsAPI and ACLED optional. One failing source never stops a run.",
  },
  {
    number: "02",
    title: "Crawl",
    metric: "120 / 180s",
    body: "An allowlisted crawler honours robots.txt and per-host pacing, skips paywalled publishers, and stops at 120 URLs or 180 seconds.",
  },
  {
    number: "03",
    title: "Model",
    metric: "cosine + gate",
    body: "TF-IDF/LSA embeddings feed agglomerative clustering with a title-token gate, then scoring and an extractive fallback.",
  },
  {
    number: "04",
    title: "Serve",
    metric: "atomic + SSE",
    body: "FastAPI reads JSON and SQLite FTS with an mtime cache. Writes are atomic; SSE tells connected browsers to refetch.",
  },
];

const decisions = [
  {
    number: "01",
    title: "Parquet is the audit trail",
    body: "Bronze payloads, silver records, and gold events stay as immutable, date-partitioned Parquet parts. Any snapshot can be traced back to the files that produced it.",
    tradeoff:
      "Freshness is a pipeline property, so every surface reports its snapshot time instead of implying live.",
  },
  {
    number: "02",
    title: "Cluster before summarizing",
    body: "TF-IDF/LSA embeddings and a title-token coherence gate build an event before a summary exists. With no LLM key, the pipeline extracts publisher sentences and never invents text.",
    tradeoff: "A strict gate can split a developing story a person would merge.",
  },
  {
    number: "03",
    title: "Accounts never touch the lake",
    body: "Reader accounts live in SQLite locally and TiDB in production, with signed sessions and first-party cookies. The serving store is read-only and mtime-cached; writes are atomic.",
    tradeoff: "A second stateful system to operate, kept deliberately separate from the evidence path.",
  },
];

const evidence = [
  ["Outlets", "A count, not a logo wall. Every source is listed and linked."],
  ["Spectrum", "Left, centre, right, and unrated counts for the active event."],
  ["Single source", "Flagged when one outlet carries the story."],
  ["Coverage gap", "Flagged when an event leans on one side of the rated press."],
  ["Summary origin", "LLM-generated or extractive, labelled in the dossier."],
  ["Location precision", "City, admin, country, or region. Unresolved stays off the map."],
  ["Citations", "APA and BibTeX, plus a canonical dossier URL."],
  ["Share", "Per-event metadata and a frameable embed card."],
];

const statedLimits = [
  "Display cap: 400 events per window. The dock reports the true total — 621 in the country-desk capture in this case file.",
  "Country desks show the top 10 per section and label the section count.",
  "Rewind is sampled: at most 120 frames over 30 days, 50 events and 18 arcs per frame.",
  "Summaries are labelled LLM-generated or extractive; absent evidence is never filled in.",
  "Stories with unresolved locations are omitted rather than assigned a fallback point.",
  "Headlines and excerpts belong to publishers; the app links out and never serves article bodies.",
];

const environmentLimits = [
  "Render Free sleeps; the first request can take up to a minute.",
  "Source freshness varies: GDELT is rate-limited upstream, and NewsAPI's free tier is delayed 24 hours and capped at 10 requests per day.",
  "Optional feeds only appear when credentials exist; no source is simulated in their absence.",
  "LLM summaries stop at 8 per run, then fall back to deterministic extraction.",
  "The crawler stops at 120 URLs or 180 seconds per run.",
  "One web replica with an in-process rate limiter; scaling out needs shared state.",
  "Search index and crawl text are private; the public surface exposes summaries and source links.",
];

const shipped = [
  "3D globe and accessible list with four windows, category filters, spectrum filtering, and search.",
  "Country desks, event dossiers, citations, canonical links, and embed cards.",
  "Watchline, Storylines, Thin File, and Rewind editions.",
  "Reader accounts with email/password, TOTP, Google OIDC, and session review.",
  "Bronze → silver → gold Parquet pipeline, Hugging Face mirror, FastAPI serving layer, Docker/Render deployment.",
];

const nextSteps = [
  "Geocoding confidence: a city-level mismatch is still possible; the next step is a visible precision score on every marker.",
  "Clustering evaluation: a labelled sample to measure merge and split quality instead of trusting the coherence gate alone.",
  "Search ranking: click-through telemetry and an offline evaluation set for the FTS index.",
  "Scheduling: move ingestion to a queue with idempotent run IDs when one replica stops being enough.",
];

export default function GlobeNewsAtlasCaseStudy() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: "Globe News Atlas — World events, coverage, provenance",
          description:
            "How live public feeds become a 3D atlas with country desks, coverage flags, and citation-ready dossiers — including the limits the interface is required to state.",
          path: "/work/globe-news-atlas",
          image: "/og/globe-news-atlas.png",
        })}
      />
      <CaseStudyHeader
        caseNumber="02"
        projectName="Globe News Atlas"
        liveHref={LINKS.atlasLive}
        liveLabel="Live atlas"
        sourceHref={LINKS.atlasSource}
      />

      <main id="main" className="pt-16">
        <section className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
          <div className="flex items-center justify-between border-b border-[#111]/15 pb-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
            <span>Case file 02</span>
            <span>Independent build · 2026</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <h1 className="display text-[clamp(3.7rem,10vw,7.8rem)]">
                Globe News
                <br />
                Atlas<span className="text-[#c74634]">.</span>
              </h1>
              <p className="mt-5 max-w-xl font-mono text-[12px] uppercase leading-6 tracking-[0.08em] text-[#111]/55">
                World events, coverage, and provenance — with the limit stated
                in the interface.
              </p>
            </div>

            <aside className="lg:pt-1">
              <p className="max-w-md text-[14px] leading-7 text-[#111]/65">
                Globe News Atlas is a 3D atlas of live world events, bilateral
                relationships, and coverage across the political spectrum.
                Stories from public feeds move through a bronze → silver → gold
                Parquet lake, are clustered into events, and are served to a
                WebGL globe, country desks, and citation-ready dossiers.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={LINKS.atlasLive}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#111] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#f4f4f0] transition-colors hover:bg-[#c74634]"
                >
                  Open live atlas <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={LINKS.atlasSource}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-[#111]/25 pb-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#111]/55 transition-colors hover:border-[#111] hover:text-[#111]"
                >
                  Source ↗
                </a>
              </div>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-[#111]/35">
                Render free tier · first load may take a minute
              </p>
            </aside>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px border-y border-[#111]/20 bg-[#111]/15 md:grid-cols-4">
            {meta.map(([label, value]) => (
              <div key={label} className="bg-[#f4f4f0] px-4 py-4">
                <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#111]/35">
                  {label}
                </dt>
                <dd className="mt-1 text-[11px] leading-5 text-[#111]/70">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 md:mt-12">
            <CaseFigure
              src="/work/globe-news-atlas/atlas.png"
              width={1800}
              height={1250}
              alt="Globe News Atlas live UI showing a 3D globe with country labels, event markers, bilateral arcs, category filters, and time-window controls"
              caption="Live atlas · 24h window · 400 of 620 events shown · captured 24 Oct 2026"
              priority
            />
          </div>

          <div className="mt-6 grid grid-cols-2 border-y border-[#111]/20 md:grid-cols-4">
            {[
              ["10", "source families"],
              ["4", "time windows"],
              ["14", "category taxonomy"],
              ["400", "event display cap"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`py-4 pr-4 md:px-5 md:py-5 ${
                  index % 2 === 0 ? "border-r border-[#111]/15" : ""
                } ${index < 2 ? "border-b border-[#111]/15 md:border-b-0" : ""} ${
                  index === 1 ? "md:border-r" : ""
                } ${index === 2 ? "md:border-r" : ""}`}
              >
                <div className="display text-[26px]">{value}</div>
                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#111]/35">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-5 pb-12 md:px-8 md:pb-16">
          <CaseSectionHeader
            number="01"
            label="The brief"
            title="A map is a claim about where something happened."
            intro="Breaking-news maps are easy to fill and hard to trust. A dot can come from one unreviewed headline, a geocoder guessing from an adjective, or a demo dataset padded to look busy. Each of those teaches the reader something false about the world."
          />

          <div className="mt-8 grid gap-6 border-t border-[#111]/15 pt-6 text-[13px] leading-7 text-[#111]/60 md:grid-cols-2 md:gap-12">
            <p>
              Globe News Atlas starts from the opposite rule: only plot what can
              be placed, and always show the evidence behind the place. Public
              feeds are normalized into a Parquet lake, clustered into events,
              and served with outlet counts, coverage flags, and source links
              attached.
            </p>
            <p>
              The interface is allowed to say “not enough data.” It is not
              allowed to invent it. When the globe can only draw 400 events, the
              dock reports the true window total instead of pretending the cap
              is the world.
            </p>
          </div>

          <div className="mt-8 grid gap-px border border-[#111]/20 bg-[#111]/15 md:grid-cols-3">
            {constraints.map((constraint) => (
              <div key={constraint.number} className="bg-[#f4f4f0] p-5">
                <p className="font-mono text-[8px] tracking-[0.12em] text-[#c74634]">
                  {constraint.number}
                </p>
                <h3 className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#111]/80">
                  {constraint.title}
                </h3>
                <p className="mt-2 text-[12px] leading-6 text-[#111]/55">
                  {constraint.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl border-l-2 border-[#111] pl-5 text-[18px] leading-8 text-[#111]/80">
            If it cannot be placed, it is not plotted. If it cannot be
            corroborated, it is labelled.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-5 pb-12 md:px-8 md:pb-16">
          <CaseSectionHeader
            number="02"
            label="The build"
            title="The globe is the index. The evidence is underneath."
            intro="The map is a way into three kinds of proof: the event, the country, and the coverage around it. Each has its own surface, and each surface keeps the same source links attached."
          />

          <article className="mt-10 grid gap-8 border-t border-[#111]/15 pt-8 md:grid-cols-[0.96fr_1.04fr] md:gap-12">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#c74634]">
                01 / Scale-aware geography
              </p>
              <h3 className="display mt-4 text-[clamp(1.7rem,3.3vw,2.9rem)]">
                Labels that know when to leave.
              </h3>
              <p className="mt-4 text-[13px] leading-7 text-[#111]/60">
                A world map that keeps every label visible becomes wallpaper.
                The atlas treats labels, markers, and arcs as zoom-dependent
                evidence rather than permanent decoration.
              </p>
              <ul className="mt-5 space-y-2 border-t border-[#111]/15 pt-4">
                {[
                  "Numbered markers group stories at one location and hold a constant screen size across zoom.",
                  "Country labels sit at Natural Earth label points, collision-cull to the view, and hand off to state names only at deeper zoom.",
                  "Trade, diplomacy, sanctions, security, and aid arcs recede once the reader moves to a regional scale.",
                  "NASA day/night imagery sits under a boundary layer; disputed areas are tinted neutrally.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12px] leading-5 text-[#111]/60">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-[#c74634]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <CaseFigure
              src="/work/globe-news-atlas/atlas-globe-detail.png"
              width={1100}
              height={1100}
              alt="Close view of the Globe News Atlas globe showing numbered event markers, country labels, and bilateral relation arcs"
              caption="Globe detail · numbered location clusters · bilateral arcs"
            />
          </article>

          <article className="mt-10 grid gap-8 border-t border-[#111]/15 pt-8 md:grid-cols-[1.04fr_0.96fr] md:gap-12">
            <CaseFigure
              src="/work/globe-news-atlas/atlas-desk.png"
              width={1800}
              height={1250}
              alt="Globe News Atlas country desk for China showing eight ranked dispatches with outlet counts, categories, timestamps, and the dock reporting 400 of 621 events"
              caption="Live country desk · China · 8 dispatches · captured 24 Oct 2026"
            />
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#c74634]">
                02 / The country desk
              </p>
              <h3 className="display mt-4 text-[clamp(1.7rem,3.3vw,2.9rem)]">
                A briefing, not a dropdown.
              </h3>
              <p className="mt-4 text-[13px] leading-7 text-[#111]/60">
                Clicking a country opens a ranked briefing for the active
                window. Latest holds the top ten across all topics; Briefing,
                Protest, Conflict, and Technology narrow the desk without losing
                the selected country.
              </p>
              <ul className="mt-5 space-y-2 border-t border-[#111]/15 pt-4">
                {[
                  "Latest top 10, then focused sections capped at 10 rows each.",
                  "Outlet counts, alignment split, category, and timestamp on every row.",
                  "Country briefs union shorter windows, so a display cap never makes a wider window report fewer dispatches.",
                  "The dock states 400 of 621 events: the cap is visible next to the true window total.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12px] leading-5 text-[#111]/60">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-[#c74634]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="mt-10 border-t border-[#111]/15 pt-8">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#c74634]">
              03 / Beyond the globe
            </p>
            <h3 className="display mt-4 text-[clamp(1.7rem,3.3vw,2.9rem)]">
              Four ways to read the same evidence.
            </h3>
            <div className="mt-6 grid gap-px border border-[#111]/20 bg-[#111]/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Watchline", "Pin up to eight countries and storylines. The return brief shows what moved since the last visit."],
                ["Storylines", "Recurring bilateral relations with the dispatches that keep them alive."],
                ["Thin File", "Dispatches resting on one outlet, one side of the rated press, or a rewritten summary."],
                ["Rewind", "Replay up to 30 days of archived 24h snapshots and rank events whose coverage is thickening."],
              ].map(([title, body], index) => (
                <div key={title} className="bg-[#f4f4f0] p-5">
                  <p className="font-mono text-[8px] tracking-[0.12em] text-[#c74634]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#111]/80">
                    {title}
                  </h4>
                  <p className="mt-2 text-[11px] leading-5 text-[#111]/55">{body}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-[12px] leading-6 text-[#111]/55">
              Dossiers carry APA and BibTeX citations, canonical links,
              per-event share metadata, and frameable embed cards. Reader
              accounts are optional and isolated from the data plane: Argon2id
              hashes, signed sessions, TOTP, Google OIDC, and an active-session
              ledger.
            </p>
          </div>
        </section>

        <section className="border-y border-[#111]/15 bg-[#ebebe5]">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
            <CaseSectionHeader
              number="03"
              label="The pipeline"
              title="A batch lake is a feature, not a shortcut."
              intro="The system separates what happened from how it is shown. Ingestion and modeling can fail, backfill, or replay without the reading surface depending on a live database. FastAPI is the only door between the lake and the browser."
            />

            <div className="mt-8">
              <Flow
                stages={[
                  { title: "Sources", detail: "10 feed families" },
                  { title: "Bronze", detail: "raw Parquet parts" },
                  { title: "Silver", detail: "normalized + geocoded" },
                  { title: "Gold", detail: "clustered events" },
                  { title: "Serving", detail: "JSON + SQLite FTS5" },
                  { title: "Atlas", detail: "React + WebGL" },
                ]}
                note="Hugging Face mirrors the lake at the same paths. The browser never reads Parquet."
              />
            </div>

            <div className="mt-8 grid gap-px border border-[#111]/20 bg-[#111]/15 md:grid-cols-4">
              {pipelineNotes.map((note) => (
                <div key={note.number} className="bg-[#ebebe5] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[8px] tracking-[0.12em] text-[#c74634]">
                      {note.number}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#111]/35">
                      {note.metric}
                    </span>
                  </div>
                  <h4 className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#111]/80">
                    {note.title}
                  </h4>
                  <p className="mt-2 text-[11px] leading-5 text-[#111]/50">{note.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-px border border-[#111]/20 bg-[#111]/15 md:grid-cols-3">
              {decisions.map((decision) => (
                <div key={decision.number} className="bg-[#ebebe5] p-5">
                  <p className="font-mono text-[8px] tracking-[0.12em] text-[#c74634]">
                    {decision.number}
                  </p>
                  <h4 className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#111]/80">
                    {decision.title}
                  </h4>
                  <p className="mt-2 text-[11px] leading-5 text-[#111]/55">{decision.body}</p>
                  <p className="mt-4 border-t border-[#111]/15 pt-3 text-[10px] leading-5 text-[#111]/40">
                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#c74634]">
                      Trade-off ·{" "}
                    </span>
                    {decision.tradeoff}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
          <CaseSectionHeader
            number="04"
            label="The evidence"
            title="Every event can be interrogated."
            intro="Provenance is not a footer link. It is a set of visible states the interface has to be able to show, including the unflattering ones."
          />

          <div className="mt-8 grid gap-px border border-[#111]/20 bg-[#111]/15 sm:grid-cols-2 lg:grid-cols-4">
            {evidence.map(([title, body], index) => (
              <div key={title} className="bg-[#f4f4f0] p-4">
                <p className="font-mono text-[8px] tracking-[0.12em] text-[#c74634]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#111]/80">
                  {title}
                </h4>
                <p className="mt-2 text-[11px] leading-5 text-[#111]/50">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 border-l-2 border-[#111] pl-5 md:grid-cols-2 md:gap-12">
            <p className="text-[17px] leading-7 text-[#111]/80">
              The UI also says when it has no data. Failed requests surface an
              error banner instead of substituting sample content, and empty
              coverage states stay empty.
            </p>
            <p className="text-[12px] leading-6 text-[#111]/50">
              This is the harder half of a news product: a blank state is a
              feature, not a bug to be filled with decoration. The atlas keeps
              “no sources found” separate from “sources found, but not yet
              corroborated.”
            </p>
          </div>
        </section>

        <section className="border-t border-[#111]/15">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
            <CaseSectionHeader
              number="05"
              label="Limits"
              title="What the atlas will not pretend."
              intro="A live data product is more credible when its edges are in the interface. These are the limits stated now, and the ones imposed by the current environment."
            />

            <div className="mt-8 grid gap-8 border-t border-[#111]/15 pt-6 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
                  Stated in the interface
                </h3>
                <ul className="mt-4 space-y-2.5 text-[12px] leading-5 text-[#111]/65">
                  {statedLimits.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#c74634]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
                  Imposed by the environment
                </h3>
                <ul className="mt-4 space-y-2.5 text-[12px] leading-5 text-[#111]/50">
                  {environmentLimits.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#111]/25" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-8 border-t border-[#111]/15 pt-6 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
                  Shipped
                </h3>
                <ul className="mt-4 space-y-2.5 text-[12px] leading-5 text-[#111]/65">
                  {shipped.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#c74634]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
                  Next, honestly
                </h3>
                <ul className="mt-4 space-y-2.5 text-[12px] leading-5 text-[#111]/50">
                  {nextSteps.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#111]/25" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-between gap-6 border-t border-[#111]/15 pt-6 md:flex-row md:items-end">
              <div>
                <p className="display text-[clamp(2.2rem,4vw,3.6rem)]">
                  Read the world, with receipts.
                </p>
                <p className="mt-2 max-w-md text-[11px] leading-5 text-[#111]/45">
                  The live build is the same product shown above. Counts move
                  with each pipeline run; the interface reports the snapshot it
                  is showing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={LINKS.atlasLive}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#111] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#f4f4f0] transition-colors hover:bg-[#c74634]"
                >
                  Open live atlas <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/work/taskflow"
                  prefetch={false}
                  className="inline-flex items-center gap-2 border border-[#111]/20 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#111]/60 transition-colors hover:border-[#111] hover:text-[#111]"
                >
                  TaskFlow case file <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CaseFooter nextLabel="TaskFlow" nextHref="/work/taskflow" />
    </>
  );
}
