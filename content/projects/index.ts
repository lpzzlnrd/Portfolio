export type ProjectEntry = {
  slug: string;
  title: string;
  excerpt: string;
  role: string;
  stack: string[];
  tags: string[];
  links: {
    label: string;
    href?: string;
    note?: string;
  }[];
  privateRepo?: boolean;
};

export const projectsIndex: ProjectEntry[] = [
  {
    slug: "mahle-dayton",
    title: "Sistema de Optimización de Líneas de Producción MAHLE Dayton",
    excerpt:
      "Plataforma integral de monitoreo, control y análisis para optimizar eficiencia, reducir errores y mejorar trazabilidad en líneas de producción.",
    role: "Autor principal solo backend",
    stack: ["Angular.js (frontend, no hecho por mí)", "Nest.js", "MySQL", "SCRUM", "KANBAN"],
    tags: ["backend", "manufacturing", "monitoring", "traceability"],
    links: [{ label: "Repositorio", note: "Repositorio privado / GitLab" }],
    privateRepo: true,
  },
  {
    slug: "herbaplant",
    title: "Herbaplant Platform",
    excerpt:
      "Dashboard centralizado de trazabilidad integral (sanitaria y comercial) para operaciones de inventario, logística y actividad comercial.",
    role: "Autor principal full-stack (auth + backend + frontend + database)",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "NestJS",
      "Supabase (PostgreSQL)",
      "JWT",
      "Supabase Auth",
    ],
    tags: ["full-stack", "inventory", "health", "traceability", "auth"],
    links: [{ label: "Repositorio", note: "Privado (Botinfy/herbaplant-platform)" }],
    privateRepo: true,
  },
  {
    slug: "botinfy-auth",
    title: "Botinfy Auth",
    excerpt:
      "Microservicio de autenticación con JWT + OTP (WhatsApp) + sesiones Redis y controles de seguridad para permisos granulares.",
    role: "Autor principal full-stack (hice todo)",
    stack: [
      "NestJS ^11",
      "@nestjs/jwt",
      "passport-jwt ^11",
      "Supabase ^2",
      "Redis ioredis ^5",
      "@nestjs/throttler ^6.5",
      "Swagger ^11",
      "React+Vite 18/5 frontend prueba",
      "Docker Compose",
    ],
    tags: ["auth", "security", "backend", "jwt", "otp"],
    links: [{ label: "Repositorio", href: "https://github.com/Botinfy/botinfy-auth" }],
  },
  {
    slug: "los-sauces",
    title: "Clínica Los Sauces - Plataforma Interna",
    excerpt:
      "Plataforma integral clínica y administrativa en monorepo con integración de sistemas heredados y sync/ETL desacoplado.",
    role: "Autor principal full-stack",
    stack: [
      "Next.js 16.2",
      "React 19",
      "Tailwind 4.2",
      "NestJS 11",
      "TS5",
      "TypeORM",
      "PostgreSQL",
      "MSSQL",
      "JWT",
      "Passport",
      "Bcrypt",
      "RBAC",
      "@nestjs/schedule",
    ],
    tags: ["full-stack", "health", "etl", "sync", "rbac"],
    links: [{ label: "Repositorio", href: "https://github.com/Botinfy/los-sauces" }],
  },
  {
    slug: "local-area-network",
    title: "Local_Area_Network",
    excerpt: "Simulador CLI de Red de Área Local (LAN) con dispositivos, paquetes, TDAs y persistencia de configuración.",
    role: "Autor principal (todo el sistema)",
    stack: ["CLI", "TDAs", "JSON"],
    tags: ["devtools", "networking", "cli", "simulation"],
    links: [{ label: "Repositorio", href: "https://github.com/lpzzlnrd/Local_Area_Network" }],
  },
  {
    slug: "khalil-landing",
    title: "Khalil Landing",
    excerpt: "Landing moderna con captación de leads y agendamiento integrado.",
    role: "Autor principal end-to-end",
    stack: [
      "Next.js App Router 16+",
      "React 19",
      "Tailwind v4",
      "Framer Motion",
      "react-hook-form",
      "zod",
      "Supabase",
      "Resend",
      "Google Calendar API",
      "serverless functions en src/app/api/*",
      "cron jobs",
    ],
    tags: ["full-stack", "marketing", "serverless", "automation"],
    links: [{ label: "Repositorio", href: "https://github.com/lpzzlnrd/Khalil-Landing" }],
  },
];
