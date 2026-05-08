type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-zinc-300">{children}</div>
    </section>
  );
}
