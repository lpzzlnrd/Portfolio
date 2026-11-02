"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";

export type Lang = "es" | "en";
export type Bilingual = { es: string; en: string };

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "es", setLang: () => {} });

export function LangProvider({ children, initial = "es" }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLang] = useState<Lang>(initial);
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Pick from a {es,en} object, or shorthand: t("ES", "EN"). */
export function useT() {
  const { lang } = useLang();
  function t(es: string, en: string): string;
  function t(b: Bilingual): string;
  function t(a: string | Bilingual, b?: string): string {
    if (typeof a === "string") return lang === "es" ? a : (b ?? a);
    return a[lang];
  }
  return t;
}

/** Static dictionary — every piece of UI chrome lives here. */
export const STR = {
  // Nav
  navWork:    { es: "Trabajo",  en: "Work" },
  navAbout:   { es: "Sobre mí", en: "About" },
  navSetup:   { es: "Setup",    en: "Setup" },
  navContact: { es: "Contacto", en: "Contact" },

  // Hero
  rolePill:  { es: "BACKEND · FULL-STACK", en: "BACKEND · FULL-STACK" },
  available: { es: "Disponible para freelance", en: "Available for freelance" },
  pitchA:    { es: "Construyo backends",  en: "I build backends" },
  pitchB:    { es: "que no se rompen",    en: "that don’t break" },
  pitchC:    { es: "a las 3 AM.",         en: "at 3 AM." },
  pitchSub:  {
    es: "APIs claras, datos consistentes, observabilidad por defecto. Trabajo principalmente con Node, NestJS y Postgres — pero la decisión empieza por el problema, no por el stack.",
    en: "Clean APIs, consistent data, observability by default. I mostly work with Node, NestJS and Postgres — but the decision starts with the problem, not the stack.",
  },
  ctaWork:    { es: "Ver proyectos",  en: "See projects" },
  ctaGithub:  { es: "GitHub",         en: "GitHub" },
  ctaContact: { es: "Escríbeme",      en: "Get in touch" },

  // Sections
  selected: { es: "PROYECTOS DESTACADOS", en: "SELECTED WORK" },
  allWork:  { es: "TODO EL TRABAJO",      en: "ALL WORK" },
  stack:    { es: "STACK PRINCIPAL",      en: "CORE STACK" },
  activity: { es: "ACTIVIDAD RECIENTE",   en: "RECENT ACTIVITY" },
  activityByProject: { es: "Commits por proyecto", en: "Commits by project" },

  // Home — how I build
  howIBuild: { es: "CÓMO CONSTRUYO", en: "HOW I BUILD" },
  pillarReliability: { es: "Fiabilidad primero", en: "Reliability first" },
  pillarReliabilityBody: {
    es: "Reintentos, colas de fallos persistentes, deduplicación y apagado ordenado. Un evento aceptado se entrega o queda registrado — nunca desaparece en silencio.",
    en: "Retries, persistent failure queues, deduplication and ordered shutdown. An accepted event is either delivered or recorded — it never vanishes silently.",
  },
  pillarSecurity: { es: "Seguridad aplicada", en: "Applied security" },
  pillarSecurityBody: {
    es: "Credenciales por tenant en vez de un token compartido, firmas HMAC verificadas, sesiones endurecidas y trazas de auditoría. El aislamiento entre clientes es requisito, no detalle.",
    en: "Per-tenant credentials instead of a shared token, verified HMAC signatures, hardened sessions and audit trails. Cross-tenant isolation is a requirement, not a detail.",
  },
  pillarContracts: { es: "Contratos explícitos", en: "Explicit contracts" },
  pillarContractsBody: {
    es: "Documento qué recibe y qué responde cada consumidor antes de escribir el handler. Si otro equipo se conecta, no debería tener que leer mi código para entenderlo.",
    en: "I document what each consumer receives and returns before writing the handler. If another team integrates, they shouldn't have to read my code to understand it.",
  },

  // /projects
  projectsH:   { es: "Proyectos", en: "Projects" },
  projectsSub: {
    es: "Una selección. Filtra por dominio, stack o tipo de problema.",
    en: "A selection. Filter by domain, stack, or problem type.",
  },
  filter: { es: "Filtrar", en: "Filter" },
  search: { es: "Buscar", en: "Search" },
  searchProjects: {
    es: "Título, stack o tipo de problema",
    en: "Title, stack, or problem type",
  },
  view:   { es: "Vista",   en: "View" },
  grid:   { es: "Grilla",  en: "Grid" },
  list:   { es: "Lista",   en: "List" },
  all:    { es: "Todos",   en: "All" },

  // Card / status
  privateRepo: { es: "Repo privado",   en: "Private repo" },
  publicRepo:  { es: "Repo público",   en: "Public repo" },
  privateMsg:  {
    es: "Disponible bajo NDA · puedo hacer un walkthrough en una llamada.",
    en: "Available under NDA · I can do a walkthrough on a call.",
  },
  requestAccess: { es: "Pedir acceso", en: "Request access" },
  caseStudy:     { es: "Case study",   en: "Case study" },

  // Footer
  footerNote: {
    es: "Construido con Next.js + Tailwind. Hospedado en Vercel.",
    en: "Built with Next.js + Tailwind. Hosted on Vercel.",
  },

  // /about
  aboutH:    { es: "Sobre mí", en: "About" },
  aboutSub:  {
    es: "Mitad código, mitad humano. Esto es lo que hay detrás del backend.",
    en: "Half code, half human. This is what's behind the backend.",
  },
  secIntro:        { es: "PRESENTACIÓN",      en: "INTRO" },
  secStack:        { es: "STACK",              en: "STACK" },
  secCompetencies: { es: "COMPETENCIAS",       en: "COMPETENCIES" },
  secEngineering:  { es: "INGENIERÍA COMPLEJA", en: "COMPLEX ENGINEERING" },
  secExperience:   { es: "EXPERIENCIA",        en: "EXPERIENCE" },
  secEducation:    { es: "FORMACIÓN",          en: "EDUCATION" },
  secLanguages:    { es: "IDIOMAS",            en: "LANGUAGES" },
  secHobbies:      { es: "FUERA DEL CÓDIGO",   en: "OFF THE CLOCK" },
  secContact:      { es: "CONTACTO",           en: "CONTACT" },

  stackLanguages:  { es: "Lenguajes",          en: "Languages" },
  stackFrameworks: { es: "Frameworks",         en: "Frameworks" },
  stackDatabases:  { es: "Bases de datos",     en: "Databases" },
  stackTools:      { es: "Herramientas",       en: "Tools" },
  stackRealtime:   { es: "Tiempo real",        en: "Real time" },
  stackSecurity:   { es: "Seguridad",          en: "Security" },
  stackTesting:    { es: "Testing",            en: "Testing" },

  competenciesSub: {
    es: "Cómo construyo, no solo con qué.",
    en: "How I build, not just what with.",
  },
  engineeringSub: {
    es: "Trabajo paralelo que empuja los límites del stack habitual.",
    en: "Side work that pushes past the usual stack.",
  },

  // CV
  cvDownload: { es: "Descargar CV", en: "Download CV" },
  cvSection:  { es: "CURRÍCULUM",   en: "RÉSUMÉ" },

  hobbiesPlaceholder: {
    es: "Sección en construcción. Pronto: música, juegos, libros, lo que sea que me distrae bien.",
    en: "Section under construction. Coming soon: music, games, books, whatever distracts me in a good way.",
  },

  // /contact
  contactH:      { es: "Contacto",    en: "Contact" },
  contactForm:   { es: "Formulario",  en: "Form" },
  contactDirect: { es: "Contacto directo", en: "Direct contact" },
  contactEmail:  { es: "Email de trabajo", en: "Work email" },
  contactPhone:  { es: "Teléfono / WhatsApp", en: "Phone / WhatsApp" },
  contactSocial: { es: "Redes sociales", en: "Social media" },
  contactAvail:  { es: "Disponibilidad", en: "Availability" },
  contactFAQ:    { es: "Preguntas frecuentes", en: "FAQ" },
} as const;
