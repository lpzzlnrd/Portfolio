import type { ProjectEntry } from "@/content/projects";
import { Tag } from "@/components/Tag";

export function ProjectHeader({ project }: { project: ProjectEntry }) {
  return (
    <header className="space-y-4">
      <p className="text-sm text-zinc-400">Caso de estudio</p>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">{project.title}</h1>
      <p className="max-w-3xl text-base leading-8 text-zinc-300">{project.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {project.privateRepo ? <Tag className="border-amber-700 text-amber-200">Repo privado</Tag> : null}
      </div>
    </header>
  );
}
