import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import JsonLd from "@/components/seo/JsonLd";
import { personSchema, SITE_URL, websiteSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: "Aayush Bhat — Backend & Data Engineer",
  description:
    "Backend and data engineer in New Delhi. Pipelines, APIs, and the services product teams depend on. Selected work, case files, and a verified record.",
  authors: [{ name: "Aayush Bhat" }],
  creator: "Aayush Bhat",
  keywords: [
    "Aayush Bhat",
    "backend engineer",
    "data engineer",
    "PySpark",
    "FastAPI",
    "DuckDB",
    "Delta Lake",
    "remote engineer",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f4f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const goatcounter = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f4f4f0] text-[#111111]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#111] focus:px-4 focus:py-2 focus:font-mono focus:text-[9px] focus:uppercase focus:tracking-[0.12em] focus:text-[#f4f4f0]"
        >
          Skip to content
        </a>
        <JsonLd data={personSchema} />
        <JsonLd data={websiteSchema} />
        {children}
        {goatcounter ? (
          <Script
            data-goatcounter={`https://${goatcounter}.goatcounter.com/count`}
            src="https://gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
