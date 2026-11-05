# Aayush Bhat — Portfolio

A one-page backend and data engineering portfolio. Off-white paper, near-black
ink, Geist Sans / Geist Mono, thin rules, large type, and a restrained oxide
accent. No 3D room and no dark mode.

## Pages

- `/` — hero, profile, experience, projects, stack, record, writing,
  certifications, contact
- `/work/taskflow` — TaskFlow case study
- `/work/globe-news-atlas` — Globe News Atlas case study
- Branded not-found page

## Theme

- `#f4f4f0` paper, `#111111` ink, `#c74634` oxide accent.
- Geist Sans and Geist Mono, bundled through the `geist` package.
- A pinned paper hero with a black continuation panel that slides over it on scroll.
- Large uppercase display type, mono metadata, hairline borders, and subtle
  paper grain.
- Scroll reveals use CSS `animation-timeline: view()` and respect
  `prefers-reduced-motion`.

## Content

| What | Where |
|---|---|
| Homepage sections | `src/components/site/` |
| Case-study layout | `src/components/case-study/` |
| Verified content and links | `src/lib/site.ts` |
| Metadata, JSON-LD, social helpers | `src/lib/seo.ts` |
| Case studies | `src/app/work/` |
| Project screenshots | `public/work/` |
| LeetCode snapshot + sync script | `src/data/leetcode.json`, `scripts/sync-leetcode.mjs` |
| Private certification learning plan | `docs/certification-learning-plan.md` |
| Dev.to drafts | `content/devto/` |

## Stack

- Next.js 16 App Router with `output: "export"`
- React 19
- Tailwind CSS 4
- Geist via the `geist` package
- Static hosting configuration in `render.yaml`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The static site is written to `out/`.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin to enable absolute canonical
URLs, Open Graph images, and a populated sitemap. Without it, the site still
builds; social metadata is omitted rather than pointing at localhost.

## LeetCode record sync

The Record section reads `src/data/leetcode.json`. The workflow in
`.github/workflows/sync-leetcode.yml` fetches the public LeetCode profile daily
at 03:17 UTC, commits the snapshot only when something changed, and triggers a
Render deploy when the optional `RENDER_DEPLOY_HOOK_URL` secret is configured.

Run it manually with:

```bash
node scripts/sync-leetcode.mjs
```
