import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { CourseMap } from "@/components/race/course-map";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am and what I do.",
};

const race = {
  name: "IRONMAN Frankfurt",
  date: "28.06.2026",
  resultsUrl: "https://www.ironman.com/races/im-frankfurt/results",
  finishTime: "6:53:10",
  overallRank: "609 / 4166",
  genderRank: "581 / 747",
  divisionRank: "43 / 51",
  splits: [
    { leg: "Swim", distance: "3.8 km", time: "1:12:57", pace: "1:55 /100m", rank: "51" },
    { leg: "T1", distance: "", time: "0:06:45", pace: "", rank: "" },
    { leg: "Bike", distance: "125 km", time: "3:43:23", pace: "33.6 km/h", rank: "64" },
    { leg: "T2", distance: "", time: "0:02:50", pace: "", rank: "" },
    { leg: "Run", distance: "21.1 km", time: "1:47:15", pace: "5:05 /km", rank: "43" },
  ],
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <SectionHeading title="About" />
      <div className="max-w-2xl text-lg leading-8 text-foreground/80">
        <p>
          Write a short introduction here — who you are, what you build, and what you are looking
          for.
        </p>
      </div>

      <section className="mt-16">
        <SectionHeading title={race.name} subtitle={race.date} />
        <CourseMap />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge>{race.finishTime}</Badge>
          <Badge>Overall {race.overallRank}</Badge>
          <Badge>Gender {race.genderRank}</Badge>
          <Badge>Division {race.divisionRank}</Badge>
        </div>

        <table className="mt-6 w-full text-left text-sm">
          <thead className="text-foreground/60">
            <tr>
              <th className="py-2 pr-4 font-medium">Leg</th>
              <th className="py-2 pr-4 font-medium">Time</th>
              <th className="py-2 pr-4 font-medium">Avg. pace</th>
              <th className="py-2 pr-4 font-medium">Div. rank</th>
            </tr>
          </thead>
          <tbody className="text-foreground/80">
            {race.splits.map((split) => (
              <tr key={split.leg} className="border-t border-primary/10">
                <td className="py-2 pr-4">
                  {split.leg}
                  {split.distance ? (
                    <span className="text-foreground/50"> · {split.distance}</span>
                  ) : null}
                </td>
                <td className="py-2 pr-4 font-mono">{split.time}</td>
                <td className="py-2 pr-4 font-mono">{split.pace || "—"}</td>
                <td className="py-2 pr-4 font-mono">{split.rank || "—"}</td>
              </tr>
            ))}
            <tr className="border-t border-primary/20 font-semibold text-foreground">
              <td className="py-2 pr-4">Overall</td>
              <td className="py-2 pr-4 font-mono">{race.finishTime}</td>
              <td className="py-2 pr-4 font-mono">—</td>
              <td className="py-2 pr-4 font-mono">{race.divisionRank.split(" / ")[0]}</td>
            </tr>
          </tbody>
        </table>

        <a
          href={race.resultsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm text-primary underline underline-offset-4 hover:text-primary/80"
        >
          Full results
        </a>
      </section>
    </main>
  );
}
