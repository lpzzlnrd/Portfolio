/**
 * lib/projects.ts — single source of truth for project content.
 *
 * Real entries derived from leoco's repos. No fabricated metrics:
 * summaries describe what the system does, not how much it improved.
 */

export type Domain = "auth" | "fullstack" | "data" | "integrations";

export type Project = {
  id: string;                                    // url-safe slug, used in /projects/[id]
  title: { es: string; en: string };
  role:  { es: string; en: string };
  year: string;
  tags: string[];                                // 3–6 stack labels
  domain: Domain;
  private: boolean;                              // if true, hide github URL, show callout
  summary: { es: string; en: string };
  github?: string;                               // omit when private:true
  live?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "botinfy-auth",
    title: {
      es: "Botinfy Auth",
      en: "Botinfy Auth",
    },
    role: {
      es: "Full-stack (autor principal)",
      en: "Full-stack (sole author)",
    },
    year: "2025",
    tags: ["NestJS", "Supabase", "Redis", "JWT", "Docker"],
    domain: "auth",
    private: false,
    summary: {
      es: "Microservicio de autenticación con flujo de dos pasos: credenciales + OTP por WhatsApp, sesiones en Redis con rotación de jti y permisos granulares por usuario.",
      en: "Authentication microservice with a two-step flow: credentials plus WhatsApp OTP, Redis-backed sessions with jti rotation, and per-user granular permissions.",
    },
    github: "https://github.com/Botinfy/botinfy-auth",
  },
  {
    id: "herbaplant",
    title: {
      es: "Herbaplant Platform",
      en: "Herbaplant Platform",
    },
    role: {
      es: "Full-stack (auth + backend + frontend + DB)",
      en: "Full-stack (auth + backend + frontend + DB)",
    },
    year: "2025",
    tags: ["React 19", "NestJS", "Supabase", "TypeScript", "Tailwind"],
    domain: "fullstack",
    private: true,
    summary: {
      es: "Plataforma de trazabilidad sanitaria y comercial que unifica inventario por lotes, logística y operación en terreno bajo un mismo control de roles y rutas protegidas.",
      en: "Health and commercial traceability platform that unifies batch inventory, logistics and field operations under a single role-based access layer with protected routes.",
    },
  },
  {
    id: "los-sauces",
    title: {
      es: "Clínica Los Sauces",
      en: "Clínica Los Sauces",
    },
    role: {
      es: "Full-stack (autor principal)",
      en: "Full-stack (sole author)",
    },
    year: "2025",
    tags: ["Next.js", "NestJS", "Postgres", "MSSQL", "TypeORM", "RBAC"],
    domain: "fullstack",
    private: false,
    summary: {
      es: "Monorepo clínico-administrativo con módulos por dominio (admisión, casos, facturación, CRM) y un sync/ETL desacoplado que consolida un sistema legado en SQL Server hacia Postgres vía cron.",
      en: "Clinical and administrative monorepo with domain-driven modules (admissions, cases, billing, CRM) and a decoupled sync/ETL that consolidates a legacy SQL Server system into Postgres via cron.",
    },
    github: "https://github.com/Botinfy/los-sauces",
  },
  {
    id: "mahle-dayton",
    title: {
      es: "MAHLE Dayton — Líneas de Producción",
      en: "MAHLE Dayton — Production Lines",
    },
    role: {
      es: "Backend (autor principal)",
      en: "Backend (sole author)",
    },
    year: "2024",
    tags: ["NestJS", "MySQL", "Angular.js", "SCRUM"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Backend de monitoreo y control para las líneas de producción Norte y Sur de MAHLE Behr Dayton: visualización en tiempo real, control de lotes (pausar / reanudar / cancelar) y análisis por lote.",
      en: "Monitoring and control backend for MAHLE Behr Dayton's North and South production lines: real-time visibility, batch control (pause / resume / cancel) and per-batch analysis.",
    },
  },
  {
    id: "khalil-landing",
    title: {
      es: "Khalil Landing",
      en: "Khalil Landing",
    },
    role: {
      es: "Full-stack end-to-end",
      en: "End-to-end full-stack",
    },
    year: "2025",
    tags: ["Next.js", "Supabase", "Resend", "Google Calendar", "Zod"],
    domain: "integrations",
    private: false,
    summary: {
      es: "Landing con captación de leads y agendamiento integrado: formularios validados con react-hook-form + zod y endpoints serverless que orquestan Supabase, Resend y Google Calendar API.",
      en: "Landing page with lead capture and built-in scheduling: react-hook-form + zod validated forms and serverless endpoints orchestrating Supabase, Resend and the Google Calendar API.",
    },
    github: "https://github.com/lpzzlnrd/Khalil-Landing",
    live: "https://khalil-landing.vercel.app",
  },
  {
    id: "local-area-network",
    title: {
      es: "Local Area Network — CLI",
      en: "Local Area Network — CLI",
    },
    role: {
      es: "Autor principal (todo el sistema)",
      en: "Sole author (entire system)",
    },
    year: "2024",
    tags: ["CLI", "Data structures", "JSON"],
    domain: "data",
    private: false,
    summary: {
      es: "Simulador de LAN por CLI con modos al estilo Cisco (>, #, (config)#), modelado de routers/switches/hosts, transmisión de paquetes con TTL por ticks y persistencia de running-config en JSON.",
      en: "CLI LAN simulator with Cisco-style modes (>, #, (config)#), routers/switches/hosts modelling, tick-based packet transmission with TTL, and running-config persistence in JSON.",
    },
    github: "https://github.com/lpzzlnrd/Local_Area_Network",
  },
];
