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
    id: "botinfy-gateway",
    title: {
      es: "Botinfy Gateway",
      en: "Botinfy Gateway",
    },
    role: {
      es: "Backend (autor principal)",
      en: "Backend (sole author)",
    },
    year: "2026",
    tags: ["Go", "Meta Graph API", "HMAC", "Docker", "GitHub Actions"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Gateway multi-tenant en Go que recibe los webhooks de una App de Meta en una sola URL y los rutea al CRM de cada cliente, con firma HMAC, deduplicación y cola de fallos persistente. Cero dependencias externas.",
      en: "Multi-tenant Go gateway that receives every webhook of a single Meta App on one URL and routes each event to the right client CRM, with HMAC signing, deduplication and a persistent failure queue. Zero external dependencies.",
    },
    description: {
      es: "Una App de Meta tiene una única URL de webhook. Si esa App tiene varios números de WhatsApp conectados —uno por cliente— Meta manda los eventos de todos al mismo endpoint, mezclados y sin forma de suscribir cada número a un destino distinto. El gateway se para en el medio: recibe todo, mira de qué número o cuenta viene cada evento y lo reenvía al CRM de ese cliente. En el camino de vuelta permite que cada CRM responda por su propio número, sin entregarle nunca el token global de la App. Escrito íntegramente con la librería estándar de Go: sin una sola dependencia externa.",
      en: "A Meta App has a single webhook URL. If that App has several WhatsApp numbers connected —one per client— Meta sends every event to the same endpoint, mixed together and with no way to subscribe each number to a different destination. The gateway sits in the middle: it receives everything, looks at which number or account each event came from, and forwards it to that client's CRM. On the way back it lets each CRM reply from its own number, without ever handing over the App's global token. Written entirely with the Go standard library: not a single external dependency.",
    },
    challenges: [
      {
        title: { es: "Aislamiento entre clientes", en: "Cross-tenant isolation" },
        description: { es: "Los identificadores de WhatsApp, Messenger e Instagram son espacios independientes en Meta: un id de página puede coincidir numéricamente con el phone_number_id de otro cliente sin tener relación. Con un mapa único, ese evento se entregaría al CRM equivocado. Solución: un mapa de identificadores por plataforma, y sesgo conservador — ante cualquier duda gana el destino por defecto, porque mandar al default es recuperable y mandar al CRM ajeno filtra datos.", en: "WhatsApp, Messenger and Instagram identifiers are independent spaces in Meta: a page id can numerically collide with another client's phone_number_id while being unrelated. With a single map, that event would be delivered to the wrong CRM. Solution: one identifier map per platform, plus a conservative bias — when in doubt the default destination wins, because routing to the default is recoverable while routing to another client's CRM leaks data." },
      },
      {
        title: { es: "La firma se rompe al reserializar", en: "Re-serializing breaks the signature" },
        description: { es: "La firma de Meta es un HMAC-SHA256 sobre los bytes exactos del body. Reserializar el JSON cambia el orden de las claves o los espacios, y la firma deja de validar en el destino. Solución: el payload se reenvía byte a byte, sin transformarlo, con la firma original intacta.", en: "Meta's signature is an HMAC-SHA256 over the exact bytes of the body. Re-serializing the JSON changes key order or whitespace, and the signature stops validating downstream. Solution: the payload is forwarded byte for byte, untransformed, with the original signature intact." },
      },
      {
        title: { es: "Un 200 es una promesa", en: "A 200 is a promise" },
        description: { es: "Meta no reintenta un evento que ya recibió 200: desde ese momento el evento existe únicamente dentro del gateway. Solución: todo camino termina en el destino o en la cola de fallos en disco, y el único caso en que se responde 500 es cuando no puede garantizarse ninguna de las dos cosas.", en: "Meta does not retry an event that already got a 200: from that moment the event exists only inside the gateway. Solution: every path ends either at the destination or in the on-disk failure queue, and the only case that returns a 500 is when neither can be guaranteed." },
      },
    ],
    solutions: [
      {
        title: { es: "Reenvío asíncrono con cola de fallos", en: "Async forwarding with a failure queue" },
        description: { es: "La respuesta a Meta no espera al destino: el reenvío corre en su propia goroutine con contexto de vida independiente. Si falla, el evento cae en una cola persistente en disco (.jsonl) que se drena sola cada intervalo y también a pedido. El apagado por SIGTERM drena en orden —servidor HTTP, reenvíos en vuelo, cola— para que un redeploy no pierda eventos.", en: "The response to Meta does not wait for the destination: forwarding runs in its own goroutine with an independent lifetime context. On failure the event lands in a persistent on-disk queue (.jsonl) that drains automatically on an interval and on demand. SIGTERM shutdown drains in order —HTTP server, in-flight forwards, queue— so a redeploy loses no events." },
      },
      {
        title: { es: "Credenciales por cliente, no un token global", en: "Per-tenant credentials, not a global token" },
        description: { es: "El token de la App permite emitir desde cualquier número conectado: dárselo a un cliente es darle la capacidad de suplantar a otro. Por eso el token no sale del gateway. Cada cliente recibe una API key propia, y esa key determina el número; el cuerpo del pedido no puede cambiarlo. Quien pide emitir desde un número ajeno recibe 403 y no se emite nada.", en: "The App token can send from any connected number: handing it to a client is handing them the ability to impersonate another. So the token never leaves the gateway. Each client gets its own API key, and that key resolves the number; the request body cannot override it. Anyone asking to send from a number that isn't theirs gets a 403 and nothing is sent." },
      },
      {
        title: { es: "Splitting y re-firma de payloads mixtos", en: "Splitting and re-signing mixed payloads" },
        description: { es: "Meta puede meter en un solo POST entradas de clientes distintos. Antes eso mandaba el payload completo al destino por defecto, que recibía conversaciones ajenas mientras los otros CRM no recibían nada. Ahora se parte: cada destino recibe un cuerpo con solo sus entradas y el X-Hub-Signature-256 se recalcula sobre ese cuerpo. Un contador en /stats registra cuántas veces ocurrió.", en: "Meta can batch entries from different clients into a single POST. That used to send the whole payload to the default destination, which received other clients' conversations while the other CRMs got nothing. Now it splits: each destination receives a body with only its own entries, and X-Hub-Signature-256 is recomputed over that body. A counter in /stats records how often this happened." },
      },
      {
        title: { es: "Operación sin reinicios", en: "Operating without restarts" },
        description: { es: "La tabla de clientes se recarga en caliente bajo un candado compartido con los cambios de la API de administración, así que dar de alta un cliente no requiere redesplegar. Se suma métricas en memoria con endpoint /stats, health check, middleware de request-ID y checks de despliegue en GitHub Actions.", en: "The client table hot-reloads under a lock shared with admin API changes, so onboarding a client requires no redeploy. On top of that: in-memory metrics with a /stats endpoint, health checks, request-ID middleware and deploy checks in GitHub Actions." },
      },
    ],
  },
  {
    id: "reino-aromas",
    title: {
      es: "Reino Aromas · CRM omnicanal",
      en: "Reino Aromas · Omnichannel CRM",
    },
    role: {
      es: "Full-stack (autor principal)",
      en: "Full-stack (sole author)",
    },
    year: "2026",
    tags: ["Laravel", "Reverb", "Vue 3", "WebSockets", "MySQL"],
    domain: "fullstack",
    private: false,
    summary: {
      es: "CRM omnicanal que unifica WhatsApp, Messenger e Instagram en una bandeja única, con mensajería en vivo por WebSocket y un tablero Kanban de tickets que se mueve en tiempo real entre agentes.",
      en: "Omnichannel CRM unifying WhatsApp, Messenger and Instagram into a single inbox, with live WebSocket messaging and a Kanban ticket board that moves in real time between agents.",
    },
    description: {
      es: "CRM construido sobre Laravel 13 y Vue 3 que centraliza las conversaciones de los tres canales de Meta en una sola bandeja. La capa de tiempo real usa Laravel Reverb con broadcasting: los mensajes entrantes aparecen sin recargar y el tablero Kanban de tickets refleja en vivo los movimientos de cualquier agente. Incluye gestión del ciclo de vida de las cuentas de Meta, reintentos para mensajería fallida y backups automatizados de la base con verificación de integridad.",
      en: "CRM built on Laravel 13 and Vue 3 that centralizes conversations from all three Meta channels into one inbox. The real-time layer uses Laravel Reverb with broadcasting: incoming messages appear without a reload and the Kanban ticket board reflects any agent's moves live. It includes Meta account lifecycle management, retries for failed messaging and automated database backups with integrity verification.",
    },
    challenges: [
      {
        title: { es: "El estado \"En vivo\" mentía", en: "The \"Live\" status was lying" },
        description: { es: "El indicador miraba si Reverb estaba configurado en el build, no si el socket estaba realmente vivo. Con Reverb caído seguía diciendo \"al día\" y ocultaba el botón de actualizar, dejando al agente sin saber que no estaba recibiendo nada. Solución: escuchar el socket real y resincronizar al reconectar.", en: "The indicator checked whether Reverb was configured at build time, not whether the socket was actually alive. With Reverb down it still said \"up to date\" and hid the refresh button, leaving the agent unaware they were receiving nothing. Solution: listen to the real socket and resync on reconnect." },
      },
      {
        title: { es: "Configuración en dos lugares", en: "Configuration in two places" },
        description: { es: "Las credenciales de Meta vivían en .env, pero operación necesitaba cambiarlas sin tocar el servidor. Solución: modelo MetaAccount en base de datos con precedencia sobre .env, y un servicio que unifica ambas fuentes tras una sola interfaz.", en: "Meta credentials lived in .env, but operations needed to change them without touching the server. Solution: a MetaAccount database model taking precedence over .env, plus a service unifying both sources behind a single interface." },
      },
    ],
    solutions: [
      {
        title: { es: "Kanban colaborativo en vivo", en: "Live collaborative Kanban" },
        description: { es: "Tablero de tickets con drag & drop que persiste el movimiento y lo difunde por WebSocket, de modo que dos agentes viendo el mismo tablero ven el mismo estado sin recargar.", en: "Drag & drop ticket board that persists each move and broadcasts it over WebSocket, so two agents looking at the same board see the same state without reloading." },
      },
      {
        title: { es: "Entrega con reintentos y respaldo", en: "Delivery with retries and backups" },
        description: { es: "Mecanismo de reintentos para mensajes fallidos, expuesto por endpoints de API y por comando de consola. En paralelo, backups automatizados de MySQL con rotación, verificación de integridad y procedimiento de restauración documentado.", en: "Retry mechanism for failed messages, exposed through API endpoints and a console command. Alongside it, automated MySQL backups with rotation, integrity verification and a documented restore procedure." },
      },
    ],
    github: "https://github.com/lpzzlnrd/Reino-Aromas",
  },
  {
    id: "trinita",
    title: {
      es: "Trinita · E-commerce farmacéutico",
      en: "Trinita · Pharmaceutical e-commerce",
    },
    role: {
      es: "Frontend / full-stack",
      en: "Frontend / full-stack",
    },
    year: "2026",
    tags: ["Next.js 16", "React 19", "Supabase", "Playwright", "Zod"],
    domain: "fullstack",
    private: true,
    summary: {
      es: "Tienda en línea de productos farmacéuticos con catálogo, ficha de producto, retiro en tienda y delivery. Accesibilidad WCAG verificada por tests automatizados de contraste.",
      en: "Online pharmacy storefront with catalog, product detail, in-store pickup and delivery. WCAG accessibility verified by automated contrast tests.",
    },
    description: {
      es: "E-commerce construido sobre Next.js 16 y Supabase para una farmacia. Cubre el recorrido completo de compra: catálogo con precio por unidad, ficha de producto con tabla de atributos y migas de pan, agregado al carrito desde la grilla, mini-carrito animado con gestos táctiles y lógica de entrega con retiro en tienda o delivery. El trabajo incluyó cerrar los huecos de calidad que suelen quedar fuera del alcance: estados de carga, pantallas de error y 404, accesibilidad y comportamiento móvil.",
      en: "E-commerce built on Next.js 16 and Supabase for a pharmacy. It covers the full purchase journey: catalog with unit pricing, product detail with attribute table and breadcrumbs, add-to-cart from the grid, an animated mini-cart with touch gestures, and delivery logic with in-store pickup or home delivery. The work included closing the quality gaps that usually fall outside scope: loading states, error and 404 screens, accessibility and mobile behavior.",
    },
    challenges: [
      {
        title: { es: "Contraste por debajo del mínimo", en: "Contrast below the minimum" },
        description: { es: "El badge de recipe estaba a 2.79:1 y los enlaces a 4.42:1, ambos por debajo del mínimo WCAG. Solución: recalibrar la paleta a valores conformes y dejar tests automatizados que fallan si alguien vuelve a bajarlos.", en: "The prescription badge sat at 2.79:1 and links at 4.42:1, both below the WCAG minimum. Solution: recalibrate the palette to conformant values and leave automated tests that fail if anyone lowers them again." },
      },
      {
        title: { es: "Consistencia lingüística a escala", en: "Linguistic consistency at scale" },
        description: { es: "La interfaz mezclaba voseo y tuteo entre componentes, tests y mensajes de error. Solución: normalizar todo a tuteo (español de Venezuela) y añadir una validación por regex que detecta voseo en el código, convirtiendo un criterio editorial en un test que corre solo.", en: "The interface mixed voseo and tuteo across components, tests and error messages. Solution: normalize everything to tuteo (Venezuelan Spanish) and add a regex validation that detects voseo in the codebase, turning an editorial rule into a test that runs on its own." },
      },
    ],
    solutions: [
      {
        title: { es: "Tests poco convencionales como red de seguridad", en: "Unconventional tests as a safety net" },
        description: { es: "Además de E2E con Playwright y unitarios con Vitest, se añadieron tests de contraste de color, de iconografía del menú y de consistencia lingüística. Son criterios que normalmente se revisan a ojo y se degradan con el tiempo; como test, no.", en: "On top of Playwright E2E and Vitest unit tests, we added color-contrast, menu-iconography and linguistic-consistency tests. These are criteria usually eyeballed in review that decay over time; as tests, they don't." },
      },
      {
        title: { es: "Estados de interfaz completos", en: "Complete UI states" },
        description: { es: "Esqueletos de carga, acuse de acciones sin salto de layout, y pantallas de error y 404 que antes no existían. El objetivo fue que ningún estado dejara al usuario frente a una pantalla ambigua.", en: "Loading skeletons, action acknowledgements without layout shift, and error and 404 screens that previously did not exist. The goal was that no state leaves the user staring at an ambiguous screen." },
      },
    ],
  },
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
    gallery: [
      { title: "Dashboard de Inventario", alt: "Vista principal de gestión de lotes" },
      { title: "Control de Logística", alt: "Asignación de rutas y conductores" },
      { title: "Operación en Campo", alt: "Interfaz optimizada para dispositivos móviles" },
      { title: "Trazabilidad Comercial", alt: "Seguimiento de productos finalizados" },
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
    gallery: [
      { title: "Panel Administrativo", alt: "Gestión de admisiones y pacientes" },
      { title: "Sincronización ETL", alt: "Vista de logs y estado del sistema legado" },
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
    gallery: [
      { title: "Monitoreo en Tiempo Real", alt: "Dashboard de telemetría industrial" },
      { title: "Control de Batches", alt: "Interfaz de gestión de líneas de producción" },
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
  {
    id: "pickop",
    title: {
      es: "Pickop",
      en: "Pickop",
    },
    role: {
      es: "Full-stack (backend NestJS + frontend Next.js)",
      en: "Full-stack (NestJS backend + Next.js frontend)",
    },
    year: "2026",
    tags: ["NestJS", "TypeORM", "Supabase", "Redis", "Next.js"],
    domain: "integrations",
    private: true,
    summary: {
      es: "SaaS multi-tenant para que restaurantes reciban y gestionen pedidos por WhatsApp Flows nativos de Meta, con RBAC dinámico por permisos, gating de módulos por plan y facturación de la suscripción con múltiples pasarelas.",
      en: "Multi-tenant SaaS for restaurants to receive and manage orders through native Meta WhatsApp Flows, with dynamic permission-based RBAC, plan-based module gating, and subscription billing across multiple payment providers.",
    },
    description: {
      es: "Rewrite completo desde cero de una plataforma de pedidos por WhatsApp. Diseñé el backend NestJS con una cadena de guards explícita (rate limiting → JWT → entitlements → permisos) y un sistema RBAC con wildcards que resuelve permisos por rol y por addon contratado. Los pedidos llegan cifrados end-to-end vía WhatsApp Flows (RSA-OAEP-256 + AES-GCM) y el panel se actualiza en tiempo real por Supabase Broadcast sin pasar por el backend. La facturación de la suscripción soporta Stripe, PayPal y Binance Pay detrás de una interfaz común de proveedor de pago.",
      en: "Complete rewrite from scratch of a WhatsApp ordering platform. I designed the NestJS backend with an explicit guard chain (rate limiting → JWT → entitlements → permissions) and a wildcard-based RBAC system that resolves permissions by role and by purchased addon. Orders arrive end-to-end encrypted via WhatsApp Flows (RSA-OAEP-256 + AES-GCM) and the dashboard updates in real time through Supabase Broadcast without touching the backend. Subscription billing supports Stripe, PayPal, and Binance Pay behind a common payment provider interface.",
    },
    challenges: [
      {
        title: { es: "Cifrado de WhatsApp Flows", en: "WhatsApp Flows encryption" },
        description: { es: "Meta exige que el payload de los formularios interactivos viaje cifrado end-to-end y que la clave pública rote sin downtime. Solución: envoltura RSA-OAEP-256 de una clave AES-GCM efímera por request, con manejo explícito del código 421 para servir la nueva clave pública sin interrumpir flujos en curso.", en: "Meta requires interactive form payloads to travel end-to-end encrypted and the public key to rotate without downtime. Solution: RSA-OAEP-256 wrapping of an ephemeral per-request AES-GCM key, with explicit handling of the 421 status code to serve the new public key without breaking in-flight flows." },
      },
      {
        title: { es: "Multi-tenancy y planes por addon", en: "Multi-tenancy and per-addon plans" },
        description: { es: "Cada restaurante contrata módulos distintos (finanzas, reviews, warehouse) y el acceso debe evaluarse en cada request sin penalizar latencia. Solución: EntitlementsGuard que cachea en Redis los addons activos por tenant y distingue en la respuesta si el 403 es por addon no comprado o por módulo fuera de plan.", en: "Each restaurant contracts different modules (finance, reviews, warehouse) and access must be evaluated on every request without hurting latency. Solution: an EntitlementsGuard that caches active addons per tenant in Redis and distinguishes in the response whether the 403 is due to an unpurchased addon or a module outside the current plan." },
      },
    ],
    solutions: [
      {
        title: { es: "Cadena de guards explícita", en: "Explicit guard chain" },
        description: { es: "Throttler → JwtAuth → Entitlements → Permission, registrados globalmente y documentados en el orden exacto en que se ejecutan, cada uno actuando solo si el handler lleva el decorator correspondiente. El restaurant_id siempre se resuelve desde el JWT, nunca se acepta desde el body o query del cliente.", en: "Throttler → JwtAuth → Entitlements → Permission, registered globally and documented in the exact order they run, each only acting if the handler carries the matching decorator. restaurant_id is always resolved from the JWT, never accepted from the client's body or query." },
      },
      {
        title: { es: "Pasarelas de pago intercambiables", en: "Interchangeable payment providers" },
        description: { es: "Interfaz PaymentProvider (createCharge/queryCharge/verifyWebhook/parseWebhook) implementada por Stripe, PayPal y Binance Pay y registrada en un PaymentProviderRegistry, de forma que el servicio de facturación nunca conoce el proveedor concreto. Cada webhook se verifica por firma antes de procesarse de forma asíncrona.", en: "A PaymentProvider interface (createCharge/queryCharge/verifyWebhook/parseWebhook) implemented by Stripe, PayPal, and Binance Pay and registered in a PaymentProviderRegistry, so the billing service never knows the concrete provider. Every webhook is signature-verified before being processed asynchronously." },
      },
    ],
  },
  {
    id: "coworking",
    title: {
      es: "Coworking Platform",
      en: "Coworking Platform",
    },
    role: {
      es: "Backend (microservicio de reservas, autor principal)",
      en: "Backend (reservations microservice, sole author)",
    },
    year: "2026",
    tags: ["Rust", "Axum", "SQLx", "Python", "FastAPI", "PostgreSQL"],
    domain: "data",
    private: false,
    summary: {
      es: "Plataforma de gestión de espacios de coworking construida como microservicios poliglotas (Rust/Axum, Python/FastAPI, Node/Express) sobre una única base Postgres, con detección de solapamiento de reservas garantizada a nivel de base de datos.",
      en: "Coworking space management platform built as polyglot microservices (Rust/Axum, Python/FastAPI, Node/Express) over a single Postgres database, with reservation overlap detection guaranteed at the database level.",
    },
    description: {
      es: "Motor de reservas escrito en Rust con arquitectura hexagonal (Ports & Adapters) explícita: el dominio define traits como ReservationRepository y AuthVerifier, implementados por adaptadores concretos e inyectados con Arc<dyn Trait>, lo que permite testear la lógica de negocio sin tocar la base de datos real. El solapamiento de reservas se resuelve con una constraint EXCLUDE USING gist sobre un rango temporal (TSTZRANGE) con índice GiST, garantizando atomicidad sin condiciones de carrera posibles en la capa de aplicación. Cada transición de estado de una reserva queda auditada con actor y motivo en una tabla de historial.",
      en: "Reservations engine written in Rust with an explicit hexagonal (Ports & Adapters) architecture: the domain defines traits like ReservationRepository and AuthVerifier, implemented by concrete adapters and injected via Arc<dyn Trait>, allowing business logic to be tested without touching a real database. Reservation overlap is resolved with a PostgreSQL EXCLUDE USING gist constraint over a time range (TSTZRANGE) with a GiST index, guaranteeing atomicity with no race conditions possible at the application layer. Every reservation state transition is audited with actor and reason in a history table.",
    },
    challenges: [
      {
        title: { es: "Solapamiento de reservas sin condiciones de carrera", en: "Reservation overlap without race conditions" },
        description: { es: "Dos usuarios podían intentar reservar el mismo espacio en el mismo rango horario simultáneamente. Solución: constraint EXCLUDE USING gist sobre (space_id, time_range) resuelto atómicamente por Postgres en O(log n), en vez de validarlo en la capa de aplicación.", en: "Two users could try to book the same space in the same time window simultaneously. Solution: an EXCLUDE USING gist constraint on (space_id, time_range) resolved atomically by Postgres in O(log n), instead of validating it at the application layer." },
      },
      {
        title: { es: "Autenticación descentralizada entre servicios", en: "Decentralized cross-service authentication" },
        description: { es: "Cada microservicio necesita verificar identidad sin acoplarse al servicio de auth para cada request. Solución: JWT compartido con issuer/audience explícitos verificado localmente en cada servicio, con una única llamada HTTP al auth-service solo quando hace falta confirmar existencia del usuario.", en: "Each microservice needs to verify identity without coupling to the auth service on every request. Solution: a shared JWT with explicit issuer/audience verified locally by each service, with a single HTTP call to the auth service only when user existence needs confirming." },
      },
    ],
    solutions: [
      {
        title: { es: "Hexagonal en Rust con DI manual", en: "Hexagonal architecture in Rust with manual DI" },
        description: { es: "domain/application/infrastructure/api como crates conceptualmente separados dentro del servicio: los casos de uso dependen de traits (ports), nunca de implementaciones concretas, inyectadas vía Arc<dyn Trait> en el ReservationService. Permite mockear el repositorio en tests sin levantar Postgres.", en: "domain/application/infrastructure/api as conceptually separate layers within the service: use cases depend on traits (ports), never on concrete implementations, injected via Arc<dyn Trait> in the ReservationService. Enables mocking the repository in tests without spinning up Postgres." },
      },
      {
        title: { es: "Auditoría de estados como event sourcing parcial", en: "State auditing as partial event sourcing" },
        description: { es: "Cada creación, confirmación o cancelación de una reserva escribe una fila en reservation_status_history con from/to status, actor y motivo, dando trazabilidad completa sin necesidad de un event store completo.", en: "Every reservation creation, confirmation, or cancellation writes a row in reservation_status_history with from/to status, actor, and reason, giving full traceability without needing a full event store." },
      },
    ],
    github: "https://github.com/lpzzlnrd/Coworking",
  },
  {
    id: "encuentralos",
    title: {
      es: "Encuentra un Niño",
      en: "Encuentra un Niño",
    },
    role: {
      es: "Full-stack (frontend + modelo de seguridad en base de datos)",
      en: "Full-stack (frontend + database security model)",
    },
    year: "2026",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL RLS", "PWA"],
    domain: "data",
    private: false,
    summary: {
      es: "PWA de emergencia para reportar y reunificar menores extraviados, con modo offline, y un modelo de seguridad de datos sensibles implementado casi enteramente a nivel de base de datos (RLS, grants por columna, funciones security definer/invoker).",
      en: "Emergency PWA to report and reunite missing children, with offline support, and a sensitive-data security model implemented almost entirely at the database level (RLS, column-level grants, security definer/invoker functions).",
    },
    description: {
      es: "Aplicación construida en contexto de emergencia (sismo en Venezuela) para que cualquier persona pueda publicar o buscar reportes de menores extraviados, revelando el teléfono de contacto solo bajo demanda. El foco del proyecto no es el frontend sino el modelo de datos: los teléfonos están protegidos por revoke/grant a nivel de columna, una vista pública con security_invoker expone solo los campos no sensibles, y una única Supabase Edge Function en Deno controla el revelado de contacto con rate limiting por hash de IP. La app funciona offline: si no hay conexión, el reporte se encola en IndexedDB y se reenvía automáticamente al reconectar.",
      en: "Application built in an emergency context (earthquake in Venezuela) so anyone can publish or search reports of missing children, revealing the contact phone only on demand. The project's focus isn't the frontend but the data model: phone numbers are protected through column-level revoke/grant, a public view with security_invoker exposes only non-sensitive fields, and a single Deno-based Supabase Edge Function gates contact reveal with IP-hash rate limiting. The app works offline: with no connection, the report queues in IndexedDB and auto-retries once reconnected.",
    },
    challenges: [
      {
        title: { es: "Proteger datos sensibles sin backend propio", en: "Protecting sensitive data without a dedicated backend" },
        description: { es: "El frontend consume Supabase directamente con la clave anónima; exponer teléfonos de contacto sería trivial para cualquier cliente. Solución: revoke de la columna de teléfono para el rol anon, vista pública sin esos campos, y una Edge Function con service role que es la única vía para revelarlos.", en: "The frontend consumes Supabase directly with the anon key; exposing contact phone numbers would be trivial for any client. Solution: revoking the phone column for the anon role, a public view without those fields, and an Edge Function with service role as the only path to reveal them." },
      },
      {
        title: { es: "Abuso del revelado de contacto", en: "Contact-reveal abuse" },
        description: { es: "Sin control, un actor malicioso podría enumerar todos los teléfonos del sistema. Solución: rate limiting de 15 solicitudes/minuto por IP, hasheada con SHA-256 antes de loguearla, implementado dentro de la propia Edge Function.", en: "Without control, a malicious actor could enumerate every phone number in the system. Solution: rate limiting of 15 requests/minute per IP, SHA-256 hashed before logging, implemented inside the Edge Function itself." },
      },
    ],
    solutions: [
      {
        title: { es: "Row Level Security como capa de autorización", en: "Row Level Security as the authorization layer" },
        description: { es: "En vez de validar permisos en el cliente o en un backend intermedio, las policies de Postgres deciden qué fila puede insertar/leer/actualizar cada rol, con una función es_admin() security definer en un schema privado no expuesto por la API REST.", en: "Instead of validating permissions on the client or an intermediate backend, Postgres policies decide which row each role can insert/read/update, with a security definer es_admin() function in a private schema not exposed by the REST API." },
      },
      {
        title: { es: "PWA offline-first", en: "Offline-first PWA" },
        description: { es: "Service worker con Workbox (precache de app shell, StaleWhileRevalidate para fotos, NetworkFirst para el listado) y una cola en IndexedDB que reintenta el envío de reportes al recuperar conexión.", en: "Service worker with Workbox (app shell precache, StaleWhileRevalidate for photos, NetworkFirst for the listing) and an IndexedDB queue that retries report submissions once connectivity returns." },
      },
    ],
    github: "https://github.com/Botinfy/encuentralos",
  },
  {
    id: "xpresapp",
    title: {
      es: "XpresApp — Plataforma Bancaria/Cooperativa",
      en: "XpresApp — Banking/Cooperative Platform",
    },
    role: {
      es: "Backend (extensión de módulo financiero)",
      en: "Backend (financial module extension)",
    },
    year: "2026",
    tags: ["Laravel", "PHP", "MySQL", "Multi-guard auth"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Plataforma bancaria/cooperativa multi-panel (usuarios, sucursales, admin) sobre una base Laravel existente, donde diseñé desde cero el módulo de Certificados de Depósito: inversión, cuotas mensuales, retiro anticipado con penalización y maduración automática.",
      en: "Multi-panel banking/cooperative platform (users, branches, admin) on top of an existing Laravel codebase, where I designed the Certificate of Deposit module from scratch: investment, monthly installments, early withdrawal with penalty, and automatic maturity processing.",
    },
    description: {
      es: "Trabajé sobre una plataforma financiera con paneles separados para usuarios, personal de sucursal y administradores, cada uno con sus propios guards de autenticación. Mi contribución central fue el módulo de Certificados de Depósito (CD): un CdService que encapsula toda la lógica financiera dentro de transacciones de base de datos, validando monto mínimo y balance suficiente antes de crear la inversión, generando cuotas mensuales automáticamente, calculando penalización por retiro anticipado, y procesando la maduración con envío de notificación por correo. Extendí el esquema con excepciones de dominio propias (InsufficientBalanceException, InvalidCdOperationException) en vez de errores genéricos.",
      en: "Worked on a financial platform with separate panels for end users, branch staff, and administrators, each with its own auth guards. My core contribution was the Certificate of Deposit (CD) module: a CdService that encapsulates all financial logic inside database transactions, validating minimum amount and sufficient balance before creating the investment, auto-generating monthly installments, calculating early-withdrawal penalties, and processing maturity with email notifications. I extended the schema with dedicated domain exceptions (InsufficientBalanceException, InvalidCdOperationException) instead of generic errors.",
    },
    challenges: [
      {
        title: { es: "Consistencia financiera bajo concurrencia", en: "Financial consistency under concurrency" },
        description: { es: "Crear una inversión, generar cuotas y descontar balance debe ser todo o nada. Solución: toda la operación envuelta en DB::transaction, con validaciones de negocio (plan activo, balance suficiente) antes de cualquier escritura.", en: "Creating an investment, generating installments, and deducting balance must be all-or-nothing. Solution: the entire operation wrapped in DB::transaction, with business validations (active plan, sufficient balance) before any write." },
      },
      {
        title: { es: "Maduración y penalizaciones automáticas", en: "Automatic maturity and penalties" },
        description: { es: "Los CDs deben madurar y pagar intereses sin intervención manual, y un retiro anticipado debe penalizarse de forma justa. Solución: comandos Artisan programados (ProcessMaturedCds) más un cálculo de penalización encapsulado en el propio modelo del plan (cdPlan->calPenalty).", en: "CDs must mature and pay interest without manual intervention, and early withdrawal must be penalized fairly. Solution: scheduled Artisan commands (ProcessMaturedCds) plus a penalty calculation encapsulated in the plan model itself (cdPlan->calPenalty)." },
      },
    ],
    solutions: [
      {
        title: { es: "Excepciones de dominio explícitas", en: "Explicit domain exceptions" },
        description: { es: "InsufficientBalanceException e InvalidCdOperationException en vez de errores genéricos, permitiendo que la capa HTTP traduzca cada caso a una respuesta clara sin lógica condicional dispersa.", en: "InsufficientBalanceException and InvalidCdOperationException instead of generic errors, letting the HTTP layer translate each case into a clear response without scattered conditional logic." },
      },
      {
        title: { es: "Jobs configurables desde base de datos", en: "Database-configurable jobs" },
        description: { es: "Además del scheduler nativo de Artisan, un registro de CronJob/CronJobLog en base de datos permite ajustar la periodicidad de los procesos de maduración desde el panel admin sin tocar código ni redeploy.", en: "Beyond the native Artisan scheduler, a CronJob/CronJobLog database registry lets maturity-process timing be adjusted from the admin panel without touching code or redeploying." },
      },
    ],
  },
  {
    id: "windeingio",
    title: {
      es: "Whatbox Cloud",
      en: "Whatbox Cloud",
    },
    role: {
      es: "Backend (integraciones y arquitectura modular)",
      en: "Backend (integrations and modular architecture)",
    },
    year: "2026",
    tags: ["Laravel", "PHP", "Modular architecture", "Meta Graph API", "OpenAI"],
    domain: "integrations",
    private: true,
    summary: {
      es: "SaaS multi-tenant para gestión de conversaciones y marketing por WhatsApp Business, Instagram y Messenger, empaquetado como más de 40 módulos independientes que pueden activarse, desactivarse o venderse por separado.",
      en: "Multi-tenant SaaS for conversation management and marketing across WhatsApp Business, Instagram, and Messenger, packaged as 40+ independent modules that can be enabled, disabled, or sold separately.",
    },
    description: {
      es: "Plataforma de mensajería multi-canal donde el núcleo del producto vive en un handler de webhooks unificado que normaliza payloads heterogéneos de WhatsApp, Instagram y Messenger a un modelo interno único, con detección de mensajes 'echo' (enviados desde la app móvil) para no duplicar lógica de UI. La arquitectura modular (cada feature como paquete independiente con sus propias rutas, modelos y migraciones) permite empaquetar subconjuntos de módulos como productos vendibles por separado. El multi-tenancy se aplica de forma consistente por company_id, con límites de uso (mensajes, contactos, campañas) evaluados en cada request contra el plan contratado.",
      en: "Multi-channel messaging platform where the product's core lives in a unified webhook handler that normalizes heterogeneous WhatsApp, Instagram, and Messenger payloads into a single internal model, with 'echo' message detection (sent from the mobile app) to avoid duplicating UI logic. The modular architecture (each feature as an independent package with its own routes, models, and migrations) allows bundling subsets of modules as separately sellable products. Multi-tenancy is applied consistently via company_id, with usage limits (messages, contacts, campaigns) evaluated on every request against the contracted plan.",
    },
    challenges: [
      {
        title: { es: "Condiciones de carrera al crear contactos", en: "Race conditions on contact creation" },
        description: { es: "Mensajes concurrentes del mismo contacto podían crear duplicados. Solución: lockForUpdate() combinado con double-check locking en findOrCreateContact antes de insertar.", en: "Concurrent messages from the same contact could create duplicates. Solution: lockForUpdate() combined with double-check locking in findOrCreateContact before inserting." },
      },
      {
        title: { es: "Normalizar tres proveedores heterogéneos", en: "Normalizing three heterogeneous providers" },
        description: { es: "WhatsApp, Instagram y Messenger envían webhooks con estructuras completamente distintas. Solución: un MetaWebhookHandler central que despacha según el campo 'object' del payload y traduce todo a un modelo interno común (Contact, Message, SocialNotification).", en: "WhatsApp, Instagram, and Messenger send webhooks with completely different structures. Solution: a central MetaWebhookHandler that dispatches based on the payload's 'object' field and translates everything into a common internal model (Contact, Message, SocialNotification)." },
      },
    ],
    solutions: [
      {
        title: { es: "Arquitectura modular empaquetable", en: "Packageable modular architecture" },
        description: { es: "Más de 40 módulos independientes (namespace, rutas, modelos y migraciones propios) que pueden combinarse y empaquetarse selectivamente para distribución como productos separados, sin tocar el núcleo de la aplicación.", en: "40+ independent modules (own namespace, routes, models, and migrations) that can be selectively combined and packaged for distribution as separate products, without touching the application core." },
      },
      {
        title: { es: "Gating de planes en tiempo real", en: "Real-time plan gating" },
        description: { es: "Un middleware de negocio calcula el consumo mensual/anual de mensajes, campañas y contactos por empresa contra los límites del plan contratado, bloqueando o redirigiendo antes de que la request llegue al controller.", en: "A business middleware calculates monthly/yearly consumption of messages, campaigns, and contacts per company against the contracted plan's limits, blocking or redirecting before the request reaches the controller." },
      },
    ],
  },
  {
    id: "pagoexpres",
    title: {
      es: "Pago Today — Remesas y Logística",
      en: "Pago Today — Remittances & Logistics",
    },
    role: {
      es: "Backend (integraciones fintech)",
      en: "Backend (fintech integrations)",
    },
    year: "2025",
    tags: ["Laravel", "PHP", "MySQL", "Livewire", "Fintech"],
    domain: "integrations",
    private: true,
    summary: {
      es: "Plataforma fintech de remesas hacia Venezuela con billetera multi-moneda, verificación KYC y un módulo adicional de logística de encomiendas, integrada con una API externa de terceros para liquidar retiros en USDT y bancos venezolanos.",
      en: "Fintech remittance platform to Venezuela with a multi-currency wallet, KYC verification, and an additional parcel-logistics module, integrated with a third-party external API to settle USDT and Venezuelan bank withdrawals.",
    },
    description: {
      es: "Plataforma de envío de dinero internacional con billetera virtual segmentada por país (USD/EUR/COP), donde cada recarga de saldo pasa por un flujo de aprobación manual con comprobante de pago, y cada envío se liquida mediante integración HTTP con una API externa (CBPay) que resuelve tasas y ejecuta retiros por pago móvil o transferencia bancaria en Venezuela. Implementé el flujo de verificación de identidad (KYC) con selfie y documento, la generación de comprobantes en PDF, y el manejo de errores alrededor de integraciones externas para que un fallo del proveedor no bloquee toda la operación.",
      en: "International money transfer platform with a country-segmented virtual wallet (USD/EUR/COP), where every balance top-up goes through a manual approval flow with a payment proof, and every remittance is settled through an HTTP integration with an external API (CBPay) that resolves exchange rates and executes withdrawals via mobile payment or bank transfer in Venezuela. I implemented the identity verification (KYC) flow with selfie and document upload, PDF receipt generation, and error handling around external integrations so a provider failure doesn't block the entire operation.",
    },
    challenges: [
      {
        title: { es: "Dependencia de una API financiera de terceros", en: "Dependency on a third-party financial API" },
        description: { es: "Los retiros dependen de un proveedor externo (CBPay) que puede fallar o responder lento. Solución: manejo defensivo con try/catch alrededor de cada llamada, logging estructurado de ingresos/egresos, y transacciones de base de datos (DB::beginTransaction/commit/rollBack) en los flujos financieros críticos.", en: "Withdrawals depend on an external provider (CBPay) that can fail or respond slowly. Solution: defensive try/catch handling around every call, structured logging of inflows/outflows, and database transactions (DB::beginTransaction/commit/rollBack) in critical financial flows." },
      },
      {
        title: { es: "Verificación de identidad y cumplimiento", en: "Identity verification and compliance" },
        description: { es: "El servicio maneja transferencias de dinero real y requiere verificar identidad antes de operar. Solución: flujo KYC con selfie + documento frontal/trasero, revisado manualmente por un administrador antes de habilitar operaciones sensibles.", en: "The service handles real money transfers and requires identity verification before operating. Solution: a KYC flow with selfie plus front/back document, manually reviewed by an administrator before enabling sensitive operations." },
      },
    ],
    solutions: [
      {
        title: { es: "Balances segmentados por país y moneda", en: "Country and currency-segmented balances" },
        description: { es: "Cada usuario opera con un balance específico según su país de origen, con conversión automática de divisas y tasa inversa cuando no existe una tasa directa registrada entre dos monedas.", en: "Each user operates with a balance specific to their country of origin, with automatic currency conversion and an inverse rate calculation when no direct rate is registered between two currencies." },
      },
      {
        title: { es: "Notificaciones transaccionales multicanal", en: "Multi-channel transactional notifications" },
        description: { es: "Integración con Twilio para SMS y WhatsApp, incluyendo un chatbot que responde automáticamente la tasa de cambio del día, y un observer que dispara notificaciones al cambiar el estado de un envío.", en: "Twilio integration for SMS and WhatsApp, including a chatbot that automatically replies with the day's exchange rate, and an observer that fires notifications when a transfer's status changes." },
      },
    ],
  },
  {
    id: "pokemon-api",
    title: {
      es: "PokeNext",
      en: "PokeNext",
    },
    role: {
      es: "Colaborador (features de búsqueda)",
      en: "Contributor (search features)",
    },
    year: "2026",
    tags: ["Next.js", "TypeScript", "React", "SSR"],
    domain: "data",
    private: false,
    summary: {
      es: "Pokedex web con Next.js App Router y Server Components que consume la PokéAPI pública; contribuí los filtros de búsqueda por tipo/generación y el autocompletado con endpoint propio de sugerencias.",
      en: "Web Pokedex built with Next.js App Router and Server Components consuming the public PokéAPI; I contributed the type/generation search filters and the autocomplete with a dedicated suggestions endpoint.",
    },
    description: {
      es: "Proyecto colaborativo de curso donde aporté las funcionalidades de búsqueda: filtrado server-side por tipo y generación de Pokémon vía query params resueltos en Server Components, y un buscador con autocompletado que consume un endpoint propio (/api/pokemon/suggestions) construido para reempaquetar datos de la PokéAPI sin exponer al cliente el detalle de la integración externa. La capa de acceso a datos (lib/pokemon.ts) normaliza las respuestas crudas de la API externa a tipos de dominio propios antes de llegar a los componentes de presentación.",
      en: "Collaborative course project where I contributed the search features: server-side filtering by Pokémon type and generation via query params resolved in Server Components, and a search box with autocomplete consuming a dedicated endpoint (/api/pokemon/suggestions) built to repackage PokéAPI data without exposing the external integration's details to the client. The data-access layer (lib/pokemon.ts) normalizes raw external API responses into domain-specific types before they reach presentation components.",
    },
    challenges: [
      {
        title: { es: "Autocompletado sin backend propio", en: "Autocomplete without an owned backend" },
        description: { es: "Cargar todos los nombres de Pokémon (2000+) para el buscador sin penalizar la carga inicial. Solución: un endpoint propio que resuelve la lista completa una sola vez al montar el header, cacheada por Next.js, y filtrada localmente en cliente por nombre o número.", en: "Loading all Pokémon names (2000+) for the search box without penalizing initial load. Solution: a dedicated endpoint that resolves the full list once on header mount, cached by Next.js, and filtered client-side by name or number." },
      },
    ],
    solutions: [
      {
        title: { es: "Filtrado resiliente en paralelo", en: "Resilient parallel filtering" },
        description: { es: "Al filtrar por tipo o generación, cada detalle de Pokémon se resuelve en paralelo con Promise.allSettled, descartando resultados individuales fallidos sin romper el listado completo.", en: "When filtering by type or generation, each Pokémon's detail is resolved in parallel with Promise.allSettled, discarding individually failed results without breaking the whole listing." },
      },
    ],
    github: "https://github.com/KumaDeveloperVZLA/Pokemon-API",
  },
];
