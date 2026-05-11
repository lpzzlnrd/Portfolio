/**
 * lib/projects.ts — single source of truth for project content.
 *
 * Real entries derived from leoco's repos. No fabricated metrics:
 * summaries describe what the system does, not how much it improved.
 */

export type Domain = "auth" | "fullstack" | "data" | "integrations";

export type ProjectChallenge = {
  title: { es: string; en: string };
  description: { es: string; en: string };
};

export type ProjectSolution = {
  title: { es: string; en: string };
  description: { es: string; en: string };
};

export type Project = {
  id: string;                                    // url-safe slug, used in /projects/[id]
  title: { es: string; en: string };
  role:  { es: string; en: string };
  year: string;
  tags: string[];                                // 3–6 stack labels
  domain: Domain;
  private: boolean;                              // if true, hide github URL, show callout
  summary: { es: string; en: string };
  description?: { es: string; en: string };     // detailed description for case study
  challenges?: ProjectChallenge[];               // problems and decisions
  solutions?: ProjectSolution[];                 // approaches and outcomes
  gallery?: { title: string; alt: string }[];    // image metadata (src will be /images/projects/[id]/...)
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
    description: {
      es: "Microservicio desarrollado desde cero para Botinfy que centraliza toda la autenticación y autorización. Implementa un flujo seguro de dos factores (2FA) usando WhatsApp como canal de verificación, integrando Twilio. Las sesiones se almacenan en Redis con rotación automática de tokens (jti) y soporte para permisos granulares. El servicio está completamente dockerizado y documentado con OpenAPI.",
      en: "Authentication microservice built from scratch for Botinfy that centralizes all auth and authorization logic. Implements a secure 2FA flow using WhatsApp as verification channel via Twilio. Sessions stored in Redis with automatic token rotation (jti) and support for fine-grained permissions. Service is fully containerized and OpenAPI documented.",
    },
    challenges: [
      {
        title: { es: "Seguridad de sesiones", en: "Session security" },
        description: { es: "Implementar renovación de tokens sin exponer el usuario a replay attacks. Solución: jti (JWT ID) único por sesión, almacenado en Redis con TTL automático.", en: "Implementing token renewal without exposing users to replay attacks. Solution: unique jti (JWT ID) per session, stored in Redis with automatic TTL." },
      },
      {
        title: { es: "Integración con WhatsApp", en: "WhatsApp integration" },
        description: { es: "Sincronizar OTP con TTL del mensaje. Solución: Twilio SDK + Redis pipeline con TTL paralelos.", en: "Syncing OTP with message TTL. Solution: Twilio SDK + Redis pipeline with parallel TTLs." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura de servicios", en: "Service architecture" },
        description: { es: "Separación clara entre auth-core (lógica), auth-sessions (Redis) y auth-delivery (WhatsApp). Esto permite escalar cada componente independientemente.", en: "Clear separation between auth-core (logic), auth-sessions (Redis), and auth-delivery (WhatsApp). Allows independent scaling of each component." },
      },
      {
        title: { es: "Observabilidad", en: "Observability" },
        description: { es: "Logs estructurados en JSON, métricas de latencia por operación y traces distribuidos. Implementado con Pino + OpenTelemetry.", en: "Structured JSON logging, per-operation latency metrics, and distributed traces. Implemented with Pino + OpenTelemetry." },
      },
    ],
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
    description: {
      es: "Sistema integral de gestión para operaciones agrícolas que necesitaban trazabilidad desde cultivo hasta distribución. Implementé capas de autenticación, módulos de inventario por lotes, asignación dinámica de rutas de logística y control de campo con React 19 + TypeScript. Todo bajo RLS (Row Level Security) en Supabase para máxima seguridad de datos.",
      en: "Comprehensive management system for agricultural operations requiring traceability from cultivation to distribution. Implemented auth layers, batch inventory modules, dynamic logistics route assignment, and field operations with React 19 + TypeScript. All protected with Supabase RLS (Row Level Security) for maximum data safety.",
    },
    challenges: [
      {
        title: { es: "Sincronización offline", en: "Offline synchronization" },
        description: { es: "Equipos en terreno sin conectividad consistente. Solución: arquitectura con caché local + sync en background cuando hay conexión.", en: "Field teams working without consistent connectivity. Solution: architecture with local cache + background sync when online." },
      },
      {
        title: { es: "Permisos granulares", en: "Granular permissions" },
        description: { es: "Diferentes roles ven diferentes datos según jurisdicción. Solución: RLS + context claims en JWT + middleware de autorización por recurso.", en: "Different roles see different data based on jurisdiction. Solution: RLS + context claims in JWT + per-resource authorization middleware." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura modular", en: "Modular architecture" },
        description: { es: "Separé cada dominio (inventario, logística, terreno) en módulos NestJS independientes con sus propios schemas y servicios. Facilita mantenimiento y testing.", en: "Separated each domain (inventory, logistics, field) into independent NestJS modules with their own schemas and services. Simplifies maintenance and testing." },
      },
      {
        title: { es: "Interfaz intuitiva", en: "Intuitive interface" },
        description: { es: "React 19 con Server Components para formularios complejos. Tailwind para UX consistente. Validación end-to-end con Zod.", en: "React 19 with Server Components for complex forms. Tailwind for consistent UX. End-to-end validation with Zod." },
      },
    ],
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
    description: {
      es: "Migración y modernización completa de un sistema clínico heredado. Diseñé un monorepo Next.js + NestJS que coexiste con el legacy (SQL Server) mediante un ETL cron que sincroniza datos de forma segura. Cada módulo (admisión, casos clínicos, facturación, CRM) es independiente pero comparte una capa de autenticación centralizada con RBAC.",
      en: "Complete migration and modernization of a legacy clinical system. Designed a Next.js + NestJS monorepo that coexists with the legacy SQL Server through a cron ETL that safely syncs data. Each module (admissions, clinical cases, billing, CRM) is independent but shares a centralized auth layer with RBAC.",
    },
    challenges: [
      {
        title: { es: "Migración incremental", en: "Incremental migration" },
        description: { es: "No podía pausar el sistema legacy. Solución: ETL bidireccional que sincroniza en tiempo real, permitiendo fase-out gradual.", en: "Couldn't pause the legacy system. Solution: bidirectional ETL that syncs in real-time, allowing gradual phase-out." },
      },
      {
        title: { es: "Integridad de datos", en: "Data integrity" },
        description: { es: "Modelos diferentes entre SQL Server y Postgres. Solución: mapping layer con validación + auditoría de cambios.", en: "Different models between SQL Server and Postgres. Solution: mapping layer with validation + change audit log." },
      },
    ],
    solutions: [
      {
        title: { es: "Domain-Driven Design", en: "Domain-Driven Design" },
        description: { es: "Cada dominio (admisión, facturación, CRM) vive en su propio módulo NestJS con schemas Postgres independientes. Facilita escalar y mantener cada pieza.", en: "Each domain (admissions, billing, CRM) lives in its own NestJS module with independent Postgres schemas. Scales and maintains cleanly." },
      },
      {
        title: { es: "ETL resiliente", en: "Resilient ETL" },
        description: { es: "Job cron con reintentos exponenciales, alertas en fallos, y dead-letter queue para registros problemáticos. Implementado con Bull + Redis.", en: "Cron job with exponential retries, failure alerts, and dead-letter queue for problematic records. Implemented with Bull + Redis." },
      },
    ],
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
    description: {
      es: "Sistema de supervisión industrial que monitorea dos líneas de producción en tiempo real. Implementé endpoints REST que capturan telemetría de PLCs (máquinas industriales), almaceno en MySQL y expongo dashboards en Angular.js. Soporte para control de batches (pausar, reanudar, cancelar) y análisis post-producción.",
      en: "Industrial monitoring system that tracks two production lines in real-time. Implemented REST endpoints that capture telemetry from PLCs (industrial controllers), store in MySQL, and expose dashboards in Angular.js. Support for batch control (pause, resume, cancel) and post-production analysis.",
    },
    challenges: [
      {
        title: { es: "Latencia y sincronización", en: "Latency and sync" },
        description: { es: "PLCs envían datos a ráfagas inconsistentes. Solución: buffer en memoria con flush a BD cada N segundos y EventEmitter para actualizaciones en tiempo real.", en: "PLCs send data in inconsistent bursts. Solution: in-memory buffer with flush to DB every N seconds and EventEmitter for real-time updates." },
      },
      {
        title: { es: "Confiabilidad del control", en: "Control reliability" },
        description: { es: "Comandos a PLCs deben ser idempotentes y auditados. Solución: request deduplication + event log inmutable.", en: "Commands to PLCs must be idempotent and audited. Solution: request deduplication + immutable event log." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura de eventos", en: "Event-driven architecture" },
        description: { es: "WebSockets para pushes en tiempo real a los dashboards. Backend emite eventos de cambio de estado de batches. Permite dashboards reactivos sin polling.", en: "WebSockets for real-time pushes to dashboards. Backend emits batch state-change events. Enables reactive dashboards without polling." },
      },
      {
        title: { es: "Auditoría completa", en: "Full audit trail" },
        description: { es: "Cada acción (sensor reading, batch control) registrada en tabla de eventos con timestamp y usuario. Trazabilidad 100%.", en: "Every action (sensor reading, batch control) logged in event table with timestamp and user. 100% traceability." },
      },
    ],
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
    description: {
      es: "Landing page moderno que integra captura de leads con agendamiento directo en Google Calendar. Los visitantes rellenan un formulario, se valida con Zod, se guardan en Supabase y reciben un email de confirmación vía Resend. Luego pueden elegir un slot disponible que se sincroniza automáticamente con Google Calendar del cliente.",
      en: "Modern landing page integrating lead capture with direct Google Calendar scheduling. Visitors fill a form, validated with Zod, stored in Supabase and receive a confirmation email via Resend. They can then book an available slot that auto-syncs to the client's Google Calendar.",
    },
    challenges: [
      {
        title: { es: "Validación de formularios", en: "Form validation" },
        description: { es: "Validar en cliente y servidor sin duplicar código. Solución: esquemas Zod compartidos entre Next.js client y server actions.", en: "Validate on client and server without duplicating code. Solution: shared Zod schemas between Next.js client and server actions." },
      },
      {
        title: { es: "Sincronización de calendarios", en: "Calendar sync" },
        description: { es: "Mantener slots disponibles sincronizados con Google Calendar. Solución: polling cada 5 min + WebHook de Google Calendar cuando hay cambios.", en: "Keep available slots synced with Google Calendar. Solution: 5-min polling + Google Calendar WebHook on changes." },
      },
    ],
    solutions: [
      {
        title: { es: "Server Actions", en: "Server Actions" },
        description: { es: "Uso total de Next.js Server Actions para forms. Elimina boilerplate de API routes. Validación con Zod en el servidor.", en: "Full use of Next.js Server Actions for forms. Eliminates API route boilerplate. Zod validation on server." },
      },
      {
        title: { es: "Automatización de emails", en: "Email automation" },
        description: { es: "Resend para transactional emails (confirmación, recordatorio). Templates React componentes. Personalización por user sin hardcode.", en: "Resend for transactional emails (confirmation, reminder). React component templates. Per-user customization without hardcoding." },
      },
    ],
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
    description: {
      es: "Simulador educativo de redes LAN que replica la interfaz de un switch Cisco real. Implementé una arquitectura basada en ticks donde los paquetes viajan por la red con TTL decremento, soporte completo para spanning-tree simplificado, y persistencia de configuración en JSON. Ideal para estudiantes que necesitan practicar comandos Cisco sin hardware.",
      en: "Educational LAN simulator replicating a real Cisco switch interface. Implemented tick-based architecture where packets travel the network with TTL decrement, simplified spanning-tree support, and configuration persistence in JSON. Ideal for students practicing Cisco commands without hardware.",
    },
    challenges: [
      {
        title: { es: "Modelado de topología", en: "Topology modeling" },
        description: { es: "Representar una red compleja con routers, switches y hosts. Solución: graph con adjacency lists + state per device.", en: "Modeling a complex network with routers, switches, and hosts. Solution: graph with adjacency lists + per-device state." },
      },
      {
        title: { es: "Simulación de paquetes", en: "Packet simulation" },
        description: { es: "Transmitir paquetes con latencia y colisiones realistas. Solución: event loop por ticks, cada tick procesa transiciones de estado.", en: "Transmitting packets with realistic latency and collisions. Solution: tick-based event loop, each tick processes state transitions." },
      },
    ],
    solutions: [
      {
        title: { es: "CLI interactivo", en: "Interactive CLI" },
        description: { es: "Interfaz readline que emula modos Cisco (>, #, config#). Parser de comandos con completado y validación.", en: "Readline interface emulating Cisco modes (>, #, config#). Command parser with completion and validation." },
      },
      {
        title: { es: "Persistencia", en: "Persistence" },
        description: { es: "Exportar/importar running-config en JSON. Permite guardar topologías y reutilizarlas. Ideal para labs predefinidos.", en: "Export/import running-config in JSON. Save and reuse topologies. Perfect for predefined labs." },
      },
    ],
    github: "https://github.com/lpzzlnrd/Local_Area_Network",
  },
];
