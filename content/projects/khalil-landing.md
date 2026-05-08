# Khalil Landing

## Contexto

Landing moderna con captación de leads y agendamiento integrado.

## Problemáticas

- Consolidar captación, validación y agendamiento en un flujo único.
- Integrar servicios externos de mensajería y calendario en flujo serverless.
- Mantener estructura clara de rutas, directorios y variables de entorno.

## Cómo lo afronté (decisiones y tradeoffs)

- Implementé arquitectura App Router con endpoints serverless en `src/app/api/*`.
- Integré formularios con validación usando `react-hook-form + zod`.
- Orquesté envíos y agenda con Supabase, Resend y Google Calendar API con service account.
- Tradeoff: mayor dependencia de variables de entorno y credenciales para integraciones externas.

## Solución (arquitectura, módulos, flujos)

- Stack: Next.js App Router 16+, React 19, Tailwind v4, Framer Motion, react-hook-form + zod, Supabase, Resend, Google Calendar API con service account, serverless functions en `src/app/api/*`, cron jobs.
- Estructura y flujo: mantener lo dado (rutas, dirs, variables env, flujo de datos).

## Stack

- Next.js App Router 16+
- React 19
- Tailwind v4
- Framer Motion
- react-hook-form + zod
- Supabase
- Resend
- Google Calendar API (service account)
- serverless functions en `src/app/api/*`
- cron jobs

## Mi rol

Autor principal end-to-end.

## Links

- Repositorio: https://github.com/lpzzlnrd/Khalil-Landing
- Demo: no disponible
- Docs: no disponible
