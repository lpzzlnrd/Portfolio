import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { getProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home",
    description: "Portfolio profesional con enfoque en problemáticas, decisiones técnicas, soluciones y arquitectura.",
    openGraph: {
      title: "Home | lpzzlnrd Portfolio",
      description: "Portfolio profesional con enfoque en problemáticas, decisiones técnicas, soluciones y arquitectura.",
      url: "https://portfolio-lpzzlnrd.vercel.app/",
    },
    twitter: {
      title: "Home | lpzzlnrd Portfolio",
      description: "Portfolio profesional con enfoque en problemáticas, decisiones técnicas, soluciones y arquitectura.",
    },
  };
}

export default async function Home() {
  const projects = await getProjects();
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <p className="text-sm text-zinc-400">Software Engineer</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
          Portfolio técnico con casos reales de backend, full-stack, auth, ETL y sistemas críticos.
        </h1>
        <p className="max-w-3xl text-base leading-8 text-zinc-300">
          Cada proyecto está documentado como caso de estudio: contexto, problemáticas, decisiones, solución implementada,
          stack, rol y links.
        </p>
        <Link
          href="/projects"
          className="inline-flex rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-zinc-500"
        >
          Ver todos los proyectos
        </Link>
      </section>

      <Section title="Proyectos destacados">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}
