import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am and what I do.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <SectionHeading title="About" />
      <div className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        <p>
          Write a short introduction here — who you are, what you build, and what you are looking
          for.
        </p>
      </div>
    </main>
  );
}
