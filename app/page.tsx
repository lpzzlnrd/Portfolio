"use client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/primitives";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/projects";
import { useT, STR } from "@/lib/i18n";

export default function HomePage() {
  const t = useT();
  const featured = PROJECTS.slice(0, 3);
  const stack = ["TypeScript", "NestJS", "Next.js", "Postgres", "Redis", "Supabase", "Node", "Docker"];

  return (
    <main id="main" className="bg-bg min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative px-6 md:px-14 pt-16 pb-12 md:pt-[72px] md:pb-20 border-b border-border overflow-hidden">
        <div className="pf-grid-bg absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative max-w-[1100px]">
          <div className="flex items-center gap-3.5 mb-8">
            <span className="font-mono text-[11px] px-2.5 py-1 border border-border text-text-mute tracking-[0.12em]">
              [ {t(STR.rolePill)} ]
            </span>
            <span className="font-mono text-[11px] text-ok inline-flex items-center gap-[7px] tracking-[0.06em]">
              <span className="w-[7px] h-[7px] bg-ok inline-block" />
              {t(STR.available).toUpperCase()}
            </span>
          </div>

          <h1 className="m-0 text-[40px] md:text-[76px] font-medium leading-[1.1] md:leading-[1.04] tracking-[-0.02em]">
            {t(STR.pitchA)} <br className="hidden md:block" />
            {t(STR.pitchB)} <br className="hidden md:block" />
            <span className="text-accent">{t(STR.pitchC)}</span>
          </h1>

          <p className="mt-8 mb-0 max-w-[640px] text-[16px] md:text-[17px] text-text-mute leading-[1.6]">
            {t(STR.pitchSub)}
          </p>

          <div className="flex gap-2.5 mt-9 flex-wrap">
            <Link href="/projects" className="no-underline">
              <Button kind="primary">{t(STR.ctaWork)} →</Button>
            </Link>
            <a href="https://github.com/lpzzlnrd" target="_blank" rel="noreferrer" className="no-underline">
              <Button kind="ghost">{t(STR.ctaGithub)} ↗</Button>
            </a>
            <Link href="/about#contact" className="no-underline">
              <Button kind="ghost">{t(STR.ctaContact)}</Button>
            </Link>
          </div>
        </div>

        <div className="font-mono absolute top-6 right-8 text-[11px] text-text-faint text-right leading-[1.6] hidden md:block">
          <div>v 1.0 · {new Date().getFullYear()}</div>
          <div>Valencia, Venezuela · UTC−4</div>
          <div className="mt-1">{"─".repeat(18)}</div>
        </div>
      </section>

      {/* STACK STRIP */}
      <section className="px-6 md:px-14 py-6 border-b border-border flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-surface">
        <div className="font-mono text-[11px] text-text-dim tracking-[0.12em] shrink-0">
          {t(STR.stack)}
        </div>
        <div className="flex gap-x-4 gap-y-2 flex-wrap items-center">
          {stack.map((s, i) => (
            <span key={s} className="font-mono text-[13px] text-text inline-flex items-center gap-2.5">
              {i > 0 && <span className="text-text-faint hidden md:inline">·</span>}
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="px-6 md:px-14 pt-14 pb-16">
        <div className="flex justify-between items-baseline mb-7 pb-3.5 border-b border-border">
          <div className="font-mono text-[12px] tracking-[0.14em] text-text">
            <span className="text-accent">{"// "}</span>
            {t(STR.selected)}
          </div>
          <Link href="/projects" className="font-mono pf-link text-[12px]">{t(STR.allWork)} →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((p) => <ProjectCard key={p.id} p={p} mode="grid" />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 md:px-14 py-7 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface">
        <div className="font-mono text-[11px] text-text-dim text-center md:text-left">{t(STR.footerNote)}</div>
        <div className="flex gap-3.5">
          <a className="font-mono pf-link text-[12px]" href="https://github.com/lpzzlnrd">github</a>
          <a className="font-mono pf-link text-[12px]" href="https://gitlab.com/lpzzlnrd">gitlab</a>
          <a className="font-mono pf-link text-[12px]" href="mailto:lcorrea@botinfy.com">email</a>
        </div>
      </footer>
    </main>
  );
}
