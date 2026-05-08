import type { Metadata } from "next";
import { Section } from "@/components/Section";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Setup",
    description: "Developer setup del portfolio.",
    openGraph: {
      title: "Setup | lpzzlnrd Portfolio",
      description: "Developer setup del portfolio.",
      url: "https://portfolio-lpzzlnrd.vercel.app/setup",
    },
    twitter: {
      title: "Setup | lpzzlnrd Portfolio",
      description: "Developer setup del portfolio.",
    },
  };
}

export default function SetupPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Setup</h1>
      <Section title="Developer setup">
        <p>Placeholder breve: setup de desarrollo pendiente de documentación detallada.</p>
      </Section>
    </div>
  );
}
