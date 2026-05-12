"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type BtnKind = "primary" | "ghost" | "plain";

export function Button({
  kind = "primary",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { kind?: BtnKind }) {
  return (
    <button
      {...rest}
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2.5",
        "font-mono text-[13px] font-medium tracking-wide",
        "border whitespace-nowrap select-none",
        "transition-[background,color,border-color] duration-[120ms]",
        "focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2",
        kind === "primary" && "bg-accent text-bg border-accent hover:brightness-95",
        kind === "ghost"   && "bg-transparent text-text border-border-hi hover:bg-surface",
        kind === "plain"   && "bg-transparent text-text-mute border-border hover:text-text",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Chip({ active, children }: { active?: boolean; children: ReactNode }) {
  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 px-2 py-[3px] font-mono text-[11px] tracking-wide border",
      active ? "border-accent bg-accent-dim text-accent" : "border-border text-text",
    )}>
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-text-mute border border-border px-1.5 py-[2px]">
      {children}
    </span>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] px-[5px] py-[1px] border border-border bg-surface-2 text-text-mute shadow-[inset_0_-1px_0_var(--color-border)]">
      {children}
    </span>
  );
}

export function SectionLabel({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.12em] text-text-dim flex items-center gap-2.5 pb-2 border-b border-border mb-4">
      {n && <span className="text-accent">{n}</span>}
      <span className="uppercase">{children}</span>
    </div>
  );
}
