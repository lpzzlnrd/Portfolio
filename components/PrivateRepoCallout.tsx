"use client";
import { useT, STR } from "@/lib/i18n";

export function PrivateRepoCallout() {
  const t = useT();
  return (
    <div
      className="border border-border p-4 flex gap-3.5 items-start"
      style={{ background: "linear-gradient(180deg, rgb(245 158 11 / 0.04), transparent)" }}
    >
      <div className="font-mono shrink-0 w-7 h-7 border border-warn flex items-center justify-center text-warn text-[13px]">
        ▣
      </div>
      <div className="flex-1">
        <div className="font-mono text-[11px] text-warn uppercase tracking-[0.08em]">
          {t(STR.privateRepo)}
        </div>
        <div className="text-[13px] text-text-mute mt-1 leading-[1.5]">
          {t(STR.privateMsg)}
        </div>
      </div>
      <button
        type="button"
        className="font-mono text-[11px] px-2 py-1 bg-transparent text-text border border-border-hi hover:bg-surface cursor-pointer"
      >
        {t(STR.requestAccess)} →
      </button>
    </div>
  );
}
