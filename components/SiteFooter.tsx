export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-zinc-400">
        <p>© {new Date().getFullYear()} lpzzlnrd</p>
        <a href="https://github.com/lpzzlnrd" target="_blank" rel="noreferrer" className="hover:text-zinc-100">
          GitHub
        </a>
      </div>
    </footer>
  );
}
