import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import ProfileSection from "@/components/site/ProfileSection";
import ExperienceSection from "@/components/site/ExperienceSection";
import ProjectsSection from "@/components/site/ProjectsSection";
import StackSection from "@/components/site/StackSection";
import RecordSection from "@/components/site/RecordSection";
import WritingSection from "@/components/site/WritingSection";
import CertificationsSection from "@/components/site/CertificationsSection";
import ContactSection from "@/components/site/ContactSection";
import SiteFooter from "@/components/site/SiteFooter";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...socialMetadata({
    title: "Aayush Bhat — Backend & Data Engineer",
    description:
      "Production data pipelines, APIs, and two live products. Selected work, case files, and a verified record.",
    image: "/og/home.png",
    alt: "Aayush Bhat — backend and data engineer.",
    path: "/",
  }),
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProfileSection />
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <RecordSection />
        <WritingSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
