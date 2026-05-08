import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ProjectHeader } from "@/components/ProjectHeader";
import { getProjectBySlug, getProjectMarkdown, getProjectSlugs } from "@/lib/projects";

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} | lpzzlnrd Portfolio`,
      description: project.excerpt,
      url: `https://portfolio-lpzzlnrd.vercel.app/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      title: `${project.title} | lpzzlnrd Portfolio`,
      description: project.excerpt,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const content = await getProjectMarkdown(project.slug);

  return (
    <article className="space-y-8">
      <ProjectHeader project={project} />
      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
        <MarkdownRenderer content={content} />
      </section>
    </article>
  );
}
