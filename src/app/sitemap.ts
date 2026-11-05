import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const lastModified = new Date("2026-11-04");

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/work/taskflow/", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/work/globe-news-atlas/",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
