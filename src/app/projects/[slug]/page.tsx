import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProject } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

/** Pre-render every project page at build time (fully static). */
export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <Link
        href="/projects"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← All projects
      </Link>

      <div className="mt-6 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">{project.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge>{project.year}</Badge>
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      {project.image ? (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      ) : null}

      <div className="mt-8 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        {project.summary}
      </div>

      <div className="mt-8 flex gap-3">
        {project.demoUrl ? <Button href={project.demoUrl}>View live demo</Button> : null}
        {project.repoUrl ? (
          <Button href={project.repoUrl} variant="secondary">
            Source code
          </Button>
        ) : null}
      </div>
    </main>
  );
}
