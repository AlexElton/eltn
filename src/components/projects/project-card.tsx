import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      {project.image ? (
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
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
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{project.title}</h3>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{project.year}</span>
        </div>
        <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
