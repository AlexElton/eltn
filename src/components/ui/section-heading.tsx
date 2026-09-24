export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      {subtitle ? <p className="mt-2 text-foreground/70">{subtitle}</p> : null}
    </div>
  );
}
