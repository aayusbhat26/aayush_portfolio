import { RESUME_VERSION } from "@/data/resume";

export const LINKS = {
  email: "work.aayush.bhat@gmail.com",
  linkedin: "https://www.linkedin.com/in/aayush-kumar-bhat-/",
  github: "https://github.com/aayusbhat26/",
  leetcode: "https://leetcode.com/u/Aayush_Kumar_Bhat_08/",
  resume: `/resume.pdf?v=${RESUME_VERSION}`,
  taskflowCase: "/work/taskflow",
  taskflowLive: "https://taskflow-render.onrender.com/en",
  taskflowSource: "https://github.com/aayusbhat26/task_flow",
  atlasCase: "/work/globe-news-atlas",
  atlasLive: "https://globe-news-atlas.onrender.com/",
  atlasSource: "https://github.com/aayusbhat26/globe_news_atlas",
  devto:
    "https://dev.to/aayusbhat26/how-to-integrate-clerk-in-next-js-application--4hba",
  devtoWatermarks:
    "https://dev.to/aayusbhat26/watermarks-are-a-contract-validating-150-pyspark-streams-5dj5",
  pocSource: "https://github.com/aayusbhat26/poc_latency_test",
} as const;

export const PROFILE = {
  name: "Aayush Bhat",
  role: "Backend & data engineer",
  company: "Nagarro",
  title: "Associate Engineer",
  location: "New Delhi, India",
  timezone: "IST · UTC+5:30",
  status: "Open to remote-first roles",
  notice: "30-day notice · global sponsorship",
  email: LINKS.email,
  summary:
    "I work on the layer that has to stay correct: pipelines, schemas, and the services product teams depend on. I build in Python and ship the interfaces that prove the system works.",
  secondary:
    "Outside work I build small tools end to end. CASCADE, a Windows download manager with segmented transfers and browser integration, is the latest.",
} as const;

export const NAV = [
  { id: "home", label: "Home", number: "00" },
  { id: "profile", label: "Profile", number: "01" },
  { id: "experience", label: "Experience", number: "02" },
  { id: "projects", label: "Projects", number: "03" },
  { id: "stack", label: "Stack", number: "04" },
  { id: "record", label: "Record", number: "05" },
  { id: "writing", label: "Writing", number: "06" },
  { id: "certifications", label: "Certs", number: "07" },
  { id: "contact", label: "Contact", number: "08" },
] as const;

export const HERO_TAGS = ["Backend", "Data engineering", "Python / PySpark"] as const;

export const HERO_TERMINAL = [
  { command: "whoami", output: "aayush bhat — backend & data engineer" },
  { command: "location", output: "new delhi, india · ist (utc+5:30)" },
  { command: "current", output: "associate engineer @ nagarro" },
  { command: "status", output: "open to remote-first roles" },
] as const;

export const EXPERIENCE = {
  company: "Nagarro",
  location: "Gurugram, India",
  period: "Jan 2026 — Present",
  currentTitle: "Associate Engineer",
  currentPeriod: "Sep 2026 — Present",
  previousTitle: "Associate Software Engineer Trainee",
  previousPeriod: "Jan 2026 — Sep 2026",
  bullets: [
    "Built a Next.js and FastAPI app on DuckDB and SQL, keeping sub-second, zero-copy OLAP queries over large PyArrow datasets.",
    "Built Python REST APIs and backend services, owned production deployments, and traced system health in Azure Monitor.",
    "Architected PySpark streaming with watermark-based correctness.",
    "Engineered window-function validation across 150+ production streams, catching schema anomalies and duplicates.",
    "Implemented a Delta Lake medallion architecture with Z-Ordering.",
    "Orchestrated distributed batch jobs with GitHub Actions and governed 85+ tables through Unity Catalog.",
  ],
  training:
    "AWS, Azure data engineering, Docker, SQL, MongoDB, Databricks, Apache Spark, Spark clusters.",
  education: [
    {
      degree: "MCA",
      school: "USICT, Delhi",
      period: "2024 — 2026",
      detail: "CGPA 8.99",
    },
    {
      degree: "BCA",
      school: "Integrated Institute of Technology, Dwarka",
      period: "2020 — 2023",
      detail: "CGPA 9.01",
    },
  ],
} as const;

export type ProjectLink = {
  label: string;
  href: string;
  internal?: boolean;
};

export type Project = {
  number: string;
  year: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: string;
  status: string;
  badge: string;
  links: ProjectLink[];
  facts: string;
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    year: "2026",
    name: "TaskFlow",
    tagline: "A chat-native work OS.",
    description:
      "Tasks, polls, briefs, notes, focus sessions, and DSA practice stay attached to the conversation that created them. One deploy, realtime chat, and a single PostgreSQL schema.",
    role: "Product design + full-stack",
    stack: "Next.js · Express · Socket.IO · PostgreSQL",
    status: "Live on Render + Neon",
    badge: "Live",
    links: [
      { label: "Read the case study", href: LINKS.taskflowCase, internal: true },
      { label: "Live app", href: LINKS.taskflowLive },
      { label: "Source", href: LINKS.taskflowSource },
    ],
    facts: "62 Prisma models · 116 DSA questions · 2 OAuth providers",
  },
  {
    number: "02",
    year: "2026",
    name: "Globe News Atlas",
    tagline: "World events, coverage, and provenance.",
    description:
      "An interactive 3D atlas of live events, bilateral relationships, and multi-perspective coverage. Public feeds are normalized into a Parquet lake, clustered into events, and served to a WebGL globe and country desk.",
    role: "Product, frontend, data pipeline",
    stack: "React 19 · globe.gl / Three.js · FastAPI · Parquet",
    status: "Live on Render Free",
    badge: "Live",
    links: [
      { label: "Read the case study", href: LINKS.atlasCase, internal: true },
      { label: "Live app", href: LINKS.atlasLive },
      { label: "Source", href: LINKS.atlasSource },
    ],
    facts: "10 source families · 4 time windows · 400-event display cap",
  },
  {
    number: "03",
    year: "2026",
    name: "HVAC Telemetry Lake",
    tagline: "Kafka in, Delta Lake out, DuckDB on top.",
    description:
      "A proof of concept that streams HVAC telemetry through Aiven Kafka over TLS, drains it into a Delta Lake medallion pipeline in PySpark, and serves the gold layer to a FastAPI read path that runs DuckDB queries directly over Arrow. The dirty input is generated on purpose so the quality layer has something real to reject.",
    role: "Streaming, pipeline, serving",
    stack: "Apache Kafka · confluent-kafka · PySpark · Delta Lake · DuckDB · FastAPI",
    status: "Public proof of concept",
    badge: "Open source",
    links: [{ label: "Source", href: LINKS.pocSource }],
    facts:
      "100k records · 56-column silver layer · 15 gold tables · 2 consumer groups",
  },
];

export const STACK = [
  {
    label: "Languages",
    body: "Python, TypeScript, SQL, Bash.",
  },
  {
    label: "Data",
    body: "PySpark, DuckDB, Delta Lake, Databricks, Parquet, PyArrow, pandas.",
  },
  {
    label: "Streaming",
    body: "Apache Kafka, confluent-kafka, consumer groups, server-sent events.",
  },
  {
    label: "Backend",
    body: "FastAPI, Node.js, Express, REST, PostgreSQL, Prisma, Socket.IO.",
  },
  {
    label: "Frontend",
    body: "Next.js, React, TypeScript, Tailwind CSS.",
  },
  {
    label: "Cloud & ops",
    body: "Azure, Docker, GitHub Actions, Render, Neon, TiDB, Unity Catalog, Azure Monitor.",
  },
  {
    label: "Foundations",
    body: "Data modeling, stream processing, query tuning, distributed batch jobs.",
  },
] as const;

export const RECORD = {
  nimcet: {
    rank: "1,030",
    candidates: "50k+",
  },
} as const;

type Certification = {
  issuer: string;
  name: string;
  credential: string;
  status: string;
  meta?: string;
  href?: string;
  linkLabel?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    issuer: "Oracle",
    name: "Oracle Cloud Infrastructure 2025",
    credential: "Foundations Associate",
    status: "Completed",
    meta: "19 Oct 2025 · valid to 19 Oct 2027",
    href: "https://drive.google.com/file/d/19ebwhUo-fTq3QIMKhyKeCyPjSIStSk5x/view?usp=sharing",
    linkLabel: "View certificate",
  },
  {
    issuer: "Udemy",
    name: "Redux · Hooks · GraphQL",
    credential: "Complete React Developer",
    status: "Completed",
    meta: "10 Jul 2025 · 42 hours",
    href: "https://ude.my/UC-89dab715-6ad7-4d3e-89ae-f593fa00aa0b",
    linkLabel: "Verify certificate",
  },
  {
    issuer: "HackerRank",
    name: "Skills certification",
    credential: "REST API (Intermediate)",
    status: "Completed",
    meta: "7 Oct 2025",
    href: "https://www.hackerrank.com/certificates/d69433e49995",
    linkLabel: "Verify certificate",
  },
];


export const WRITING = [
  {
    date: "06 Nov 2026",
    source: "Dev.to",
    title: "Watermarks are a contract: validating 150+ PySpark streams",
    description:
      "A watermark is not a config value. It is a promise about lateness, state, and what the job will silently drop.",
    href: LINKS.devtoWatermarks,
  },
  {
    date: "22 Aug 2023",
    source: "Dev.to",
    title: "How to integrate Clerk in a Next.js application",
    description:
      "A walkthrough for adding Clerk authentication to a Next.js app.",
    href: LINKS.devto,
  },
] as const;

export const PROFILE_PARAGRAPHS = [
  "I work on the layer that has to stay correct. Most of my time goes into pipelines, schemas, and the services product teams depend on, the parts that are invisible when they work and expensive when they don't.",
  "At Nagarro I work across Python, PySpark, FastAPI, DuckDB, and Delta Lake. Outside work I build full products end to end, from the database schema to the interface that makes the data inspectable. The HVAC telemetry lake I build in public runs the whole loop, from a Kafka producer through the medallion pipeline to a FastAPI read path.",
  "I am based in New Delhi and work on IST. I am open to remote-first backend and data roles in India, and to global roles where sponsorship is available.",
] as const;
