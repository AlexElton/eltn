import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <SectionHeading title="Contact" subtitle="The fastest way to reach me is by email." />
      <div className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
        <p>
          Reach me at{" "}
          <a
            href="mailto:you@example.com"
            className="font-medium text-zinc-900 underline dark:text-zinc-50"
          >
            you@example.com
          </a>{" "}
          or find me on{" "}
          <a
            href="https://github.com/your-username"
            className="font-medium text-zinc-900 underline dark:text-zinc-50"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
