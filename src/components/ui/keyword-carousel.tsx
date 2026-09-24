/** Auto-scrolling keyword marquee. Pure CSS — no client JS. */
export function KeywordCarousel({ items }: { items: string[] }) {
  // Duplicate the list so the -50% translate loops seamlessly
  const row = [...items, ...items];

  return (
    <div
      className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)]"
      role="list"
      aria-label="Keywords"
    >
      <div className="flex w-max animate-marquee gap-2 group-hover:[animation-play-state:paused]">
        {row.map((keyword, i) => (
          <span
            key={`${keyword}-${i}`}
            role="listitem"
            aria-hidden={i >= items.length}
            className="inline-flex shrink-0 items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
