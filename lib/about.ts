/**
 * lib/about.ts — bilingual content for the /about page.
 *
 * Source: docs/Curriculum.pdf + docs/Carta_Presentacion.pdf + docs/about-me.md.
 * Hobbies/likes block is intentionally a placeholder — leoco fills it in ES,
 * EN gets translated after.
 */

import type { Bilingual } from "./i18n";

export type Bullet = Bilingual;

export type AboutSection = {
  /** Mono section number, e.g. "01" */
  n: string;
  /** Section heading */
  heading: Bilingual;
  /** Optional intro paragraph */
  body?: Bilingual;
  /** Optional bullet list */
  bullets?: Bullet[];
};

export type Job = {
  role: Bilingual;
  company: string;
  period: Bilingual;
  bullets: Bullet[];
};

export type Education = {
  title: Bilingual;
  institution: Bilingual;
  period: Bilingual;
  detail?: Bilingual;
};

export const ABOUT = {
  // Header / intro
  name: "Leonardo Enrique Correa Nanez",
  alias: "leoco",
  location: { es: "Valencia, Carabobo · Venezuela", en: "Valencia, Carabobo · Venezuela" },
  timezone: "UTC−4",
  status: {
    es: "Estudiante de Ingeniería en Computación · 8vo semestre",
    en: "Computer Engineering student · 8th semester",
  },

  intro: {
    es: "Backend / full-stack. Trabajo principalmente con Node, NestJS y Postgres, pero la decisión empieza por el problema, no por el stack. Me gustan las APIs claras, los datos consistentes y la observabilidad por defecto.",
    en: "Backend / full-stack. I mostly work with Node, NestJS and Postgres, but the decision starts with the problem, not the stack. I like clean APIs, consistent data and observability by default.",
  },

  // Stack — grouped, real (from CV + repos)
  stack: {
    languages: ["TypeScript", "JavaScript", "Python", "PHP", "Java", "C#", "C++"],
    frameworks: ["NestJS", "Next.js", "React", "React Native", "Express.js", "Vue.js", "Django", "Laravel"],
    databases: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Supabase", "Redis"],
    tools: ["Git", "GitLab", "GitHub", "Docker", "Swagger", "Tailwind"],
  },

  // Experience
  experience: [
    {
      role: { es: "Desarrollador full-stack", en: "Full-stack developer" },
      company: "Botinfy",
      period: { es: "2025 — actualidad", en: "2025 — present" },
      bullets: [
        {
          es: "Microservicio de autenticación con JWT + OTP por WhatsApp y sesiones en Redis (Botinfy Auth).",
          en: "Authentication microservice with JWT + WhatsApp OTP and Redis-backed sessions (Botinfy Auth).",
        },
        {
          es: "Plataforma de trazabilidad sanitaria y comercial con NestJS + Supabase (Herbaplant).",
          en: "Health & commercial traceability platform with NestJS + Supabase (Herbaplant).",
        },
        {
          es: "Monorepo clínico-administrativo con sync/ETL a sistema legado en SQL Server (Clínica Los Sauces).",
          en: "Clinical & administrative monorepo with sync/ETL to a legacy SQL Server system (Clínica Los Sauces).",
        },
      ],
    },
    {
      role: { es: "Vendedor de vehículos", en: "Vehicle salesperson" },
      company: "Automóviles 2000 VIP",
      period: { es: "Jun 2024 — Jul 2025", en: "Jun 2024 — Jul 2025" },
      bullets: [
        {
          es: "Trato directo con compradores: detección de necesidades, manejo de objeciones y cierre.",
          en: "Direct customer-facing role: needs discovery, objection handling and closing.",
        },
        {
          es: "Personalidad analítica y detallista forjada a partir del trabajo comercial.",
          en: "Analytical, detail-oriented mindset shaped by hands-on sales work.",
        },
      ],
    },
    {
      role: { es: "Redactor de artículos", en: "Article writer" },
      company: "Freelance",
      period: { es: "Abr 2023 — Mar 2024", en: "Apr 2023 — Mar 2024" },
      bullets: [
        {
          es: "Artículos publicitarios y discursos en inglés y español.",
          en: "Advertising articles and speeches in English and Spanish.",
        },
        {
          es: "Atención a clientes en inglés.",
          en: "Customer support in English.",
        },
      ],
    },
  ] satisfies Job[],

  // Education
  education: [
    {
      title: {
        es: "Ingeniería en Computación — 8vo semestre",
        en: "Computer Engineering — 8th semester",
      },
      institution: {
        es: "Universidad José Antonio Páez · Valencia, Venezuela",
        en: "Universidad José Antonio Páez · Valencia, Venezuela",
      },
      period: { es: "Ene 2023 — actualidad", en: "Jan 2023 — present" },
    },
    {
      title: { es: "Certificación en inglés · C1", en: "English certification · C1" },
      institution: { es: "Tuniversia · Bogotá, Colombia", en: "Tuniversia · Bogotá, Colombia" },
      period: { es: "Mar 2020 — Mar 2021", en: "Mar 2020 — Mar 2021" },
    },
    {
      title: { es: "Bachillerato — Educación Media General", en: "High school diploma" },
      institution: {
        es: "U.E. Generalísimo Francisco de Miranda",
        en: "U.E. Generalísimo Francisco de Miranda",
      },
      period: { es: "Sep 2017 — Ago 2022", en: "Sep 2017 — Aug 2022" },
      detail: { es: "Promedio 17.31/20", en: "GPA 17.31/20" },
    },
  ] satisfies Education[],

  // Languages
  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "C1 (Tuniversia, Bogotá)", en: "C1 (Tuniversia, Bogotá)" } },
  ],

  // Hobbies / personal — INTENTIONALLY EMPTY. leoco fills this in ES.
  // After leoco fills the ES side, translate to EN to keep the toggle honest.
  hobbies: {
    es: "", // ← LLENAR. ej.: música que escuchas, libros, juegos, deportes, qué haces fuera del código.
    en: "",
  } as Bilingual,

  // Contact
  contact: {
    emailPersonal: "leocorre2005@gmail.com",
    emailWork: "lcorrea@botinfy.com",
    phone: "+58 414 349 0824",
    github: "https://github.com/lpzzlnrd",
    gitlab: "https://gitlab.com/lpzzlnrd",
    instagram: "https://instagram.com/lpzlnrd",
  },
} as const;
