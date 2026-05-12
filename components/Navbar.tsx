"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useT, STR } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";
import { Button } from "./primitives";

export function Navbar() {
  const t = useT();
  const path = usePathname();
  const items = [
    { k: "work",  label: t(STR.navWork),  href: "/projects" },
    { k: "about", label: t(STR.navAbout), href: "/about" },
  ];

  return (
    <header className="border-b border-border bg-bg px-4 md:px-14 py-3.5 flex flex-wrap items-center gap-y-4 gap-x-6">
      <Link href="/" className="font-mono flex items-center gap-2.5 text-[13px] no-underline text-text shrink-0">
        <span className="inline-block w-2.5 h-2.5 bg-accent" />
        <span className="font-semibold">leoco</span>
        <span className="text-text-dim">/dev</span>
      </Link>

      <nav className="flex gap-0.5 md:ml-7">
        {items.map((it) => {
          const active = path?.startsWith(it.href);
          return (
            <Link
              key={it.k}
              href={it.href}
              className={clsx(
                "font-mono text-[12px] md:text-[13px] px-2 md:px-3 py-1.5 no-underline border-b",
                active ? "text-text border-accent" : "text-text-mute border-transparent hover:text-text",
              )}
            >{it.label}</Link>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2 md:gap-3.5">
        <LangToggle />
        <Link href="/contact" className="no-underline">
          <Button kind="ghost" className="text-[12px] md:text-[13px] px-3 md:px-4">
            {t(STR.navContact)} <span className="hidden sm:inline">→</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
