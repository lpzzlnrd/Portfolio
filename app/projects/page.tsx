import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description: "Listado de proyectos con enfoque en problemáticas, decisiones técnicas, solución y stack.",
    openGraph: {
      title: "Projects | lpzzlnrd Portfolio",
      description: "Listado de proyectos con enfoque en problemáticas, decisiones técnicas, solución y stack.",
      url: "https://portfolio-lpzzlnrd.vercel.app/projects",
    },
    twitter: {
      title: "Projects | lpzzlnrd Portfolio",
      description: "Listado de proyectos con enfoque en problemáticas, decisiones técnicas, solución y stack.",
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Projects</h1>
        <p className="text-zinc-300">Casos de estudio técnicos con arquitectura, flujos, decisiones y tradeoffs.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
