import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/projects/project-grid";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6">
      <section className="flex flex-col items-start gap-6 py-24">
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
          Hi, I&apos;m eltn. I build things for the web.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A short intro goes here — what you do, what you care about, and what makes you interesting
          to work with.
        </p>
        <div className="flex gap-3">
          <Button href="/projects">View projects</Button>
          <Button href="/contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="pb-24">
          <SectionHeading title="Featured work" subtitle="A few projects I am proud of." />
          <ProjectGrid projects={featured} />
        </section>
      ) : null}
    </main>
  );
}
