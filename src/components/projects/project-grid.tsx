import type { Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
