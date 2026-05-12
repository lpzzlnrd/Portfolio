"use client";

export function TerminalBlock({ cwd = "~/proyecto/api" }: { cwd?: string }) {
  return (
    <div className="border border-border bg-black">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <div className="w-2 h-2 bg-border-hi" />
        <div className="w-2 h-2 bg-border-hi" />
        <div className="w-2 h-2 bg-border-hi" />
        <span className="font-mono text-[11px] text-text-dim ml-1.5">{cwd}</span>
      </div>
      <div className="font-mono px-3.5 py-3 text-[12.5px] leading-[1.8]">
        <div>
          <span className="text-accent">$</span>{" "}
          <span className="text-text">pnpm db:migrate</span>
        </div>
        <div className="text-text-dim">{"  "}↳ ████████ <span className="text-ok">OK</span> <span className="text-text-faint">· ████ms</span></div>
        <div className="text-text-dim">{"  "}↳ ████████ <span className="text-ok">OK</span> <span className="text-text-faint">· ███ms</span></div>
        <div className="text-text-dim">{"  "}↳ ████████ <span className="text-ok">OK</span></div>
        <div className="mt-1.5">
          <span className="text-accent">$</span> <span className="pf-caret" />
        </div>
      </div>
    </div>
  );
}
