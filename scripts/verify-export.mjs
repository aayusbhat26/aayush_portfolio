import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = "out";
const missing = [];

const required = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "resume.pdf",
  "og/home.png",
  "work/taskflow/index.html",
  "work/globe-news-atlas/index.html",
];

for (const file of required) {
  if (!existsSync(join(out, file))) missing.push(file);
}

const home = join(out, "index.html");
if (existsSync(home)) {
  const html = readFileSync(home, "utf8");
  const refs = new Set(
    [...html.matchAll(/(?:href|src)="(\/_next\/[^"]+)"/g)].map((match) => match[1])
  );

  if (refs.size === 0) missing.push("no /_next asset references in index.html");

  for (const ref of refs) {
    if (!existsSync(join(out, ref.slice(1)))) missing.push(ref);
  }
}

if (missing.length > 0) {
  console.error("Static export is incomplete. Missing:");
  for (const file of missing) console.error(`  ${file}`);
  process.exit(1);
}

console.log(
  `Static export verified: HTML routes, ${required.length} required files, and all homepage _next assets are present.`
);
