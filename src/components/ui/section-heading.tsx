export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {subtitle ? <p className="mt-2 text-zinc-600 dark:text-zinc-400">{subtitle}</p> : null}
    </div>
  );
}
