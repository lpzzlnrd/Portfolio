import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-zinc-100">404</h1>
      <p className="text-zinc-300">No se encontró el recurso solicitado.</p>
      <Link href="/projects" className="text-sm text-zinc-100 underline underline-offset-4">
        Volver a proyectos
      </Link>
    </div>
  );
}
