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
  title: "TaskFlow — Case study | Aayush Bhat",
  description:
    "How TaskFlow keeps tasks, polls, briefs, notes, focus sessions, and DSA practice attached to the conversation that started them.",
  ...socialMetadata({
    title: "TaskFlow — A chat-native work OS",
    description:
      "A case study on one free-tier deploy, 62 Prisma models, realtime chat, and the trade-offs left in the open.",
    image: "/og/taskflow.png",
    alt: "TaskFlow case study — a chat-native work OS.",
    path: "/work/taskflow",
    type: "article",
  }),
};

const meta = [
  ["Role", "Product design + full-stack"],
  ["Scope", "UI, schema, realtime, auth, deploy"],
  ["Stack", "Next.js 14, React 18, Express, Socket.IO, PostgreSQL, Prisma"],
  ["Status", "Live on Render + Neon"],
];

const constraints = [
  {
    number: "01",
    title: "One deploy",
    body: "Next.js, Express auth, Socket.IO, and a Node proxy share one 512 MB Render instance. Every choice had to fit that budget.",
  },
  {
    number: "02",
    title: "One schema",
    body: "62 Prisma models — channels, tasks, notes, DSA progress, billing — share PostgreSQL as the source of truth.",
  },
  {
    number: "03",
    title: "Realtime, no queue",
    body: "Socket.IO carries chat and presence directly. It works for this build, not for a cluster. That ceiling is documented, not hidden.",
  },
];

const decisions = [
  {
    number: "01",
    title: "Shared deploy, isolated processes",
    body: "A small Node proxy sends /socket.io to Socket.IO and everything else to Next.js. Next API routes call the Express auth service server-side over localhost.",
    tradeoff: "One failure domain; one deploy and no cross-service network hops.",
  },
  {
    number: "02",
    title: "One database contract",
    body: "The app, auth service, and socket server share one Prisma schema. Runtime traffic uses Neon's pooled URL; migrations use the direct URL.",
    tradeoff: "Schema coupling in exchange for no sync layer and one source of truth.",
  },
  {
    number: "03",
    title: "Realtime with a known ceiling",
    body: "Socket.IO runs in-process with presence and message fan-out. There is no Redis adapter, so this is deliberately a single-instance design.",
    tradeoff: "The next piece of work is horizontal fan-out, not a hidden assumption.",
  },
];

const shipped = [
  "Public live build on Render Free + Neon Free.",
  "Google and GitHub OAuth with verified-email account linking.",
  "Chat, tasks, polls, briefs, threads, reactions, files, mentions, search, and calls.",
  "Notes, mind maps, calendar, focus, leaderboard, achievements, notifications, invites, RBAC, and EN/TE locales.",
  "Typing game, onboarding, and billing in test mode.",
  "DSA practice with 116 questions and live co-working rooms.",
];

const limits = [
  "The free tier sleeps; the first request can take up to a minute.",
  "The public database has no synthetic demo account, so sign-in is required.",
  "Uploads are ephemeral on the free instance.",
  "Socket.IO is single-node; there is no Redis adapter yet.",
  "Billing runs in test mode and is not presented as a live payment system.",
];

function Surface({
  number,
  label,
  title,
  body,
  bullets,
  children,
  reverse = false,
}: {
  number: string;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <article className="mt-10 grid gap-8 border-t border-[#111]/15 pt-8 md:mt-12 md:grid-cols-[1.04fr_0.96fr] md:gap-12 md:pt-10">
      <div className={reverse ? "md:order-2" : ""}>{children}</div>
      <div className={reverse ? "md:order-1" : ""}>
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#c74634]">
          {number} / {label}
        </p>
        <h3 className="display mt-4 text-[clamp(1.7rem,3.3vw,2.9rem)]">{title}</h3>
        <p className="mt-4 text-[13px] leading-7 text-[#111]/60">{body}</p>
        <ul className="mt-5 space-y-2 border-t border-[#111]/15 pt-4">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-[12px] leading-5 text-[#111]/60">
              <span className="mt-2 h-1 w-1 shrink-0 bg-[#c74634]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function TaskFlowCaseStudy() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: "TaskFlow — A chat-native work OS",
          description:
            "How TaskFlow keeps tasks, polls, briefs, notes, focus sessions, and DSA practice attached to the conversation that started them.",
          path: "/work/taskflow",
          image: "/og/taskflow.png",
        })}
      />
      <CaseStudyHeader
        caseNumber="01"
        projectName="TaskFlow"
        liveHref={LINKS.taskflowLive}
        liveLabel="Live app"
        sourceHref={LINKS.taskflowSource}
      />

      <main id="main" className="pt-16">
        <section className="mx-auto w-full max-w-[1240px] px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
          <div className="flex items-center justify-between border-b border-[#111]/15 pb-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#111]/40">
            <span>Case file 01</span>
            <span>Independent build · 2026</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <h1 className="display text-[clamp(4.3rem,12vw,9rem)]">
                TaskFlow<span className="text-[#c74634]">.</span>
              </h1>
              <p className="mt-5 max-w-xl font-mono text-[12px] uppercase leading-6 tracking-[0.08em] text-[#111]/55">
                A chat-native work OS for the decisions that usually get lost
                between messages.
              </p>
            </div>

            <aside className="lg:pt-1">
              <p className="max-w-md text-[14px] leading-7 text-[#111]/65">
                TaskFlow keeps tasks, polls, briefs, notes, focus sessions, and
                deliberate practice attached to the conversation where they
                started. I designed the product and built it end to end: the
                interface, the 62-model schema, the realtime layer, auth, and
                the single-container deployment.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={LINKS.taskflowLive}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#111] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#f4f4f0] transition-colors hover:bg-[#c74634]"
                >
                  Open live app <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={LINKS.taskflowSource}
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
              src="/work/taskflow/dashboard.png"
              width={2400}
              height={1500}
              alt="TaskFlow dashboard showing daily goal, DSA progress, recent activity, and milestones"
              caption="Dashboard · synthetic demo account · local production build"
              priority
            />
          </div>

          <div className="mt-6 grid grid-cols-2 border-y border-[#111]/20 md:grid-cols-4">
            {[
              ["3", "services + proxy"],
              ["62", "Prisma models"],
              ["116", "DSA questions"],
              ["2", "OAuth providers"],
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
            title="The decision is in the message. The work is somewhere else."
            intro="Teams make decisions in chat, then rebuild them as tasks, docs, and reminders in other tools. The context gets lost at the handoff. TaskFlow takes the opposite approach: the conversation is the workspace, and every artifact stays attached to the message that created it."
          />

          <div className="mt-8 grid gap-6 border-t border-[#111]/15 pt-6 text-[13px] leading-7 text-[#111]/60 md:grid-cols-2 md:gap-12">
            <p>
              The constraints were self-imposed but real: one free-tier
              container, one relational schema, and realtime without a separate
              queue or cache. That forced a small number of strong primitives
              instead of a wide, shallow feature list.
            </p>
            <p>
              The result is a product where a message can become a task, a poll,
              a brief, or a practice room without leaving the conversation. The
              interface stays quiet; the context stays attached.
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
            Keep the context attached to the commitment.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-5 pb-12 md:px-8 md:pb-16">
          <CaseSectionHeader
            number="02"
            label="The build"
            title="One conversation, three kinds of follow-through."
            intro="The product is broad, but the loop is narrow: say something, decide it, then keep the evidence in the same place."
          />

          <Surface
            number="01"
            label="Conversation → commitment"
            title="Commands, not context-switching."
            body="A message can become a task, a poll, or a channel brief without leaving the conversation. The slash menu is the smallest possible interface for the biggest source of lost work."
            bullets={[
              "/task creates an assigned task from a message; /poll closes a decision in-channel.",
              "/brief keeps the channel's current summary beside the conversation.",
              "Threads, reactions, pins, mentions, files, and search preserve the surrounding context.",
            ]}
          >
            <CaseFigure
              src="/work/taskflow/chat-slash.png"
              width={2400}
              height={1500}
              alt="TaskFlow chat with the slash command menu open showing /poll, /task, /brief, and /dsa"
              caption="Channel general · slash command menu · synthetic workspace"
            />
          </Surface>

          <Surface
            number="02"
            label="Practice → deliberate work"
            title="A practice system inside the team space."
            body="DSA practice is not a separate app. It shares the same account, workspace, and realtime layer. /dsa opens a co-working room from chat and records attendance and time."
            bullets={[
              "116-question bank across difficulty and topic, with progress, streaks, and history.",
              "CSV and LeetCode import/export, per-question attempts, and time tracking.",
              "Live co-working rooms with attendance logs, opened from the conversation.",
            ]}
            reverse
          >
            <CaseFigure
              src="/work/taskflow/dsa.png"
              width={2400}
              height={1500}
              alt="TaskFlow DSA practice page showing 116 questions, 62 completed, difficulty and topic filters, and question cards"
              caption="DSA practice · 62 of 116 solved in the synthetic account"
            />
          </Surface>

          <Surface
            number="03"
            label="The quiet surface"
            title="Focus, notes, and the shape of a week."
            body="The rest of the day lives on the same data model: notes, a calendar, focus rounds, achievements, and a leaderboard. The dashboard shows the next action, not every possible action."
            bullets={[
              "Daily goal, focus rounds, streaks, and recent activity from one account.",
              "Organizations with RBAC, invites, Google and GitHub OAuth, and EN/TE locales.",
              "62 Prisma models behind one migration path.",
            ]}
          >
            <CaseFigure
              src="/work/taskflow/notes.png"
              width={2400}
              height={1500}
              alt="TaskFlow notes view with a weekly review document and a list of recent workspace notes"
              caption="Notes · shared workspace · synthetic data"
            />
          </Surface>
        </section>

        <section className="border-y border-[#111]/15 bg-[#ebebe5]">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
            <CaseSectionHeader
              number="03"
              label="The system"
              title="The interesting part is what is not running."
              intro="No Redis. No queue. No separate frontend deployment. The free-tier constraint turned the architecture into a routing problem: three services behind one proxy, one container, one database."
            />

            <div className="mt-8">
              <Flow
                stages={[
                  { title: "Browser", detail: "React · WebSocket" },
                  { title: "Node proxy", detail: "$PORT · routing" },
                  { title: "Next.js / auth / socket", detail: "one container, three processes" },
                  { title: "PostgreSQL", detail: "Neon · Prisma · 62 models" },
                ]}
                note="One 512 MB instance · one pooled Postgres endpoint at runtime · a direct endpoint for migrations."
              />
            </div>

            <div className="mt-8 grid gap-px border border-[#111]/20 bg-[#111]/15 md:grid-cols-3">
              {decisions.map((decision) => (
                <div key={decision.number} className="bg-[#ebebe5] p-5">
                  <p className="font-mono text-[8px] tracking-[0.12em] text-[#c74634]">
                    {decision.number}
                  </p>
                  <h3 className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-[#111]/80">
                    {decision.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-6 text-[#111]/55">{decision.body}</p>
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
            label="Status"
            title="What is live, and what is not."
            intro="A demo is more useful when its edges are visible. This is the current state of the build, including the parts I would change with a larger budget."
          />

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
                Known limits
              </h3>
              <ul className="mt-4 space-y-2.5 text-[12px] leading-5 text-[#111]/50">
                {limits.map((item) => (
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
              <p className="display text-[clamp(2.2rem,4vw,3.6rem)]">See it running.</p>
              <p className="mt-2 max-w-md text-[11px] leading-5 text-[#111]/45">
                The live build is the same product shown above. The screenshots
                use a local, synthetic workspace so the public database stays
                clean.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={LINKS.taskflowLive}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#111] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#f4f4f0] transition-colors hover:bg-[#c74634]"
              >
                Open live app <span aria-hidden="true">↗</span>
              </a>
              <Link
                href="/work/globe-news-atlas"
                prefetch={false}
                className="inline-flex items-center gap-2 border border-[#111]/20 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#111]/60 transition-colors hover:border-[#111] hover:text-[#111]"
              >
                Next case file <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <CaseFooter nextLabel="Globe News Atlas" nextHref="/work/globe-news-atlas" />
    </>
  );
}
