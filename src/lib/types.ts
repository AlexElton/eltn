export type Project = {
  /** URL identifier, used in /projects/[slug] */
  slug: string;
  title: string;
  description: string;
  /** Longer summary shown on the project detail page */
  summary: string;
  tags: string[];
  year: number;
  /** Live demo URL, if deployed */
  demoUrl?: string;
  /** Source code URL, if public */
  repoUrl?: string;
  /** Path under /public, e.g. /images/projects/my-app.png */
  image?: string;
  featured?: boolean;
};
