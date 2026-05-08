import type { Metadata } from "next";
import { Section } from "@/components/Section";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About",
    description: "Perfil profesional y enfoque técnico del portfolio.",
    openGraph: {
      title: "About | lpzzlnrd Portfolio",
      description: "Perfil profesional y enfoque técnico del portfolio.",
      url: "https://portfolio-lpzzlnrd.vercel.app/about",
    },
    twitter: {
      title: "About | lpzzlnrd Portfolio",
      description: "Perfil profesional y enfoque técnico del portfolio.",
    },
  };
}

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">About</h1>
      <Section title="Enfoque">
        <p>
          Construyo sistemas centrados en trazabilidad, seguridad, integración y operación real. Este portfolio muestra casos
          de estudio con decisiones técnicas y tradeoffs documentados sin métricas inventadas.
        </p>
      </Section>
    </div>
  );
}
