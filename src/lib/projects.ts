import type { Project } from "@/lib/types";
import portfolioSite from "@/content/projects/portfolio-site.json";
import weatherApp from "@/content/projects/weather-app.json";

/**
 * All projects, newest first. Add a new project by dropping a JSON file in
 * src/content/projects/ and importing it here.
 */
const projects: Project[] = [portfolioSite, weatherApp].sort((a, b) => b.year - a.year);

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured === true);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
