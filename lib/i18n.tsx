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

  // /projects
  projectsH:   { es: "Proyectos", en: "Projects" },
  projectsSub: {
    es: "Una selección. Filtra por dominio, stack o tipo de problema.",
    en: "A selection. Filter by domain, stack, or problem type.",
  },
  filter: { es: "Filtrar", en: "Filter" },
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
  secExperience:   { es: "EXPERIENCIA",        en: "EXPERIENCE" },
  secEducation:    { es: "FORMACIÓN",          en: "EDUCATION" },
  secLanguages:    { es: "IDIOMAS",            en: "LANGUAGES" },
  secHobbies:      { es: "FUERA DEL CÓDIGO",   en: "OFF THE CLOCK" },
  secContact:      { es: "CONTACTO",           en: "CONTACT" },

  stackLanguages:  { es: "Lenguajes",          en: "Languages" },
  stackFrameworks: { es: "Frameworks",         en: "Frameworks" },
  stackDatabases:  { es: "Bases de datos",     en: "Databases" },
  stackTools:      { es: "Herramientas",       en: "Tools" },

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
