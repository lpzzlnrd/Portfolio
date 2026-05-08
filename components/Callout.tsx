type CalloutProps = {
  children: React.ReactNode;
};

export function Callout({ children }: CalloutProps) {
  return (
    <aside className="rounded-lg border border-zinc-700/80 bg-zinc-900 p-4 text-sm text-zinc-300">
      {children}
    </aside>
  );
}
