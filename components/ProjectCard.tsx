import Link from "next/link";
import type { ProjectEntry } from "@/content/projects";
import { Tag } from "@/components/Tag";

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-zinc-100">{project.title}</h2>
          <p className="text-sm text-zinc-300">{project.excerpt}</p>
        </div>
        <p className="text-xs uppercase tracking-wide text-zinc-500">{project.role}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {project.privateRepo ? <Tag className="border-amber-700 text-amber-200">Repo privado</Tag> : null}
        </div>
      </div>
      <div className="mt-6">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:border-zinc-500"
        >
          Leer caso de estudio
        </Link>
      </div>
    </article>
  );
}
