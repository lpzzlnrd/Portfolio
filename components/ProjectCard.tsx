"use client";
import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/lib/projects";
import { useT, STR } from "@/lib/i18n";
import { Tag } from "./primitives";

export function ProjectCard({ p, mode = "grid" }: { p: Project; mode?: "grid" | "list" }) {
  const t = useT();
  const title = t(p.title);
  const role  = t(p.role);
  const sum   = t(p.summary);
  const status = p.private ? t(STR.privateRepo) : t(STR.publicRepo);

  if (mode === "list") {
    return (
      <Link
        href={`/projects/${p.id}`}
        className="grid grid-cols-[80px_1.4fr_1fr_1fr_110px] gap-6 items-center px-5 py-4 border-b border-border hover:bg-surface/40 cursor-pointer no-underline text-text"
      >
        <span className="font-mono text-[12px] text-text-dim">{p.year}</span>
        <div>
          <div className="text-[16px] font-medium">{title}</div>
          <div className="font-mono text-[11px] text-text-dim mt-[3px] tracking-[0.04em] uppercase">{role}</div>
        </div>
        <div className="text-[13px] text-text-mute leading-[1.5]">{sum}</div>
        <div className="flex flex-wrap gap-1">
          {p.tags.slice(0, 4).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div className={clsx(
          "font-mono text-[11px] text-right flex items-center gap-1.5 justify-end",
          p.private ? "text-warn" : "text-ok",
        )}>
          <span className={clsx("w-1.5 h-1.5 inline-block", p.private ? "bg-warn" : "bg-ok")} />
          {status}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${p.id}`}
      className="border border-border bg-surface flex flex-col cursor-pointer relative no-underline text-text transition-colors duration-[120ms] hover:border-border-hi"
    >
      <div className="h-[140px] border-b border-border bg-bg relative overflow-hidden">
        <div className="pf-grid-bg absolute inset-0 opacity-55" />
        <div className="absolute inset-[18px] border border-dashed border-border-hi flex items-center justify-center">
          <div className="font-mono text-[11px] text-text-faint tracking-[0.1em]">
            ▮▮▮▮  {p.id.toUpperCase()}  ▮▮▮▮
          </div>
        </div>
        <div className={clsx(
          "absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-1.5 py-[2px] border bg-bg",
          p.private ? "border-warn" : "border-ok",
        )}>
          <span className={clsx("w-1 h-1 inline-block", p.private ? "bg-warn" : "bg-ok")} />
          <span className={clsx("font-mono text-[10px] tracking-[0.06em]", p.private ? "text-warn" : "text-ok")}>
            {status}
          </span>
        </div>
      </div>

      <div className="p-4 pb-[18px] flex flex-col gap-2.5 flex-1">
        <span className="font-mono text-[11px] text-text-dim tracking-[0.04em] uppercase">
          {role} · {p.year}
        </span>
        <h3 className="m-0 text-[17px] font-medium leading-[1.3]">{title}</h3>
        <p className="m-0 text-[13px] text-text-mute leading-[1.55] flex-1">{sum}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {p.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div className="font-mono mt-2 pt-3 border-t border-border text-[12px] text-accent flex items-center gap-1.5">
          {t(STR.caseStudy)} <span>→</span>
        </div>
      </div>
    </Link>
  );
}
