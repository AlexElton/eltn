import type { Project } from "@/lib/types";
import clippy from "@/content/projects/clippy.json";
import kryptokalkulator from "@/content/projects/kryptokalkulator.json";

/**
 * All projects, newest first. Add a new project by dropping a JSON file in
 * src/content/projects/ and importing it here.
 */
const projects: Project[] = [kryptokalkulator, clippy];

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
