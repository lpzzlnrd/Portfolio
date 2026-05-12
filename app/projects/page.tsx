"use client";
import { useState, useMemo } from "react";
import clsx from "clsx";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS, type Domain } from "@/lib/projects";
import { useT, STR } from "@/lib/i18n";

type FilterKey = "all" | Domain;

export default function ProjectsPage() {
  const t = useT();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [active, setActive] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PROJECTS.length };
    for (const p of PROJECTS) c[p.domain] = (c[p.domain] ?? 0) + 1;
    return c;
  }, []);

  const filters: { k: FilterKey; label: string }[] = [
    { k: "all",          label: t(STR.all) },
    { k: "auth",         label: t({ es: "Auth & sesiones", en: "Auth & sessions" }) },
    { k: "fullstack",    label: t({ es: "Full-stack",      en: "Full-stack" }) },
    { k: "data",         label: "ETL & data" },
    { k: "integrations", label: t({ es: "Integraciones",   en: "Integrations" }) },
  ];

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = PROJECTS.filter((p) => {
    const matchesDomain = active === "all" || p.domain === active;
    if (!matchesDomain) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      p.id,
      p.domain,
      p.title.es,
      p.title.en,
      p.role.es,
      p.role.en,
      p.summary.es,
      p.summary.en,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return (
    <main id="main" className="bg-bg min-h-screen">
      <Navbar />

      <section className="px-6 md:px-14 pt-12 pb-8 border-b border-border relative">
        <div className="font-mono text-[11px] text-text-dim tracking-[0.14em] mb-3.5">/projects</div>
        <h1 className="m-0 text-[36px] md:text-[52px] font-medium tracking-[-0.015em]">
          {t(STR.projectsH)}<span className="text-accent">.</span>
        </h1>
        <p className="mt-3.5 mb-0 max-w-[640px] text-[15px] text-text-mute leading-[1.55]">
          {t(STR.projectsSub)}
        </p>
      </section>

      {/* FILTER BAR */}
      <section className="px-6 md:px-14 py-4 border-b border-border bg-surface flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] text-text-dim tracking-[0.12em] uppercase">
            {t(STR.filter)}
          </span>
          <div className="flex flex-wrap gap-1.5 max-w-full" role="group" aria-label="Project filters">
            {filters.map((f) => {
              const isActive = f.k === active;
              return (
                <button
                  type="button"
                  key={f.k}
                  onClick={() => setActive(f.k)}
                  aria-pressed={isActive}
                  className={clsx(
                    "font-mono px-2.5 py-[5px] text-[12px] cursor-pointer border inline-flex items-center gap-[7px] transition-colors duration-[120ms]",
                    isActive
                      ? "border-accent bg-accent-dim text-accent"
                      : "border-border text-text hover:border-border-hi",
                  )}
                >
                  {f.label}
                  <span className={clsx("text-[10px]", isActive ? "text-accent" : "text-text-faint")}>
                    {counts[f.k] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:ml-auto">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] text-text-dim tracking-[0.12em] uppercase">
              {t(STR.search)}
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(STR.searchProjects)}
              className="w-full sm:w-[260px] px-3 py-2 border border-border bg-surface-2 text-text text-[13px] placeholder:text-text-dim focus:outline-none focus:border-accent"
            />
          </label>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-text-dim tracking-[0.12em] uppercase">
              {t(STR.view)}
            </span>
            <div className="inline-flex border border-border-hi" role="group" aria-label="View mode">
              {(["grid", "list"] as const).map((v, i) => (
                <span key={v} className="contents">
                  {i > 0 && <span className="w-px bg-border-hi" />}
                  <button
                    type="button"
                    onClick={() => setView(v)}
                    aria-pressed={view === v}
                    className={clsx(
                      "font-mono px-3 py-1 text-[11px] uppercase tracking-[0.06em] cursor-pointer border-0",
                      view === v ? "bg-text text-bg" : "bg-transparent text-text-mute hover:text-text",
                    )}
                  >
                    {v === "grid" ? t(STR.grid) : t(STR.list)}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* META */}
      <section className="px-6 md:px-14 py-3.5 border-b border-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div className="font-mono text-[11px] text-text-dim tracking-[0.06em]">
          {filtered.length} {t({ es: "resultados", en: "results" })} ·{" "}
          {t({ es: "ordenado por", en: "sorted by" })}{" "}
          <span className="text-text">{t({ es: "año ↓", en: "year ↓" })}</span>
        </div>
        <div className="font-mono text-[11px] text-text-dim">
          {filtered.filter((p) => p.private).length} {t({ es: "privados", en: "private" })} ·{" "}
          {filtered.filter((p) => !p.private).length} {t({ es: "públicos", en: "public" })}
        </div>
      </section>

      {/* RESULTS */}
      {view === "grid" ? (
        <section className="px-6 md:px-14 pt-8 pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => <ProjectCard key={p.id} p={p} mode="grid" />)}
          </div>
        </section>
      ) : (
        <section className="py-2 pb-8 overflow-x-auto">
          <div className="min-w-[800px] lg:min-w-0">
            <div className="grid grid-cols-[80px_1.4fr_1fr_1fr_110px] gap-6 px-6 md:px-[76px] py-3 border-b border-border font-mono">
              {[
                t({ es: "Año", en: "Year" }),
                t({ es: "Proyecto", en: "Project" }),
                t({ es: "Resumen", en: "Summary" }),
                "Stack",
                t({ es: "Estado", en: "Status" }),
              ].map((h, i) => (
                <div key={i} className={clsx(
                  "text-[10.5px] text-text-dim tracking-[0.12em] uppercase",
                  i === 4 ? "text-right" : "text-left",
                )}>{h}</div>
              ))}
            </div>
            <div className="px-6 md:px-14">
              {filtered.map((p) => <ProjectCard key={p.id} p={p} mode="list" />)}
            </div>
          </div>
        </section>
      )}

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
