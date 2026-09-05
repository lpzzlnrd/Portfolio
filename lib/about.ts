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
  company: string | Bilingual;
  period: Bilingual;
  bullets: Bullet[];
};

export type CompetencyGroup = {
  group: Bilingual;
  items: Bilingual[];
};

export type EngineeringProject = {
  name: string;
  kind: Bilingual;
  detail: Bilingual;
  tags: string[];
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
    es: "Backend / full-stack. Construyo sistemas distribuidos y multi-tenant para clientes reales en sectores regulados —salud, farmacéutico—. Trabajo sobre todo con Go, NestJS y Laravel, con modularización estricta y modelado relacional. Me gustan las APIs claras, los datos consistentes y la observabilidad por defecto: la decisión empieza por el problema, no por el stack.",
    en: "Backend / full-stack. I build distributed, multi-tenant systems for real clients in regulated sectors —healthcare, pharmaceutical—. I mostly work with Go, NestJS and Laravel, with strict modularization and relational data modeling. I like clean APIs, consistent data and observability by default: the decision starts with the problem, not the stack.",
  },

  // Stack — grouped, real (from CV + repos)
  stack: {
    languages: ["Go", "TypeScript", "JavaScript", "PHP", "Python", "Rust", "SQL", "Java", "C#", "C++", "Bash", "PowerShell"],
    frameworks: ["Go (stdlib)", "NestJS 11", "Laravel 13", "FastAPI", "Axum.rs", "Next.js 16", "React 19", "Vue 3", "Angular", "Express", "TypeORM", "Eloquent"],
    databases: ["PostgreSQL", "MySQL", "SQL Server", "Supabase", "Redis", "MongoDB", "SQLite"],
    tools: ["Docker", "Docker Compose", "GitHub Actions", "GitLab CI/CD", "Nginx", "Tilt", "pnpm workspaces", "QEMU", "FFMPEG"],
    realtime: ["WebSockets", "Laravel Reverb", "Laravel Echo", "Pusher protocol", "Broadcasting"],
    security: ["JWT (jti rotation)", "Passport", "Sanctum", "bcrypt", "HMAC-SHA256", "httpOnly cookies", "Helmet", "OAuth", "RBAC", "rate limiting", "OTP"],
    testing: ["Playwright", "Vitest", "Jest", "Supertest", "PHPUnit", "white-box testing", "a11y testing"],
    ai: ["OpenAI API", "Meta Graph API", "agentes / MCP tooling", "LLMs", "Prompt Engineering"],
  },

  // Engineering competencies — the "how", not the "what"
  competencies: [
    {
      group: { es: "Arquitectura", en: "Architecture" },
      items: [
        { es: "Arquitectura hexagonal", en: "Hexagonal architecture" },
        { es: "Domain-Driven Design", en: "Domain-Driven Design" },
        { es: "Monolitos modulares", en: "Modular monoliths" },
        { es: "Diseño multi-tenant con aislamiento estricto", en: "Multi-tenant design with strict isolation" },
        { es: "Contratos de API explícitos", en: "Explicit API contracts" },
      ],
    },
    {
      group: { es: "Fiabilidad", en: "Reliability" },
      items: [
        { es: "Entrega garantizada con reintentos", en: "Guaranteed delivery with retries" },
        { es: "Colas de fallos persistentes", en: "Persistent failure queues" },
        { es: "Idempotencia y deduplicación de eventos", en: "Idempotency and event deduplication" },
        { es: "Colas de trabajo asíncronas", en: "Asynchronous job queues" },
        { es: "Graceful shutdown", en: "Graceful shutdown" },
        { es: "Recuperación ante fallos parciales", en: "Partial-failure recovery" },
      ],
    },
    {
      group: { es: "Seguridad", en: "Security" },
      items: [
        { es: "Verificación de firma HMAC", en: "HMAC signature verification" },
        { es: "Credenciales por tenant", en: "Per-tenant credentials" },
        { es: "Hardening de sesiones", en: "Session hardening" },
        { es: "Trazas de auditoría", en: "Audit trails" },
        { es: "Auditoría de seguridad aplicada", en: "Applied security auditing" },
      ],
    },
    {
      group: { es: "Producto y proceso", en: "Product & process" },
      items: [
        { es: "Accesibilidad WCAG", en: "WCAG accessibility" },
        { es: "Flujo de ramas y PRs", en: "Branch/PR workflow" },
        { es: "Entrega incremental", en: "Incremental delivery" },
        { es: "Conventional Commits", en: "Conventional Commits" },
        { es: "Documentación de contratos", en: "API contract documentation" },
      ],
    },
  ],

  // Experience
  experience: [
    {
      role: { es: "Desarrollador full-stack (backend & IA)", en: "Full-stack developer (backend & AI)" },
      company: "Botinfy LLC",
      period: { es: "Dic 2025 — actualidad", en: "Dec 2025 — present" },
      bullets: [
        {
          es: "Gateway multi-tenant de webhooks de Meta en Go, desde cero: ruteo por cliente, firma HMAC-SHA256, deduplicación, cola de fallos persistente y aislamiento estricto entre tenants. Cero dependencias externas.",
          en: "Multi-tenant Meta webhook gateway in Go, from scratch: per-client routing, HMAC-SHA256 signing, deduplication, persistent failure queue and strict cross-tenant isolation. Zero external dependencies.",
        },
        {
          es: "Emisión de mensajes por tenant con credenciales propias, eliminando la necesidad de compartir el token global de la App de Meta.",
          en: "Per-tenant message sending with dedicated credentials, removing any need to share the Meta App's global token.",
        },
        {
          es: "Capa de mensajería en tiempo real de un CRM omnicanal con Laravel Reverb: bandeja en vivo por WebSocket y Kanban de tickets colaborativo (Reino Aromas).",
          en: "Real-time messaging layer of an omnichannel CRM with Laravel Reverb: live WebSocket inbox and a collaborative Kanban ticket board (Reino Aromas).",
        },
        {
          es: "Hardening de seguridad en producción: sesiones en cookies httpOnly, auditoría de accesos y escrituras, y remediación de una fuga de datos entre vendedores (Herbaplant).",
          en: "Production security hardening: httpOnly cookie sessions, access and write audit trails, and remediation of a cross-seller data leak (Herbaplant).",
        },
        {
          es: "E-commerce farmacéutico en Next.js 16 con accesibilidad WCAG verificada por tests de contraste, y E2E con Playwright (Trinita).",
          en: "Pharmaceutical e-commerce in Next.js 16 with WCAG accessibility verified by contrast tests, and Playwright E2E (Trinita).",
        },
      ],
    },
    {
      role: { es: "Desarrollador full-stack", en: "Full-stack developer" },
      company: { es: "Proyectos autónomos y organizacionales", en: "Autonomous & organizational projects" },
      period: { es: "Ene 2023 — Nov 2025", en: "Jan 2023 — Nov 2025" },
      bullets: [
        {
          es: "Plataforma de trazabilidad sanitaria y comercial con React 19 + NestJS sobre Supabase, para control biológico y autenticación de usuarios (Herbaplant).",
          en: "Health & commercial traceability platform with React 19 + NestJS on Supabase, for biological control and user authentication (Herbaplant).",
        },
        {
          es: "Monolito modular basado en DDD con motor ETL asíncrono que sincroniza transaccionalmente historias médicas desde SQL Server legado a PostgreSQL (Clínica Los Sauces).",
          en: "DDD-based modular monolith with an asynchronous ETL engine transactionally syncing medical records from legacy SQL Server into PostgreSQL (Clínica Los Sauces).",
        },
        {
          es: "Microservicio de autenticación de alta seguridad: RBAC, OTP por WhatsApp con TTL en Redis, rate limiting, políticas anti-enumeración y rotación criptográfica de JWT (Botinfy Auth).",
          en: "High-security authentication microservice: RBAC, WhatsApp OTP under Redis TTL, rate limiting, anti-enumeration policies and cryptographic JWT rotation (Botinfy Auth).",
        },
        {
          es: "SaaS multi-tenant para restaurantes con estructura por dominios, validación de entorno con Zod y tests de integración con Vitest (Pickop).",
          en: "Multi-tenant restaurant SaaS with domain-driven structure, Zod environment validation and Vitest integration tests (Pickop).",
        },
        {
          es: "PWA de reunificación en emergencias con cola offline para reenvío automático, Edge Functions y reglas RLS protegiendo datos sensibles (Encuentralos).",
          en: "Emergency reunification PWA with an offline queue for automatic resubmission, Edge Functions and RLS rules protecting sensitive data (Encuentralos).",
        },
        {
          es: "Plataforma MES de monitoreo industrial con lógica matemática de eficiencia de maquinaria (OEE) y tasas de defecto, validada con pruebas de caja blanca (MAHLE Dayton).",
          en: "Industrial MES monitoring platform with mathematical machinery-efficiency logic (OEE) and defect rates, validated through white-box testing (MAHLE Dayton).",
        },
      ],
    },
    {
      role: { es: "Vendedor de vehículos", en: "Vehicle salesperson" },
      company: "Automóviles 2000 VIP",
      period: { es: "Jun 2024 — actualidad", en: "Jun 2024 — present" },
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

  // Hobbies / personal
  hobbies: {
    es: "Nacido en Valencia, Venezuela, me considero un 'inquieto por naturaleza'. Mi curiosidad me impulsa a aprender constantemente, lo que me ha convertido en un apasionado de la cultura pop, los videojuegos, la historia y el cine (desde la ciencia ficción hasta los documentales).\n\nMi enfoque es analítico y crítico: cuando surge una idea, mi instinto es buscar sus puntos débiles para anticipar cualquier escenario. Creo que un entorno de trabajo eficiente se construye con profesionalismo, pero también con ese toque de sarcasmo, humor y amabilidad que hace que las cosas fluyan.\n\nFuera de la terminal, la música es mi motor —desde el Hip Hop y el Rock hasta bandas sonoras de juegos—. También soy un entusiasta de la mecánica automotriz, la F1 y el fútbol. Mis valores espirituales y morales son el norte que guía mis decisiones, tanto en la vida como en el código.",
    en: "Born in Valencia, Venezuela, I describe myself as 'naturally restless.' My curiosity drives me to constantly learn, making me a fan of pop culture, video games, history, and cinema—from sci-fi to deep-dive documentaries.\n\nI have an analytical and critical mindset: whenever an idea takes shape, I instinctively look for its flaws to stay ahead of any scenario. I believe an efficient workspace is built on professionalism, seasoned with the right amount of sarcasm, humor, and kindness to keep the momentum going.\n\nOutside the terminal, music is my fuel—spanning everything from Hip Hop and Rock to video game soundtracks. I'm also a huge fan of automotive mechanics, F1, and soccer. My spiritual and moral values are the compass that guides my decisions, both in life and in code.",
  } as Bilingual,

  // Complex engineering projects — side work that shows range
  engineering: [
    {
      name: "windeingio",
      kind: { es: "SaaS empresarial modular", en: "Modular enterprise SaaS" },
      detail: {
        es: "Plataforma Laravel con facturación por suscripción (Stripe/PayPal), APIs de IA (OpenAI), procesamiento asíncrono de video con FFMPEG y sincronización con HubSpot CRM.",
        en: "Laravel platform with subscription billing (Stripe/PayPal), AI APIs (OpenAI), asynchronous video processing with FFMPEG and HubSpot CRM synchronization.",
      },
      tags: ["Laravel", "Stripe", "OpenAI", "FFMPEG", "HubSpot"],
    },
    {
      name: "Coworking",
      kind: { es: "Microservicios políglotas", en: "Polyglot microservices" },
      detail: {
        es: "Sistema distribuido de tres servicios independientes: gestión de roles (Python/FastAPI), facturación (Node/Express) y reservas (Rust/Axum), orquestados con Docker Compose y autenticación distribuida por validación local de firma JWT.",
        en: "Distributed system of three independent services: role management (Python/FastAPI), billing (Node/Express) and bookings (Rust/Axum), orchestrated with Docker Compose and distributed auth based on local JWT signature validation.",
      },
      tags: ["FastAPI", "Express", "Axum.rs", "Docker", "JWT"],
    },
    {
      name: "CoruscantOS & EndorOS",
      kind: { es: "Sistemas operativos conceptuales", en: "Conceptual operating systems" },
      detail: {
        es: "Base conceptual de SO escrita en Rust para entornos restringidos (no_std), con workspaces modulares, arquitectura hexagonal y compilación ARM64 emulada en QEMU, con interfaz web móvil embebida (Vite + WebKit + GTK).",
        en: "Conceptual OS base written in Rust for restricted environments (no_std), with modular workspaces, hexagonal architecture and ARM64 compilation emulated in QEMU, plus an embedded mobile web interface (Vite + WebKit + GTK).",
      },
      tags: ["Rust", "no_std", "QEMU", "ARM64", "GTK"],
    },
    {
      name: "task-tracker",
      kind: { es: "Herramienta CLI en Rust", en: "Rust CLI tool" },
      detail: {
        es: "Aplicación de línea de comandos con almacenamiento relacional local en JSON vía Serde y cobertura de tests unitarios integrada.",
        en: "Command-line application with local relational JSON storage via Serde and integrated unit test coverage.",
      },
      tags: ["Rust", "Serde", "CLI"],
    },
    {
      name: "Transport-Repo",
      kind: { es: "Optimización en Python", en: "Python optimization" },
      detail: {
        es: "Implementación del método húngaro para asignación óptima de recursos en problemas de transporte logístico.",
        en: "Implementation of the Hungarian method for optimal resource assignment in logistics transport problems.",
      },
      tags: ["Python", "Algoritmos", "Optimización"],
    },
  ] satisfies EngineeringProject[],

  // Downloadable CV
  cv: {
    href: "/Leonardo_Correa_CV_EN.pdf",
    label: { es: "Descargar CV (EN · PDF)", en: "Download CV (EN · PDF)" },
    updated: { es: "Actualizado sep 2026", en: "Updated Sep 2026" },
  },

  // Contact
  contact: {
    emailPersonal: "leocorre2005@gmail.com",
    emailWork: "lcorrea@botinfy.com",
    phone: "+58 414 349 0824",
    github: "https://github.com/lpzzlnrd",
    gitlab: "https://gitlab.com/lpzzlnrd",
    instagram: "https://instagram.com/lpzlnrd",
  },

  // Images for the gallery
  images: [
    { title: "Leonardo Correa", alt: "Foto personal", src: "/images/about/me-1.jpg" },
    { title: "Enfoque y Desarrollo", alt: "Foto personal trabajando", src: "/images/about/me-2.jpg" },
    { title: "Personalidad e inquietud", alt: "Foto personal", src: "/images/about/me-3.jpg" },
    { title: "Plataforma Herbaplant", alt: "Vista del dashboard de trazabilidad", src: "/images/projects/herbaplant/1.png" },
    { title: "Control Industrial - MAHLE", alt: "Dashboard de monitoreo de producción", src: "/images/projects/mahle-dayton/1.png" },
  ],
} as const;
