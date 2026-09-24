type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  tags?: string[];
  upcoming?: boolean;
};

const events: TimelineEvent[] = [
  {
    date: "Aug 2024",
    title: "Started Data Engineering at NTNU",
    description:
      "Began my bachelor's degree in Data Engineering at NTNU Trondheim — databases, statistics, programming and how data systems actually work end to end.",
    tags: ["NTNU", "Trondheim"],
  },
  {
    date: "Aug 2025",
    title: "Joining TIHLDE Drift",
    description:
      "Joined TIHLDE Drift, the dev-ops and infrastructure group of TIHLDE (the student society at NTNU). Internal projects like Clippy, plus expertise in DNS, Nginx, Docker, Grafana and databases.",
    tags: ["DevOps", "Nginx", "Docker", "Grafana", "DNS"],
  },
  {
    date: "Summer 2026",
    title: "Skatteetaten Internship",
    description:
      "Summer internship at the Norwegian Tax Administration, working on the crypto tax calculator — importing transactions from exchanges and wallets and computing taxable gains with FIFO cost basis.",
    tags: ["Kotlin", "Spring Boot", "React"],
  },
  {
    date: "Summer 2027",
    title: "Bekk Internship",
    description:
      "Summer internship at Bekk, a Norwegian consultancy working across tech, design and strategy. Upcoming — details to come.",
    tags: ["Upcoming"],
  },
];

export function Timeline() {
  return (
    <ol className="relative mx-auto max-w-3xl space-y-10">
      {/* Track + scroll-driven fill */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-primary/15 md:left-1/2"
      />
      <span
        aria-hidden
        className="timeline-fill absolute inset-y-0 left-4 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-primary via-primary/70 to-primary/10 md:left-1/2"
      />
      {events.map((event, index) => {
        const flip = index % 2 === 1;
        return (
          <li
            key={event.title}
            className={`timeline-event group relative pl-12 md:w-1/2 md:pl-0 ${
              flip ? "md:ml-auto md:pl-12" : "md:pr-12"
            }`}
          >
            {/* Dot on the line */}
            <span
              aria-hidden
              className={`absolute top-7 left-4 z-10 -translate-x-1/2 ${
                flip ? "md:left-0" : "md:left-auto md:right-0 md:translate-x-1/2"
              }`}
            >
              <span
                className={`block h-3.5 w-3.5 rounded-full border-2 border-primary bg-background shadow-[0_0_14px_rgba(187,147,92,0.45)] transition-transform duration-300 group-hover:scale-150 ${
                  event.upcoming ? "timeline-dot-pulse" : ""
                }`}
              />
            </span>
            <div className="rounded-xl border border-primary/20 bg-secondary/40 p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:bg-secondary/70 group-hover:shadow-xl group-hover:shadow-primary/15">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {event.date}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-foreground">{event.title}</h3>
              {/* Description expands on hover */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-2.5 text-sm leading-6 text-foreground/70">{event.description}</p>
                  {event.tags ? (
                    <div className="flex flex-wrap gap-2 pt-3">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            event.upcoming
                              ? "border border-dashed border-primary/50 text-primary/80"
                              : "bg-primary/15 text-primary"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        );
      })}
      {/* Fading "to be explored" end */}
      <li aria-hidden className="timeline-event relative h-24">
        <span className="absolute top-7 left-4 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
          <span className="timeline-dot-pulse block h-3.5 w-3.5 rounded-full border-2 border-dashed border-primary/60 bg-background" />
        </span>
        <p className="timeline-fade absolute top-12 left-4 -translate-x-1/2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-primary/60 md:left-1/2">
          To be explored…
        </p>
      </li>
    </ol>
  );
}
