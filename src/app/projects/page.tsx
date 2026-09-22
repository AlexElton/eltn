import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/project-grid";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of projects I have built.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <SectionHeading title="Projects" subtitle="Things I have designed, built and shipped." />
      <ProjectGrid projects={projects} />
    </main>
  );
}
