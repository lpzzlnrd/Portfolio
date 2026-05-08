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
      <section className="relative px-14 pt-[72px] pb-20 border-b border-border overflow-hidden">
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

          <h1 className="m-0 text-[76px] font-medium leading-[1.04] tracking-[-0.02em]">
            {t(STR.pitchA)} <br />
            {t(STR.pitchB)} <br />
            <span className="text-accent">{t(STR.pitchC)}</span>
          </h1>

          <p className="mt-8 mb-0 max-w-[640px] text-[17px] text-text-mute leading-[1.6]">
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

        <div className="font-mono absolute top-6 right-8 text-[11px] text-text-faint text-right leading-[1.6]">
          <div>v 1.0 · {new Date().getFullYear()}</div>
          <div>Valencia, Venezuela · UTC−4</div>
          <div className="mt-1">{"─".repeat(18)}</div>
        </div>
      </section>

      {/* STACK STRIP */}
      <section className="px-14 py-6 border-b border-border flex items-center gap-8 bg-surface">
        <div className="font-mono text-[11px] text-text-dim tracking-[0.12em]">
          {t(STR.stack)}
        </div>
        <div className="flex gap-2.5 flex-wrap items-center">
          {stack.map((s, i) => (
            <span key={s} className="font-mono text-[13px] text-text inline-flex items-center gap-2.5">
              {i > 0 && <span className="text-text-faint">·</span>}
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="px-14 pt-14 pb-16">
        <div className="flex justify-between items-baseline mb-7 pb-3.5 border-b border-border">
          <div className="font-mono text-[12px] tracking-[0.14em] text-text">
            <span className="text-accent">{"// "}</span>
            {t(STR.selected)}
          </div>
          <a href="/projects" className="font-mono pf-link text-[12px]">{t(STR.allWork)} →</a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {featured.map((p) => <ProjectCard key={p.id} p={p} mode="grid" />)}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-14 py-7 flex justify-between items-center bg-surface">
        <div className="font-mono text-[11px] text-text-dim">{t(STR.footerNote)}</div>
        <div className="flex gap-3.5">
          <a className="font-mono pf-link text-[12px]" href="https://github.com/lpzzlnrd">github</a>
          <a className="font-mono pf-link text-[12px]" href="https://gitlab.com/lpzzlnrd">gitlab</a>
          <a className="font-mono pf-link text-[12px]" href="mailto:lcorrea@botinfy.com">email</a>
        </div>
      </footer>
    </main>
  );
}
