import type { Metadata } from "next";
import { Section } from "@/components/Section";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Writing",
    description: "Espacio para artículos técnicos (placeholder).",
    openGraph: {
      title: "Writing | lpzzlnrd Portfolio",
      description: "Espacio para artículos técnicos (placeholder).",
      url: "https://portfolio-lpzzlnrd.vercel.app/writing",
    },
    twitter: {
      title: "Writing | lpzzlnrd Portfolio",
      description: "Espacio para artículos técnicos (placeholder).",
    },
  };
}

export default function WritingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Writing</h1>
      <Section title="Slots">
        <ul className="list-disc space-y-2 pl-6 text-sm text-zinc-300">
          <li>Slot 1 — pendiente</li>
          <li>Slot 2 — pendiente</li>
          <li>Slot 3 — pendiente</li>
        </ul>
      </Section>
    </div>
  );
}
