import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-primary/20 bg-secondary/40 transition-colors hover:border-primary/60"
    >
      {project.image ? (
        <div className="relative aspect-video w-full overflow-hidden bg-secondary/60">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{project.title}</h3>
          <span className="text-sm text-foreground/60">{project.year}</span>
        </div>
        <p className="flex-1 text-sm text-foreground/70">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
