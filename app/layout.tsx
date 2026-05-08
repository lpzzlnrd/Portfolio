import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-lpzzlnrd.vercel.app"),
  title: {
    default: "lpzzlnrd Portfolio",
    template: "%s | lpzzlnrd Portfolio",
  },
  description: "Portfolio técnico con casos de estudio de backend, full-stack, auth, seguridad, ETL e inventario.",
  openGraph: {
    title: "lpzzlnrd Portfolio",
    description: "Portfolio técnico con casos de estudio de backend, full-stack, auth, seguridad, ETL e inventario.",
    type: "website",
    url: "https://portfolio-lpzzlnrd.vercel.app",
    siteName: "lpzzlnrd Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "lpzzlnrd Portfolio",
    description: "Portfolio técnico con casos de estudio de backend, full-stack, auth, seguridad, ETL e inventario.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-black text-zinc-100">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
