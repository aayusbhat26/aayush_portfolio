import type { Metadata } from "next";
import { LINKS, PROFILE } from "./site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
export const EMAIL = LINKS.email;
export const LINKEDIN = LINKS.linkedin;
export const GITHUB = LINKS.github;
export const LEETCODE = LINKS.leetcode;
export const RESUME = LINKS.resume;

export function socialMetadata({
  title,
  description,
  image,
  alt,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
  path: string;
  type?: "website" | "article" | "profile";
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  if (!SITE_URL) return {};

  return {
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.title,
  description:
    "Backend and data engineer building production pipelines, APIs, and the services that keep them correct.",
  email: LINKS.email,
  worksFor: {
    "@type": "Organization",
    name: PROFILE.company,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  ...(SITE_URL ? { url: SITE_URL } : {}),
  sameAs: [LINKS.linkedin, LINKS.github, LINKS.leetcode],
  knowsAbout: [
    "Backend engineering",
    "Data engineering",
    "PySpark",
    "Python",
    "FastAPI",
    "DuckDB",
    "SQL",
    "Delta Lake",
    "Databricks",
    "PostgreSQL",
    "Next.js",
    "TypeScript",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "USICT, Delhi" },
    {
      "@type": "CollegeOrUniversity",
      name: "Integrated Institute of Technology, Dwarka",
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aayush Bhat — Portfolio",
  description:
    "Backend and data engineering portfolio with selected work, case studies, and a verified record.",
  ...(SITE_URL ? { url: SITE_URL } : {}),
  author: {
    "@type": "Person",
    name: "Aayush Bhat",
  },
};

export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished = "2026-10-24",
}: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    datePublished,
    image: SITE_URL ? `${SITE_URL}${image}` : image,
    ...(SITE_URL ? { mainEntityOfPage: `${SITE_URL}${path}` } : {}),
    author: {
      "@type": "Person",
      name: "Aayush Bhat",
      ...(SITE_URL ? { url: SITE_URL } : {}),
    },
  };
}
