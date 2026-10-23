import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SystemMap from "@/components/work/SystemMap";

export const metadata: Metadata = {
  title: "TaskFlow — Case study | Aayush Bhat",
  description:
    "How TaskFlow keeps tasks, polls, briefs, notes, focus sessions, and DSA practice attached to the conversation that started them.",
};

const LIVE = "https://taskflow-render.onrender.com/en";
const SOURCE = "https://github.com/aayusbhat26/task_flow";

const meta = [
  ["Role", "Product design + full-stack"],
  ["Scope", "UI, schema, realtime, auth, deploy"],
  ["Stack", "Next.js 14, React 18, Express, Socket.IO, PostgreSQL, Prisma"],
  ["Status", "Live on Render + Neon"],
];

const constraints = [
  {
    n: "01",
    title: "One deploy",
    body: "Next.js, Express auth, Socket.IO, and a Node proxy share a single 512 MB Render instance. Every choice had to fit that budget.",
  },
  {
    n: "02",
    title: "One schema",
    body: "62 Prisma models — channels, tasks, notes, DSA progress, billing — share PostgreSQL as the source of truth.",
  },
  {
    n: "03",
    title: "Realtime, no queue",
    body: "Socket.IO carries chat and presence directly. It works for this build, not for a cluster. That ceiling is documented, not hidden.",
  },
];

const decisions = [
  {
    n: "01",
    title: "Shared deploy, isolated processes",
    body: "A small Node proxy sends /socket.io to Socket.IO and everything else to Next.js. Next's API routes call the Express auth service server-side over localhost.",
    tradeoff: "One failure domain; one deploy and no cross-service network hops.",
  },
  {
    n: "02",
    title: "One database contract",
    body: "The app, auth service, and socket server share one Prisma schema. Runtime traffic uses Neon's pooled URL; migrations use the direct URL.",
    tradeoff: "Schema coupling in exchange for no sync layer and one source of truth.",
  },
  {
    n: "03",
    title: "Realtime with a known ceiling",
    body: "Socket.IO runs in-process with presence and message fan-out. There is no Redis adapter, so this is deliberately a single-instance design.",
    tradeoff: "The next piece of work is horizontal fan-out, not a hidden assumption.",
  },
];

function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 font-mono text-[10px] tracking-[0.16em] text-[#7A2020]">{n}</span>
      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#1B1915]/45">
        {children}
      </p>
    </div>
  );
}

function Figure({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="border border-[#1B1915]/15 bg-[#F8F4EC] p-1.5">
        <Image
          src={src}
          width={2400}
          height={1500}
          alt={alt}
          sizes="(min-width: 1024px) 720px, 100vw"
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      <figcaption className="mt-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.15em] text-[#1B1915]/40">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function TaskFlowPage() {
  return (
    <div className="min-h-screen bg-[#F2EEE5] text-[#1B1915] selection:bg-[#7A2020] selection:text-[#F8F4EC]">
      <header className="sticky top-0 z-40 border-b border-[#1B1915]/15 bg-[#F2EEE5]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-6 px-5 md:px-8">
          <Link
            href="/#projects"
            className="group flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#1B1915]/70 transition-colors hover:text-[#1B1915]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Aayush Bhat</span>
            <span className="hidden text-[#7A2020] sm:inline">/</span>
            <span>Work</span>
          </Link>

          <nav className="hidden items-center gap-7 font-mono text-[9px] uppercase tracking-[0.16em] text-[#1B1915]/45 md:flex">
            <a href="#brief" className="transition-colors hover:text-[#1B1915]">01 Brief</a>
            <a href="#build" className="transition-colors hover:text-[#1B1915]">02 Build</a>
            <a href="#system" className="transition-colors hover:text-[#1B1915]">03 System</a>
            <a href="#status" className="transition-colors hover:text-[#1B1915]">04 Status</a>
          </nav>

          <a
            href={LIVE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#7A2020] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F8F4EC] transition-colors hover:bg-[#651a1a]"
          >
            <span className="hidden sm:inline">Live app</span>
            <span className="sm:hidden">Live</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-[1240px] px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
          <div className="flex items-center justify-between border-b border-[#1B1915]/15 pb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#1B1915]/40">
            <span>Case file 01</span>
            <span>Independent build · 2026</span>
          </div>

          <div className="grid gap-10 pt-10 md:pt-14 lg:grid-cols-[1.22fr_0.78fr] lg:gap-16">
            <div>
              <h1 className="font-editorial text-[clamp(4rem,14vw,10.4rem)] leading-[0.8] tracking-[-0.045em] text-[#1B1915]">
                TaskFlow<span className="text-[#7A2020]">.</span>
              </h1>
              <p className="mt-7 max-w-2xl font-editorial text-[30px] leading-[1.04] text-[#1B1915] sm:text-[38px] md:text-[44px]">
                A chat-native work OS for the decisions that usually get lost
                between messages.
              </p>
            </div>

            <aside className="lg:pt-1">
              <p className="max-w-md text-[14px] leading-7 text-[#1B1915]/65">
                TaskFlow keeps tasks, polls, briefs, notes, focus sessions, and
                deliberate practice attached to the conversation where they
                started. I designed the product and built it end to end: the
                interface, the 62-model schema, the realtime layer, auth, and
                the single-container deployment.
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#1B1915]/15 pt-5">
                {meta.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#1B1915]/35">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[12px] leading-relaxed text-[#1B1915]/75">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={LIVE}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#7A2020] px-4 py-2.5 text-[12px] font-medium text-[#F8F4EC] transition-colors hover:bg-[#651a1a]"
                >
                  Open live app
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={SOURCE}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 border border-[#1B1915]/20 px-4 py-2.5 text-[12px] font-medium text-[#1B1915]/75 transition-colors hover:border-[#1B1915]/40 hover:text-[#1B1915]"
                >
                  Source
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#1B1915]/35">
                Render free tier · first load may take a minute
              </p>
            </aside>
          </div>

          <Figure
            src="/work/taskflow/dashboard.png"
            alt="TaskFlow dashboard: daily goal, DSA progress, recent activity, and unlocked milestones"
            caption="Dashboard · synthetic demo account scale001 · local production build"
            priority
            className="mt-12 md:mt-16"
          />
        </section>

        <section id="brief" className="scroll-mt-20 border-t border-[#1B1915]/15">
          <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-5 py-14 md:grid-cols-[190px_1fr] md:gap-12 md:px-8 md:py-20">
            <SectionLabel n="01">The brief</SectionLabel>
            <div>
              <h2 className="max-w-3xl font-editorial text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] md:text-[56px]">
                The decision is in the message. The work is somewhere else.
              </h2>

              <div className="mt-8 grid max-w-4xl gap-6 text-[14px] leading-7 text-[#1B1915]/65 md:grid-cols-2 md:gap-10">
                <p>
                  Teams make decisions in chat, then rebuild them as tasks, docs,
                  and reminders in other tools. The context gets lost at the
                  handoff. TaskFlow takes the opposite approach: the conversation
                  is the workspace, and every artifact stays attached to the
                  message that created it.
                </p>
                <p>
                  The constraints were self-imposed but real: one free-tier
                  container, one relational schema, and realtime without a
                  separate queue or cache. That forced a small number of strong
                  primitives instead of a wide, shallow feature list.
                </p>
              </div>

              <div className="mt-10 grid gap-px overflow-hidden border border-[#1B1915]/15 bg-[#1B1915]/15 md:grid-cols-3">
                {constraints.map((item) => (
                  <div key={item.n} className="bg-[#F2EEE5] p-5 md:p-6">
                    <div className="font-mono text-[9px] tracking-[0.16em] text-[#7A2020]">{item.n}</div>
                    <h3 className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-6 text-[#1B1915]/55">{item.body}</p>
                  </div>
                ))}
              </div>

              <blockquote className="mt-10 border-l-2 border-[#7A2020] pl-5">
                <p className="max-w-2xl font-editorial text-[26px] italic leading-tight text-[#1B1915]/85 md:text-[32px]">
                  Keep the context attached to the commitment.
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="build" className="scroll-mt-20 border-t border-[#1B1915]/15">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
            <div className="grid gap-8 md:grid-cols-[190px_1fr] md:gap-12">
              <SectionLabel n="02">The build</SectionLabel>
              <div>
                <h2 className="max-w-3xl font-editorial text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] md:text-[56px]">
                  One conversation, three kinds of follow-through.
                </h2>
                <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#1B1915]/60">
                  The product is intentionally broad, but the loop is narrow: say
                  something, decide it, then keep the evidence in the same place.
                </p>
              </div>
            </div>

            <article className="mt-12 grid gap-8 border-t border-[#1B1915]/15 pt-10 md:mt-16 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:pt-12">
              <Figure
                src="/work/taskflow/chat-slash.png"
                alt="TaskFlow chat with the slash command menu open showing /poll, /task, /brief, and /dsa"
                caption="Channel general · slash command menu · synthetic workspace"
              />
              <div className="md:pt-2">
                <SectionLabel n="01">Conversation → commitment</SectionLabel>
                <h3 className="mt-5 font-editorial text-[30px] leading-[1.02] tracking-[-0.01em] md:text-[38px]">
                  Commands, not context-switching.
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-[#1B1915]/60">
                  A message can become a task, a poll, or a channel brief without
                  leaving the conversation. The slash menu is the smallest
                  possible interface for the biggest source of lost work.
                </p>
                <ul className="mt-6 space-y-3 border-t border-[#1B1915]/15 pt-5 text-[13px] leading-6 text-[#1B1915]/65">
                  {[
                    "/task creates an assigned task from a message; /poll closes a decision in-channel.",
                    "/brief keeps the channel's current summary beside the conversation.",
                    "Threads, reactions, pins, mentions, files, and search preserve the surrounding context.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#7A2020]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="mt-12 grid gap-8 border-t border-[#1B1915]/15 pt-10 md:mt-16 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:pt-12">
              <div className="md:order-2">
                <Figure
                  src="/work/taskflow/dsa.png"
                  alt="TaskFlow DSA practice page showing 116 questions, 62 completed, difficulty and topic filters, and question cards"
                  caption="DSA practice · 62 of 116 solved in the synthetic account"
                />
              </div>
              <div className="md:order-1 md:pt-2">
                <SectionLabel n="02">Practice → deliberate work</SectionLabel>
                <h3 className="mt-5 font-editorial text-[30px] leading-[1.02] tracking-[-0.01em] md:text-[38px]">
                  A practice system inside the team space.
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-[#1B1915]/60">
                  DSA practice is not a separate app. It shares the same account,
                  workspace, and realtime layer. /dsa opens a co-working room
                  from chat and records attendance and time.
                </p>
                <ul className="mt-6 space-y-3 border-t border-[#1B1915]/15 pt-5 text-[13px] leading-6 text-[#1B1915]/65">
                  {[
                    "116-question bank across difficulty and topic, with progress, streaks, and history.",
                    "CSV and LeetCode import/export, per-question attempts, and time tracking.",
                    "Live co-working rooms with attendance logs, opened from the conversation.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#7A2020]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="mt-12 grid gap-8 border-t border-[#1B1915]/15 pt-10 md:mt-16 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:pt-12">
              <Figure
                src="/work/taskflow/notes.png"
                alt="TaskFlow notes view with a weekly review document and a list of recent workspace notes"
                caption="Notes · shared workspace · synthetic data"
              />
              <div className="md:pt-2">
                <SectionLabel n="03">The quiet surface</SectionLabel>
                <h3 className="mt-5 font-editorial text-[30px] leading-[1.02] tracking-[-0.01em] md:text-[38px]">
                  Focus, notes, and the shape of a week.
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-[#1B1915]/60">
                  The rest of the day lives on the same data model: notes, a
                  calendar, focus rounds, achievements, and a leaderboard. The
                  dashboard shows the next action, not every possible action.
                </p>
                <ul className="mt-6 space-y-3 border-t border-[#1B1915]/15 pt-5 text-[13px] leading-6 text-[#1B1915]/65">
                  {[
                    "Daily goal, focus rounds, streaks, and recent activity from one account.",
                    "Organizations with RBAC, invites, Google and GitHub OAuth, and EN/TE locales.",
                    "62 Prisma models behind one migration path.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#7A2020]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="system" className="scroll-mt-20 border-t border-[#1B1915]/15 bg-[#EDE8DD]">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
            <div className="grid gap-8 md:grid-cols-[190px_1fr] md:gap-12">
              <SectionLabel n="03">The system</SectionLabel>
              <div>
                <h2 className="max-w-3xl font-editorial text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] md:text-[56px]">
                  The interesting part is what is not running.
                </h2>
                <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#1B1915]/60">
                  No Redis. No queue. No separate frontend deployment. The
                  free-tier constraint turned the architecture into a routing
                  problem: three services behind one proxy, one container, one
                  database.
                </p>
              </div>
            </div>

            <SystemMap />

            <div className="mt-10 grid gap-px overflow-hidden border border-[#1B1915]/15 bg-[#1B1915]/15 md:grid-cols-3">
              {decisions.map((item) => (
                <div key={item.n} className="bg-[#EDE8DD] p-5 md:p-6">
                  <div className="font-mono text-[9px] tracking-[0.16em] text-[#7A2020]">{item.n}</div>
                  <h3 className="mt-4 font-mono text-[12px] uppercase leading-relaxed tracking-[0.08em]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-6 text-[#1B1915]/60">{item.body}</p>
                  <p className="mt-4 border-t border-[#1B1915]/15 pt-3 text-[11px] leading-5 text-[#1B1915]/45">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#7A2020]">
                      Trade-off ·{" "}
                    </span>
                    {item.tradeoff}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-3xl font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[#1B1915]/40">
              One 512 MB instance · one pooled Postgres endpoint at runtime · a
              direct endpoint for migrations.
            </p>
          </div>
        </section>

        <section id="status" className="scroll-mt-20 border-t border-[#1B1915]/15">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
            <div className="grid gap-8 md:grid-cols-[190px_1fr] md:gap-12">
              <SectionLabel n="04">Status</SectionLabel>
              <div>
                <h2 className="max-w-3xl font-editorial text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] md:text-[56px]">
                  What is live, and what is not.
                </h2>
                <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#1B1915]/60">
                  A demo is more useful when its edges are visible. This is the
                  current state of the build, including the parts I would change
                  with a larger budget.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-10 border-t border-[#1B1915]/15 pt-8 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1B1915]/45">
                  Shipped
                </h3>
                <ul className="mt-5 space-y-3 text-[13px] leading-6 text-[#1B1915]/70">
                  {[
                    "Public live build on Render Free + Neon Free.",
                    "Google and GitHub OAuth with verified-email account linking.",
                    "Chat, tasks, polls, briefs, threads, reactions, files, mentions, search, and calls.",
                    "Notes, mind maps, calendar, focus, leaderboard, achievements, notifications, invites, RBAC, and EN/TE locales.",
                    "Typing game, onboarding, and billing in test mode.",
                    "DSA practice with 116 questions and live co-working rooms.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#7A2020]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1B1915]/45">
                  Known limits
                </h3>
                <ul className="mt-5 space-y-3 text-[13px] leading-6 text-[#1B1915]/55">
                  {[
                    "The free tier sleeps; the first request can take up to a minute.",
                    "The public database has no synthetic demo account, so sign-in is required.",
                    "Uploads are ephemeral on the free instance.",
                    "Socket.IO is single-node; there is no Redis adapter yet.",
                    "Billing runs in test mode and is not presented as a live payment system.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[#1B1915]/25" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-[#1B1915]/15 pt-8">
              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
                <div>
                  <p className="font-editorial text-[34px] leading-none tracking-[-0.02em] md:text-[44px]">
                    See it running.
                  </p>
                  <p className="mt-3 max-w-md text-[12px] leading-6 text-[#1B1915]/50">
                    The live build is the same product shown above. The screenshots
                    use a local, synthetic workspace so the public database stays
                    clean.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={LIVE}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 bg-[#7A2020] px-5 py-3 text-[13px] font-medium text-[#F8F4EC] transition-colors hover:bg-[#651a1a]"
                  >
                    Open live app
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={SOURCE}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-[#1B1915]/20 px-5 py-3 text-[13px] font-medium text-[#1B1915]/70 transition-colors hover:border-[#1B1915]/40 hover:text-[#1B1915]"
                  >
                    View source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1B1915]/15">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col justify-between gap-4 px-5 py-8 font-mono text-[9px] uppercase tracking-[0.15em] text-[#1B1915]/40 md:flex-row md:items-center md:px-8">
          <p>TaskFlow · case study 01 · Aayush Bhat</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="mailto:work.aayush.bhat@gmail.com" className="transition-colors hover:text-[#1B1915]">
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/aayush-kumar-bhat-/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#1B1915]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/aayusbhat26/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#1B1915]"
            >
              GitHub
            </a>
            <Link href="/#projects" className="text-[#7A2020] transition-colors hover:text-[#1B1915]">
              Back to work
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
