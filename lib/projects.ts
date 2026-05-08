import { promises as fs } from "node:fs";
import path from "node:path";
import { projectsIndex } from "@/content/projects";

const projectsDir = path.join(process.cwd(), "content", "projects");

export async function getProjects() {
  return projectsIndex;
}

export async function getProjectBySlug(slug: string) {
  return projectsIndex.find((project) => project.slug === slug) ?? null;
}

export async function getProjectMarkdown(slug: string) {
  const filePath = path.join(projectsDir, `${slug}.md`);
  return fs.readFile(filePath, "utf8");
}

export function getProjectSlugs() {
  return projectsIndex.map((project) => project.slug);
}
