"use client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Gallery } from "@/components/Gallery";
import { Tag, Button } from "@/components/primitives";
import { PROJECTS } from "@/lib/projects";
import { useT, STR } from "@/lib/i18n";
import { use } from "react";
import { notFound } from "next/navigation";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useT();
  const resolvedParams = use(params);
  const project = PROJECTS.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  const title = t(project.title);
  const role = t(project.role);
  const summary = t(project.summary);
  const description = t(project.description || project.summary);
  const status = project.private ? t(STR.privateRepo) : t(STR.publicRepo);

  const galleryImages = (project.gallery || []).map((g, i) => ({
    title: g.title,
    alt: g.alt,
    src: `/images/projects/${project.id}/${i + 1}.png`,
  }));

  return (
    <main id="main" className="bg-bg min-h-screen">
      <Navbar />

      {/* BREADCRUMB & BACK */}
      <section className="px-14 pt-8 pb-4 border-b border-border">
        <Link href="/projects" className="font-mono text-[12px] text-text-mute pf-link">
          ← {t({ es: "Volver a proyectos", en: "Back to projects" })}
        </Link>
      </section>

      {/* HEADER */}
      <section className="px-14 py-12 border-b border-border">
        <div className="max-w-[900px]">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="font-mono text-[11px] text-text-dim tracking-[0.06em] uppercase">
              {t(project.role)}
            </span>
            <span className="font-mono text-[11px] text-text-dim">·</span>
            <span className="font-mono text-[11px] text-text-dim">{project.year}</span>
            <span className="font-mono text-[11px] text-text-dim">·</span>
            <span
              className={`font-mono text-[10px] inline-flex items-center gap-1 px-2 py-[3px] border ${
                project.private ? "border-warn text-warn" : "border-ok text-ok"
              }`}
            >
              <span className={`w-1 h-1 inline-block ${project.private ? "bg-warn" : "bg-ok"}`} />
              {status}
            </span>
          </div>

          <h1 className="m-0 text-[52px] font-medium leading-[1.1] tracking-[-0.015em] mb-6">
            {title}
          </h1>

          <p className="m-0 text-[17px] text-text-mute leading-[1.6] max-w-[720px]">
            {description}
          </p>

          <div className="flex gap-3 mt-8 flex-wrap">
            {project.github && !project.private && (
              <a href={project.github} target="_blank" rel="noreferrer" className="no-underline">
                <Button kind="ghost">GitHub ↗</Button>
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="no-underline">
                <Button kind="primary">Ver en vivo ↗</Button>
              </a>
            )}
            {project.private && (
              <div className="p-3 border border-warn bg-warn/5 text-[13px] text-text-mute">
                {t(STR.privateMsg)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="px-14 py-10 border-b border-border">
        <div className="font-mono text-[12px] text-text-dim tracking-[0.12em] mb-5">
          {t({ es: "STACK TÉCNICO", en: "TECH STACK" })}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </section>

      {/* CHALLENGES & SOLUTIONS */}
      {(project.challenges || []).length > 0 && (
        <section className="px-14 py-10 border-b border-border">
          <div className="grid grid-cols-2 gap-10">
            {/* Challenges */}
            <div>
              <div className="font-mono text-[12px] text-text-dim tracking-[0.12em] mb-6">
                {t({ es: "DESAFÍOS", en: "CHALLENGES" })}
              </div>
              <div className="space-y-6">
                {project.challenges?.map((ch, i) => (
                  <div key={i} className="pb-5 border-b border-border-hi last:border-0">
                    <h3 className="text-[16px] font-medium mb-2">{t(ch.title)}</h3>
                    <p className="text-[13px] text-text-mute leading-[1.55]">{t(ch.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <div className="font-mono text-[12px] text-text-dim tracking-[0.12em] mb-6">
                {t({ es: "SOLUCIONES", en: "SOLUTIONS" })}
              </div>
              <div className="space-y-6">
                {project.solutions?.map((sol, i) => (
                  <div key={i} className="pb-5 border-b border-border-hi last:border-0">
                    <h3 className="text-[16px] font-medium mb-2">{t(sol.title)}</h3>
                    <p className="text-[13px] text-text-mute leading-[1.55]">{t(sol.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {galleryImages.length > 0 && <Gallery images={galleryImages} />}

      {/* CTA SECTION */}
      <section className="px-14 py-12 border-b border-border bg-surface/50">
        <div className="max-w-[640px]">
          <p className="m-0 text-[15px] text-text-mute leading-[1.6] mb-6">
            {t({ es: "¿Te interesa este proyecto o tienes una idea similar?", en: "Interested in this project or have a similar idea?" })}
          </p>
          <Link href="/about#contact" className="no-underline">
            <Button kind="primary">{t({ es: "Contáctame", en: "Get in touch" })} →</Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-14 py-7 flex justify-between items-center bg-surface">
        <div className="font-mono text-[11px] text-text-dim">{t(STR.footerNote)}</div>
        <div className="flex gap-3.5">
          <a className="font-mono pf-link text-[12px]" href="https://github.com/lpzzlnrd">
            github
          </a>
          <a className="font-mono pf-link text-[12px]" href="https://gitlab.com/lpzzlnrd">
            gitlab
          </a>
          <a className="font-mono pf-link text-[12px]" href="mailto:lcorrea@botinfy.com">
            email
          </a>
        </div>
      </footer>
    </main>
  );
}
