"use client";
import { useLang } from "@/lib/i18n";
import clsx from "clsx";

export function LangToggle({ size = "sm" }: { size?: "sm" | "lg" }) {
  const { lang, setLang } = useLang();
  const cell = (code: "es" | "en") =>
    clsx(
      "font-mono uppercase tracking-[0.06em] cursor-pointer border-0",
      size === "lg" ? "px-3 py-1.5 text-[12px]" : "px-2.5 py-[3px] text-[11px]",
      lang === code ? "bg-text text-bg" : "bg-transparent text-text-mute hover:text-text",
    );

  return (
    <div className="inline-flex border border-border-hi" role="group" aria-label="Language">
      <button
        type="button"
        aria-pressed={lang === "es"}
        onClick={() => setLang("es")}
        className={cell("es")}
      >ES</button>
      <div className="w-px bg-border-hi" />
      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={cell("en")}
      >EN</button>
    </div>
  );
}
