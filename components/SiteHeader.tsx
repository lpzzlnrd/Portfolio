import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/setup", label: "Setup" },
  { href: "/writing", label: "Writing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight text-zinc-100">
          lpzzlnrd / Portfolio
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-zinc-100">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
